import React, { useContext} from "react";
import SubsForm from './SubsForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
const stripePromise = loadStripe("pk_test_51INgaAISGLv8KvGgynGBcbRgWNtlK3dzL4JU5VPfms6fVk9Axthh9D8tYL8AwwCXkniv7GajYIuFhGW3epCHSTDD00eCyB0X1m");

export default function Home() {
  
  
  
  
  return (
    <div className="page">
        <div>
         <Elements stripe={stripePromise}>
         <SubsForm />
      </Elements>
        </div>
    </div>
  );
}
