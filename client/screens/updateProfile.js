import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles";
import { Avatar } from 'react-native-elements';
import FormData from "form-data";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: "",
            bio: ""
        }
    }

    componentDidMount() {
        //get profilePicture
        fetch("http://192.168.1.79:5000/getUserInfo", {
            method: "GET",
            redirect: "follow",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(resp => resp.json())
            .then(resp => {
                console.log("info", resp)
                this.setState({
                    uri: resp.profilePicture,
                    bio: resp.quote
                });
            }).catch(err => {
                console.log(err);
            })
    }
    navigate(page) {
        this.props.navigation.navigate(page);
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
            <View style={styles.newContainer}>
                <Avatar
                    showEditButton
                    onPress={async () => {
                        let fd = new FormData();
                        let photouri = await this.sendPhoto.bind(this)();
                        if (!photouri) {
                            alert("no photo uploaded!")
                            return
                        }
                        fd.append("photo", {
                            uri: photouri,
                            type: "image/jpeg",
                            name: "photo.jpg"
                        });
                        fetch("http://192.168.1.79:5000/uploadProfilePicture", {
                            method: "POST",
                            body: fd
                        }).then(res => res.json())
                            .then(res => {
                                console.log("here", res)
                                this.setState({
                                    uri: res.profilePicture
                                })
                                alert("successfully uploaded!")
                            }).catch(err => {
                                console.log(err);
                            })



                    }}

                    rounded size={150}
                    source={{
                        uri: "http://192.168.1.79:5000/" + this.state.uri

                    }}
                />
                <Text style={styles.formLable}>Your coffee statement:</Text>
                <View style={{ flexDirection: "row", marginBottom: 20, paddingHorizontal: 10 }}>

                    <TextInput style={styles.formInput}
                        onChangeText={(text) => {
                            this.setState({
                                bio: text
                            })
                        }} value={this.state.bio} placeholder={"Type something..."}></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            fetch("http://192.168.1.79:5000/submitQuote", {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    quote: this.state.bio
                                })

                            }).then(resp => resp.json())
                                .then(resp => {
                                    console.log("quote", resp)
                                    alert("success!")

                                }).catch(err => {
                                    console.log(err);
                                })
                        }}
                        style={styles.mButton}><Text>Save</Text></TouchableOpacity>
                </View>
                <View style={{ justifyContent: "space-evenly" }}>
                    <TouchableOpacity style={styles.fButtons}
                        onPress={() => {
                            this.navigate("Questionary")
                        }}><Text style={styles.lable}>Update Coffee Profile</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.fButtons}
                        onPress={() => {
                            this.navigate("ManageReview")
                        }}><Text style={styles.lable}>Manage Coffee Reviews</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.fButtons}
                        onPress={() => {
                            this.navigate("Wishlist")
                        }}><Text style={styles.lable}>View Wishlist</Text></TouchableOpacity>
                </View>
            </View>)
    }
}