import React from 'react';
import Typography from '@material-ui/core/Typography';
import github from './assets/github.png';
import styles from './assets/App.module.css';

function Login(props) {
  if(!localStorage.getItem('accessToken')){
  return (
    <div className={styles.centered}>
      <img src={github} alt="github" className={styles.github}/>
      <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h3" component="h3">
        <a href="https://github.com/login/oauth/authorize?client_id=df9bed1c5e2d07bec7cd&redirect_uri=http://localhost:8080/oauth/redirect">Login with github</a>
      </Typography>
    </div>
  )}else{
    return (
      <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h3" component="h3">
        You already logged
      </Typography>
  )}
}
export default Login;
