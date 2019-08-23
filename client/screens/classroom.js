import React from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView, Alert, Linking, ImageBackground } from 'react-native';
import { Card, Icon } from "react-native-elements";
import styles from "../styles";

export default class Classroom extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: "https://data.whicdn.com/images/330090564/large.jpg" }} style={{ width: 420, height: 150, justifyContent: "flex-start", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={styles.titleclass}>Classroom</Text>
                    <TouchableOpacity style={{
                        padding: 2,
                        color: "#fff6da",
                        backgroundColor: '#fae3d9',
                        borderRadius: 2,
                        marginBottom: 5,
                        marginTop: 10
                    }}
                        onPress={() => {
                            Linking.openURL('mailto:rinachen207@gmail.com')
                        }}
                    >
                        <View style={styles.mainContainer}>

                            <Text style={{ fontFamily: "Papyrus", fontSize: 18, textAlign: "center" }}>Recommend Coffee Articles{'\n'}That You Like</Text>
                        </View>




                    </TouchableOpacity>
                </ImageBackground>
                <ScrollView style={{ marginTop: 10 }}>


                    <Card
                        title='BASIC COFFEE KNOWLEDGE'
                        image={require('./img1.jpg')}>
                        <Text style={{ marginBottom: 12, fontFamily: "Palatino-Roman" }}>
                            Coffee books are important source of knowledge and inspiration for baristas.
                            Here is the list of my favorite coffee books and publications that I especially
                            recommend for baristas that are looking for basic knowledge level...
                    </Text>
                        <Button
                            onPress={() => {
                                Linking.openURL("https://www.baristainstitute.com/blog/ulla-suoraniemi/may-2018/reading-tips-baristas-basic-coffee-knowledge")
                                    .catch((err) => console.error('An error occurred', err));
                            }}

                            color="#974949"
                            title='Read more...' />

                    </Card>
                    <Card
                        title='8 Words Every Coffee Lover Should Know'
                        image={{ uri: "https://cdn.shopify.com/s/files/1/0271/7209/files/woman_tattoo_coffee_cup_blog.jpg?v=1483548024" }}>
                        <Text style={{ marginBottom: 12, fontFamily: "Palatino-Roman" }}>
                            There are two types of coffee lovers in this world: those who drink it and those who live it. If you don't know where you stand, what it all comes down to is how you talk about it. Do you say foam or crema? </Text>
                        <Button
                            onPress={() => {
                                Linking.openURL("https://www.deathwishcoffee.com/blogs/news/8-words-for-coffee-lovers-1")
                                    .catch((err) => console.error('An error occurred', err));
                            }}

                            color="#974949"
                            title='Read more...' />

                    </Card>


                    <Card
                        title='10 WAYS To GROW YOUR SPECIALTY COFFEE KNOWLEDGE'
                        image={require('./img2.jpg')}>
                        <Text style={{ marginBottom: 12, fontFamily: "Palatino-Roman" }}>
                            You’re new to specialty coffee? You just started digging deeper into all the flavors,
                            the gear and the fun, but don’t know how to move on? How to grow your coffee
                        knowledge? What to read, what to buy, where to go?</Text>
                        <Button
                            onPress={() => {
                                Linking.openURL("https://melscoffeetravels.com/10-ways-to-grow-your-specialty-coffee-knowledge/")
                                    .catch((err) => console.error('An error occurred', err));
                            }}

                            color="#974949"
                            title='Read more...' />

                    </Card>

                    <Card
                        title='Quick + Easy AeroPress Coffee Brewing Guide'
                        image={{ uri: "https://cdn.trendhunterstatic.com/thumbs/coffee-scale.jpeg" }}>

                        <Text style={{ marginBottom: 12, fontFamily: "Palatino-Roman" }}>
                            We know that coffee quality is the result of countless decisions—from plant varieties and agricultural inputs to roasting and brewing methods. Years spent pursuing coffee perfection have led to experimentation, innovation, and constant collaboration with our partners, from growers to baristas. We created these resources to share what we've learned.</Text>
                        <Button
                            onPress={() => {
                                Linking.openURL("https://counterculturecoffee.com/learn/resource-center/quick-easy-aeropress-coffee-brewing-guide")
                                    .catch((err) => console.error('An error occurred', err));
                            }}

                            color="#974949"
                            title='Read more...' />

                    </Card>


                </ScrollView>



            </View>
        )
    }

}