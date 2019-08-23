import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from "../styles";
//import Register from "./register";


class Login extends React.Component {
    static navigationOptions = {
        title: "Login",
        headerLeft: <View />
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    render() {
        return (

            <ImageBackground source={{ uri: "https://d-raw.nl/wp-content/uploads/2019/04/Hudson_Coffee-50-973x1460.jpg" }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.logincontainer}>
                    <Text style={styles.titleLeft}>What's up, </Text>
                    <Text style={styles.titleRight}>Coffee Lover?</Text>
                    <View style={styles.formField}>
                        <Text style={styles.formLable}>Username</Text>
                        <TextInput style={styles.formInput}
                            placeholder="username" value={this.state.username}
                            onChangeText={(text) => { this.setState({ username: text.trim() }) }} />

                        <Text style={styles.formLable}>Password</Text>
                        <TextInput style={styles.formInput} secureTextEntry
                            placeholder="password" value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text.trim() }) }} />

                        <TouchableOpacity style={styles.lformButton}
                            onPress={() => {
                                fetch("http://192.168.1.79:5000/login", {
                                    method: "POST",
                                    redirect: "follow",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        username: this.state.username,
                                        password: this.state.password
                                    })
                                }).then(
                                    resp => {

                                        return resp.json();
                                    }
                                ).then(
                                    resp => {
                                        console.log(resp);
                                        this.props.navigation.navigate("Main", { username: resp.username });
                                    }

                                ).catch(
                                    err => {
                                        console.log(err);
                                        alert("Incorrect username or password:(")
                                    }
                                )
                            }}>
                            <Text style={styles.LbuttonLable}>Login</Text>
                        </TouchableOpacity>
                        <View style={{
                            paddingTop: 285,

                            alignItems: "left"

                        }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate("Register");
                            }}
                            >
                                <Text style={styles.buttomLable}>Not a member?</Text>
                                <Text style={styles.buttomLable}>    Click here to sign up</Text>
                            </TouchableOpacity>
                        </View>




                    </View>
                </View>
            </ImageBackground>







        );
    }

}

export default Login;