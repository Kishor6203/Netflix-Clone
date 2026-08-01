import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [scrolled,setScrolled]=useState(false);
  const [mobile,setMobile]=useState(false);
  const [profile,setProfile]=useState(false);

  const ref=useRef();
  const {user,logout}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    const handleScroll=()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  useEffect(()=>{
    const close=e=>{
      if(ref.current&&!ref.current.contains(e.target)) setProfile(false);
    };
    document.addEventListener("mousedown",close);
    return()=>document.removeEventListener("mousedown",close);
  },[]);

  const links=[
    ["Home","/"],
    ["TV Shows","/tv"],
    ["Movies","/movies"],
    ["My List","/mylist"]
  ];

  async function handleLogout(){
    await logout();
    navigate("/login");
  }

  return(
    <nav className={`fixed top-0 z-50 w-full px-5 py-4 transition duration-500 md:px-12 ${scrolled?"bg-black":"bg-gradient-to-b from-black/90 to-transparent"}`}>

      <div className="flex items-center justify-between">

        <Link to="/" className="text-3xl font-black text-red-600">
          NETFLIX
        </Link>

        <div className="hidden gap-6 text-sm text-gray-300 md:flex">
          {links.map(([name,path])=>(
            <Link key={path} to={path} className={`${location.pathname===path?"text-white font-bold":"hover:text-white"}`}>
              {name}
            </Link>
          ))}
        </div>


        <div className="flex items-center gap-5 text-white">

          <Link to="/search" className="hover:text-gray-400">
            <FaSearch/>
          </Link>

          <button className="hidden md:block hover:text-gray-400">
            <FaBell/>
          </button>


          <div ref={ref} className="relative">

            <button onClick={()=>setProfile(!profile)} className="flex items-center gap-2">

              <img
                src={
                  user?.photoURL ||
                  "https://static.vecteezy.com/system/resources/previews/027/571/259/large_2x/cute-boy-and-girl-3d-cartoon-character-free-photo.jpg"
                }
                className="h-9 w-9 rounded object-cover"
                alt="profile"
              />

              <FaChevronDown className={`hidden text-xs transition md:block ${profile?"rotate-180":""}`}/>

            </button>


            {profile&&(
              <div className="absolute right-0 top-12 w-64 rounded bg-black border border-gray-700 p-4 shadow-xl">

                <div className="border-b border-gray-700 pb-3 mb-3">

                  <p className="truncate text-sm">
                    {user?.displayName||"Netflix User"}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {user?.email}
                  </p>

                  <span className="mt-2 inline-block rounded bg-red-600 px-3 py-1 text-xs font-bold">
                    PREMIUM
                  </span>

                </div>


                <Link
                  to="/profile"
                  onClick={()=>setProfile(false)}
                  className="block py-2 text-sm hover:text-red-500"
                >
                  Manage Profile
                </Link>

                <Link
                  to="/account"
                  onClick={()=>setProfile(false)}
                  className="block py-2 text-sm hover:text-red-500"
                >
                  Account
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 text-sm text-red-500 hover:text-red-400"
                >
                  Sign Out
                </button>

              </div>
            )}

          </div>


          <button onClick={()=>setMobile(!mobile)} className="md:hidden">
            {mobile?<FaTimes/>:<FaBars/>}
          </button>

        </div>

      </div>


      {mobile&&(
        <div className="mt-4 rounded bg-black p-5 md:hidden">

          {links.map(([name,path])=>(
            <Link
              key={path}
              to={path}
              onClick={()=>setMobile(false)}
              className="block py-2 text-white hover:text-red-500"
            >
              {name}
            </Link>
          ))}

          <Link
            to="/search"
            onClick={()=>setMobile(false)}
            className="block py-2 text-white hover:text-red-500"
          >
            Search
          </Link>

        </div>
      )}

    </nav>
  );
}

export default Navbar;