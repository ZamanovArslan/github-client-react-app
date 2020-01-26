import React from 'react';
import gql from 'graphql-tag';
import Repositories from './Repositories';
import Typography from '@material-ui/core/Typography';
import styles from './assets/App.module.css';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from "@material-ui/core/Link";
import GitHubIcon from '@material-ui/icons/GitHub';

import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer{
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
            description
            createdAt
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

const FETCH_USER_DATA = gql`
  query { 
    viewer { 
      login
      company
      avatarUrl
      createdAt
      bio
      url
    }
  }
`;

const Profile = () => (
  <div>
    <ProfileInfo/>
    <UserRepositories/>
  </div>
);

const UserRepositories = () => {
  return (<Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
      {({ data, loading, error }) => {
        const { viewer } = data

        if (loading && !viewer) {
          return <Loading />;
        }

        return (<Repositories repositories={viewer.repositories}/>)
      }}
    </Query>
  )
}

function ProfileInfo() {
  return (<Query query={FETCH_USER_DATA}>
    {({ data, loading, error, fetchMore }) => {
      const { viewer } = data;
      if (loading && !viewer) {
        return <Loading />;
      }

      if (error) {
        return <ErrorMessage error={error} />;
      }
      return (
        <div className={styles.userProfileInfo}>
          <span className={styles.profileTitle}>
            <Typography variant="overline" >
              {viewer.login}{' '}
            </Typography>
          </span>
          <Grid container>
            <Grid item xs={3}>
              <img src={viewer.avatarUrl} alt={viewer.login} width="300"/>
            </Grid>

            <Grid item xs={7}>
              <Paper className={styles.paperItem}>
              <List>
                <ListItem>
                  <Typography variant="overline">
                    Created at: {viewer.createdAt.split('T')[0]}
                  </Typography>
                  
                </ListItem>

                <ListItem>
                  <Typography variant="overline">
                    Company: {viewer.company}
                  </Typography>
                </ListItem>
                
                <ListItem>
                  <Typography variant="body2">
                    {viewer.bio}
                  </Typography>
                </ListItem>

                <ListItem>
                  <Link href={viewer.url} color="inherit" underline="none"> 
                    <GitHubIcon/>
                  </Link>
                </ListItem>
               </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }}
  </Query>)
}

export default Profile;