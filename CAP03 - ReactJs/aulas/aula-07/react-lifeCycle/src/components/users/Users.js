import React, { Component } from 'react';

export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      secondsVisible: 0,
    };
    this.interval = null;
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({ secondsVisible: secondsVisible + 1 });
    }, 1000);

    console.log('componentDidMount de Users.js');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate de Users.js');
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    console.log('componentWillUnmount de Users.js');
  }
  render() {
    const { secondsVisible } = this.state;
    const { users } = this.props;
    return (
      <div>
        <p>Componente Users visivel por: {secondsVisible} Segundos</p>
        {users.map((user) => {
          const { login, name, picture } = user;
          return <p key={login.uuid}>{name.first}</p>;
        })}
      </div>
    );
  }
}
