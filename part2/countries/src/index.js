import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const api_key = process.env.REACT_APP_API_KEY
console.log(api_key)

ReactDOM.render(
 <App api_key={api_key}/>,
 document.getElementById('root')
);

