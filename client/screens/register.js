import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
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
            <ImageBackground source={{ uri: "https://d-raw.nl/wp-content/uploads/2019/04/Hudson_Coffee-50-973x1460.jpg" }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.logincontainer}>
                    <Text style={styles.titleRegister}>Welcome Home</Text>
                    {/* <Text style={styles.title}>What's up, coffee lover?</Text> */}

                    <View style={styles.formField}>
                        <Text style={styles.formLable}>Email</Text>
                        <TextInput style={styles.formInput}
                            placeholder="email" value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text.trim() }) }} />

                        <Text style={styles.formLable}>Username</Text>
                        <TextInput style={styles.formInput}
                            placeholder="username" value={this.state.username}
                            onChangeText={(text) => { this.setState({ username: text.trim() }) }} />

                        <Text style={styles.formLable}>Password</Text>
                        <TextInput style={styles.formInput}
                            placeholder="password" value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text.trim() }) }} />

                        <TouchableOpacity style={styles.lformButton}
                            onPress={() => {
                                fetch("http://192.168.1.79:5000/register", {
                                    method: "POST",
                                    redirect: "follow",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: this.state.password
                                    })
                                }).then(resp => resp.json()).then(
                                    resp => {
                                        console.log(resp);
                                        if (resp._id) {
                                            Alert.alert(
                                                'Welcome!',
                                                'Got a minute to complete your coffee profile? :)',
                                                [
                                                    { text: 'Ask me later', onPress: () => this.props.navigation.navigate("Login") },
                                                    { text: 'OK, I will do it now', onPress: () => this.props.navigation.navigate("Questionary", { userID: resp._id }) },
                                                ],
                                                { cancelable: false },
                                            );

                                        } else {
                                            alert("User validation failed");
                                        }

                                    }
                                ).catch(err => {
                                    console.log(err);
                                })


                            }}>

                            <Text style={styles.LbuttonLable}>Register</Text>
                        </TouchableOpacity>





                    </View>


                </View>
            </ImageBackground>
        );
    }

}