import axios from 'axios';
import { Component } from 'react';

axios.defaults.baseURL = "https://school-server-59er.onrender.com"

class App extends Component {

  state={
    response: ""
  }

  async componentDidMount() {
    const response = await axios.get("/");
    this.setState({response: response});
  }

  render(){
    const {response} = this.state;
    return <p>{response}</p>;
  }

}

export default App;
