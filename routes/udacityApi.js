let express = require('express');
let router = express.Router();

const bent = require('bent');

const getJSON = bent('json');

const courseListURL = 'https://catalog-api.udacity.com/v1/courses';
const coursePriceURL = (node_id) => `https://braavos.udacity.com/api/prices?anonymous_id=9d2576c0-0ecf-4ac4-9bf8-b47f1b8733bf&currency=USD&node_key=${node_id}`

let courseCache = { courses: [], lastUpdate: 0 };

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
	searchTerm = searchTerm.toLowerCase();
	
	if (Date.now() + 60 * 60 * 1000 > courseCache.lastUpdate) await updateCourseCache();
	
	const results = courseCache.courses.reduce((acc, course) => {
		// If the course name includes the search term, OR If it is part of a relavent track, include it in the results.
		if (course.title.toLowerCase().includes(searchTerm) || (course.tracks != null && course.tracks.find(t => t.toLowerCase().includes(searchTerm)))) {
			// // Get Udacity course price info.
			// const nodeKey = getNodeKey()
			// let pricesRes = await getJSON(coursePriceURL());
			
			acc.push({
				name: course.title,
				url: course.homepage,
				image: course.image != "" ? course.image : course.banner_image, // Possibly an empty string
				short_description: course.short_summary,
				// price_info: course.price_detail
			});
		}
		return acc;
	}, []).sort((a, b) => a.amount - b.amount);

	return {
		results
	};
}

const updateCourseCache = async () => {
	// Get general Udacity course info.
	let udacityRes = await getJSON(courseListURL)
		.catch(e => {
			console.log(`Error fetching Udacity courses: ${e}`);
			return {
				error: e,
				status: 500
			};
		});
	
	courseCache = { courses: udacityRes.courses, lastUpdate: Date.now() }

	if (!udacityRes) return "Result is undefined.";
}

const getNodeKey = (url) => url.match(/nd[0-9][0-9][0-9]/);

module.exports = {
	router,
	getCourseList: searchCourses
};