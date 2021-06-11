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
	
	let results = await courseCache.courses.reduce(async (accP, course) => {
		const acc = await accP; // Async function returns a promise... have to await for the previous iteration to continue.

		// If the course name includes the search term, OR If it is part of a relavent track, include it in the results.
		if (course.title.toLowerCase().includes(searchTerm) || (course.tracks != null && course.tracks.find(t => t.toLowerCase().includes(searchTerm)))) {
			
			// Get Udacity course price info.
			const paidCourse = course.metadata && !course.metadata.is_free_course;
			let price_info = paidCourse ?
				{
					upfront_amount: null,
					amount: null,
					upfront_price_string: null,
					price_string: null,
					currency: null
				} : {
					upfront_amount: 0,
					amount: 0,
					upfront_price_string: "Free",
					price_string: "Free",
					currency: null
				}

			const nodeKey = getNodeKey(course.banner_image) || getNodeKey(course.image);
			
			if (nodeKey != null && paidCourse) {

				let pricesRes = await getJSON(coursePriceURL(nodeKey))
					.catch(e => {
						console.log(`Error fetching Udacity course (${course.title}) price info: ${e}`)
					});

				if (pricesRes) {
					let paymentPlans = pricesRes.results[0].payment_plans.upfront_recurring;

					price_info = {
						amount: paymentPlans.recurring_amount.original_amount / 100,
						price_string: paymentPlans.recurring_amount.original_amount_display,
						upfront_amount: paymentPlans.upfront_amount.original_amount / 100,
						upfront_price_string: paymentPlans.upfront_amount.original_amount_display,
						currency: paymentPlans.upfront_amount.currency
					}
				}
			}
			
			// Add course to accumulator
			acc.push({
				name: course.title,
				course_url: `https://www.udacity.com/course/${course.key}`,
				image: course.image != "" ? course.image : course.banner_image, // Possibly an empty string
				short_description: course.short_summary,
				price_info,
			});
		}
		return acc;
	}, Promise.resolve([]))
	results.sort((a, b) => a.price_info.amount - b.price_info.amount);

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
		
	if (!udacityRes) return "Result is undefined.";

	courseCache = { courses: udacityRes.courses, lastUpdate: Date.now() }
}

const getNodeKey = (url) => {
	if (!url) return null;

	const match = url.match(/nd[0-9][0-9][0-9]/);
	if (match == null) return null;
	
	return match[0];
}

module.exports = {
	router,
	getCourseList: searchCourses
};