import React from 'react';
import Typography from '@material-ui/core/Typography';
import github from './assets/github.png';
import { useParams } from "react-router-dom";
import styles from './assets/App.module.css';

function Logged(props) {
  const query = window.location.search.substring(1)
  const token = query.split('access_token=')[1]

  localStorage.setItem('accessToken', token);
  return (
    <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h3" component="h3">
      You successfully logged! {token}
    </Typography>
  )
}
export default Logged;
