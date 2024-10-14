import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axiosInstance from "../../config/axiosconfig";
import logo from '../../assets/images/logo/LOOI-LOGO.png';

const LoginRegister = () => {
  let { pathname } = useLocation();
  let navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: ""
  });

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user-login', loginForm);
      console.log("Login successful", response.data);
      
      // Save the token to localStorage (or sessionStorage)
      localStorage.setItem('token', response.data.token);

      // Redirect user to home or any protected page after login
      navigate('/');
    } catch (error) {
      console.error("Error during login", error.response?.data);
      // Show error message
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user-register', registerForm);
      console.log("Registration successful", response.data);
      setRegisterForm({
        username: "",
        email: "",
        fullName: "",
        password: "",
        passwordConfirm: ""
      });
      // Redirect or show success message
    } catch (error) {
      console.error("Error during registration", error.response?.data);
      // Show error message
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
       
        <div className="login-register-area pt-50 pb-100">
          <div className="container" >
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list ">
                   
                      <Nav.Item>
                        
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      {/* Login Form */}
                      <Tab.Pane eventKey="login">
                        
                        <div className="login-form-container">
                          <div className="login-register-form">
                          <div className="logo-div d-flex justify-content-center align-items-center mb-5">
                        <img src={logo} width={150} height={150}></img>
                        </div>
                            <form onSubmit={handleLoginSubmit}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginForm.email}
                                onChange={handleInputChange}
                                required
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginForm.password}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                              
                              
                              <div className="button-box text-center">
                                <button type="submit" className="text-center">
                                  <span>Login</span>
                                </button>
                              </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                      {/* Register Form */}
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                          <div className="logo-div d-flex justify-content-center align-items-center mb-5">
                        <img src={logo} width={150} height={150}></img>
                        </div>
                            <form onSubmit={handleRegisterSubmit}>
                              <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={registerForm.username}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={registerForm.email}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={registerForm.fullName}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={registerForm.password}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                value={registerForm.passwordConfirm}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <div className="button-box text-center">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
