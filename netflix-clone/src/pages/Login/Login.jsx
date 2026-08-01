import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Login(){
  const navigate=useNavigate();
  const {user,login,forgotPassword}=useAuth();

  const [email,setEmail]=useState(
    localStorage.getItem("netflix_email")||""
  );
  const [password,setPassword]=useState("");
  const [remember,setRemember]=useState(
    localStorage.getItem("remember")==="true"
  );
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const [resetLoading,setResetLoading]=useState(false);

  useEffect(()=>{
    if(user) navigate("/");
  },[user,navigate]);

  const cleanError=e=>
    e.message
      .replace("Firebase: Error (","")
      .replace(").","");

  async function handleLogin(e){
    e.preventDefault();

    const userEmail=email.trim();

    if(!userEmail||!password)
      return toast.error("Enter email and password");
    try{
      setLoading(true);

      await login(
        userEmail,
        password,
        remember
      );

      if(remember){
        localStorage.setItem(
          "remember",
          "true"
        );

        localStorage.setItem(
          "netflix_email",
          userEmail
        );
      }else{
        localStorage.removeItem(
          "remember"
        );

        localStorage.removeItem(
          "netflix_email"
        );
      }

      toast.success(
        "Welcome back to Netflix"
      );

      navigate("/");

    }catch(error){
      toast.error(cleanError(error));
    }finally{
      setLoading(false);
    }
  }

  async function handleForgotPassword(){

    if(!email.trim())
      return toast.info("Enter your email first");

    try{
      setResetLoading(true);

      await forgotPassword(
        email.trim()
      );

      toast.success(
        "Password reset email sent"
      );

    }catch(error){
      toast.error(cleanError(error));
    }finally{
      setResetLoading(false);
    }
  }

  return(
    <div className="relative flex min-h-screen items-center justify-center bg-black px-5">

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7d7f6d5e-3f45-4e6f-bf7f-4e8a6f9c7b2c/web/IN-en-20240610-TRIFECTA-perspective_1c5d6d6e-1e7a-4f4b-8a9a-5e6b7d8c9a0b_large.jpg"
        alt="Netflix"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/70"/>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded bg-black/80 p-8"
      >

        <h1 className="mb-8 text-4xl font-bold text-white">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="mb-4 w-full rounded bg-[#333] p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <div className="relative mb-5">

          <input
            type={show?"text":"password"}
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="w-full rounded bg-[#333] p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="button"
            onClick={()=>setShow(!show)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {show?<FaEyeSlash/>:<FaEye/>}
          </button>

        </div>

        <button
          disabled={loading}
          className="w-full rounded bg-red-600 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading?"Signing in...":"Sign In"}
        </button>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-400">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={e=>setRemember(e.target.checked)}
              className="accent-red-600"
            />
            Remember me
          </label>

          <button
            type="button"
            disabled={resetLoading}
            onClick={handleForgotPassword}
            className="hover:text-white hover:underline"
          >
            {resetLoading?"Sending...":"Forgot password?"}
          </button>

        </div>

        <p className="mt-8 text-gray-400">
          New to Netflix?
          <button
            type="button"
            onClick={()=>navigate("/signup")}
            className="ml-2 text-white hover:underline"
          >
            Sign up now
          </button>
        </p>

        <p className="mt-5 text-xs text-gray-500">
          Secured with Firebase authentication.
        </p>

      </form>

    </div>
  );
}

export default Login;