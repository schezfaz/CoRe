let express = require('express');
let router = express.Router();

const fs = require('fs');
const bent = require('bent')

const getJSON = bent('json')

router.get('/', async (req, res, next) => {
	const result = await searchCourses(req.query.search);

	if (result.error) {
		res.status(result.status).send(result)
	} else {
		res.status(200).send(result);
	}
});

const searchCourses = async (searchTerm) => {
	if (!searchTerm) return {
		error: "Search query required (i.e. ...?search=data+structures)",
		status: 400
	};
	
	let udemyRes = await getJSON(getQuery(searchTerm), {}, getHeaders())
		.catch(e => {
			console.log(`Error fetching Udemy courses: ${e}`);
			return {
				error: e,
				status: 500
			};
		});
	
	if (!udemyRes) return {
		error: "Result is undefined",
		status: 500
	};

	return { // Have to sort locally because Udemy doesn't seem to do anything with the &ordering=price-low-to-high option.
		results: udemyRes.results.sort((a, b) => a.price_detail.amount - b.price_detail.amount)
	};
}

const getQuery = (searchTerm) => `https://www.udemy.com/api-2.0/courses/?page_size=10&search=${searchTerm}&ordering=price-low-to-high`
const getHeaders = () => {
	const headersList = fs.readFileSync('./headers/udemy').toString().split('\n');
	let headers = {}
	for (const header of headersList) {
		const [key, value] = header.split(': ');
		headers[key] = value;
	}
	return headers;
}

module.exports = {
	router,
	searchCourses
};