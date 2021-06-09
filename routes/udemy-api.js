let express = require('express');
let router = express.Router();

const fs = require('fs');
const bent = require('bent')

const getJSON = bent('json')

router.get('/', async (req, res, next) => {
	console.log(req.query.search);

	if (!req.query.search) return res.send({error: "Search query required (i.e. ...?search=data+structures)"})
	
	let udemyRes = await getJSON(getQuery(req.query.search), {}, getHeaders())
		.catch(e => {
			console.log(`Error fetching Udemy courses: ${e}`);
			res.send({ error: e });
		});
	
	console.log(udemyRes);
	if (!udemyRes) return res.send({ error: "Result is undefined" });

	res.status(200).send({results: udemyRes.results});
})

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

module.exports = router;