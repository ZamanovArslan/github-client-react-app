import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import Repositories from '../Repositories'
import styles from '../assets/App.module.css';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 20, after: $cursor) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
            description
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

class SearchBar extends React.Component {
  state = {
    query: "",
  }

  onKeyPress = (e) => {
                      if (e.key === 'Enter') {
                        this.setState({
                          query: e.target.value
                        });
                      }
                    }
  render (){
    const { query } = this.state;
    return (
      <div>
        <div className={styles.search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: styles.inputRoot,
              input: styles.inputInput,
            }}
            color="secondary"
            onKeyPress={(event) => this.onKeyPress(event)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {query && <SearchRepositories organizationName={this.state.query}/>}       
      </div>
      )
    }
}


const SearchRepositories = (props) => {
  const { organizationName } = props
  return (<Query query={GET_REPOSITORIES_OF_ORGANIZATION} variables={{organizationName}} skip={organizationName === ''}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loading />;
        }

        if (error) {
          return <ErrorMessage error={error} />;
        }
        const { organization } = data

        return (<Repositories repositories={organization.repositories}/>)
      }}
    </Query>
  )
}

export default SearchBar;