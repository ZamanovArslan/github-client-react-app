import React from 'react';
import Alert from '@material-ui/lab/Alert';
import styles from './assets/App.module.css';

const ErrorMessage = ({error}) => (
	<div className={[styles.error, styles.danger].join(' ')}>{error.toString()}</div>
);

export default ErrorMessage;
