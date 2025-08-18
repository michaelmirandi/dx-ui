'use client';

import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';

export default function BackgroundGradient() {
  const theme = useTheme();
  
  return (
    <>
      {/* Main gradient background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: theme.palette.mode === 'light'
            ? `radial-gradient(ellipse at top left, 
                ${alpha(theme.palette.secondary.main, 0.06)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.03)} 25%, 
                ${alpha(theme.palette.primary.main, 0.05)} 50%,
                ${alpha(theme.palette.primary.main, 0.08)} 75%,
                ${alpha(theme.palette.primary.main, 0.10)} 100%)`
            : `linear-gradient(135deg, 
                ${alpha(theme.palette.primary.main, 0.08)} 0%, 
                ${alpha(theme.palette.primary.main, 0.03)} 25%, 
                transparent 50%,
                ${alpha(theme.palette.secondary.main, 0.02)} 75%,
                ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      />
      
      {/* Animated gradient orb */}
      <Box
        sx={{
          position: 'fixed',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          zIndex: -1,
          opacity: theme.palette.mode === 'light' ? 0.4 : 0.2,
          background: theme.palette.mode === 'light'
            ? `radial-gradient(circle at center, 
                ${alpha(theme.palette.secondary.main, 0.12)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.06)} 40%,
                transparent 70%)`
            : `radial-gradient(circle at center, 
                ${alpha(theme.palette.primary.main, 0.15)} 0%, 
                transparent 70%)`,
          filter: 'blur(40px)',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '33%': {
              transform: 'translate(30px, -30px) scale(1.05)',
            },
            '66%': {
              transform: 'translate(-20px, 20px) scale(0.95)',
            },
          },
        }}
      />
      
      {/* Secondary animated orb */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          zIndex: -1,
          opacity: theme.palette.mode === 'light' ? 0.3 : 0.15,
          background: theme.palette.mode === 'light'
            ? `radial-gradient(circle at center, 
                ${alpha(theme.palette.primary.main, 0.10)} 0%, 
                ${alpha(theme.palette.primary.main, 0.05)} 40%,
                transparent 70%)`
            : `radial-gradient(circle at center, 
                ${alpha(theme.palette.secondary.main, 0.12)} 0%, 
                transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'floatReverse 25s ease-in-out infinite',
          '@keyframes floatReverse': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '33%': {
              transform: 'translate(-30px, 30px) scale(0.95)',
            },
            '66%': {
              transform: 'translate(20px, -20px) scale(1.05)',
            },
          },
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          opacity: theme.palette.mode === 'light' ? 0.025 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
    </>
  );
}