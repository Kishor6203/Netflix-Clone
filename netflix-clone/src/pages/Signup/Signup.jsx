import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Signup(){
  const navigate=useNavigate();
  const {signup}=useAuth();

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    confirm:""
  });

  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);

  const update=e=>setForm({...form,[e.target.name]:e.target.value});


  async function handleSignup(e){
    e.preventDefault();

    const name=form.name.trim();
    const email=form.email.trim();

    if(!name||!email||!form.password||!form.confirm){
      return toast.error("Fill all fields");
    }

    if(form.password.length<6){
      return toast.error("Password must be 6 characters");
    }

    if(form.password!==form.confirm){
      return toast.error("Passwords do not match");
    }

    try{
      setLoading(true);

      await signup(
        email,
        form.password,
        name
      );

      toast.success("Welcome to Netflix");
      navigate("/");

    }catch(error){
      toast.error(
        error.message
          .replace("Firebase: ","")
          .replace(/\(auth\/.*\)/,"")
      );
    }finally{
      setLoading(false);
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
        onSubmit={handleSignup}
        className="relative z-10 w-full max-w-md rounded bg-black/80 p-8"
      >

        <h1 className="mb-7 text-4xl font-bold text-white">
          Sign Up
        </h1>


        {[
          ["name","Name","text"],
          ["email","Email or phone number","email"]
        ].map(([name,placeholder,type])=>(
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={form[name]}
            onChange={update}
            className="mb-4 w-full rounded bg-[#333] p-4 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-600"
          />
        ))}


        <div className="relative mb-4">

          <input
            name="password"
            type={show?"text":"password"}
            placeholder="Password"
            value={form.password}
            onChange={update}
            className="w-full rounded bg-[#333] p-4 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-600"
          />

          <button
            type="button"
            onClick={()=>setShow(!show)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {show?<FaEyeSlash/>:<FaEye/>}
          </button>

        </div>


        <input
          name="confirm"
          type="password"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={update}
          className="mb-6 w-full rounded bg-[#333] p-4 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-600"
        />


        <button
          disabled={loading}
          className="w-full rounded bg-red-600 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading?"Creating account...":"Sign Up"}
        </button>


        <p className="mt-6 text-gray-400">
          Already have an account?
          <button
            type="button"
            onClick={()=>navigate("/login")}
            className="ml-2 text-white hover:underline"
          >
            Sign in now
          </button>
        </p>

      </form>

    </div>
  );
}

export default Signup;