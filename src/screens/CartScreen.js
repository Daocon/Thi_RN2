import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../redux/actions/sachActions'

const CartScreen = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 25, marginBottom: 30, fontWeight: 'bold' }}>CART</Text>
                </View>
                {cartItems.map((item) => {
                    return (
                        <View>
                            <TouchableOpacity style={{ paddingHorizontal: 20 }} key={item.id} >
                                <Text style={{ fontSize: 16, color: 'black' }}>{item.tieu_de_ph35768}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => dispatch(removeItem(item))} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginHorizontal: 20, fontSize: 20 }}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => dispatch(addItem(item))} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10 }}></View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({})