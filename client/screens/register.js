import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Register page includes questionary</Text>

                <Text style={styles.title}>Register Page</Text>
                {/* <Text style={styles.title}>What's up, coffee lover?</Text> */}

                <View style={styles.formField}>
                    <Text style={styles.formLable}>Email</Text>
                    <TextInput style={styles.formInput}
                        placeholder="email" value={this.state.email}
                        onChangeText={(text) => { this.setState({ email: text }) }} />

                    <Text style={styles.formLable}>Username</Text>
                    <TextInput style={styles.formInput}
                        placeholder="username" value={this.state.username}
                        onChangeText={(text) => { this.setState({ username: text }) }} />

                    <Text style={styles.formLable}>Password</Text>
                    <TextInput style={styles.formInput}
                        placeholder="password" value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text }) }} />

                    <TouchableOpacity style={styles.formButton}
                        onPress={() => {
                            Alert.alert(
                                'Got a minute to complete your coffee profile?',
                                ':)',
                                [
                                    { text: 'Ask me later', onPress: () => this.props.navigation.navigate("Login") },
                                    // {
                                    //     text: 'Cancel',
                                    //     onPress: () => console.log('Cancel Pressed'),
                                    //     style: 'cancel',
                                    // },
                                    { text: 'OK, I will do it now', onPress: () => this.props.navigation.navigate("Questionary") },
                                ],
                                { cancelable: false },
                            );
                        }}>

                        <Text>Register</Text>
                    </TouchableOpacity>





                </View>


            </View>
        );
    }

}