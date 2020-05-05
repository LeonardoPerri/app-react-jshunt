import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component{

    /*Para trabalharmos com variáveis no react, utilizamos o conceito de state
    onde o método render ficará ouvindo as variáveis desse objeto e recarregará automaticamente
    sempre que houver alteração;*/
    state = {
        products: [],
        productInfo: {},
        page: 1
    };

    //Essa função permite executar algo assim que o componente for carregado em tela;
    componentDidMount(){
        this.loadProducts();
    };

    //É obrigatório o uso de Arrow Functions em funções internas para conseguir trabalhar com o 'this';
    loadProducts = async (page = 1) => {

        const response = await api.get(`/products?page=${page}`);

        //Utilizando Rest Operator
        const { docs, ...productInfo} = response.data;

        this.setState({ products: docs, productInfo, page});
        
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    render(){
        //Fazendo a desestruturação para obter apenas os produtos da state;
        const { products, page, productInfo } = this.state;

    return (
        <div className="product-list">
            {/* Ao trabalhar com lista, devemos definir a key, pois, o react trabalha com o estado 
             e acompanha as alterações dos mesmos;*/}
            {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
            ))}

            <div className="actions">
                <button disabled={page === 1 } onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
            </div>
        </div>
    )
    }
};