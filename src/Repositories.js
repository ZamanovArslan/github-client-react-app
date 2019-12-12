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

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  {
    organization(login: "fs") {
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
          }
        }
      }
    }
  }
`;

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

const App = () => (
  <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
    {({ data: { organization }, loading }) => {
      if (loading || !organization) {
        return <div>Loading ...</div>;
      }

      return (
        <Repositories repositories={organization.repositories} />
      );
    }}
  </Query>
);

class Repositories extends React.Component {
  state = {
    selectedRepositoryIds: [],
  };

  toggleSelectRepository = (id, isSelected) => {
    let { selectedRepositoryIds } = this.state;

    selectedRepositoryIds = isSelected
      ? selectedRepositoryIds.filter(itemId => itemId !== id)
      : selectedRepositoryIds.concat(id);

    this.setState({ selectedRepositoryIds });
  };

  render() {
    return (
      <Container maxWidth="md">
        <Typography fontWeight="fontWeightBold" fontFamily="fontFamily" variant="h2" component="h">
          React Github client
        </Typography>
        <RepositoryList
          repositories={this.props.repositories}
          selectedRepositoryIds={this.state.selectedRepositoryIds}
          toggleSelectRepository={this.toggleSelectRepository}
        />
      </Container>
    );
  }
}

const RepositoryList = ({
  repositories,
  selectedRepositoryIds,
  toggleSelectRepository,
}) => (
  <Grid container spacing={3}>

    {repositories.edges.map(({ node }) => {
      const isSelected = selectedRepositoryIds.includes(node.id);

      const rowClassName = ['row'];

      if (isSelected) {
        rowClassName.push('row_selected');
      }

      return (
        <Grid item xs={4} className={rowClassName.join(' ')} key={node.id}>
          <Paper className="paper-item">
            <Typography fontStyle="none">
              <a href={node.url}>{node.name}</a>{' '}
            </Typography>
            <Select
              id={node.id}
              isSelected={isSelected}
              toggleSelectRepository={toggleSelectRepository}
            />{' '}
            <Star id={node.id} viewerHasStarred={node.viewerHasStarred}/>
          </Paper>
        </Grid>
      );
    })}
  </Grid>
);

const Star = ({ id, viewerHasStarred }) => (
  <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
    {starRepository => (
      <Button type="button" onClick={starRepository}>
        { viewerHasStarred ? <StarIcon /> : <StarBorderIcon/> }
      </Button>
    )}
  </Mutation>
);

const Select = ({ id, isSelected, toggleSelectRepository }) => (
  <button
    type="button"
    onClick={() => toggleSelectRepository(id, isSelected)}
  >
    {isSelected ? 'Unselect' : 'Select'}
  </button>
);

export default App;
