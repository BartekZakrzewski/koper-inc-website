import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';

import useStyles from './styles';

import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';


import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Dostawa', 'Płatność'];

const Checkout = ({ cart, order, onCaptureCheckout, err }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setChekoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    //const [isFinished, setFinished] = useState(false);
    const classes = useStyles();
    const history = useNavigate();

    useEffect(() => {
        if(cart.id){
            const generateToken = async () => {
                try{
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
                    setChekoutToken(token);
                } catch (err) {
                    history('/');
                }
            }
    
            generateToken();
        }
    }, [cart]);

    const nextStep = () => setActiveStep(prevStep => prevStep + 1);
    const backStep = () => setActiveStep(prevStep => prevStep - 1);

    const next = data => {
        setShippingData(data);

        nextStep();
    }

    /*const timeout = () => {
        setTimeout(() => {
            setFinished(true);
        }, 10000)
    }*/

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Dziękujemy za zakup, {order.customer.firstname}!</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type='button'>Strona Główna</Button>
        </>
    ) : 
    /*isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Dziękujemy za zakup!</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type='button'>Strona Główna</Button>
        </>
    ) : */
    (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(err) {
        <>
            <Typography variant='h5'>Error: {err}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type='button'>Strona Główna</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AdressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} adress={shippingData.adress} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />;

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align="center">Płatność</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout