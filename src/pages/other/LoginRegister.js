import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axiosInstance from "../../config/axiosconfig";
import logo from '../../assets/images/logo/LOOInew.png';
import { Eye, EyeOff, Loader } from 'lucide-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import cogoToast from 'cogo-toast';


const LoginRegister = () => {
  // let { pathname } = useLocation();
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
  const [isLoading, setIsLoading] = useState(false);


   const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic frontend validation
    if (!loginForm.email || !loginForm.password) {
        cogoToast.error("Please fill in all fields", { position: "top-right" });
        setIsLoading(false);
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
        cogoToast.error("Please enter a valid email address", { position: "top-right" });
        setIsLoading(false);
        return;
    }

    // Password length validation
    if (loginForm.password.length < 6) {
        cogoToast.error("Password must be at least 6 characters long", { position: "top-right" });
        setIsLoading(false);
        return;
    }

    try {
        const response = await axiosInstance.post('/user-login', loginForm);
        
        // Save auth data to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        
        cogoToast.success("Welcome back, " + response.data.user.username + "!", {
            position: "top-right",
            hideAfter: 3
        });

        // Redirect user to home page after successful login
        setTimeout(() => {
            navigate('/');
        }, 2000);

    } catch (error) {
        console.error("Login error:", error);
        
        // Handle different types of errors
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Check for specific message from backend
                    if (error.response.data.message === "User not found") {
                        cogoToast.error("No account found with this email. Please sign up.", { 
                            position: "top-right",
                            hideAfter: 4
                        });
                    } else if (error.response.data.message === "Invalid password") {
                        cogoToast.error("Incorrect password. Please try again.", { 
                            position: "top-right" 
                        });
                    } else {
                        cogoToast.error("Invalid login credentials", { 
                            position: "top-right" 
                        });
                    }
                    break;
                case 404:
                    cogoToast.error("No account found with this email. Please sign up.", { 
                        position: "top-right",
                        hideAfter: 4
                    });
                    break;
                case 429:
                    cogoToast.error("Too many login attempts. Please try again later", { 
                        position: "top-right" 
                    });
                    break;
                case 500:
                    cogoToast.error("Server error. Please try again later", { 
                        position: "top-right" 
                    });
                    break;
                default:
                    cogoToast.error("Login failed. Please try again", { 
                        position: "top-right" 
                    });
            }
        } else if (error.request) {
            cogoToast.error("Network error. Please check your connection", { 
                position: "top-right" 
            });
        } else {
            cogoToast.error("An unexpected error occurred", { 
                position: "top-right" 
            });
        }
    } finally {
        setIsLoading(false);
    }
};


  // const handleInputChange = (e) => {
  //   setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  // };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user-register', registerForm);
      // console.log("Registration successful", response.data);
      cogoToast.success("Registration successful", {position: "top-right"});

    // Save user data in localStorage
    const userData = response.data; // Assuming response.data contains user information
    localStorage.setItem("user", JSON.stringify(userData));
    
      setRegisterForm({
        username: "",
        email: "",
        fullName: "",
        password: "",
        passwordConfirm: ""
      });
      // Redirect or show success message
    } catch (error) {
      cogoToast.error("Error during registration", {position: "top-right"});

    }
  };
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  // Toggle password visibility for register
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  // Toggle confirm password visibility for register
  const toggleRegisterConfirmPasswordVisibility = () => {
    setShowRegisterConfirmPassword(!showRegisterConfirmPassword);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
    
        <div className="login-register-area pt-60 pb-60">
          <div className="container" >
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">

                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list ">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>LOGIN</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>REGISTER</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      {/* Login Form */}
                      <Tab.Pane eventKey="login">

                        <div className="login-form-container" style={{ borderRadius: '15px' }}>
                          <div className="login-register-form">
                            <div className="d-flex justify-content-center align-items-center mb-5">
                              <img src={logo} width={80} height={50} alt="Logo" />
                            </div>
                            <form onSubmit={handleLoginSubmit}>
                              <input
                                style={{ borderRadius: '15px' }}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginForm.email}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                <input
                                  style={{ borderRadius: '15px' }}
                                  type={showLoginPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={loginForm.password}
                                  onChange={handleInputChange}
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={toggleLoginPasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '30%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                              <div className="button-box">
                                <div className="d-flex justify-content-end" style={{ fontSize: '12px' }}>
                                  <Link to="/forget-password">
                                    Forgot Password?
                                  </Link>
                                </div>
                              </div>
                              <div className="text-center mt-5">
                                <button type="submit" className="text-center" style={{ borderRadius: '15px', border: 'none', backgroundColor: '#007FFF', width: '50%', height: '50px', color: 'white' }}>
                                  LOGIN
                                </button>
                              </div>
                              {/* <div className="text-center mt-5">
                                <p>Don't have an account? <Link to="/register">Register</Link></p>
                              </div> */}
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                      {/* Register Form */}
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container" style={{ borderRadius: '15px' }}>
                          <div className="login-register-form">
                          <div className="d-flex justify-content-center align-items-center mb-5">
                              <img src={logo} width={80} height={50} alt="Logo" />
                            </div>
                            <form onSubmit={handleRegisterSubmit}>
                              <input
                                style={{ borderRadius: '15px' }}
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
                                style={{ borderRadius: '15px' }}
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
                                style={{ borderRadius: '15px' }}
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
                              <div className="password-input-wrapper" style={{ position: 'relative' }}>

                                <input
                                  style={{ borderRadius: '15px' }}
                                  type={showRegisterPassword ? "text" : "password"}
                                  // type="password"
                                  id="password"
                                  name="password"
                                  placeholder="Password"
                                  value={registerForm.password}
                                  onChange={(e) =>
                                    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                  }
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={toggleRegisterPasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '30%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                              <input
                                style={{ borderRadius: '15px' }}
                                type={showRegisterConfirmPassword ? "text" : "password"}
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                value={registerForm.passwordConfirm}
                                onChange={(e) =>
                                  setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
                                }
                                required
                              />
                              <button
                                  type="button"
                                  onClick={toggleRegisterConfirmPasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '30%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {showRegisterConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                              <div className="button-box text-center ">
                                <button type="submit" style={{ borderRadius: '15px', border: 'none', backgroundColor: '#007FFF', width: '50%', height: '50px', color: 'white' }}>
                                  REGISTER
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
          {isLoading && (
            <div className="loader-overlay">
              <Loader size={48} className="animate-spin" />
            </div>
          )}
        </div>
        {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} theme="light"  /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
