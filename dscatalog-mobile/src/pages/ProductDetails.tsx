import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { text, theme } from '../styles';
import { api } from '../services';
import arrowBack from '../assets/arrowBack.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const ProductDetails = ({ route: { params: { id } } }) => {

    const navigation = useNavigation();

    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: []
    });

    const [loading, setLoading] = useState(false);

    async function loadProductData() {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadProductData();
    }, []);
    /*


    */

    return (
        <View style={theme.detailsContainer}>
            {loading ? (<ActivityIndicator size="large" />) :
                (
                    <View style={theme.detailCard}>
                        <TouchableOpacity style={theme.gobackContainer} onPress={() => navigation.goBack()}>
                            <Image source={arrowBack} />
                            <Text style={text.gobackText}>VOLTAR</Text>
                        </TouchableOpacity>
                        <View>
                            <View style={theme.productImageContainer}>
                                <Image source={{ uri: product.imgUrl }} 
                                style={theme.productImage} />
                            </View>
                            <Text style={text.productDetailsText}>{product.name}</Text>
                        </View>
                        <View style={theme.priceContainer}>
                            <Text style={text.currency}>
                                R$
                            </Text>
                            <Text style={text.productPrice}>
                                {product.price}
                            </Text>
                        </View>
                        <ScrollView style={theme.scrollTextContainer}>
                            <Text style={text.productDescription}>
                                {product.description}
                            </Text>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}

export default ProductDetails;