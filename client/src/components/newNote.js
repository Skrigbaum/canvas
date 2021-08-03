import React from 'react';
import './Note.css';

class NewNote extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props)
      this.state = {
        userID: this.props.userID,
        userName: '',
        name: '',
        email: '',
        phone: '',
        note: '',
        listView: 'false'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        let formIsValid = true;
        let errors = [];

        var fields = this.state
         //Email
       if(fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');

          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
             formIsValid = false;
             errors.push("Email is not valid");
           }
        }

        if (!formIsValid) {
          alert(`Errors: ${errors}`)
        } else {
          this.saveNote(event)
          event.preventDefault();
        }
      }
    
      saveNote = async () => {
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