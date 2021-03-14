import React, {useState, useContext} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {useHistory} from 'react-router-dom'
import UserContext from "../../../context/UserContext";
import CardInput from './CardInput';


toast.configure();


export default function SubsForm() {
  const history = useHistory()
  const { userData } = useContext(UserContext);
  const [flag, setFlag] = useState(false)
  
  const [email, setEmail] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  


  

  const handleSubmitSub = async (event) => {

    event.preventDefault();

    
    const cardElement = elements.getElement(CardElement);

    let { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      }
    });

    if(error) {
     
      return;
    }

    setFlag(true)
    let {subError, subscription} = await fetch('http://localhost:5000/users/sub', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        email
      }),
    }).then(r => r.json());

    if(subError) {
      return;
    }


    switch(subscription.status) {
      case 'active':
         await axios.put('http://localhost:5000/users/changeStatus', {id: userData.user.id, subscribed: true, subId: subscription.id})
        history.push("/videos")
        break;


      case 'incomplete':
        const {error} = await stripe.confirmCardPayment(
          subscription.latest_invoice.payment_intent.client_secret,
        )

        if(error) {
          window.alert(error.message)
        
        } else {
          window.alert("Success! Redirecting to your account.")
          
        }
        break;


      default:
        window.alert(`Unknown Subscription status: ${subscription.status}`)
    }
  }

  return flag ? (
  <div className="ui active dimmer">
    <div className="ui text loader">Processing your subscription
  </div>
</div>
  
) 
    : (
      <Card style={{marginTop: '40px'}}>
      <CardContent >
      <CardInput />
      <div className="ui input">
        <input type="text" placeholder="Enter your email here.."  onChange={(e) => setEmail(e.target.value)}
          style={{marginTop: '4px'}}/>
         </div>
        <div >
          <Button variant="contained"  style={{backgroundColor: "#bf8efc", fontSize: "1.1rem",  marginTop: '20px', marginLeft: '100px'}} onClick={handleSubmitSub}>
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

