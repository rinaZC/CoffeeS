import React from 'react';
import { Text, View, Button, Picker, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class Questionary extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Complete Your Profile",
        headerLeft: <Button title="Login" onPress={() => { navigation.navigate('Login'); }} />,
    });
    constructor(props) {
        super(props);
        this.state = {
            coffeeShops: [],
            milk: null,
            sugar: null,
            stay: null,
            more: false,

        };
        radio_props = [
            { label: 'Starbucks', value: 0 },
            { label: 'Culture Expresso', value: 1 }
        ];

    }

    more() {
        return <View><Text>More questions here</Text></View>
    }




    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Questionary</Text>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>1. Frequent Coffee Shops</Text>
                        <View>
                            <Text>needs to change</Text>
                            {/* <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => { this.setState({ value: value.concat(value) }) }}
                            /> */}
                        </View>
                    </View>

                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>2. Black Coffee or With Milk</Text>
                        <Picker
                            selectedValue={this.state.milk}
                            style={styles.picker}
                            itemStyle={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ milk: itemValue })
                            }>
                            <Picker.Item label="Milk Please" value="milk" />
                            <Picker.Item label="Black Coffee" value="black" />
                            <Picker.Item label="Both work" value="both" />
                        </Picker>
                    </View>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>3. Sugar?</Text>
                        <Picker
                            selectedValue={this.state.sugar}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ sugar: itemValue })
                            }>
                            <Picker.Item label="Yes Please!" value={true} />
                            <Picker.Item label="No Never!" value={false} />
                        </Picker>
                    </View>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>4.Stay or To Go?</Text>
                        <Picker
                            selectedValue={this.state.stay}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ stay: itemValue })
                            }>
                            <Picker.Item label="Stay" value="stay" />
                            <Picker.Item label="To Go" value="togo" />
                            <Picker.Item label="Depend on my mood" value="both" />
                        </Picker>
                    </View>
                    {this.state.more
                        ? (this.more())
                        :
                        (<TouchableOpacity style={styles.formButton}
                            onPress={() => {
                                //save it with fetch
                                Alert.alert(
                                    'You are good to start your coffee journey right now',
                                    'But do you wish to tell us more about your coffee preference? :) ',
                                    [
                                        { text: 'Ask me later', onPress: () => this.props.navigation.navigate("Login") },
                                        {
                                            text: 'OK, I will do it now', onPress: () => this.setState({
                                                more: true
                                            })
                                        },
                                    ],
                                    { cancelable: false },
                                );
                            }}
                        ><Text>I'm done!</Text></TouchableOpacity>)
                    }
                </View>

            </ScrollView>
        );
    }

}