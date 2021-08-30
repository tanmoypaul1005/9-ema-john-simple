import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SimpleCardForm from './SimpleCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe('pk_test_51JNaAQLMYLBM54aTO9zv15ugKYheb5YgxKUUgCSFkWs9kIfi1DANLjfqgiWIVgKBsmik5YDJVLZUXxh4z6YK7Ess00HgdWtip3');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
<SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
      </Elements>
    );
};

export default ProcessPayment;