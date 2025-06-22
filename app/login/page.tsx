"use client";
import { useState, startTransition } from "react";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { login, signup } from "./actions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    startTransition(() => {
      login(email, password);
    });
  };

  const handleSignup = () => {
    startTransition(() => {
      signup(email, password);
    });
  };

  return (
    <div className="px-40">
      <div className="pt-10 flex justify-center items-center mb-4">
        <span className="font-bold text-3xl/10">Welcome back</span>
      </div>

      <div className="flex w-full gap-x-4 items-center justify-center">
        <div className="flex flex-col w-1/2 gap-5">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeHolder=""
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7A9DC5] px-3 py-2 rounded"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeHolder=""
            type="password"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7A9DC5] px-3 py-2 rounded"
          />
          <Button
            text="Log in"
            onClick={handleLogin}
            className="bg-[#B2C9E5] px-4 py-2 rounded"
          />
          <Button
            text="Sign up"
            onClick={handleSignup}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
