import React from 'react';
import { Text, View, Button, TouchableOpacity, Modal, Alert, ImageBackground } from 'react-native';
import { Icon } from "react-native-elements";
import styles from "../styles";
import MapView from 'react-native-maps'
import { Footer, FooterTab } from "native-base";
import Dropdown from "../components/dropdown";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Swiper from "react-native-swiper";
import ModalContent from "../components/modalContent";
import Classroom from "./classroom";
import Community from "./community";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

export default class Main extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Home", //navigation.state.params.username
        headerLeft: <View style={{ marginLeft: 5 }}><Text>Hello,{navigation.state.params.username}</Text></View>,
        headerRight: <View style={{ marginRight: 5, marginBottom: 5 }}><Dropdown navigate={navigation.navigate} logout={() => {
            fetch("http://192.168.1.79:5000/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(resp => { navigation.navigate('Login') });
        }} /></View>




    });
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.00062,
                longitudeDelta: 0.00091,
            },
            location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
            modalOpen: false,
            newMode: false,
            coffeeShops: [],
            reviews: []
        }

    }
    renderMarkers(places) {
        if (places.length === 0) {
            return <View></View>;
        }
        return places.map((p) => {
            return <MapView.Marker pinColor={"#992e24"}
                key={p.description} title={p.title} coordinate={p.coordinate} description={p.description}></MapView.Marker>
        })

    }
    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            return;
        }
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: false
        });
        this.setState({
            location: location
        })

    }
    fetchPlaces = () => {
        //console.log("key", process.env.GOOGLEMAPS_API_KEY);
        let newArr = this.state.places;
        this.state.coffeeShops.forEach((c) => {
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&radius=400&keyword=${c}&key=${process.env.GOOGLEMAPS_API_KEY}`, {
                methos: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(resp => {
                //console.log(resp);
                return resp.json()

            }).then(resp => {
                console.log(resp);

                resp.results.forEach(r => {
                    newArr.push({
                        title: r.name,
                        description: r.vicinity,
                        coordinate: {
                            latitude: r.geometry.location.lat,
                            longitude: r.geometry.location.lng

                        }
                    });

                })
                console.log("new array in fetchplaces", newArr)

                this.setState({
                    places: newArr
                })

            }).catch(err => {
                console.log(err);
            })

        })
        setTimeout(() => {
            if (newArr.length === 0) {
                Alert.alert("Oops! There is no your frequent coffee shop near you",
                    "Maybe try something new?",
                    [
                        {
                            text: 'Ok', onPress: () => this.setState({
                                modalOpen: true
                            })
                        },
                        {
                            text: "Cancel"
                        }

                    ],
                    { cancelable: false })
            }
        }, 1500);





    }



    componentDidMount() {
        this.getLocation();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({
                places: []
            })
            fetch("http://192.168.1.79:5000/getProfile", {
                method: "GET",
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json"
                }

            }).then(resp => {

                return resp.json();

            })
                .then(resp => {

                    console.log(resp, this.state.places);
                    this.setState({ coffeeShops: resp.coffeeShops })
                    //fetch reviews here

                    fetch("http://192.168.1.79:5000/getAllReviews", {
                        method: "GET",
                        redirect: "follow",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }

                    }).then(resp => {
                        return resp.json();

                    }).then(resp => {

                        console.log(resp);
                        this.setState({
                            reviews: resp
                        })
                    })
                        .catch(err => {
                            console.log(err)
                        })



                }).catch((err) => {
                    console.log(err);

                })
        });







    }


    render() {
        return (



            <Swiper
                nextButton={<View style={{ marginBottom: 20 }}><FontAwesomeIcon size={25} color={"#8b5d5d"} icon={faArrowRight} /></View>}
                prevButton={<View style={{ marginBottom: 20 }}><FontAwesomeIcon size={25} color={"#8b5d5d"} icon={faArrowLeft} /></View>}
                showsButtons={true}
                buttonWrapperStyle={{
                    backgroundColor: 'transparent', flexDirection: 'row',
                    position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 35,
                    paddingVertical: 0, justifyContent: 'space-between', alignItems: "flex-end", marginBottom: 10
                }}
                loop={false}
                showsPagination={false}
                index={1}>
                <View style={styles.pagecontainer}>
                    <Classroom />
                </View>
                <View style={styles.mainContainer}>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalOpen}

                    >
                        <ImageBackground source={{ uri: "https://s3-us-east-2.amazonaws.com/fgwebsitemedia/wp-content/uploads/2017/11/02183222/cafe-lifestyle-photography.jpg" }} style={{ width: '100%', height: '100%' }}>

                            <View style={styles.modalContainer}>
                                <ModalContent setState={this.setState.bind(this)} state={this.state} />
                                <View style={{ flexDirection: "row" }}>
                                    {this.state.newMode
                                        ?
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={() => {

                                                this.setState({
                                                    modalOpen: false
                                                })
                                            }}><Text style={styles.lable}>Find</Text></TouchableOpacity>

                                        :
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={() => {
                                                this.fetchPlaces();
                                                //console.log("places array", this.state.places)
                                                this.setState({
                                                    modalOpen: false
                                                })
                                            }}><Text style={styles.lable}>Find</Text></TouchableOpacity>}
                                    <TouchableOpacity style={styles.modalButton}
                                        onPress={() => {
                                            this.setState({
                                                modalOpen: false
                                            })

                                        }}><Text style={styles.lable}>Cancel</Text></TouchableOpacity>
                                </View>

                            </View>
                        </ImageBackground>


                    </Modal>



                    <MapView style={styles.mapContainer} initialRegion={this.state.region}
                        region={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0062,
                            longitudeDelta: 0.0091,
                        }} >
                        <MapView.Marker
                            coordinate={this.state.location.coords}
                            title="Your Location"
                            description="You are here!"
                            pinColor={"#305f72"}
                        />
                        {this.renderMarkers(this.state.places)}
                    </MapView>


                    <Footer style={{ backgroundColor: "#fff5eb", paddingHorizontal: 15, paddingVertical: 15, height: 200 }}>
                        <FooterTab>
                            <View style={{

                                paddingVertical: 15,
                                alignItems: "center"
                            }}>
                                <Text style={{ fontFamily: "Papyrus", fontSize: 18 }}>Classroom</Text>
                                <FontAwesomeIcon size={30} color={"#8b5d5d"} icon={faSchool} />
                            </View>


                            <TouchableOpacity
                                style={{
                                    marginBottom: 10,
                                    //borderWidth: 1,
                                    //borderColor: 'rgba(0,0,0,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: 7,
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#aa7070',
                                    borderRadius: 50,
                                }}
                                onPress={() => {
                                    this.setState({
                                        modalOpen: true
                                    })


                                }}>
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: "Chalkduster", color: "white"
                                }}>Find A Coffee Shop</Text>

                            </TouchableOpacity>
                            <View style={{
                                paddingVertical: 15,
                                alignItems: "center"
                            }}>
                                <Text style={{ fontFamily: "Papyrus", fontSize: 18 }}>Community</Text>
                                <FontAwesomeIcon size={30} color={"#8b5d5d"} icon={faUserFriends} />
                            </View>


                        </FooterTab>
                    </Footer>



                </View>
                <View style={styles.pagecontainer}>
                    <Community setState={this.setState.bind(this)} reviews={this.state.reviews} />
                </View>
            </Swiper>





        );
    }

}