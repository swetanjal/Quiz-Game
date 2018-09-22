import React, { Component } from 'react';
import './EditQuestion.css';

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Quiz_id: "",
        Q_No: "",
        Q: "",
        OptA: "",
        OptB: "",
        OptC: "",
        OptD: "",
        A_correct: 0,
        B_correct: 0,
        C_correct: 0,
        D_correct: 0,
      },
      data : {},
      a : 0,
      b : 0,
      c : 0, 
      d : 0,
      submitted: false,
    }
    this.handleqChange = this.handleqChange.bind(this);
    this.handleoptAChange = this.handleoptAChange.bind(this);
    this.handleoptBChange = this.handleoptBChange.bind(this);
    this.handleoptCChange = this.handleoptCChange.bind(this);
    this.handleoptDChange = this.handleoptDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChangeA = this.handleOptionChangeA.bind(this);
    this.handleOptionChangeB = this.handleOptionChangeB.bind(this);
    this.handleOptionChangeC = this.handleOptionChangeC.bind(this);
    this.handleOptionChangeD = this.handleOptionChangeD.bind(this);
  }
  componentDidMount(){
      this.state.formData.Quiz_id = parseInt(this.props.match.params.id);
      this.state.formData.Q_No = parseInt(this.props.match.params.no);
      const request = new Request(`http://localhost:8080/get/question/${this.props.match.params.id}/${this.props.match.params.no}`);
      fetch(request)
      .then(response => response.json())
        .then((data) => {
                    this.setState({a : data["a_correct"]});
                    this.setState({b : data["b_correct"]});
                    this.setState({c : data["c_correct"]});
                    this.setState({d : data["d_correct"]});
                    this.state.formData.Q = data["q"];
                    this.state.formData.OptA = data["opta"];
                    this.state.formData.OptB = data["optb"];
                    this.state.formData.OptC = data["optc"];
                    this.state.formData.OptD = data["optd"];
                    this.state.formData.A_correct = data["a_correct"];
                    this.state.formData.B_correct = data["b_correct"];
                    this.state.formData.C_correct = data["c_correct"];
                    this.state.formData.D_correct = data["d_correct"];
                    this.setState({data : data});                  
      });
  }
  handleSubmit (event) {
    event.preventDefault();
    this.state.formData.A_correct = this.state.a;
    this.state.formData.B_correct = this.state.b;
    this.state.formData.C_correct = this.state.c;
    this.state.formData.D_correct = this.state.d;
    fetch(`http://localhost:8080/edit/question/${this.state.formData.Quiz_id}/${this.state.formData.Q_No}`, {
        method : 'PUT', 
        body : JSON.stringify(this.state.formData),
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
            alert("Question updated successfully.");
            this.props.history.push('/');
            window.location.reload();
        }
      })
  }
  handleqChange(event) {
    this.state.formData.Q = event.target.value;
  }
  handleoptAChange(event) {
    this.state.formData.OptA = event.target.value;
  }
  handleoptBChange(event) {
    this.state.formData.OptB = event.target.value;
  }
  handleoptCChange(event) {
    this.state.formData.OptC = event.target.value;
  }
  handleoptDChange(event) {
    this.state.formData.OptD = event.target.value;
  }
  handleOptionChangeA(event){
    var cnt = 0;
    if(this.state.a == 1)
        cnt = 0;
    else
        cnt = 1;
    this.setState({a : cnt});
  }

  handleOptionChangeB(event){
    var cnt = 0;
    if(this.state.b == 1)
        cnt = 0;
    else
        cnt = 1;
    this.setState({b : cnt});
  }

  handleOptionChangeC(event){
    var cnt = 0;
    if(this.state.c == 1)
        cnt = 0;
    else
        cnt = 1;
    this.setState({c : cnt});
  }

  handleOptionChangeD(event){
    var cnt = 0;
    if(this.state.d == 1)
        cnt = 0;
    else
        cnt = 1;
    this.setState({d : cnt});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Question #{this.props.match.params.no} for Quiz {this.props.match.params.id}</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" defaultValue={this.state.formData.Q} onChange={this.handleqChange}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" defaultValue={this.state.formData.OptA} onChange={this.handleoptAChange}/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" defaultValue={this.state.formData.OptB} onChange={this.handleoptBChange}/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" defaultValue={this.state.formData.OptC} onChange={this.handleoptCChange}/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" defaultValue={this.state.formData.OptD} onChange={this.handleoptDChange}/>
            </div>
            <div>
                <label><input type = "checkbox" checked = {this.state.a} name = "A_correct" onChange = {this.handleOptionChangeA}/>A</label><br/>
                <label><input type = "checkbox" checked = {this.state.b} name = "B_correct" onChange = {this.handleOptionChangeB}/>B</label><br/>
                <label><input type = "checkbox" checked = {this.state.c} name = "C_correct" onChange = {this.handleOptionChangeC}/>C</label><br/>
                <label><input type = "checkbox" checked = {this.state.d} name = "D_correct" onChange = {this.handleOptionChangeD}/>D</label><br/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              Question Added successfully.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default EditQuestion;