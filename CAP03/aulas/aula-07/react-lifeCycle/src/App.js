import React, { Component } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );

    const json = await res.json();
    this.setState({ users: json.results });
    console.log('componentDidMount de App.js');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate de App.js');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount de App.js');
  }
  handleShowUsers = (status) => {
    this.setState({ showUsers: status });
  };
  render() {
    const { showUsers, users } = this.state;
    return (
      <div>
        <Toggle onToggle={this.handleShowUsers} />
        <hr />
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
