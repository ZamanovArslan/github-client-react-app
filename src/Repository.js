import React from 'react';
import styles from './assets/App.module.css';
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_REPOSITORY = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      createdAt
    }
  }
`;

export default function Repository(props){
	return <Query query={GET_REPOSITORY} variables={{props}}>
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

const RepositoryInfo = () => {
	return (<div><h1 class="title-pen"> User Profile <span>UI</span></h1>
		<div class="user-profile">
			<img class="avatar" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTF_erFD1SeUnxEpvFjzBCCDxLvf-wlh9ZuPMqi02qGnyyBtPWdE-3KoH3s" alt="Ash" />
		    <div class="username">Will Smith</div>
		  <div class="bio">
		  	Senior UI Designer
		  </div>
		    <div class="description">
		      I use to design websites and applications
		      for the web.
		  </div>
		  <ul class="data">
		    <li>
		      <span class="entypo-heart"> 127</span>
		    </li>
		    <li>
		      <span class="entypo-eye"> 853</span>
		    </li>
		    <li>
		      <span class="entypo-user"> 311</span>
		    </li>
		 </ul>
		</div>
	</div>)
}