import react from 'react'
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'



const PUBLIC_KEY="pk_test_51M7cPGSH3pcKssZlW38YfD4pVrDgUhRD8DsiCMlxJ9SsqEI3qoB2PDbCIQ5c3cycYF3exfGUoACyhHjGvdRYYAcu00xT4aPTsW"
const StripeTestPromise = loadStripe(PUBLIC_KEY)

export default function stripecontainer(){
    return(
        <Elements stripe={StripeTestPromise}>
                <PaymentForm/>
        </Elements>
    )
}