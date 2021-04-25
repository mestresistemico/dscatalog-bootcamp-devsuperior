import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';

interface ProductProps {
    id: Number;
    imgUrl: ImageSourcePropType;
    name: String;
    price: Number;
    role?: String;
}


const ProductCard: React.FC<ProductProps> = ({ id, imgUrl, name, price, role }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={theme.productCard} onPress={() =>
            navigation.navigate("ProductDetails", {id})
        }>
            <Image source={{uri: imgUrl}} style={theme.productImg}/>
            <View style={theme.productDescription}>
                <Text style={text.productName}>
                    {name}
                </Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>
                        R$
                </Text>
                    <Text style={text.productPrice}>
                        {price}
                    </Text>
                </View>
                {
                    role === "admin" && (
                        <View style={theme.buttonContainer}>
                            <TouchableOpacity style={theme.deleteBtn}>
                                <Text style={text.deleteTxt}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.editBtn}>
                                <Text style={text.editTxt}>Editar</Text>
                            </TouchableOpacity>
                            </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )

}

export default ProductCard;