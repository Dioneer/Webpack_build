"use strict"
import '@babel/polyfill';
import './index.html';
import './index.scss';
const path = require('path');

class Post {
	constructor(title) {
		this.title = title
		this.date = new Date()
	}
	toString() {
		return JSON.stringify({
			title: this.title,
			date: this.date.toJSON()
		})
	}
}

const post = new Post('Webpack Post Title')
console.log('Post to string:', post.toString())
console.log(path.join(path.resolve(), '/src'))