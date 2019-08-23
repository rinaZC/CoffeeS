import React from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import styles from "../styles";
import ReviewCard from "../components/reviewCard";


export default class ManageReviews extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Manage Your Reviews",


    });

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            username: "User",
            load: true
        }
    }

    componentDidMount() {
        this.fetchReviews();
    }

    fetchReviews() {
        fetch("http://192.168.1.79:5000/getUserReview", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"

            }

        }).then(res => {
            console.log(res)
            return res.json()
        })
            .then(res => {
                console.log(res);
                if (res.length > 0) {
                    this.setState({
                        reviews: res,
                        username: res[0].user.username,
                        load: false
                    })

                } else {
                    this.setState({
                        reviews: res,
                        load: false
                    })


                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    renderReviewCard(reviews) {
        return reviews.map(r => {

            return (
                <TouchableOpacity key={r._id} onPress={() => {
                    Alert.alert(
                        'Are you sure you want to delete this review?',
                        'This review will be deleted permanently',
                        [
                            { text: 'Delete', onPress: () => this.deleteReview(r._id) },
                            { text: 'Cancel', onPress: () => { } },
                        ],
                        { cancelable: true },
                    );
                }}>
                    <ReviewCard profilePicture={r.user.profilePicture} username={r.user.username}
                        quote={r.user.quote} coffeeImg={r.img} content={r.content}
                        coffeeShop={r.coffeeShop} order={r.order} like={r.like} id={r._id}
                        disablelike={true} disablesave={true} reload={() => { }} />
                </TouchableOpacity>

            )
        })
    }

    deleteReview(id) {
        fetch("http://192.168.1.79:5000/deleteReview", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })

        }).then(res => res.json()).then(res => {
            console.log(res);
            this.fetchReviews();
            alert("deleted!");
        }).catch(err => {
            console.log(err);
        })

    }

    render() {
        return (
            <View >
                {!this.state.load
                    ?
                    <View style={styles.container}>
                        <ImageBackground source={{ uri: "https://cdn.pixabay.com/photo/2017/10/13/15/29/black-coffee-2847957__340.jpg" }} style={{ width: 420, height: 100, justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 15, paddingVertical: 3 }}>
                            <Text style={styles.tttitle}>{this.state.username}'s Reviews</Text>
                        </ImageBackground>
                        <ScrollView style={{ marginBottom: 20 }} horizontal={false}>
                            <View>
                                {this.state.reviews.length == 0
                                    ?
                                    <Text style={styles.lable}>You don't have any review yet...</Text>


                                    :

                                    this.renderReviewCard(this.state.reviews)

                                }

                            </View>
                        </ScrollView>
                    </View>
                    :
                    <ActivityIndicator size="large" color="#905858" />
                }


            </View>
        )
    }
}