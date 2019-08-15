import React from 'react';
import { Text, View, Button } from 'react-native';
import { Icon } from "react-native-elements";
import styles from "../styles";
import MapView from 'react-native-maps'
import { Container, Header, Content, Footer, FooterTab } from "native-base";

export default class Main extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Hello",
        headerRight:
            <View style={{ marginRight: 5, marginBottom: 5 }}>
                <Icon

                    name='ios-exit'
                    type="ionicon"
                    onPress={() => {
                        fetch("http://192.168.1.79:5000/logout", {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(resp => { navigation.navigate('Login') });
                    }} />
                <Text>Log out</Text>
            </View>,
        headerLeft: <View style={{ marginLeft: 5, marginBottom: 5 }}>
            <Icon name='ios-menu'
                type='ionicon'></Icon>
            <Text>Menu</Text>
        </View>



    });
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }

    }
    renderMarkers() {
        return this.state.places.map((p) => {
            return <MapView.Marker title={p.title} coordinate={p.coordinate}></MapView.Marker>
        })

    }
    render() {
        return (
            <View style={styles.mainContainer}>


                <MapView style={styles.mapContainer} initialRegion={this.state.region} />

                <Footer>
                    <FooterTab>
                        <Button title={"Classroom"}>

                        </Button>
                        <Button title={"Find A Coffee Shop"}>

                        </Button>

                        <Button title={"Community"}>

                        </Button>
                    </FooterTab>
                </Footer>


            </View>


        );
    }

}