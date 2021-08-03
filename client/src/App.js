import React from 'react';
import './App.css';
import NewNote from "./components/newNote"
import NoteList from "./components/noteList"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userName: '',
      listView: 'false'
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ userName: res.data.name, userID: res.data.id }))
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

  handleToggleClick() {
    this.setState(state => ({
      listView: !state.listView
    }));
  }



  render() {
    var listView = this.state.listView

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Canvassing App</h1>
          <h2 className="App-Subtitle">Welcome {this.state.userName}</h2>
          <button onClick={this.handleToggleClick}>{listView ? "Note List" : "Add new Note"}</button>
        </header>
        {listView ? <NewNote userID={this.state.userID} /> : <NoteList userID={this.state.userID} />}
      </div>
    );
  }
}

export default App;