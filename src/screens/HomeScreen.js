import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/actions/sachActions'

const HomeScreen = ({ navigation }) => {
    const url_API = "http://10.0.2.2:3000/Sach"
    const [listData, setlistData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const fetchData = async () => {
        fetch(url_API)
            .then((response) => response.json())
            .then((json) => {
                setlistData(json)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const gotoCart = () => {
        navigation.navigate('CartScreen')
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 25, marginBottom: 30, fontWeight: 'bold' }}>Home</Text>
            </View>
            <FlatList
                data={listData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOpenModal(item)} style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>{item.ma_sach_ph35768}</Text>
                                <Text>{item.tieu_de_ph35768}</Text>
                            </View>
                            <TouchableOpacity onPress={() => dispatch(addItem(item))}>
                                <Image
                                    source={require('../../assets/cart.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Button title="Go to Cart" onPress={gotoCart} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.ma_sach_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.tieu_de_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.tac_gia_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.nam_xuat_ban_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.so_trang_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.the_loai_ph35768}</Text>
                        <Text style={styles.modalText}>{selectedItem && selectedItem.so_luong_ph35768}</Text>
                        <Image source={{ uri: selectedItem && selectedItem.hinh_anh_ph35768 }} style={{ width: 100, height: 100 }} />
                        <Text style={styles.modalText}>{selectedItem && selectedItem.don_gia_ph35768}</Text>
                        <Button title="Close" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})