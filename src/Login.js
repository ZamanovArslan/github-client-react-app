import React from 'react';
import Typography from '@material-ui/core/Typography';
import github from './assets/github.png';
import styles from './assets/App.module.css';

export default function Login(props) {
  const github_ouath_url = "https://github.com/login/oauth/authorize?client_id=df9bed1c5e2d07bec7cd&redirect_uri=http://localhost:8080/oauth/redirect"
  
  if(!(fetchTokenFromParams() || localStorage.getItem('accessToken'))){
    return (
      <div className={styles.centered}>
        <img src={github} alt="github" className={styles.github}/>
        <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h3" component="h3">
          <a href={github_ouath_url}>Login with github</a>
        </Typography>
      </div>
  )}else{
    addToken()
    return (
      <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h3" component="h3">
        You successfully logged!
      </Typography>
  )}
}

function addToken(){
  if(!localStorage.getItem('accessToken')){
    localStorage.setItem('accessToken', fetchTokenFromParams());
  }
}

function fetchTokenFromParams(){
  const query = window.location.search.substring(1)
  return query.split('access_token=')[1];
}
