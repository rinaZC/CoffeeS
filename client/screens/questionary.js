import React from 'react';
import { Text, View, Button, Picker, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import { TextInput } from 'react-native-gesture-handler';



export default class Questionary extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Complete Your Profile",
        // headerRight: <Button title="Login" onPress={() => { navigation.navigate('Login'); }} />,
    });
    constructor(props) {
        super(props);
        this.state = {
            coffeeShops: [],
            milk: "milk",
            sugar: true,
            stay: "stay",
            more: false,
            bean: "light",
            acidity: "dull",
            body: "light",
            aroma: "floweryFruity",
            favDrink: null,
            new: true


        };
        items = [{
            id: 'Starbucks',
            name: 'Starbucks',
        }, {
            id: 'Think Coffee',
            name: 'Think Coffee',
        }, {
            id: 'Birch Coffee',
            name: 'Birch Coffee',
        }, {
            id: 'Gregorys Coffee',
            name: 'Gregorys Coffee',
        }, {
            id: 'Stumptown',
            name: 'Stumptown',
        }, {
            id: 'Joe Coffee Company',
            name: 'Joe Coffee Company',
        }, {
            id: 'Culture Espresso',
            name: 'Culture Espresso',
        }, {
            id: 'Bluestone Lane',
            name: 'Bluestone Lane',
        }];

        radio_props = [
            { label: 'I am good for now', value: 0 },
            { label: 'Ask me more questions', value: 1 }
        ];

    }



    onSelectedItemsChange = coffeeShops => {
        console.log("something went wrong here", coffeeShops);
        console.log(this.state.coffeeShops)

        this.setState({ coffeeShops });

    };

    componentDidMount() {
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
                if (resp.new == "new") {

                } else if (resp.new == "false") {
                    this.setState({
                        new: false
                    })

                } else {
                    console.log(resp);
                    this.setState({
                        coffeeShops: resp.coffeeShops,
                        milk: resp.blackMilk,
                        sugar: resp.sugar,
                        stay: resp.stayTogo,
                        bean: resp.coffeeBeans,
                        acidity: resp.acidity,
                        body: resp.body,
                        aroma: resp.aroma,
                        favDrink: resp.favDrink,
                        new: false
                    })


                }

            })
    }





    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}

                scrollEnabled={true}>
                <View style={{ paddingVertical: 20 }}>
                    <Text style={styles.ttitle}>Questionary</Text>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>1. Frequent Coffee Shops</Text>
                        <View >
                            <MultiSelect
                                styleDropdownMenu={{ height: 80 }}
                                fontSize={18}

                                hideTags
                                items={items}
                                uniqueKey="id"
                                onSelectedItemsChange={this.onSelectedItemsChange}
                                selectedItems={this.state.coffeeShops}
                                selectText="Pick coffee shops you love"
                                searchInputPlaceholderText="Search..."
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#CCC' }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
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
                            <Picker.Item label="With Milk" value="milk" />
                            <Picker.Item label="Black Coffee" value="black" />
                            <Picker.Item label="Both work" value="both" />
                        </Picker>
                    </View>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>3. Sugar?</Text>
                        <Picker
                            selectedValue={this.state.sugar}
                            style={styles.picker}
                            itemStyle={styles.picker}
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
                            itemStyle={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ stay: itemValue })
                            }>
                            <Picker.Item label="Stay" value="stay" />
                            <Picker.Item label="To Go" value="togo" />
                            <Picker.Item label="Depends on my mood" value="both" />
                        </Picker>
                    </View>
                    <View style={styles.questionaryView}>
                        <Text style={styles.questionaryBody}>5.Do you wanna answer more questions?</Text>


                        <View>

                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => {
                                    if (value == 1) {
                                        this.setState({
                                            more: true
                                        })
                                    } else {
                                        this.setState({
                                            more: false
                                        })
                                    }
                                }}
                            />
                        </View>


                    </View>
                    {this.state.more
                        ?
                        <View>
                            <View style={styles.questionaryView}>
                                <Text style={styles.questionaryBody}>6.What kind of beans do you prefer?</Text>
                                <Picker
                                    selectedValue={this.state.bean}
                                    style={styles.picker}
                                    itemStyle={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ bean: itemValue })
                                    }>
                                    <Picker.Item label="Light-roasted" value={"light"} />
                                    <Picker.Item label="Medium-roasted" value={"medium"} />
                                    <Picker.Item label="Dark-roasted" value={"dark"} />
                                </Picker>
                            </View>
                            <View style={styles.questionaryView}>
                                <Text style={styles.questionaryBody}>7.What kind of coffee body do you prefer?</Text>
                                <Picker
                                    selectedValue={this.state.body}
                                    style={styles.picker}
                                    itemStyle={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ body: itemValue })
                                    }>
                                    <Picker.Item label="Light" value={"light"} />
                                    <Picker.Item label="Heavy" value={"heavy"} />

                                </Picker>
                            </View>
                            <View style={styles.questionaryView}>
                                <Text style={styles.questionaryBody}>8.What kind of acidity do you prefer?</Text>
                                <Picker
                                    selectedValue={this.state.acidity}
                                    style={styles.picker}
                                    itemStyle={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ acidity: itemValue })
                                    }>
                                    <Picker.Item label="Dull" value={"dull"} />
                                    <Picker.Item label="Medium" value={"medium"} />
                                    <Picker.Item label="Lively" value={"lively"} />


                                </Picker>
                            </View>
                            <View style={styles.questionaryView}>
                                <Text style={styles.questionaryBody}>9.What kind of coffee aroma do you prefer?</Text>
                                <Picker
                                    selectedValue={this.state.aroma}
                                    style={styles.picker}
                                    itemStyle={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ aroma: itemValue })
                                    }>
                                    <Picker.Item label="Flowery and Fruity" value={"floweryFruity"} />
                                    <Picker.Item label="Nutty and Smoky" value={"nuttySmoky"} />
                                </Picker>
                            </View>
                            <View style={styles.questionaryView}>
                                <Text style={styles.questionaryBody}>10.What's your favorite caffeinated drink?</Text>
                                <TextInput style={{ fontSize: 18 }} onChangeText={(text) => {
                                    this.setState({
                                        favDrink: text
                                    })
                                }} value={this.state.favDrink} placeholder={"Type your answer here..."}></TextInput>
                            </View>
                        </View>

                        :
                        <View />
                    }


                    <View style={styles.questionaryView}>
                        {this.state.new
                            ?
                            <TouchableOpacity style={styles.formButton}
                                onPress={() => {
                                    //save it with fetch
                                    let userID = this.props.navigation.state.params.userID;
                                    fetch("http://192.168.1.79:5000/createCoffeeProfile", {
                                        method: "POST",
                                        redirect: "follow",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: this.state.more
                                            ? JSON.stringify({
                                                more: this.state.more,
                                                userID: userID,
                                                coffeeShops: this.state.coffeeShops,
                                                blackMilk: this.state.milk,
                                                sugar: this.state.sugar,
                                                stayTogo: this.state.stay,
                                                bean: this.state.bean,
                                                acidity: this.state.acidity,
                                                body: this.state.body,
                                                aroma: this.state.aroma,
                                                favDrink: this.state.favDrink
                                            })
                                            : JSON.stringify({
                                                more: this.state.more,
                                                userID: userID,
                                                coffeeShops: this.state.coffeeShops,
                                                blackMilk: this.state.milk,
                                                sugar: this.state.sugar,
                                                stayTogo: this.state.stay,

                                            })
                                    })
                                        .then(resp => {
                                            console.log(resp);
                                            return resp.json();
                                        })
                                        .then(resp => {
                                            console.log(resp);
                                            if (resp._id) {
                                                Alert.alert(
                                                    'You are good to start your coffee journey right now',
                                                    ':) ',
                                                    [
                                                        { text: 'Log In', onPress: () => this.props.navigation.navigate("Login") }

                                                    ],
                                                    { cancelable: false },
                                                );
                                            } else {
                                                alert("something went wrong:(")

                                            }
                                        }).catch(err => {
                                            console.log(err);
                                            alert("something went wrong:(")
                                        })



                                }}
                            ><Text>Submit</Text></TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.formButton}
                                onPress={() => {
                                    //save it with fetch

                                    fetch("http://192.168.1.79:5000/updateCoffeeProfile", {
                                        method: "POST",
                                        redirect: "follow",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: this.state.more
                                            ? JSON.stringify({
                                                more: this.state.more,
                                                coffeeShops: this.state.coffeeShops,
                                                blackMilk: this.state.milk,
                                                sugar: this.state.sugar,
                                                stayTogo: this.state.stay,
                                                bean: this.state.bean,
                                                acidity: this.state.acidity,
                                                body: this.state.body,
                                                aroma: this.state.aroma,
                                                favDrink: this.state.favDrink
                                            })
                                            : JSON.stringify({
                                                more: this.state.more,
                                                coffeeShops: this.state.coffeeShops,
                                                blackMilk: this.state.milk,
                                                sugar: this.state.sugar,
                                                stayTogo: this.state.stay,

                                            })
                                    })
                                        .then(resp => {
                                            console.log(resp);
                                            return resp.json();
                                        })
                                        .then(resp => {
                                            console.log(resp);
                                            //console.log(resp.coffeeShops);
                                            if (resp._id) {
                                                Alert.alert(
                                                    "Success!",
                                                    "",
                                                    [
                                                        { text: 'Back to Main Page', onPress: () => this.props.navigation.navigate("Main") }

                                                    ],
                                                    { cancelable: false },
                                                );
                                            } else {
                                                alert("something went wrong:(")

                                            }
                                        }).catch(err => {
                                            console.log(err);
                                            alert("something went wrong:(")
                                        })



                                }}
                            ><Text>Submit</Text></TouchableOpacity>
                        }

                    </View>
                </View>

            </ScrollView>
        );
    }

}