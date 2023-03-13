import React, { useState } from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles'

const Product = ({ product, onAddToCart, isVisible, ava }) => {
    const [checked, setChecked] = useState(false);
    const classes = useStyles();

    return (
        <Card className={`${classes.root} prod ${isVisible?'prod-visible':'prod-invisible'}`}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" style={{color: "#fff"}} gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" style={{color: "#fff"}}>
                        {
                            ava == 0?"Wyprzedane":
                            `${product.price.formatted} zł`
                        }
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' className={`cutoff-text ${checked && "checked"}`} style={{
                    color: "rgba(255, 255, 255, 0.7)"
                }}/>
                <button className='expand-btn' onClick={() => setChecked(!checked)}>{ checked && "Pokaż mniej" || !checked && "Pokaż więcej" }</button>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                {ava != 0 &&
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)} style={{color: "#fff"}}>
                        <AddShoppingCart/>
                    </IconButton>
                }
            </CardActions>
        </Card>
    )
}

export default Product