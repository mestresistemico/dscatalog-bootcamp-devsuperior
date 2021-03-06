import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal, Image, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, text, theme } from '../../styles';
import arrowBack from '../../assets/arrowBack.png';
import Products from './ListProducts';
import { api, createProduct, getCategories, imageUpload } from '../../services';
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';

interface ProductProps {
    setScreen: Function;
}

const FormProduct: React.FC<ProductProps> = (props) => {
    const { setScreen } = props;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: " ",
        price: "",
        categories: [],
    });
    const [image, setImage] = useState("");

    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        !result.cancelled && setImage(result.uri);
    }

    async function handleUpload() {
        imageUpload(image).then((res) => {
            const { uri } = res?.data;
            setProduct({ ...product, imgUrl: uri });
        })
    }

    function handleSave() {
        newProduct();
    }

    async function newProduct() {
        setLoading(true);
        const cat = replaceCategory();
        const data = {
            ...product,
            price: getRaw(),
            categories: [
                { id: cat },
            ]
        };
        try {
            await createProduct(data);
            setScreen("products");
            Toast.showSuccess("Produto salvo com sucesso");
        } catch (res) {
            Toast.show("Erro ao salvar: ", res);
        }
        setLoading(false);
    }

    function replaceCategory() {
        const cat = categories.find(
            (category) => category.name === product.categories
        );
        return 1;
        //        return cat.id;
    }

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    }

    function getRaw() {
        const str = product.price;
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
        return res;
    }

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("É necessário permitir acesso à biblioteca de imagens!");
            }
        }
    }, []);

    useEffect(() => {
        image ? handleUpload() : null
    }, [image]);

    return (
        <View style={theme.formContainer}>
            {loading ? <ActivityIndicator size="large" /> :
                <View style={theme.formCard}>
                    <ScrollView>
                        <Modal
                            visible={showCategories}
                            animationType="fade"
                            transparent={true}
                            presentationStyle="overFullScreen">
                            <View style={theme.modalContainer}>
                                <ScrollView contentContainerStyle={theme.modalContent}>
                                    {categories.map(cat => (
                                        <TouchableOpacity style={theme.modalItem}
                                            key={cat.id} onPress={() => {
                                                setProduct({ ...product, categories: cat.name });
                                                setShowCategories(!showCategories);
                                            }}>
                                            <Text>
                                                {cat.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </Modal>

                        <TouchableOpacity style={theme.gobackContainer} onPress={() => setScreen("products")}>
                            <Image source={arrowBack} />
                            <Text style={text.gobackText}>VOLTAR</Text>
                        </TouchableOpacity>

                        <TextInput
                            placeholder="Nome do produto"
                            value={product.name}
                            onChangeText={(e) => setProduct({ ...product, name: e })}
                            style={theme.formInput} />

                        <TouchableOpacity
                            style={theme.selectInput}
                            onPress={() => setShowCategories(!showCategories)}>
                            <Text style={product.categories.length === 0 && { color: colors.lightGray }}>
                                {product.categories.length === 0 ? "Escolha uma categoria" : product.categories}
                            </Text>
                        </TouchableOpacity>

                        <TextInputMask
                            type="money"
                            placeholder="Preço"
                            value={product.price}
                            onChangeText={(e) => setProduct({ ...product, price: (e) })}
                            style={theme.formInput} />

                        <TouchableWithoutFeedback
                            onPress={selectImage}
                            style={theme.uploadBtn}>
                            <Text style={text.uploadText}>
                                Carregar imagem
                            </Text>
                        </TouchableWithoutFeedback>

                        <Text style={text.fileSize}>As imagens devem estar no formato JPG ou PNG e não devem ultrapassar 5Mb.</Text>
                        {
                            image !== "" && (
                                <TouchableOpacity 
                                onPress={selectImage} 
                                activeOpacity={0.9}
                                style={{width: "100%", height: 150, borderRadius: 10, marginVertical: 10,}}>
                                    <Image 
                                    source={{uri: image}} 
                                    style={{width: "100%", height: "100%", borderRadius: 10,}}/>
                                </TouchableOpacity>
                            )
                        }

                        <TextInput
                            multiline
                            placeholder="Descrição"
                            value={product.description}
                            onChangeText={(e) => setProduct({ ...product, description: e })}
                            style={theme.textArea} />

                        <View style={theme.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Deseja cancelar?",
                                        "Os dados inseridos não serão salvos",
                                        [
                                            { text: "Voltar", style: "cancel" },
                                            { text: "Confirmar", onPress: setScreen("products"), style: "default" }
                                        ]
                                    )
                                }}
                                style={theme.cancelBtn}>
                                <Text style={text.deleteTxt}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.saveBtn} onPress={() => handleSave()}>
                                <Text style={text.saveTxt}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    )
}

export default FormProduct;