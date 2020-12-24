let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe("user endpoint", () => {
    
    // get all
    describe("GET /user", () => {
        it("It should GET all the users", (done) => {
            chai.request('http://localhost:3000/user')
                .get('/')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('count');
                    response.body.should.have.property('users');
                done();
                })
        });

        it("It should get an error", (done) => {
            chai.request('http://localhost:3000/users')
                .get('/')
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        });

    });

    // signup user
    describe("POST /user/signup", () => {
        it("It should create new user", (done) => {
            const email = "serhat@serhat.com";
            const username = "sampleUser";
            const password = "abcd1234";
            chai.request('http://localhost:3000/user/signup')
                .post('/')
                .send({ email: email, username: username, password: password })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("User created.");
                done();
                })
        });

        it("It should give an error", (done) => {
            const email = "serhat";
            const username = "sampleUser2";
            const password = "abcd1234";
            chai.request('http://localhost:3000/user/signup')
                .post('/')
                .send({ email: email, username: username, password: password })
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
                done();
                })
        });

    });


    // login user
    describe("POST /user/login", () => {
        it("It should login to user", (done) => {
            const username = "sampleUser";
            const password = "abcd1234";
            chai.request('http://localhost:3000/user/login')
                .post('/')
                .send({ username: username, password: password })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("Auth successful");
                done();
                })
        });

        it("It should not login to user", (done) => {
            const username = "sampleUser";
            const password = "abcd12345";
            chai.request('http://localhost:3000/user/login')
                .post('/')
                .send({ username: username, password: password })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("Auth failed");
                done();
                })
        });

    });

});

