import React from "react";
import { Container, Content, Card, CardItem, Left, Right, Thumbnail, Text, Body, Icon } from "native-base";
import { Image, TouchableOpacity, View } from "react-native"
import styles from "../styles";


export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: props.like,
            likePressed: false,
            savePressed: props.save

        }
    }

    toggleLikePressedValue() {
        let pre = this.state.like;
        if (this.state.likePressed) {
            this.setState({
                likePressed: !this.state.likePressed,
                like: pre - 1

            })

        } else {
            this.setState({
                likePressed: !this.state.likePressed,
                like: pre + 1

            })

        }


    }

    toggleSavePressedValue() {
        this.setState({
            savePressed: !this.state.savePressed

        })

    }


    addReview(id) {
        fetch("http://192.168.1.79:5000/addReviewtoList", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                alert("added successfully!");
            }).catch(err => {
                console.log(err);
            })

    }

    removeReview(id) {
        fetch("http://192.168.1.79:5000/removeReviewfromList", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                alert("removed successfully!");
            }).catch(err => {
                console.log(err);
            })

    }

    render() {
        return (
            // <Container>
            //     <Content>
            <Card style={{ width: 350, paddingHorizontal: 0 }}>
                <CardItem>

                    <Left>
                        <Thumbnail source={{ uri: "http://192.168.1.79:5000/" + this.props.profilePicture }} />
                        <Body>
                            <Text>{this.props.username}</Text>
                            <Text note>{this.props.quote}</Text>
                        </Body>


                    </Left>
                </CardItem>
                <CardItem>

                    <Image source={{ uri: "http://192.168.1.79:5000/" + this.props.coffeeImg }} style={{ width: 300, height: 300 }} />
                </CardItem>
                <CardItem>
                    <View>
                        <View style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.cardBody}>Coffee shop : </Text>
                                <Text style={styles.cBody}>{this.props.coffeeShop}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.cardBody}>Ordered : </Text>
                                <Text style={styles.cBody}>{this.props.order}</Text>
                            </View>




                        </View>
                        <View>
                            <Text style={styles.cardContent}>{this.props.content}</Text>
                        </View>
                    </View>




                </CardItem>

                <CardItem>
                    <View>

                        <TouchableOpacity disabled={this.props.disablelike} onPress={() => {
                            //increase the number of likes
                            //console.log(this.state.likePressed);
                            if (this.state.likePressed) {
                                //cancel like
                                fetch("http://192.168.1.79:5000/dislikeReview", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        id: this.props.id
                                    })
                                }).then(resp => resp.json())
                                    .then(resp => {
                                        console.log(resp);
                                        this.toggleLikePressedValue();

                                    })


                            } else {
                                fetch("http://192.168.1.79:5000/likeReview", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        id: this.props.id
                                    })
                                }).then(resp => resp.json())
                                    .then(resp => {
                                        console.log(resp);
                                        this.toggleLikePressedValue();

                                    })


                            }
                        }}>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="thumbs-up" />
                                <Text> {this.state.like} Likes</Text>
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity disabled={this.props.disablesave}
                            onPress={() => {
                                if (this.state.savePressed) {
                                    this.removeReview(this.props.id);
                                    this.toggleSavePressedValue();
                                    this.props.reload();

                                } else {
                                    this.addReview(this.props.id);
                                    this.toggleSavePressedValue();

                                }

                            }}>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="heart" />
                                {this.state.savePressed ?
                                    <Text>Remove this coffee shop from my Wishlist</Text>

                                    :
                                    <Text>Add this coffee shop to my Wishlist</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>





                </CardItem>
            </Card>



        )
    }
}