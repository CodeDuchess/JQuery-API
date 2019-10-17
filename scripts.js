'use strict';

//Clean up API URL to make it easy to configure.
var app = {
		baseUrl : 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/',
		target: 'positions.json',
		params : {
			markdown:true,
			location:'united states',
			page:1,
			count:20
		},
		url : '',
		data : '',
		root : $("#root")
	};
	app.url = app.baseUrl+app.target+'?'+$.param(app.params); //$.param() encodes the params object to be used in the http request.

app.root.append('<div class="container1"></div>'); //Easy way to append inline html to an existing element.
var container1 = $('.container1'); //Reference the newly created element by class using css selectors. You can reference elements by any attribute.


//$.getJSON() is a quick & easy way to retrieve JSON through an http request.
var request = $.getJSON(app.url, function(data) {
	app.data = data; //This executes first
}).done(function() { //This executes second - This is called chaining.
	console.log('[SUCCESS] Found '+app.data.length+' jobs!');
	//$.each() will iterate objects & arrays.
	$.each(app.data, function(index, job) {
		const output = [
			'<div class="card" data-id="">',
			'	<h2>'+job.title.substring(0, 40)+(job.title.length > 40 ? '...':'')+'</h2>',
			'	<h3>'+job.company+'</h3>',
			'	<h4>'+job.type+'</h4>',
			'	<h5>'+job.location+'</h5>',
			'	<p class="job-desc hidden">'+job.description.substring(0, 300)+(job.description.length > 300 ? '...':'')+'</p>',
			'</div>'
		]; // This is one among many ways to build out html. I chose this because it's cheap & clean.
		container1.append(output.join('')); //Join the array into a string & append it to container1.
	});
});

// This will toggle the "hidden" class of the child nodes of any card that you click.
// A cleaner way of showing job details rather than displaying a button.
$(document).on('click', '.card', function() {
	var children = $(this).find('.job-desc');
	children.toggleClass('hidden');
});

