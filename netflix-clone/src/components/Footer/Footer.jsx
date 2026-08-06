import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

function Footer() {
  const [language,setLanguage] = useState("English");

  const links = [
    "Audio and Subtitles",
    "Media Center",
    "Privacy",
    "Contact Us",
    "Cookie Preferences",
    "Help Center",
    "Jobs",
    "Terms of Use",
    "Gift Cards",
    "Legal Notices",
    "Account",
    "Ways to Watch",
    "Corporate Information",
    "Only on Netflix",
    "Investor Relations",
    "Speed Test"
  ];

  const social = [
    {
      icon:<FaFacebookF/>,
      url:"https://facebook.com"
    },
    {
      icon:<FaInstagram/>,
      url:"https://instagram.com"
    },
    {
      icon:<FaTwitter/>,
      url:"https://twitter.com"
    },
    {
      icon:<FaYoutube/>,
      url:"https://youtube.com"
    }
  ];

  function serviceCode(){
    alert("Your service code: NETFLIX-2026");
  }

  return (
    <footer className="bg-black px-5 py-12 text-gray-400 md:px-16">

      <div className="mx-auto max-w-6xl">

        <p className="mb-8 text-sm md:text-base">
          Questions? Call 000-800-040-1843
        </p>

        <div className="mb-8 flex gap-5 text-2xl text-white">
          {
            social.map((item,index)=>(
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gray-400"
              >
                {item.icon}
              </a>
            ))
          }
        </div>


        <div className="mb-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">

          {
            links.map(link=>(
              <a
                key={link}
                href="#"
                className="transition hover:text-white hover:underline"
              >
                {link}
              </a>
            ))
          }

        </div>


        <button
          onClick={serviceCode}
          className="mb-6 border border-gray-500 px-4 py-2 text-sm transition hover:border-white hover:text-white"
        >
          Service Code
        </button>


        <div className="mb-6">

          <select
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
            className="bg-black border border-gray-500 px-4 py-2 text-sm text-gray-300 outline-none"
          >
            <option>English</option>
            <option>हिन्दी</option>
          </select>

        </div>


        <p className="text-xs text-gray-500">
          Netflix Clone © {new Date().getFullYear()} 
          <span className="mx-1">•</span>
          React
          <span className="mx-1">•</span>
          Firebase
          <span className="mx-1">•</span>
          TMDB API
        </p>

      </div>

    </footer>
  );
}

export default Footer;
