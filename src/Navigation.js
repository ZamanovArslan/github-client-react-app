import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import SearchBar from './search/SearchBar';

import styles from './assets/App.module.css';
import * as routes from './constants/routes';

export default function ButtonAppBar(props) {
  return (
    <AppBar position="static" color="primary" className={styles.navbar}>
      <Toolbar>
        <List className={styles.listHorizontalDisplay}>
          <ListItem>
      	   	<Typography variant="h6" className={styles.title}>
      	   	  <Link href={routes.ROOT} color="inherit" underline="none"> Githib client </Link>
      	   	</Typography>
          </ListItem>

          <ListItem>
             <Typography variant="h6" className={styles.title}>
               <Link href={routes.SEARCH} color="inherit" underline="none"> Search </Link>
             </Typography>
          </ListItem>
        </List>
				
        <div className={styles.loginButton}>
        	<AuthButton/>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const AuthButton = () => {
	if(localStorage.getItem("accessToken")) {
		return (
			<Link href={routes.PROFILE} color="inherit" underline="none">
			  <Button color="inherit">Profile</Button>
			</Link>
		)
	}else{
		return (
			<Link href={routes.LOGIN} color="inherit" underline="none">
			  <Button color="inherit">Login</Button>
			</Link>
		)
	}
}