import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Btn from '../../Btn/Btn'
import Input from '../../Input/Input'
import Logo from '../../Reuseable/Logo/Logo'
import Footer from '../Footer/Footer'
import './Login.css'
import firebase from 'firebase'
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    pass: '',
    email: ''
  })
  const handleLogin = () =>{
    setErrors({
      pass: '',
      email: ''
    })
    setLoading(false)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      setLoading(false)
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setErrors({
            ...errors,
            email: err.message
          })
        break
        case "auth/user/disabled":
        case "auth/user-not-found":
          setErrors({
            ...errors,
            email: 'Email does not exist'
          })
        break
        case "auth/wrong-password":
          setErrors({
            ...errors,
            pass: 'Incorrect Password'
          })
        break
        default: 
      } 
      setTimeout(()=>{
       setErrors({
         pass: '',
         email: ''
       })
      },4000) 
    })

}
  return (
    <div className="login">
        <div className="loginheader">
          <Logo />
        </div>
        <div className="loginpopup flex">
          <h2>Sign In</h2>
          <div className="signincontrols flex">
            <Input value={email} setValue={setEmail} text='Email or phone number'/>
            <span className='error'>{errors.email}</span>
            <Input type='password' text='Password' value={password} setValue={setPassword}/>
            <span className='error'>{errors.pass}</span>
          </div>
          <div className="btncontrols">
            <Btn text='Sign In' clickEvent={()=> handleLogin()}/>
            <div className="lower flex sb">
            <label htmlFor="" className='flex'>
              <input type="checkbox" style={{backgroundColor: 'red'}}/>
              <small>Remember me</small>
            </label>
            <a href="">
              <small>Need help?</small>
            </a>
            </div>
          </div>
          <div className="fblogin flex">
            <i className='fab fa-facebook-square'></i>
            <small>Login with Facebook</small>
          </div>
          <div className="new flex">
          <span>New to Netflix?</span>
          <Link to='/signup'>Sign up now</Link>
          </div>
          <div className="prot">
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
              <a href="">Learn more.</a>
            </small>
          </div>
        </div>
        <Footer />
    </div>
  )
}
export default Login