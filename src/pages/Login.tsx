import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { loginApi } from "../services/authApi";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginApi(formData);

      console.log(response.data);

      // store tokens

      localStorage.setItem("accessToken", response.data.AccessToken);

      localStorage.setItem("idToken", response.data.IdToken);

      localStorage.setItem("refreshToken", response.data.RefreshToken);

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">Sign in to continue your journey</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>

          <div className="form-input-wrapper">
            <Mail className="form-input-icon" />

            <input type="email" id="email" className="form-input" placeholder="name@example.com" required value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>

          <div className="form-input-wrapper">
            <Lock className="form-input-icon" />

            <input type={showPassword ? "text" : "password"} id="password" className="form-input" placeholder="••••••••" required value={formData.password} onChange={handleChange} />

            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <label className="checkbox-label"></label>

          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          <LogIn size={20} />

          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account?{" "}
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Login;
