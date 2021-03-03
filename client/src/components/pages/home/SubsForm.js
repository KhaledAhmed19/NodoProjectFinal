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
  
  const [email, setEmail] = useState('');

  const stripe = useStripe();
  const elements = useElements();


  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
     
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      toast(result.error, { type: "error" });
    } else {
      const res = await axios.post('http://localhost:5000/users/sub', {'payment_method': result.paymentMethod.id, 'email': email});
      const {client_secret, status} = res.data;
      
      

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            toast(result.error, { type: "error" });
          } else {
            toast("Success! Check email for details", { type: "success" });
            history.push("/videos")
            
          }
        });
      } else {
        toast("Success! Check email for details", { type: "success" });
        await axios.put('http://localhost:5000/users/changeStatus', {id: userData.user.id, subscribed: true})
        history.push("/videos")
        
      }
      
    }
  };

  return (
    <Card style={{marginTop: '40px'}}>
      <CardContent >
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          autoComplete="off"
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div >
          <Button variant="contained"  style={{backgroundColor: "#bf8efc", fontSize: "1.1rem",  marginTop: '20px', marginLeft: '100px'}} onClick={handleSubmitSub}>
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

