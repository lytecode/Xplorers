const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("POST /users", () => {
  it("Should not register a user if one of the fields is missing", () => {
    const newUser = {
      email: "chnaman@fcb.com",
      password: "12345"
    };

    chai
      .request(app)
      .post("/api/users")
      .send(newUser)
      .end((err, res) => {
        res.should.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("code");
        res.body.should.have.property("msg");
      });
  });

  it("should register a user if all fields are present", () => {
    const newUser = {
      name: "Sergio",
      email: "messi@fcb.com",
      password: "messi55"
    };
    chai
      .request(app)
      .post("/api/users")
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.boody.should.be.a("object");
        res.body.should.have.property("code");
        res.body.should.have.property(user).a("object");
        done();
      });
  });
});
