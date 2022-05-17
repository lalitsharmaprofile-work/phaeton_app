import React, { Component } from 'react'
import logos from './logos.svg'
import './App.css'
import * as cryptography from '@liskhq/lisk-cryptography';

class App extends Component {
  state = {
    count: 'loading...'
  }

  componentDidMount = async () => {
    const { count } = await window.fetch(`/api/count`).then(res => res.json())
    this.setState({ count })
  }

  increment = async () => {
    const { count } = await window
      .fetch(`/api/count/increment`, { method: 'POST' })
      .then(res => res.json())
    this.setState({ count })
  }

  getData = async () =>{
    const decryptedMessage = cryptography.decryptMessageWithPassphrase(
      'd019692bc66cd8a3f06425d71aecccac7301e4f1aaaf2bf9d725bd',
      'cd9aecb885fb9b89d2b3bdda26773ae7f93d852f9c56ddb1',
      'robust swift grocery peasant forget share enable convince deputy road keep cheap',
      '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f'
    );
    console.log("data", decryptedMessage);
    return <p>1</p>
  }
  render() {
    return (
      <div className="App">
        hello 
        <button onClick = {this.getData}>Click</button>
      </div>
    )
  }
}

export default App
