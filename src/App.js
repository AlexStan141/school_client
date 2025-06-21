import axios from 'axios';
import { Component } from 'react';

class App extends Component {

  state={
    response: ""
  }

  async componentDidMount() {
    const response = await axios.get("https://school-server-59er.onrender.com")
    this.setState({response: response})
  }

  render(){
    return <p>{response}</p>
  }

}

export default App;
