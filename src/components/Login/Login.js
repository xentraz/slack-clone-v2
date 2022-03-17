// React
import React from 'react';
// Styles
import '../../scss/styles.scss';
// Firebase
import { auth, provider } from '../../firebase';
// Material UI 
import Button from '@mui/material/Button';
import { useStateValue } from '../StateProvider/StateProvider';
import { actionTypes } from '../Reducer/reducer';

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    // Sign in the user here.
    auth
    .signInWithPopup(provider)
    .then(result => {
      console.log(result)
      dispatch({
        type: actionTypes.SET_USER, 
        user: result.user,
      })
    })
    .catch(error => {
      alert(error.message);
    })
    // This pushes into the data layer
  }

  return (
    <div className="login">
      <div className="login-container">
        <img 
        alt=""
        src="https://exchange.icinga.com/seffparker/icinga2-slack-notification/logo"
        /> 
        <h1>Sign in to Xentraz Tech</h1>
        <p>xentraztech.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}
// Firebase uses google level authentication to make it secure
// You can specify your authorized Domains
// The public keys are safe to share

export default Login;