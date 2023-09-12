const React = require('react');
const { useState, useEffect } = React;
const axios = require('axios');

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get("/api/data")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			{data ? (
				<div>
					<h1>{data.title}</h1>
					<p>{data.description}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default App;
