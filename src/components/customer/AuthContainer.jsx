// src/components/customer/AuthContainer.jsx
import { useState } from "react";
import SignupCust from "./SignupCust";
import LoginCust from "./LoginCust";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between signup and login forms

  return <div>{isLogin ? <LoginCust /> : <SignupCust />}</div>;
};

export default AuthContainer;
