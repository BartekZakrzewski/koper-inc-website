import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import useStyles from './styles';

import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';


import { commerce } from '../../../lib/commerce';

const steps = ['Dostawa', 'Płatność'];

const Checkout = ({ cart, order, onCaptureCheckout, err }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setChekoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        if(cart.id){
            const generateToken = async () => {
                try{
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
                    setChekoutToken(token);
                } catch (err) {
    
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

    const Confirmation = () => <div>Confirmation</div>

    const Form = () => activeStep === 0 
    ? <AdressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} adress={shippingData.adress} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />;

    return (
        <>
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