import React, { Component, createElement } from 'react';
import { gql, graphql, compose } from 'react-apollo';

class App extends Component {
  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

App.defaultProps = {
  data: {
    loading: true,
  },
};

const personalize = (options = {}) => (WrappedComponent) => {

  const genders = {
    0: 'FEMALE',
    1: 'MALE',
  };

  return class extends Component {

    state = {}

    componentDidMount() {
      setTimeout(() => this.setState({
        person: {
          gender: genders[Math.round(Math.random())],
        },
      }), 1000);
    }

    render() {
      return createElement(WrappedComponent, {
        ...this.props,
        person: this.state.person,
      });
    }
  }
}

export default compose(
  personalize(),
  graphql(
    gql`
    query ($gender: GENDER) {
      people(gender: $gender) {
        id
        name
      }
    }`,
    {
      skip: (ownProps) => {
        console.log('skipping', !ownProps.person);
        return !ownProps.person;
      },
      options: (ownProps) => ({
        gender: ownProps.person.gender,
      }),
    }
  ),
)(App)
