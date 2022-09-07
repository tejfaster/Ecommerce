import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Modal, Switch } from 'react-native'
import { hp, wp } from '../helper/helper'

const Home = ({ navigation }) => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchData, setSearchData] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const network = async () => {
        try {
            const data = await fetch("https://dummyjson.com/products?limit=100")
            const json = await data.json()
            setData(json.products)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        network()
    }, [])




    const handleSearch = () => {
        let name = String(searchData.toLowerCase().replace(" ", ''))
        let brand = data.filter(item => name == item.brand.toLowerCase().replace(" ", ''))
        let category = data.filter(item => name == item.category.toLowerCase().replace(" ", ''))
        let title = data.filter(item => name == item.title.toLowerCase().replace(" ", ''))
        console.log(name, brand, category)
        if (brand.length > 0) {
            setData2(brand)
        } else if (category.length > 0) {
            setData2(category)
        } else if (title) {
            setData2(title)
        } else if (brand.length === category.length) {
            setData2("")
        }
    }

    // console.log(data.sort((a, b) => a.price - b.price))

    const handlesort = (type, sort) => {
        setModalVisible(!modalVisible)
        console.log(type, sort)
        if (type == "rating") {
            if (sort == "asc") {
                data.sort((a, b) => a.rating - b.rating)
                data2.sort((a, b) => a.rating - b.rating)
            } else {
                data.sort((a, b) => b.rating - a.rating)
                data2.sort((a, b) => b.rating - a.rating)
            }
        }
        if (type == "discount") {
            if (sort == "asc") {
                data.sort((a, b) => a.discountPercentage - b.discountPercentage)
                data2.sort((a, b) => a.discountPercentage - b.discountPercentage)
            } else {
                data.sort((a, b) => b.discountPercentage - a.discountPercentage)
                data2.sort((a, b) => b.discountPercentage - a.discountPercentage)
            }
        }
        if (type == "price") {
            if (sort == "asc") {
                data.sort((a, b) => a.price - b.price)
                data2.sort((a, b) => a.price - b.price)
            } else {
                data.sort((a, b) => b.price - a.price)
                data2.sort((a, b) => b.price - a.price)
            }
        }
    }

    const Sorting = (props) => {
        const { title, onPressUp, onPressDown } = props
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ width: wp("30") }}>{title}</Text>
                <TouchableOpacity onPress={onPressUp} style={styles.button}><Text >⬆</Text></TouchableOpacity>
                <TouchableOpacity onPress={onPressDown} style={styles.button}><Text >⬇</Text></TouchableOpacity>
            </View>
        )
    }
    const handleNavigation = (item) => {
        navigation.navigate("Product", { item: item })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.searchbutton} onPress={() => navigation.navigate("Cart")}>
                    <Text style={{ fontSize: hp("1.3") }}>Cart</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.search}
                    placeholder="Enter any Brand"
                    onChangeText={item => setSearchData(item)}
                />
                <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
                    <Text style={{ fontSize: hp("1.3") }}>Search</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalCenter}>
                            {/* <TouchableOpacity style={styles.cross} onPress={() => setModalVisible(!modalVisible)}><Text>x</Text></TouchableOpacity> */}
                            <Text>Please Select Any one of them</Text>
                            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Text style={{ width: wp("30") }}>Sort</Text>
                                    <Text>Asc</Text>
                                    <Text>des</Text>
                                </View>
                                <Sorting title="Rating" onPressUp={() => handlesort("rating", "asc")} onPressDown={() => handlesort("rating", "des")} />
                                <Sorting title="Discount" onPressUp={() => handlesort("discount", "asc")} onPressDown={() => handlesort("discount", "des")} />
                                <Sorting title="Price" onPressUp={() => handlesort("price", "asc")} onPressDown={() => handlesort("price", "des")} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{ height: hp('100') }}>
                {
                    loading ?
                        <Text>Data is loading...</Text> :
                        <FlatList
                            data={data2.length > 0 ? data2 : data}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={item => {
                                const value = item.item
                                return (
                                    <TouchableOpacity style={styles.subContainer} onPress={() => handleNavigation(value)}>
                                        <Image
                                            source={{ uri: `${value.thumbnail}` }}
                                            style={styles.image}
                                        />
                                        <Text style={styles.title} numberOfLines={1} >{value.title}</Text>
                                        <Text style={styles.price}>Price:{value.price}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                }

                <TouchableOpacity style={styles.sort} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{ fontSize: hp("3") }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: wp("2"),
    },
    subContainer: {
        border: 1,
        padding: wp("1"),
        borderRadius: 20
    },
    image: {
        width: wp("46"),
        height: hp("18"),
        borderRadius: 20
    },
    title: {
        fontSize: hp("1.2"),
        width: wp("46"),
    },
    price: {
        fontSize: hp("1.5")
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search: {
        borderWidth: 1,
        width: wp("65"),
        borderRadius: 10,
        paddingHorizontal: wp("5")
    },
    searchbutton: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "lightgrey",
        borderRadius: 10,
        width: wp("14")
    },
    sort: {
        position: 'absolute',
        backgroundColor: "skyblue",
        height: hp("6"),
        width: hp("6"),
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: hp("9"),
        right: wp("2")
    },
    modalView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp("30"),
    },
    modalCenter: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: hp('20')
    },
    cross: {
        position: "absolute",
        right: 10,
        top: 2,
        backgroundColor: "lightgrey",
        height: hp("3"),
        width: hp('3'),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "lightgrey",
        height: hp("3"),
        width: hp('3'),
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20
    }
})

export default Home