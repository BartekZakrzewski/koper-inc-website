import React from "react";
import { Button, Grid } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className="welcome-page">
                <div className="cover-img" />
                <a href="#sklep" style={{all: "unset", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button variant="outlined" className="welcome-button" style={{color: "#121212", fontWeight: 700, fontSize: "2rem", width: "30%", border: "3px solid #121212", transition: "all 200ms ease"}}>Sklep</Button>
                </a>
                <a href="#kontakt" className="kontakt-btn">
                    Kontakt
                </a>
            </div>
            <div className={classes.toolbar} id="sklep" /> 
            <Grid container justify="center" spacing={4} style={{padding: "0 .5rem 0 .5rem"}}>
                { products.map( product => (
                    <Grid item key={ product.id } xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                )) }
            </Grid>
        </main>
    );
}

export default Products