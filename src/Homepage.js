import React from 'react';
import Typography from '@material-ui/core/Typography';

const Homepage = () => (
  <Typography>
    Hello, {localStorage.getItem('accessToken')}
  </Typography>
);

export default Homepage;
