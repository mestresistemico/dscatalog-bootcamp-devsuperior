import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal, Image, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors, text, theme } from '../../styles';
import arrowBack from '../../assets/arrowBack.png';
import Products from './ListProducts';
import { api, createProduct, getCategories } from '../../services';
import Toast from 'react-native-tiny-toast';

interface ProductProps {
    setScreen: Function;
}

const FormProduct: React.FC<ProductProps> = (props) => {
    const { setScreen } = props;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: 0,
        categories: [],
    });

    function handleSave() {
        !edit && newProduct();
    }

    async function newProduct() {
        setLoading(true);
        const cat = replaceCategory();
        const data = {
            ...product, categories: [
                { id: cat },
            ]
        };
        try {
//            console.warn("Produto a salvar: ", data);
            await createProduct(data);
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

    useEffect(() => {
        loadCategories();
    }, []);


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

                        <TextInput
                            placeholder="Preço"
                            value={product.price}
                            onChangeText={(e) => setProduct({ ...product, price: parseInt(e) })}
                            style={theme.formInput} />

                        <TouchableWithoutFeedback style={theme.uploadBtn}>
                            <Text style={text.uploadText}>
                                Carregar imagem
                            </Text>
                        </TouchableWithoutFeedback>

                        <Text style={text.fileSize}>As imagens devem estar no formato JPG ou PNG e não devem ultrapassar 5Mb.</Text>

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