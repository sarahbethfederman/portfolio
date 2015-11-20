var data = require('./content.json');

// add next/prev references
(function() {
	var keys = Object.keys(data.projects);
	for (var i = 0; i < keys.length; i++) { 
		// first one
		if (i <= 0) {
			data.projects[keys[i]].next = keys[i+1];
			data.projects[keys[i]].prev = keys[keys.length-1];
		}
		// last one
		else if (i >= keys.length-1) {
			data.projects[keys[i]].next = keys[0];
			data.projects[keys[i]].prev = keys[i-1];
		}
		else {
			data.projects[keys[i]].next = keys[i+1];
			data.projects[keys[i]].prev = keys[i-1];
		}
	}
})();

var router = function(app) {
	app.get('/projects/:slug', function (req, res) {
		var slug = req.params.slug;
		res.render('project', data.projects[slug]);
	});

	app.get('/index', function (req, res) {
		res.render('index', data);
	});

	app.get('/', function (req, res) {
	   res.render('index', data);
	});
};

module.exports = router;