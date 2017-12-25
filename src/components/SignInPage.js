import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { GITHUB_CLIENT_ID, GRAPHCOOL_TOKEN_KEY } from '../constants';

class SignInPage extends React.Component {
   state = {
      loading: false,
      error: '',
   };

   componentDidMount() {
      const query = queryString.parse(this.props.location.search);

      if (query.code) {
         this.signInUser(query.code);
      }
   }

   signInUser = async githubCode => {
      try {
         this.setState({ loading:true });

         const response = await this.props.authenticateUserMutation({
            variables: { githubCode },
         });

         localStorage.setItem(
            GRAPHCOOL_TOKEN_KEY,
            response.data.authenticateUser.token,
         );

         this.props.history.replace('/');
      } catch (error) {
         this.setState({ loading: false, error });
      }
   };

   goToGithubAuthPage = () => {
      window.location = this.getGithubAuthUrl();
   };

   getGithubAuthUrl = () => {
      const query = queryString.stringify({
         client_id: GITHUB_CLIENT_ID,
      });

      return query;
   };

   render() {
      const { loggedInUserQuery } = this.props;

      if (loggedInUserQuery.loading) {
         return <div>Loading</div>;
      }

      if (loggedInUserQuery.error) {
         console.error(loggedInUserQuery.error);
         return <div>Error</div>;
      }

      const isLoggedIn = 
         loggedInUserQuery.loggedInUser && loggedInUserQuery.loggedInUser.id;

      return isLoggedIn ? (
         <Redirect to="/" />
      ) : (
         <div>
            <h1>Sign In</h1>
            {this.state.loading && 'Loading'}
            {this.state.error && 'Error'}
            <button onClick={this.goToGithubAuthPage}>Sign in with GitHub</button>
         </div>
      );
   }
}

const AUTHENTICATE_USER_MUTATION = gql`
   mutation AuthenticateUserMutation($githubCode: String!) {
      authenticateUser(githubCode: $githubCode) {
         token
      }
   }
`;

const LOGGED_IN_USER_QUERY = gql`
   query LoggedInUserQuery {
      loggedInUser {
         id
      }
   }
`;

export default compose(
   graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' }),
   graphql(LOGGED_IN_USER_QUERY, { name: 'loggedInUserQuery', options: { fetchPolicy: 'network-only' }})
)(SignInPage);
