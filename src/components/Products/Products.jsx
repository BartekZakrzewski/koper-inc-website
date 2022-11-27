import React, { useState, useRef} from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './Product/FieldInput';
import emailjs  from "emailjs-com";

import Product from "./Product/Product";
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
    const [status, setStatus] = useState(null);
    const classes = useStyles();

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();

    const methods = useForm();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env['REACT_APP_SERVICE_ID'], process.env['REACT_APP_TEMPLATE_ID'], e.target, process.env['REACT_APP_USER_ID'])
        .then(res => {
            if(res.text == 'OK') setStatus("Wyslano pomyslnie");
            setTimeout(() => setStatus(null), 700);

            input1.current.value = '';
            input2.current.value = '';
            input3.current.value = '';
        }, err => {
            console.log(err.text);
            setStatus("Blad");
            setTimeout(() => setStatus(null), 700)
        });
    }

    return (
        <main className={classes.content}>
            <div className="welcome-page">
                <div className="cover-img" />
                <a href="#sklep" style={{all: "unset", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button variant="primary" className="welcome-button" style={{fontWeight: 700, fontSize: "2rem", width: "30%", backgroundColor: "#121212", border: "3px solid #121212", transition: "all 200ms ease", color: "#fff"}}>Sklep</Button>
                </a>
                <a href="#kontakt" className="kontakt-btn">
                    <Typography variant="h4">
                        Kontakt
                    </Typography>
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
            <div className={classes.toolbar} id="kontakt"/> 
            <FormProvider {...methods}>
                <form className="contact-form" onSubmit={sendEmail}>
                    <div className={classes.toolbar} />
                    <Typography variant="h3" gutterBottom>
                        Napisz do nas!
                    </Typography>
                    <div className="container">
                        <div className="inputs">
                            <FormInput required name="form_name" label="Name" inpref={input2}/>
                            <FormInput required name="form_email" label="Email" inpref={input3}/>
                        </div>
                        <div className="textarea">
                            <textarea name="html_message" className="area" rows={30} required ref={input1} />
                            <div className="text" />
                        </div>
                        <input type="submit" value="Send" className="submit" />
                        <Typography variant="subtitle6">
                            <div className={`${status == "Wyslano pomyslnie" && 'succ' || status == "Blad" && 'unsucc'}`}>
                                { status }
                            </div>
                        </Typography>
                    </div>
                </form>
            </FormProvider>
        </main>
    );
}

export default Products