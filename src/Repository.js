import React from 'react';
import styles from './assets/App.module.css';
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

const GET_REPOSITORY = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      createdAt
      name
      description
      forkCount
      nameWithOwner
    }
  }
`;

export default function Repository(props){
	console.log(props)
	return <Query query={GET_REPOSITORY} variables={props.match.params}>
	  {({ data, loading, error }) => {
	    if (loading) {
	      return <Loading />;
	    }

	    if (error) {
	      return <ErrorMessage error={error} />;
	    }
	    const { repository } = data

	    return <RepositoryInfo repository={repository}/>
	  }}
	</Query>
}

const RepositoryInfo = ({repository}) => {
	return (
		<div>
			<div className={styles.profileTitle}>
				<Typography variant="overline">{repository.name}</Typography>
			</div>
			<div className={styles.userProfile}>
		    <div className={styles.userName}>{repository.createdAt.split("T")[0]}</div>
			  <div className={styles.bio}>
			  	{repository.nameWithOwner}
			  </div>
			    <div className={styles.description}>
			      {repository.description}
			  </div>
			  <ul className={styles.data}>
			    <li>
			    	<Typography variant="overline" className>Forks</Typography>
			      <span className={styles.heart}> {repository.forkCount}</span>
			    </li>
			    <li>
			      <span className={styles.eye}> 853</span>
			    </li>
			    <li>
			      <span className={styles.user}> 311</span>
			    </li>
			 </ul>
			</div>
		</div>)
}