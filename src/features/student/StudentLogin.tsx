import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../shared/components/LoginPage';
import { studentAuthService } from '../../services/studentAuthService';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await studentAuthService.login(username, password);
      localStorage.setItem('vanguard_token', res.accessToken);
      localStorage.setItem('vanguard_refresh_token', res.refreshToken);
      localStorage.setItem('userName', username || 'User');

      const userRole = res.role || res.user?.role;
      let decodedRole = null;
      if (!userRole && res.accessToken) {
        try {
          const payloadBase64 = res.accessToken.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const payload = JSON.parse(decodedJson);
          decodedRole = payload.role;
        } catch (e) {
          console.error('Could not parse token', e);
        }
      }
      
      const finalRole = userRole || decodedRole;

      if (finalRole && (finalRole.toLowerCase() === 'admin' || finalRole.toLowerCase() === 'superadmin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || 'Invalid username or password');
      } else if (err.request) {
        setError('Server is unreachable. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPage
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      forgotPasswordLink="/student/forgot-password"
    />
  );
};

export default StudentLogin;
