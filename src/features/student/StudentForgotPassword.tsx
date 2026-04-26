import React, { useState } from "react";
import { studentAuthService } from "../../services/studentAuthService";
import ForgotPasswordPage from "../../shared/components/ForgotPasswordPage";

const StudentForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await studentAuthService.requestPasswordReset(email);
      setMessage("Password reset instructions sent to your email.");
    } catch (err) {
      setError("Request failed. Please check your email address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordPage
      email={email}
      setEmail={setEmail}
      handleRequestReset={handleRequestReset}
      isLoading={isLoading}
      message={message}
      error={error}
    />
  );
};

export default StudentForgotPassword;