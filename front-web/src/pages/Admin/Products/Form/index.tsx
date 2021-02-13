import React, { useEffect, useState } from 'react';
import BaseForm from 'pages/Admin/components/BaseForm';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    imgUrl: string;
    description: string;
};


type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();

    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar produto' : 'cadastrar um produto';

    useEffect(() => {
        if (isEditing){
            makeRequest({ url: `/products/${productId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('imgUrl', response.data.imgUrl);
                setValue('description', response.data.description);
            });
        }
    }, [productId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data: data 
        })
        .then(() => {
            toast.info('Produto salvo com sucesso!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar produto!');
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
            title={formTitle}
            >
                <div className="row">
                    <div className="col-6">
                        <div className='margin-bottom-30'>
                            <input type="text"
                                name="name"
                                className="form-control input-base"
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: {value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                    maxLength: {value: 60, message: 'O campo deve ter no máximo 60 caracteres'},
                                })}
                                placeholder={"Nome do produto"} />
                            {errors.name && (
                                <div className='invalid-feedback d-block'>
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className='margin-bottom-30'>
                            <input type="number"
                                name="price"
                                className="form-control input-base"
                                ref={register({ required: "Campo obrigatório" })}
                                placeholder={"Preço"} />
                            {errors.price && (
                                <div className='invalid-feedback d-block'>
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className='margin-bottom-30'>
                            <input type="text"
                                name="imgUrl"
                                className="form-control input-base"
                                ref={register({ required: "Campo obrigatório" })}
                                placeholder={"Endereço da imagem"} />
                            {errors.imgUrl && (
                                <div className='invalid-feedback d-block'>
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='margin-bottom-30'>
                            <textarea
                                className='form-control input-base'
                                name="description"
                                ref={register({ required: "Campo obrigatório" })}
                                placeholder="Descrição"
                                cols={30} rows={10} />
                            {errors.description && (
                                <div className='invalid-feedback d-block'>
                                    {errors.description.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form;