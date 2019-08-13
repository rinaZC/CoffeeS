import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from "../styles";

export default class Questionary extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Complete Your Profile",
        headerLeft: <Button title="Login" onPress={() => { navigation.navigate('Login'); }} />,
    });
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Questionary</Text>
            </View>
        );
    }

}