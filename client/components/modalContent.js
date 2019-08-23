import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import styles from "../styles";

export default class ModalContent extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     new: false
        // }
        radio_props = [
            { label: 'Stick to My Habits', value: 0 },
            { label: 'Try Something New', value: 1 }
        ];
    }

    render() {
        return (
            <View>

                <View>
                    <Text style={styles.title}>How are you feeling today?</Text>

                    <RadioForm
                        labelStyle={{ fontSize: 20, color: '#33313b', fontFamily: "Palatino-Bold" }}
                        buttonColor={'#34699a'}
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {
                            if (value == 1) {
                                this.props.setState({
                                    newMode: true
                                })
                            } else {
                                this.props.setState({
                                    newMode: false
                                })
                            }
                        }}
                    />
                    {this.props.state.newMode
                        ?
                        <View style={{ marginTop: 35 }}>
                            <Text style={styles.mtitle}>We will recommend you coffee shops that you don't frequent
                             according to your coffee profile.</Text>
                            <Text style={styles.title}>Trust us!{"\n"}We know you well</Text>
                        </View>
                        :
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.mtitle}>We will show all your frequent coffee shops near you.</Text>
                            <Text style={styles.mtitle}>Your frequent coffee shops are:</Text>
                            {this.props.state.coffeeShops.map(c => <Text style={styles.mtitle} key={c}>{c} </Text>)}
                            <Text style={styles.title}>We got you!!</Text>
                        </View>

                    }
                </View>


            </View>



        )
    }
}