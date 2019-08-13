import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from "../styles";

export default class Main extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        //title: "Complete Your Profile",
        headerLeft: <Button title="Logout" onPress={() => {
            fetch("http://192.168.1.79:5000/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(resp => { navigation.navigate('Login') });

        }} />,
    });
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Main page includes Maps</Text>
            </View>
        );
    }

}