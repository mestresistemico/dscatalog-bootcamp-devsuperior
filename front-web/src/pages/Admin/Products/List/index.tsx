import React, { useEffect, useState, useCallback } from 'react';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import CardLoader from 'pages/Admin/Products/Loaders/ProductCardLoader';

const List = () => {
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create')
    }


    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');
        if (confirm) {
            makePrivateRequest({
                url: `/products/${productId}`,
                method: 'DELETE'
            })
                .then(() => {
                    toast.info('Produto removido com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover produto!');
                });
        }

    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary BTN-LG" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className='admin-list-container'>
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />))
                )}
            </div>
            {productsResponse && (
                <Pagination totalPages={productsResponse.totalPages}
                    onChange={(page: React.SetStateAction<number>) => setActivePage(page)}
                />)}
        </div >
    );
};

export default List;