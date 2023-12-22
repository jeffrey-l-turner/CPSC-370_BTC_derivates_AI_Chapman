const React = require('react');
const ReactDOM = require('react-dom');
const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
const dom = new JSDOM('<h1>Hello, world!</h1>', { virtualConsole });
const document = dom.window.document;

const element = React.createElement('div', null, 'Hello, world!');

const Button = () => {
  return (React.createElement('button', null, 'Click me!'));
};

const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement);