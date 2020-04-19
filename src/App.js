import React from 'react';
import CodeArea from './ReactComponents/CodeArea.js';
import './App.css';

function App() {
	return (
		<div className="container">
			<header>
				<h1 style={{textAlign: "center"}}>App Header</h1>
			</header>
			<div>
				<h1 style={{textAlign: "center"}}>App Body</h1>

				<h3>React Components to Build:</h3>
				<p style={{marginLeft: "0px"}}>Text</p>
				<p style={{marginLeft: "20px"}}>Code</p>
				<p style={{marginLeft: "20px"}}>Headings</p>
				<p style={{marginLeft: "20px"}}>Unordered Lists</p>
				<p style={{marginLeft: "20px"}}>Ordered Lists</p>
				<p style={{marginLeft: "0px"}}>Code Textarea</p>
				<CodeArea />
				<p style={{marginLeft: "0px"}}>Console</p>
				

			</div>
			<footer>
				<h1 style={{textAlign: "center"}}>App Footer</h1>
			</footer>
		</div>
	);
}

export default App;