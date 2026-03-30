import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axiosInstance from "../../config/axiosconfig";
import logo from '../../assets/images/logo/LOOInew.png';
import { Eye, EyeOff, Loader } from 'lucide-react';
import './login.css';
import cogoToast from 'cogo-toast';

const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  return null;
};

const validateMobile = (mobile) => {
  if (!mobile) return "Mobile number is required.";
  if (!/^\d{10,15}$/.test(mobile.replace(/[\s\-+()]/g, ''))) return "Please enter a valid mobile number (10–15 digits).";
  return null;
};

const LoginRegister = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", email: "", fullName: "", mobileNumber: "", password: "", passwordConfirm: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name]) setLoginErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errors.email = "Please enter a valid email address.";
    if (!loginForm.password) errors.password = "Password is required.";
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
    if (Object.keys(errors).length > 0) { setLoginErrors(errors); return; }
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/user-login', loginForm);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      cogoToast.success("Welcome back, " + response.data.user.username + "!", { position: "top-right", hideAfter: 3 });
      const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
      setTimeout(() => navigate(lastVisitedPage), 2000);
    } catch (error) {
      const serverMsg = error?.response?.data?.message;
      if (error?.response?.status === 401) {
        cogoToast.error("Incorrect email or password. Please try again.", { position: "top-right" });
        setLoginErrors({ password: "Incorrect email or password." });
      } else if (error?.response?.status === 404) {
        cogoToast.error("No account found with this email.", { position: "top-right" });
        setLoginErrors({ email: "No account found with this email." });
      } else {
        cogoToast.error(serverMsg || "Login failed. Please try again.", { position: "top-right" });
      }
    } finally { setIsLoading(false); }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) setRegisterErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerForm.username.trim()) errors.username = "Username is required.";
    else if (registerForm.username.length < 3) errors.username = "Username must be at least 3 characters.";
    if (!registerForm.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) errors.email = "Please enter a valid email address.";
    if (!registerForm.fullName.trim()) errors.fullName = "Full name is required.";
    const mobileError = validateMobile(registerForm.mobileNumber);
    if (mobileError) errors.mobileNumber = mobileError;
    const passwordError = validatePassword(registerForm.password);
    if (passwordError) errors.password = passwordError;
    if (!registerForm.passwordConfirm) errors.passwordConfirm = "Please confirm your password.";
    else if (registerForm.password !== registerForm.passwordConfirm) errors.passwordConfirm = "Passwords do not match.";
    return errors;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegisterForm();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      cogoToast.error(Object.values(errors)[0], { position: "top-right" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/user-register', {
        username: registerForm.username, email: registerForm.email, fullName: registerForm.fullName,
        mobileNumber: registerForm.mobileNumber, password: registerForm.password, passwordConfirm: registerForm.passwordConfirm,
      });
      cogoToast.success("Registration successful! Please log in.", { position: "top-right" });
      localStorage.setItem("user", JSON.stringify(response.data));
      setRegisterForm({ username: "", email: "", fullName: "", mobileNumber: "", password: "", passwordConfirm: "" });
      setRegisterErrors({});
    } catch (error) {
      const serverMsg = error?.response?.data?.message || error?.response?.data;
      if (typeof serverMsg === "string" && serverMsg.toLowerCase().includes("already exists")) {
        cogoToast.error("An account with this email or username already exists.", { position: "top-right" });
        setRegisterErrors({ email: "Email or username already in use." });
      } else {
        cogoToast.error(typeof serverMsg === "string" ? serverMsg : "Registration failed. Please try again.", { position: "top-right" });
      }
    } finally { setIsLoading(false); }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/facebook`;
  };

  const inputStyle = { borderRadius: '12px' };
  const errorStyle = { color: '#dc3545', fontSize: '12px', marginTop: '4px', marginBottom: '4px', paddingLeft: '4px', display: 'block' };

  const SocialButtons = () => (
    <div className="social-login mt-4">
      <div className="text-center mb-3" style={{ position: 'relative' }}>
        <hr style={{ borderColor: '#ddd' }} />
        <span style={{ background: '#fff', padding: '0 12px', color: '#888', fontSize: '13px', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          or continue with
        </span>
      </div>
      <div className="d-flex gap-2 justify-content-center">
        <button type="button" onClick={handleGoogleLogin} className="social-btn google-btn">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google
        </button>
        <button type="button" onClick={handleFacebookLogin} className="social-btn facebook-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login or Register for LOOI Store." />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item><Nav.Link eventKey="login"><h4>LOGIN</h4></Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="register"><h4>REGISTER</h4></Nav.Link></Nav.Item>
                    </Nav>
                    <Tab.Content>
                      {/* LOGIN */}
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container" style={{ borderRadius: '15px' }}>
                          <div className="login-register-form">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                              <img src={logo} width={80} height={50} alt="Logo" />
                            </div>
                            <form onSubmit={handleLoginSubmit} noValidate>
                              <div className="mb-2">
                                <input style={{ ...inputStyle, borderColor: loginErrors.email ? '#dc3545' : '' }} type="email" name="email" placeholder="Email" value={loginForm.email} onChange={handleLoginChange} />
                                {loginErrors.email && <span style={errorStyle}>⚠ {loginErrors.email}</span>}
                              </div>
                              <div className="password-input-wrapper mb-2" style={{ position: 'relative' }}>
                                <input style={{ ...inputStyle, borderColor: loginErrors.password ? '#dc3545' : '' }} type={showLoginPassword ? "text" : "password"} name="password" placeholder="Password" value={loginForm.password} onChange={handleLoginChange} />
                                <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} style={{ position: 'absolute', right: '10px', top: '30%', background: 'none', border: 'none', cursor: 'pointer' }}>
                                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {loginErrors.password && <span style={errorStyle}>⚠ {loginErrors.password}</span>}
                              </div>
                              <div className="text-center mt-4">
                                <button type="submit" disabled={isLoading} style={{ borderRadius: '12px', backgroundColor: '#007FFF', width: '55%', height: '50px', color: 'white', border: 'none', fontWeight: '600' }}>
                                  {isLoading ? "Loading..." : "LOGIN"}
                                </button>
                              </div>
                            </form>
                            <SocialButtons />
                          </div>
                        </div>
                      </Tab.Pane>

                      {/* REGISTER */}
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container" style={{ borderRadius: '15px' }}>
                          <div className="login-register-form">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                              <img src={logo} width={80} height={50} alt="Logo" />
                            </div>
                            <form onSubmit={handleRegisterSubmit} noValidate>
                              <div className="mb-2">
                                <input style={{ ...inputStyle, borderColor: registerErrors.username ? '#dc3545' : '' }} type="text" name="username" placeholder="Username" value={registerForm.username} onChange={handleRegisterChange} />
                                {registerErrors.username && <span style={errorStyle}>⚠ {registerErrors.username}</span>}
                              </div>
                              <div className="mb-2">
                                <input style={{ ...inputStyle, borderColor: registerErrors.email ? '#dc3545' : '' }} type="email" name="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterChange} />
                                {registerErrors.email && <span style={errorStyle}>⚠ {registerErrors.email}</span>}
                              </div>
                              <div className="mb-2">
                                <input style={{ ...inputStyle, borderColor: registerErrors.fullName ? '#dc3545' : '' }} type="text" name="fullName" placeholder="Full Name" value={registerForm.fullName} onChange={handleRegisterChange} />
                                {registerErrors.fullName && <span style={errorStyle}>⚠ {registerErrors.fullName}</span>}
                              </div>
                              <div className="mb-2">
                                <input style={{ ...inputStyle, borderColor: registerErrors.mobileNumber ? '#dc3545' : '' }} type="tel" name="mobileNumber" placeholder="Mobile Number" value={registerForm.mobileNumber} onChange={handleRegisterChange} />
                                {registerErrors.mobileNumber && <span style={errorStyle}>⚠ {registerErrors.mobileNumber}</span>}
                              </div>
                              <div className="password-input-wrapper mb-2" style={{ position: 'relative' }}>
                                <input style={{ ...inputStyle, borderColor: registerErrors.password ? '#dc3545' : '' }} type={showRegisterPassword ? "text" : "password"} name="password" placeholder="Password (min 8 chars, letters & numbers)" value={registerForm.password} onChange={handleRegisterChange} />
                                <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} style={{ position: 'absolute', right: '10px', top: '30%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                  {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {registerErrors.password && <span style={errorStyle}>⚠ {registerErrors.password}</span>}
                              </div>
                              <div className="password-input-wrapper mb-2" style={{ position: 'relative' }}>
                                <input style={{ ...inputStyle, borderColor: registerErrors.passwordConfirm ? '#dc3545' : '' }} type={showRegisterConfirmPassword ? "text" : "password"} name="passwordConfirm" placeholder="Confirm Password" value={registerForm.passwordConfirm} onChange={handleRegisterChange} />
                                <button type="button" onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)} style={{ position: 'absolute', right: '10px', top: '30%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                  {showRegisterConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {registerErrors.passwordConfirm && <span style={errorStyle}>⚠ {registerErrors.passwordConfirm}</span>}
                              </div>
                              <div className="button-box text-center mt-4">
                                <button type="submit" disabled={isLoading} style={{ borderRadius: '12px', border: 'none', backgroundColor: '#007FFF', width: '55%', height: '50px', color: 'white', fontWeight: '600' }}>
                                  {isLoading ? "Loading..." : "REGISTER"}
                                </button>
                              </div>
                            </form>
                            <SocialButtons />
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
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
