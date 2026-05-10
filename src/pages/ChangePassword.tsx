import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";

import { toast } from "react-toastify";
import { resetPasswordApi } from "../services/authApi";

const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
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

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("resetEmail");

      if (!email) {
        alert("Reset email not found");

        return;
      }

      const response = await resetPasswordApi({
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      console.log(response.data);

      toast.success("Password reset successful");

      localStorage.removeItem("resetEmail");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      toast.success(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Set New Password</h1>

        <p className="auth-subtitle">Your new password must be different from previously used passwords.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="otp">
            OTP Code
          </label>

          <div className="form-input-wrapper">
            <KeyRound className="form-input-icon" />

            <input type="text" id="otp" className="form-input" placeholder="Enter OTP" required value={formData.otp} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="newPassword">
            New Password
          </label>

          <div className="form-input-wrapper">
            <Lock className="form-input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              className="form-input"
              placeholder="Must be at least 8 characters"
              required
              value={formData.newPassword}
              onChange={handleChange}
            />

            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>

          <div className="form-input-wrapper">
            <Lock className="form-input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="form-input"
              placeholder="Both passwords must match"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{
            marginTop: "1rem",
          }}
          disabled={loading}
        >
          <KeyRound size={20} />

          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
