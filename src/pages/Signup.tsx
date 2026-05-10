import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

import { signupApi } from "../services/authApi";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

      const response = await signupApi(formData);
      console.log(response.data);
      localStorage.setItem("verifyEmail", formData.email);

      toast.success("OTP sent successfully");

      navigate("/verify-otp");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">Join us and start your journey</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>

          <div className="form-input-wrapper">
            <User className="form-input-icon" />

            <input type="text" id="name" className="form-input" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
          </div>
        </div>

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

            <input type={showPassword ? "text" : "password"} id="password" className="form-input" placeholder="Create a password" required value={formData.password} onChange={handleChange} />

            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          <UserPlus size={20} />

          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Log in
        </Link>
      </div>
    </>
  );
};

export default Signup;
