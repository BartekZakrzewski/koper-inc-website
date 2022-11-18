import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='subtitle1' style={{color: "rgba(255,255,255,0.7)"}}>
            Nie masz jeszczę niczego w koszyku, <Link to="/" className={classes.link}>dodaj teraz!</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                { cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant="h4" style={{color: "rgb(255, 255, 255, 0.7)"}}>
                    Łącznie: { cart.subtotal.formatted_with_symbol }
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Wyczyść Koszyk</Button>
                    <Button component={Link} to="/platnosc" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Zapłać</Button>
                </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Ładowanie...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} style={{color: "#fff"}} variant="h3" gutterBottom>Twój Koszyk</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart