import React from 'react';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import styles from './assets/App.module.css';
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export default function Repositories(props){
  const { repositories } = props;

  return (
    <Grid container spacing={3}>
      {repositories.edges.map(({ node }) => {
        const rowClassName = ['row'];

        return (
          <Grid item xs={3} className={rowClassName.join(' ')} key={node.id}>
            <Paper className={styles.paperItem}>
              <Typography className={styles.githubRepositoryTitle} variant="h6">
                <a href={node.url}>{node.name}</a>
              </Typography>
              <Typography variant="body2">
                {node.description}
              </Typography>
              <Typography variant="overline">
                {node.owner.login}
              </Typography>
              <Star id={node.id} viewerHasStarred={node.viewerHasStarred}/>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  )
}

const Star = ({ id, viewerHasStarred }) => (
  <Mutation mutation={viewerHasStarred ? REMOVE_STAR_REPOSITORY : STAR_REPOSITORY} variables={{ id }}>
    {starRepository => (
      <div className={styles.starButton}>
        <Button  type="button" onClick={starRepository} >
        { viewerHasStarred ? <StarIcon /> : <StarBorderIcon/> }        
        </Button>
      </div>
    )}
  </Mutation>
);
