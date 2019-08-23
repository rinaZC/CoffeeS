import React from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import styles from "../styles";
import ReviewCard from "../components/reviewCard"

export default class WishList extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Saved Reviews",

    });
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            load: true


        }
    }
    componentDidMount() {
        this.fetchReviews();

    }

    fetchReviews() {
        fetch("http://192.168.1.79:5000/getSavedReviews", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("prob ", res)
            return res.json()
        })
            .then(res => {
                console.log(res);
                this.setState({
                    reviews: res.result,
                    load: false

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderReviewCard(reviews) {
        return reviews.map(r => {
            return <ReviewCard profilePicture={r.user.profilePicture} username={r.user.username}
                quote={r.user.quote} coffeeImg={r.img} content={r.content}
                coffeeShop={r.coffeeShop} order={r.order} like={r.like} key={r._id} id={r._id} save={true}
                disablelike={true}
                reload={() => { }}
            />
        })
    }

    render() {
        return (
            <View >
                {this.state.load

                    ?
                    <ActivityIndicator size="large" color="#905858" />

                    :
                    <View style={styles.container}>
                        <ImageBackground source={{ uri: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/a022-monikag-9.jpg?w=400&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-1.1.1&s=d44f5e833ff046fc2907d2729fa736f2" }} style={{ width: 420, height: 100, justifyContent: "flex-start", alignItems: "center", paddingVertical: 3 }}>
                            <Text style={styles.tttitle}>Wishlist</Text>
                        </ImageBackground>
                        <ScrollView style={{ marginBottom: 20 }} horizontal={false}>
                            <View>
                                {this.state.reviews.length == 0
                                    ?
                                    <Text style={styles.lable}>You don't have any saved review yet...</Text>


                                    :
                                    this.renderReviewCard(this.state.reviews)

                                }

                            </View>
                        </ScrollView>
                    </View>
                }



            </View>
        )
    }
}