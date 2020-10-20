import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Spinner from "./Spinner";
import { registerUser } from "../services/userServices";
import { loginWithJwt } from "./../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().min(3).required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await registerUser(this.state.data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: "35vw" }}>
        <h1 className="mb-5 font-weight-bolder" style={{ textAlign: "center" }}>
          Register
        </h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
