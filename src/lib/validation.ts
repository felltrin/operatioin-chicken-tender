export const validateLoginInput = (email: string, password: string) => {
  const errors: { [key: string]: string } = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
