import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const words = ["Smarter", "Faster", "Better"];

const LoginPage = () => {
  //  Typing animation
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  //  Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //  FIXED
  const [loading, setLoading] = useState(false); //  IMPORTANT
  const [error, setError] = useState("");

  //  Context
  const { loginUser } = useUser();

  // ============================================
  //  Typing animation
  // ============================================
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  // ============================================
  //  Input change
  // ============================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  //  LOGIN FUNCTION
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      //  redirect
      if (data.user.role === "admin") {
        window.location.href = "/#/admin";
      } else {
        window.location.href = "/#/user";
      }

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // UI
  // ============================================
  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT */}
        <div className="login-left">
          <div className="login-left-overlay">
            <h1 className="login-head">Create Anywhere.</h1>

            <h2 className="login-typer">
              Edit <span className="type-text">{text}</span>.
            </h2>

            <p>Your tasks. Your flow.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h1 className="text-center">Welcome Back!</h1>
          <p className="text-center">Login to continue to Tasktick</p>

          {error && <p className="error-text">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <span className="forgot-password">Forgot password?</span>
            </div>

            {/* BUTTON */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="login-footer-note">
              <p>
                This app is for Tasktick users only. Please log in using your
                assigned credentials.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;