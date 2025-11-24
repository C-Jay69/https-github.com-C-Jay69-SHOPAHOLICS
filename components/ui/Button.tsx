import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const baseStyles = "font-medium transition-all duration-200 flex items-center justify-center rounded-sm";
  
  const variants = {
    primary: "bg-electric text-white hover:bg-cyan hover:text-black shadow-md hover:shadow-lg border border-transparent",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border-2 border-electric text-electric hover:bg-electric hover:text-white",
    ghost: "text-slate-600 hover:text-electric hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};