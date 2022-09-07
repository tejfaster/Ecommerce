import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { useSelector } from "react-redux";
import { hp, wp } from '../helper/helper';

const Cart = () => {
    const { list } = useSelector(item => item.Cart)
    console.log(list)
    return (<>
        {list.length > 0 ?
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                renderItem={item => {
                    const value = item.item
                    return (
                        <View style={styles.container}>
                            <Image source={{ uri: `${value.thumbnail}` }} style={{ height: hp("10"), width: wp('20'), borderRadius: 10 }} />
                            <View>
                                <Text>Title:{value.title}</Text>
                                <Text>Price:{value.price}</Text>
                            </View>

                        </View>
                    )
                }}
            />
            : <Text style={{ alignSelf: 'center', fontSize: hp('5') }}>0 Item in cart</Text>}
    </>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: wp('3'),
        borderWidth: 1,
        marginTop: wp('5'),
        marginHorizontal: wp('5'),
        padding: wp('1'),
        flexDirection: 'row'
    }
})
export default Cart