import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, adress, backStep, onCaptureCheckout, nextStep, timeout }) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const paymentMethodResponse = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if(paymentMethodResponse.error){
      console.log(paymentMethodResponse.error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: { 
          name: 'Primary', 
          street: adress, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'gway_joPZk8OkAbrRle',
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          }
        }
      }
      onCaptureCheckout(checkoutToken.id, orderData);
      //timeout();
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color="primary">
                  Pay {checkoutToken.subtotal.formatted} zł
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm