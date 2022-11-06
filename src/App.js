import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [err, setErr] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const res = await commerce.cart.add(productId, quantity);

        setCart(res);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const res = await commerce.cart.update(productId, { quantity });

        setCart(res);
    }

    const handleRemoveFromCart = async (productId) => {
        const res = await commerce.cart.remove(productId);

        setCart(res);
    }

    const handleEmptyCart = async () => {
        const res = await commerce.cart.empty();

        setCart(res);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (err) {
            setErr(err.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route path='/' element={
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    } />
                    <Route path='/koszyk' element={
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    } />
                    <Route path='/platnosc' element={
                        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} err={err} />
                    } />
                </Routes>
            </div>
        </Router>
    )
}

export default App
