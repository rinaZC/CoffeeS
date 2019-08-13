import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from "../styles";
//import Register from "./register";


class Login extends React.Component {
    static navigationOptions = {
        title: "Login"
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
            <View style={styles.container}>
                <Text style={styles.title}>Login Page</Text>
                {/* <Text style={styles.title}>What's up, coffee lover?</Text> */}

                <View style={styles.formField}>
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
                                    this.props.navigation.navigate("Main");
                                }

                            ).catch(
                                err => {
                                    console.log(err);
                                    alert("Incorrect username or password:(")
                                }
                            )
                        }}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("Register");
                    }}
                    >
                        <Text style={styles.formLable}>Click here to sign up!</Text>
                    </TouchableOpacity>




                </View>

            </View>
        );
    }

}

export default Login;