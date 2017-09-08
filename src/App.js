import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validations = (validation,value) =>
    {
        switch(validation)
        {
            case "alpha":
                let re = /^[a-zA-Z]|^$/;
                return re.test(value);
                break;
            default:
                return true;
        }

    };

    handleValidation(event) {
        let id = event.target.id;
        let element = document.getElementById(id);
        let validations = element.dataset.validations.split(",");
        let value = event.target.value;
        let isValid = true;
        validations.map((validation) =>
        {
            if(!this.validations(validation,value))
            {
                isValid=false;
                return;
            }
        });

        if(!isValid)
        {
            element.classList.add("red");
        }
        else
        {
            element.classList.remove("red");
        }

    }

    handleChange(event) {
        let id = event.target.id;
        let value = event.target.value;
        this.setState((prevState)=>{prevState[id]=value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let x = [];
        x = document.getElementsByClassName("validation");
        for(let i = 0; i < x.length; i++){
            console.log(x[i].dataset.validation);
        }
    }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                  First Name:
                  <input type="text" id="firstName" value={this.state.firstName} data-validations={["alpha", "number"]} className = "validation" onChange={this.handleChange} onBlur={this.handleValidation} />
              </label>
              <br/>
              <label>
                  Last Name:
                  <input type="text" value={this.state.lastName} id="lastName" data-validations={["alpha", "alpha"]} className = "validation" onChange={this.handleChange} />
              </label>
              <br/>
              <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default App;
