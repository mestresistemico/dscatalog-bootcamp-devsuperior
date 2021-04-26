import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchInput, ProductCard} from '../../components';
import { deleteProduct, getProducts } from '../../services';
import { theme, admin, text } from '../../styles';

interface ProductProps {
    setScreen: Function;
}

const Products: React.FC<ProductProps> = (props) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setScreen} = props;


    async function fillProducts() {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setLoading(false);
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

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity style={admin.addButton} onPress={() => setScreen("newProduct")}>
            <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput placeholder={"Nome do produto"} search={search} setSearch={setSearch}/>
            {loading ? (<ActivityIndicator size="large" />) :
            (data.map((product) => (
                <ProductCard {...product} key={product.id} role={"admin"} handleDelete={handleDelete}/>
            )))}
        </ScrollView>
    )
}

export default Products;