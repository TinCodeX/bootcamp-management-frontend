import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentAuthService } from "../../services/studentAuthService";
import ResetPasswordPage from "../../shared/components/ResetPasswordPage";

const StudentResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token") || "";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await studentAuthService.confirmPasswordReset({
        token,
        newPassword,
      });

      alert("Password reset successful!");
      navigate("/student");
    } catch (err) {
      setError("Reset failed. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordPage
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      handleReset={handleReset}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default StudentResetPassword;