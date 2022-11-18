import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const classes = useStyles();

    return (
        <Card style={{background: "#121212"}}>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4" style={{color: "#fff"}}>{item.name}</Typography>
                <Typography variant="h5" style={{color: "#fff"}}>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons} style={{color: "rgba(255,255,255,0.7)"}}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} style={{color: "rgba(255,255,255,0.7)"}}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} style={{color: "rgba(255,255,255,0.7)"}}>+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Usuń</Button>
            </CardActions>
        </Card>
    );
}

export default CartItem