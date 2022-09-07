import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ImageBackground } from 'react-native'
import { hp, wp } from '../helper/helper'
import { useDispatch } from "react-redux";
import { AddItemToCart } from '../redux/action/cart'

const Product = ({ route, navigation }) => {
    const { item } = route.params
    const dispatch = useDispatch()
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.navigate("Home")}>
                    <Text style={{ fontSize: hp("3") }}>←</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4'), alignSelf: 'center' }} numberOfLines={1}>{item.title}</Text>
            </View>
            <FlatList
                data={item.images}
                keyExtractor={item => item}
                horizontal={true}
                renderItem={item => {
                    console.log(item.item)
                    return (
                        <View>
                            <Image source={{ uri: `${item.item}` }} style={styles.image} />
                        </View>
                    )
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <FlatList
                    data={item.images}
                    keyExtractor={item => item}
                    horizontal={true}

                    renderItem={item => {
                        console.log(item.item)
                        return (
                            <View style={styles.dots} />
                        )
                    }}
                />
            </View>

            <View style={{ paddingHorizontal: wp('5') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Price: {item.price}</Text>
                    <Text>Rating: {item.rating}</Text>
                </View>
                <Text style={{ fontSize: hp("2"), marginTop: 10 }}>Description: {item.description}</Text>
                <Text style={{ color: 'red', alignSelf: "center" }}>{item.stock < 50 ? "hurry! only a few items left" : null}</Text>
                <TouchableOpacity
                    onPress={() => dispatch(AddItemToCart(item))}
                    style={{ backgroundColor: 'lightgrey', alignSelf: 'center', padding: 10, borderRadius: 10 }}
                ><Text>Add To Cart</Text></TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    image: {
        width: wp('100'),
        height: hp('60')
    },
    dots: {
        width: wp('2'),
        height: wp('2'),
        backgroundColor: "black",
        marginHorizontal: wp("3"),
        marginTop: hp('1'),
        borderRadius: 20
    },
    backbutton: {

        backgroundColor: "lightgrey",
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('6'),
        width: hp('6'),
        borderRadius: 40,
        margin: 5

    }
})
export default Product