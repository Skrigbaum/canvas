import React, { Component } from 'react';
import './Note.css';

class NewNote extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userID: '',
        userName: '',
        name: 'Test',
        email: '',
        phone: '',
        note: 'Best Note ever',
        listView: 'false'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        this.saveNote(event)
        event.preventDefault();
      }
    
      saveNote = async (event) => {
        //circumventing the form passed data
        let noteToSave = {
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          note: this.state.note,
          userId: this.state.userID
        };
    
        const response = await fetch('/api/note', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(noteToSave)
        });
    
        let result = await response.json();
        alert(result.message);
      }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
            <label>
                Who Did you talk to?
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
                Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
                Phone Number:
                <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
            </label>
            <label>
                Notes:
                <textarea name="note" value={this.state.note} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        )
    }

}

export default NewNote;