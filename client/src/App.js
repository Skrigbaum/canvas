import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      name: 'Test',
      note: 'Best Note ever'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ userName: res.data.name }))
      .catch(err => console.log(err));
  }


    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Canvassing App</h1>
          <h2 className="App-Subtitle">Welcome {this.state.userName}</h2>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Who Did you talk to?
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" name="name" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="name" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Notes:
            <textarea value={this.state.note} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;