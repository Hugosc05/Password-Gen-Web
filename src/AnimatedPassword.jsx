import React, { useState, useEffect } from 'react';

const AnimatedPassword = ({ password }) => {
  const [animatedPassword, setAnimatedPassword] = useState('');

  useEffect(() => {
    setAnimatedPassword('');

    const interval = setInterval(() => {
      const nextChar = password.charAt(animatedPassword.length);
      if (nextChar) {
        setAnimatedPassword(prev => prev + nextChar);
      } else {
        clearInterval(interval);
      }
    }, 100); // Ajusta el tiempo entre cada letra apareciendo

    return () => clearInterval(interval);
  }, [password]);

  return <span>{animatedPassword}</span>;
};

export default AnimatedPassword;
