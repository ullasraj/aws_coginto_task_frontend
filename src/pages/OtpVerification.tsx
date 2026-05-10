import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { CheckCircle2 } from "lucide-react";

import { resendOtpApi, verifyOtpApi } from "../services/authApi";
import { toast } from "react-toastify";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(30);

  const email = localStorage.getItem("verifyEmail") || "";

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Focus next input

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter complete OTP");

      return;
    }

    try {
      setLoading(true);

      const otpCode = otp.join("");

      const response = await verifyOtpApi({
        email,
        otp: otpCode,
      });

      toast.success("Account verified successfully");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);

      const response = await resendOtpApi({
        email,
      });

      console.log(response.data);

      toast.success("OTP resent successfully");

      setTimeLeft(30);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Verify Email</h1>

        <p className="auth-subtitle">We've sent a 6-digit code to your email</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{
            marginTop: "1.5rem",
          }}
          disabled={loading}
        >
          <CheckCircle2 size={20} />

          {loading ? "Verifying..." : "Verify Account"}
        </button>

        <div className="otp-timer">
          {timeLeft > 0 ? (
            <span>
              Resend code in{" "}
              <strong
                style={{
                  color: "var(--primary)",
                }}
              >
                {timeLeft}s
              </strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>
      </form>

      <div className="auth-footer">
        <Link to="/login" className="auth-link">
          Back to login
        </Link>
      </div>
    </>
  );
};

export default OtpVerification;
