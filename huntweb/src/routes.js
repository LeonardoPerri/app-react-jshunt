import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

const Routes = () => (
    // BrowserRouter - Indica que estamos utilizando as rotas a partir de um browser;
    <BrowserRouter>
    {/* Switch é quem fará o match, fornecendo apenas uma rota única por requisição; */}
        <Switch>
            {/* 'exact faz com que apenas chamadas com a rota '/' exata chamada, retorne a rota default */}
            <Route exact path='/' component={Main} />
            <Route path='/products/:id' component={Product} />
        </Switch>
    </BrowserRouter>
);

export default Routes;