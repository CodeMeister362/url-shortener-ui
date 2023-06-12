import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls: data.urls}))
  }

  addURL = (newURL) => {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newURL)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: ', response.status);
      } else {
        return response.json();
      }
    })
    .then(data => {
      this.setState(prevState => ({
        urls: [...prevState.urls, data]
      }));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addURL={this.addURL}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
