import { makeRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/components/BaseForm';
import React, { useState } from 'react';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
};

type FormEvent = React.ChangeEvent<HTMLInputElement | 
HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({...data, [name]: value}));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/10/73/1073914_console-xbox-series-s_m3_637369732117934972.jpg',
            categories: [{id: formData.category}]
        }
        makeRequest({url: '/products', method: 'POST', data: payload})
        .then(() => {
            setFormData({name: '', category: '', price: '', description: ''});
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input type="text"
                            value={formData.name}
                            name="name"
                            className="form-control mt-5"
                            onChange={handleOnChange}
                            placeholder={"Nome do produto"} />
                        <input type="text"
                            value={formData.price}
                            name="price"
                            className="form-control mt-5"
                            onChange={handleOnChange}
                            placeholder={"Preço"} />
                        <select
                            className="form-control mt-5"
                            value={formData.category}
                            name="category"
                            onChange={handleOnChange}>
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <textarea 
                        className='form-control'
                        name="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        cols={30} rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form;