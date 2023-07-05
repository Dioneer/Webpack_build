"use strict"
import "@babel/polyfill"
import '@html/index.html';
import '@scss/index.scss';
import '@js/analitics.js';
import '@js/babel';
import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './assets/51-511364_item-skunk-skunk-png';
// import json from '@assets/lk.json'
// import { Small } from '@js/class.js';
// import { Post } from '@js/post.js';
// import image from '@assets/51-511364_item-skunk-skunk-png.jpg';
// import png from '@assets/Screenshot_3.png';
// import xml from '@assets/xml.xml';
// import csv from '@assets/example_quotes.csv';

const App = () => (
	<div>
		<div className="wrapper">
			<div className="container" />
			<div className="">param</div>
			<div className="">purum</div>
			<div className="">purum</div>
		</div>
		<ul>
			<li><a>zxczxc</a></li>
			<li><a>zxczxc</a></li>
			<li><a>zxczxc</a></li>
			<li><a>zxczxc</a></li>
			<li><a>zxczxc</a></li>
		</ul>
		<img alt='logo' src={logo} ></img>
	</div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// const post = new Post('Webpack Post Title', image)
// console.log('Post to string:', post.toString())
// const small = new Small('Hello')
// console.log('Post to JSON:', small.toJSON())

// console.log("JSON", json)
// console.log(JSON.stringify(png))
// console.log(xml)
// console.log(csv)