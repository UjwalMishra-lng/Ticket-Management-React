import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setLoading(true);
    setError("");

    const trimmedEmail = emailAddress.trim();
    const trimmedPassword = password.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      setError("First name and last name are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (trimmedPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      await signUp.create({
        emailAddress: trimmedEmail,
        password: trimmedPassword,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || "An error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      } else {
        console.log("Sign up status:", completeSignUp.status);
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-md bg-gray-900 border border-white/10 shadow-sm rounded-xl p-8">
        <h2 className="text-xl font-semibold text-white mb-2">Create an Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          {pendingVerification ? "Enter the verification code sent to your email." : "Sign up to get started."}
        </p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded mb-4">{error}</div>}

        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium py-2.5 rounded text-sm cursor-pointer transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <><LuLoader className="animate-spin" /> Signing up…</> : "Sign Up"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium py-2.5 rounded text-sm cursor-pointer transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <><LuLoader className="animate-spin" /> Verifying…</> : "Verify Email"}
            </button>
          </form>
        )}
        
        {!pendingVerification && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;