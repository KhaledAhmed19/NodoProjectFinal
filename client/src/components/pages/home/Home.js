import React, { useContext} from "react";
import { Link } from "react-router-dom";
import SubsForm from './SubsForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const stripePromise = loadStripe("pk_test_51INgaAISGLv8KvGgynGBcbRgWNtlK3dzL4JU5VPfms6fVk9Axthh9D8tYL8AwwCXkniv7GajYIuFhGW3epCHSTDD00eCyB0X1m");
export default function Home() {
  const { userData } = useContext(UserContext);
  return (
    <div className="page">
      {userData.user ? (
        <div>
         <Elements stripe={stripePromise}>
          <SubsForm />
      </Elements>
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
