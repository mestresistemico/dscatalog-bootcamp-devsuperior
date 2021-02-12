import React, { useEffect, useState } from 'react';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import Pagination from 'core/components/Pagination';

const List = () => {
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create')
    }


    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    console.log(productsResponse);

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary BTN-LG" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className='admin-list-container'>
                {productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} />))}
            </div>
            {productsResponse && (
                <Pagination totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={(page: React.SetStateAction<number>) => setActivePage(page)}
                />)}
        </div >
    );
};

export default List;