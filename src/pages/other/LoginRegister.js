import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axiosInstance from "../../config/axiosconfig";
import logo from '../../assets/images/logo/LOOInew.png';
import { Loader, Mail, Smartphone, Pencil } from 'lucide-react';
import './login.css';
import cogoToast from 'cogo-toast';

const RESEND_SECONDS = 30;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPhone = (value) => {
  const digits = String(value).replace(/[^\d]/g, '');
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  if (digits.length === 12 && digits.startsWith('91')) return /^[6-9]\d{9}$/.test(digits.slice(2));
  return false;
};

const inputStyle = { borderRadius: '12px' };
const errorStyle = { color: '#dc3545', fontSize: '12px', marginTop: '4px', marginBottom: '4px', paddingLeft: '4px', display: 'block' };

// ─────────────────────────────────────────────────────────────────────────
// One self-contained OTP login/signup panel — used for both the LOGIN and
// REGISTER tabs. `purpose` controls which fields are shown and which API
// flow runs.
// ─────────────────────────────────────────────────────────────────────────
const OtpAuthPanel = ({ purpose, onSuccess }) => {
  const isRegister = purpose === 'register';

  const [channel, setChannel] = useState('email'); // 'email' | 'phone'
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [sentTo, setSentTo] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const validateForm = () => {
    const errs = {};
    if (isRegister) {
      if (!fullName.trim()) errs.fullName = "Full name is required.";
      if (!username.trim()) errs.username = "Username is required.";
      else if (username.trim().length < 3) errs.username = "Username must be at least 3 characters.";
    }
    if (!identifier.trim()) {
      errs.identifier = channel === 'email' ? "Email is required." : "Mobile number is required.";
    } else if (channel === 'email' && !isValidEmail(identifier.trim())) {
      errs.identifier = "Please enter a valid email address.";
    } else if (channel === 'phone' && !isValidPhone(identifier.trim())) {
      errs.identifier = "Please enter a valid 10-digit mobile number.";
    }
    return errs;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      cogoToast.error(Object.values(errs)[0], { position: "top-right" });
      return;
    }
    setErrors({});
    setIsSending(true);
    try {
      const payload = { identifier: identifier.trim(), channel, purpose };
      if (isRegister) {
        payload.fullName = fullName.trim();
        payload.username = username.trim();
      }
      const response = await axiosInstance.post('/send-otp', payload);
      setSentTo(response.data.identifier || identifier.trim());
      setStep('otp');
      setOtp('');
      startCooldown();
      cogoToast.success(`OTP sent to your ${channel === 'email' ? 'email' : 'phone'}.`, { position: "top-right" });
    } catch (error) {
      const status = error?.response?.status;
      const serverMsg = error?.response?.data?.message;
      if (status === 404) {
        cogoToast.error(serverMsg || "No account found. Please register instead.", { position: "top-right" });
        setErrors({ identifier: serverMsg });
      } else if (status === 409) {
        cogoToast.error(serverMsg || "An account already exists. Please login instead.", { position: "top-right" });
        setErrors({ identifier: serverMsg });
      } else if (status === 429) {
        cogoToast.error(serverMsg || "Please wait before requesting another OTP.", { position: "top-right" });
      } else {
        cogoToast.error(serverMsg || "Failed to send OTP. Please try again.", { position: "top-right" });
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length !== 6) {
      setErrors({ otp: "Please enter the 6-digit code." });
      return;
    }
    setErrors({});
    setIsVerifying(true);
    try {
      const response = await axiosInstance.post('/verify-otp', {
        identifier: sentTo, channel, purpose, otp: otp.trim(),
      });
      const { token, user, message } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      if (user.username) localStorage.setItem('username', user.username);
      if (user.email) localStorage.setItem('email', user.email);
      cogoToast.success(message || `Welcome, ${user.username || user.fullName}!`, { position: "top-right", hideAfter: 3 });
      onSuccess();
    } catch (error) {
      const serverMsg = error?.response?.data?.message;
      setErrors({ otp: serverMsg || "Incorrect OTP. Please try again." });
      cogoToast.error(serverMsg || "Incorrect OTP. Please try again.", { position: "top-right" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isSending) return;
    await handleSendOtp({ preventDefault: () => {} });
  };

  const handleChangeIdentifier = () => {
    setStep('form');
    setOtp('');
    setErrors({});
    if (timerRef.current) clearInterval(timerRef.current);
    setCooldown(0);
  };

  // ── Step 1: collect details + identifier, choose channel ──────────────
  if (step === 'form') {
    return (
      <form onSubmit={handleSendOtp} noValidate>
        {isRegister && (
          <>
            <div className="mb-2">
              <input
                style={{ ...inputStyle, borderColor: errors.fullName ? '#dc3545' : '' }}
                type="text" placeholder="Full Name" value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: null })); }}
              />
              {errors.fullName && <span style={errorStyle}>⚠ {errors.fullName}</span>}
            </div>
            <div className="mb-2">
              <input
                style={{ ...inputStyle, borderColor: errors.username ? '#dc3545' : '' }}
                type="text" placeholder="Username" value={username}
                onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: null })); }}
              />
              {errors.username && <span style={errorStyle}>⚠ {errors.username}</span>}
            </div>
          </>
        )}

        <div className="channel-toggle mb-2" role="tablist">
          <button
            type="button"
            className={`channel-toggle-btn ${channel === 'email' ? 'active' : ''}`}
            onClick={() => { setChannel('email'); setIdentifier(''); setErrors({}); }}
          >
            <Mail size={15} /> Email
          </button>
          <button
            type="button"
            className={`channel-toggle-btn ${channel === 'phone' ? 'active' : ''}`}
            onClick={() => { setChannel('phone'); setIdentifier(''); setErrors({}); }}
          >
            <Smartphone size={15} /> Phone
          </button>
        </div>

        <div className="mb-2">
          <input
            style={{ ...inputStyle, borderColor: errors.identifier ? '#dc3545' : '' }}
            type={channel === 'email' ? 'email' : 'tel'}
            placeholder={channel === 'email' ? 'Email address' : '10-digit mobile number'}
            value={identifier}
            onChange={(e) => { setIdentifier(e.target.value); setErrors((p) => ({ ...p, identifier: null })); }}
          />
          {errors.identifier && <span style={errorStyle}>⚠ {errors.identifier}</span>}
        </div>

        <div className="text-center mt-4">
          <button type="submit" disabled={isSending} style={{ borderRadius: '12px', backgroundColor: '#007FFF', width: '70%', height: '50px', color: 'white', border: 'none', fontWeight: '600' }}>
            {isSending ? "Sending..." : "SEND OTP"}
          </button>
        </div>
      </form>
    );
  }

  // ── Step 2: enter the OTP ──────────────────────────────────────────────
  return (
    <form onSubmit={handleVerifyOtp} noValidate>
      <div className="otp-sent-note mb-3 text-center">
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          We sent a 6-digit code to<br /><strong>{sentTo}</strong>
        </p>
        <button type="button" onClick={handleChangeIdentifier} className="otp-change-link">
          <Pencil size={12} /> Change {channel === 'email' ? 'email' : 'phone number'}
        </button>
      </div>

      <div className="mb-2">
        <input
          className="otp-input"
          style={{ borderColor: errors.otp ? '#dc3545' : '' }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          value={otp}
          onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setErrors((p) => ({ ...p, otp: null })); }}
        />
        {errors.otp && <span style={{ ...errorStyle, textAlign: 'center' }}>⚠ {errors.otp}</span>}
      </div>

      <div className="text-center mt-4">
        <button type="submit" disabled={isVerifying} style={{ borderRadius: '12px', backgroundColor: '#007FFF', width: '70%', height: '50px', color: 'white', border: 'none', fontWeight: '600' }}>
          {isVerifying ? "Verifying..." : isRegister ? "VERIFY & CREATE ACCOUNT" : "VERIFY & LOGIN"}
        </button>
      </div>

      <div className="text-center mt-3">
        {cooldown > 0 ? (
          <span style={{ fontSize: '13px', color: '#888' }}>Resend OTP in {cooldown}s</span>
        ) : (
          <button type="button" onClick={handleResend} className="otp-resend-link" disabled={isSending}>
            {isSending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </form>
  );
};

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);

  const handleSuccess = () => {
    setIsBusy(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://looi-store-server-izvs.onrender.com/api/auth/google";
  };

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
                            <OtpAuthPanel purpose="login" onSuccess={handleSuccess} />
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
                            <OtpAuthPanel purpose="register" onSuccess={handleSuccess} />
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
          {isBusy && (
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
