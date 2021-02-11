import React from 'react';
import BaseForm from 'pages/Admin/components/BaseForm';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

type FormState = {
    name: string;
    price: string;
    imageUrl: string;
    description: string;
};

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/products', method: 'POST', data: data })
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
            <BaseForm title="cadastrar um produto">
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
                                name="imageUrl"
                                className="form-control input-base"
                                ref={register({ required: "Campo obrigatório" })}
                                placeholder={"Endereço da imagem"} />
                            {errors.imageUrl && (
                                <div className='invalid-feedback d-block'>
                                    {errors.imageUrl.message}
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