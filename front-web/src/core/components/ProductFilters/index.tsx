import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import './styles.scss';
import Select from 'react-select';
import { Category } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    category?: Category;
    handleChangeCategory: (category: Category) => void;
    clearFilters: () => void;
}

const ProductFilters = ({ 
    name, 
    handleChangeName,
    category, 
    handleChangeCategory,
    clearFilters
}: Props) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({
            url: '/categories'
        })
            .then(response => setCategories(response.data.content))
            .catch(() => {
                toast.error('Erro ao carregar categorias!');
            })
            .finally(() => setIsLoadingCategories(false));
    }, []);

    return (
        <div className='card-base product-filters-container'>
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className='form-control'
                    placeholder='Pesquisar produto'
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name='categories'
                value={category}
                key={`select-${category?.id}`}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className='filter-select-container'
                classNamePrefix='product-categories-select'
                placeholder='Categorias'
                isLoading={isLoadingCategories}
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button
                className='btn btn-outline-secondary border-radius-10'
                onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default ProductFilters;