import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_8px_20px_-8px_rgba(0,0,0,0.6)]">
        <SignUp signInUrl="/login" />
      </div>
    </div>
  );
};

export default Signup;