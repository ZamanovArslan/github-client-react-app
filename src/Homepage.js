import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from "react-router-dom";

const Homepage = () => (
  <Typography>
    Hello, {localStorage.getItem('accessToken')}
  </Typography>
);

export default Homepage;
