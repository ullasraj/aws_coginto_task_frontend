import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

import { forgotPasswordApi } from "../services/authApi";
import { toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await forgotPasswordApi({
        email,
      });

      console.log(response.data);

      localStorage.setItem("resetEmail", email);

      setSubmitted(true);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to send reset OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Reset Password</h1>

        <p className="auth-subtitle">{submitted ? "We've sent a recovery OTP to your email" : "Enter your email to receive a reset OTP"}</p>
      </div>

      {!submitted ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>

            <div className="form-input-wrapper">
              <Mail className="form-input-icon" />

              <input type="email" id="email" className="form-input" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Reset OTP"}

            <ArrowRight size={20} />
          </button>
        </form>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <Mail size={32} color="var(--success)" />
          </div>

          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            Check your email inbox and use the OTP to reset your password.
          </p>

          <Link
            to="/change-password"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              className="btn-primary"
              style={{
                width: "100%",
                marginTop: "1.5rem",
              }}
            >
              Continue Reset Password
            </button>
          </Link>

          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
            style={{
              width: "100%",
              marginTop: "1rem",
              background: "transparent",
              border: "1px solid var(--card-border)",
            }}
          >
            Try another email
          </button>
        </div>
      )}

      <div className="auth-footer">
        <Link
          to="/login"
          className="auth-link"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
