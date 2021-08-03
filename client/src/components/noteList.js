import React from 'react';

class NoteList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userID: this.props.userID,
        notes: []
      };
    }

    componentDidMount() {
      this.callBackendAPI()
        .then(res => {
          console.log(res)
          this.setState({notes: res.data})
        })
        .catch(err => console.log(err));
    }
  
    callBackendAPI = async () => {
      const response = await fetch(`/api/notes/${this.state.userID}`);
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  

    render() {
      var notes = this.state.notes;

        return (
          <ul>
            {notes?.map((value, index) => {
              return <li id={index}>
                <button onClick={() => alert("To be implemented")}>Edit Note</button>
                  <div>
                    <ul><b>Name:</b> {value.name}</ul>
                    <ul><b>Phone Number:</b> {value.phoneNumber}</ul>
                    <ul><b>Email:</b> {value.email}</ul>
                    <ul><b>Note from discussion with:</b> {value.note}</ul>
                  </div>
                </li>
            })}
          </ul>
        );
      }

}

export default NoteList;