import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuestion extends Component {
  constructor()
  {
  	super();
  	this.state = {
  		data : [],
        id : 0,
  	};
  	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getID = this.getID.bind(this);
  }
  
  handleChange(event) {
  this.setState({
    id: event.target.value
  });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    //alert('http://127.0.0.1:8080/delete/quiz/' + this.state.id);
  	fetch('http://127.0.0.1:8080/delete/question/' + this.state.id, {
  		method : 'DELETE'
      })
  		.then(res => {  
            window.location.reload();
  			console.log(res);
  		})
  }
  getID(a, b) {
      return a + "/" + b;
  }
  componentDidMount() {
    var user = sessionStorage.getItem('username');
    if(user == 'admin'){

    }
    else{
      alert("You are not permitted to view the contents of this page!");
      this.props.history.push('/');
      window.location.reload();
    }
    const request = new Request('http://127.0.0.1:8080/questions');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Question</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Quiz ID</th>
              <th>Question Number</th>
              <th>Question Text</th>
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td><input
               	  		type = "radio"
               	  		value = {this.getID(item.quiz_id, item.q_no)}
               	  		checked = {this.state.id == this.getID(item.quiz_id, item.q_no)}
               	  		onChange={this.handleChange}
               	  	/></td>
                  	<td>{item.quiz_id}</td>
                    <td>{item.q_no}</td>
                    <td>{item.q}</td>
                    </tr>
                )
             })}
          </tbody>
		</table>
		<button type="submit">Delete</button>
		</form>
      </div>
    );
  }
}

export default DeleteQuestion;