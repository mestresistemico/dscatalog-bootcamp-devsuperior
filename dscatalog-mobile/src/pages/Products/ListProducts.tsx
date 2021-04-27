import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import  { ProductCard, SearchInput } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { admin, theme, text } from '../../styles';
import { deleteProduct, getProducts } from '../../services';

interface ProductProps {
    setScreen: Function;
    setProductId: Function;
}

const ListProducts: React.FC<ProductProps> = (props) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setScreen, setProductId} = props;

    async function fillProducts() {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setLoading(false);
    };

    function handleEdit(id: number) {
        setProductId(id);
        setScreen("editProduct")
    };

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteProduct(id);
        fillProducts();
        setLoading(false);
    };

    useEffect(() => {
        fillProducts();
    },[]);

    const data = search.length > 0 ?
        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : 
        products;
    return(
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity style={admin.addButton} onPress={() => setScreen("newProduct")}>
            <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            {loading ? (<ActivityIndicator size="large" />) :
            (data.map((product) => (
                <ProductCard 
                {...product} 
                key={product.id} 
                role={"admin"} 
                handleEdit={handleEdit}
                handleDelete={handleDelete}/>
            )))}
        </ScrollView>
    )

}

export default ListProducts;