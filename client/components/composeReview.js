import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import styles from "../styles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import FormData from 'form-data';
//import fs from "fs";


export default class ComposeReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coffeeShop: "",
            img: "",
            content: "",
            order: ""

        }

    }

    sendPhoto = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
            return;
        }
        let photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All
        });
        if (photo.cancelled) {
            return null;
        } else {
            return photo.uri;
        }
    };

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.open}
            >
                <ImageBackground source={{ uri: "https://s3-us-east-2.amazonaws.com/fgwebsitemedia/wp-content/uploads/2017/11/02183222/cafe-lifestyle-photography.jpg" }} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Write A Review</Text>
                        <View style={styles.cField}>
                            <Text style={styles.ctitle} >Name of the Coffee Shop: </Text>
                            <TextInput style={styles.cInput}
                                onChangeText={(text) => this.setState({
                                    coffeeShop: text
                                })} value={this.state.coffeeShop} />
                        </View>
                        <View style={styles.cField}>
                            <Text style={styles.ctitle} >You ordered: </Text>
                            <TextInput style={styles.cInput}
                                onChangeText={(text) => this.setState({
                                    order: text
                                })} value={this.state.order} />
                        </View>

                        <View style={styles.cField}>
                            <Text style={styles.ctitle} >Comment: </Text>
                            <TextInput style={styles.cInput}
                                onChangeText={(text) => this.setState({
                                    content: text
                                })} value={this.state.content} />
                        </View>

                        <View style={styles.cField}>

                            <TouchableOpacity
                                style={{
                                    width: 230,
                                    padding: 10,
                                    backgroundColor: '#f0dd92',
                                    borderRadius: 5,
                                    marginBottom: 20,
                                    flexDirection: "row"
                                }}

                                onPress={async () => {
                                    let uri = await this.sendPhoto()
                                    this.setState({
                                        img: uri
                                    })
                                    if (uri) {
                                        alert("success!")

                                    } else {

                                    }



                                }}>
                                <Text style={styles.ctitle}>Upload a photo...  </Text>
                                <FontAwesomeIcon icon={faCamera} />
                            </TouchableOpacity>



                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.modalButton}
                                onPress={() => {
                                    //console.log("hi", this.state)
                                    let fd = new FormData();
                                    let coffeeShop = this.state.coffeeShop;
                                    let order = this.state.order;
                                    let content = this.state.content;
                                    let uri = this.state.img;
                                    if (!uri) {
                                        alert("upload a photo please:)")
                                        return
                                    }


                                    fd.append("img", {
                                        uri: uri,
                                        type: "image/jpeg",
                                        name: "photo.jpg"
                                    });

                                    fd.append("coffeeShop", coffeeShop);
                                    fd.append("order", order);
                                    fd.append("content", content);


                                    fetch("http://192.168.1.79:5000/submitReview", {
                                        method: "POST",
                                        body: fd
                                    })
                                        .then(res => res.json())
                                        .then(res => {
                                            //console.log(res);
                                            fetch("http://192.168.1.79:5000/getAllReviews", {
                                                method: "GET",
                                                redirect: "follow",
                                                credentials: "include",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                }

                                            }).then(resp => resp.json())
                                                .then(resp => {
                                                    //console.log(resp)
                                                    this.setState({
                                                        coffeeShop: "",
                                                        img: "",
                                                        content: "",
                                                        order: ""

                                                    })
                                                    this.props.setPreState({
                                                        reviews: resp
                                                    })

                                                    this.props.setState({

                                                        modalOpen: false
                                                    })
                                                }).catch(err => {
                                                    console.log(err)
                                                })


                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })




                                }
                                }><Text style={styles.lable}>Submit</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton}
                                onPress={() => {
                                    this.props.setState({
                                        modalOpen: false
                                    })

                                }}><Text style={styles.lable}>Cancel</Text></TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>

            </Modal>
        )
    }
}
