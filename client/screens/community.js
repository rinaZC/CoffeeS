import React from 'react';
import { Text, View, Button, TouchableOpacity, Modal, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSmileWink } from '@fortawesome/free-solid-svg-icons'
import styles from "../styles";
import ReviewCard from "../components/reviewCard";
import Compose from "../components/composeReview";


export default class Community extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            modalOpen: false
        }

    }

    componentDidMount() {
        //fetch from database all the reviews sort with time latest to oldes
        //setstate review to be all the reviews----fetch and setState when close the modal
        // to keep getting 
        console.log(this.props.reviews)


    }

    renderReviewCard(reviews) {
        return reviews.map(r => {
            return <ReviewCard profilePicture={r.user.profilePicture} username={r.user.username}
                quote={r.user.quote} coffeeImg={r.img} content={r.content}
                coffeeShop={r.coffeeShop} order={r.order} like={r.like} key={r._id} id={r._id}
                save={false} reload={() => { }} />
        })
    }

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground source={{ uri: "https://brandonscottphoto.co/wp-content/uploads/2017/07/san-francisco-sutro-baths-coffee-shop-engagement-022.jpg" }} style={{ width: 416, height: 150, justifyContent: "flex-start", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={styles.titles}>Community</Text>
                    <TouchableOpacity style={{
                        padding: 2,
                        color: "#fff6da",
                        backgroundColor: '#fae3d9',
                        borderRadius: 2,
                        marginBottom: 5,
                        marginTop: 10
                    }}
                        onPress={() => {
                            this.setState({
                                modalOpen: true
                            })
                        }}
                    >
                        <View style={styles.mainContainer}>
                            <View style={{ flexDirection: "row" }}>


                                <Text style={{ fontFamily: "Papyrus", fontSize: 18 }}>Feeling inspired? </Text>
                                <FontAwesomeIcon icon={faSmileWink} />
                            </View>

                            <Text style={{ fontFamily: "Papyrus", fontSize: 18 }}>Share your coffee review</Text>
                        </View>




                    </TouchableOpacity>
                </ImageBackground>


                <Compose open={this.state.modalOpen} setState={this.setState.bind(this)} setPreState={this.props.setState.bind(this)} />

                <ScrollView style={{ marginBottom: 20 }} horizontal={false}>

                    {this.renderReviewCard(this.props.reviews)}
                </ScrollView>

            </View>









        )
    }
}