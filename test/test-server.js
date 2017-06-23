const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');


const should = chai.should();

chai.use(chaiHttp);

describe('BlogPosts', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should list posts on GET', function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);

			const expectedkeys = ['title', 'content', 'author', 'publishDate'];
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys(expectedkeys);
			});
		});
	});
});