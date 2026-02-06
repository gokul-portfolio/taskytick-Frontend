import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
const words = ["Smarter", "Faster", "Better"];

const LoginPage = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // typing
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        // deleting
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="login-left-overlay">
            <h1 className="login-head">Create Anywhere.</h1>


            <h2 className="login-typer">
              Edit <span className="type-text">{text}</span>.
            </h2>
            <p>Your tasks. Your flow.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h1 className="text-center">Welcome Back!</h1>
          <p className="text-center">Login to continue to Tasktick</p>

          <form className="login-form">

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="form-row">
              <span className="forgot-password">
                Forgot password?
              </span>
            </div>

            <button type="submit" className="btn-login">
              Login
            </button>

            <div className="login-footer-note">
              <p>
                This app is for Tasktick users only.
                Please log in using your assigned credentials.
              </p>
            </div>

          </form>
          
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
