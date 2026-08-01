import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaLanguage, FaPlay, FaSignOutAlt, FaUserShield, FaList, FaCog, FaCheck, FaTimes } from "react-icons/fa";

function Profile() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.displayName || "Netflix User");

  const avatar = user?.photoURL || "https://static.vecteezy.com/system/resources/previews/027/571/259/large_2x/cute-boy-and-girl-3d-cartoon-character-free-photo.jpg";

  const settings = [
    [<FaUserShield />, "Maturity Settings", "Control content available for this profile.", "Change"],
    [<FaLanguage />, "Language", "English audio and subtitles.", "Change"],
    [<FaPlay />, "Playback Settings", "Manage autoplay and previews.", "Manage"]
  ];

  async function saveProfile() {
    if (!name.trim()) return toast.error("Name required");

    try {
      setSaving(true);
      await updateUserProfile({ displayName: name.trim() });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-5 pt-28 md:px-20">
        <h1 className="mb-8 text-4xl font-bold">Profile</h1>

        <section className="max-w-5xl rounded bg-[#181818] p-6 md:p-10">

          <div className="flex flex-col gap-5 border-b border-gray-700 pb-8 md:flex-row md:items-center">

            <img src={avatar} alt="profile" className="h-32 w-32 rounded object-cover"/>

            <div className="flex-1">

              {editing ? (
                <div className="flex gap-2">
                  <input value={name} onChange={e=>setName(e.target.value)} className="rounded bg-[#333] px-4 py-2 outline-none"/>
                  <button disabled={saving} onClick={saveProfile} className="rounded bg-red-600 px-4"><FaCheck/></button>
                  <button onClick={()=>setEditing(false)} className="rounded bg-gray-700 px-4"><FaTimes/></button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{user?.displayName || "Netflix User"}</h2>
                  <button onClick={()=>setEditing(true)} className="text-gray-400 hover:text-white"><FaEdit/></button>
                </div>
              )}

              <p className="mt-2 text-gray-400">{user?.email}</p>
              <span className="mt-3 inline-block rounded bg-red-600 px-4 py-1 text-sm font-bold">PREMIUM</span>

            </div>
          </div>


          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {settings.map(([icon,title,text,button],i)=>(
              <div key={i} className="rounded bg-black p-5">

                <div className="mb-3 flex items-center gap-3">
                  <span className="text-red-600">{icon}</span>
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>

                <p className="text-gray-400">{text}</p>

                <button className="mt-4 rounded border border-gray-600 px-5 py-2 hover:bg-gray-800">
                  {button}
                </button>

              </div>
            ))}
          </div>


          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <button onClick={()=>navigate("/mylist")} className="flex justify-center items-center gap-3 rounded bg-[#333] py-3 font-bold hover:bg-gray-700">
              <FaList/> My List
            </button>

            <button onClick={()=>navigate("/account")} className="flex justify-center items-center gap-3 rounded bg-[#333] py-3 font-bold hover:bg-gray-700">
              <FaCog/> Account
            </button>

          </div>


          <button onClick={handleLogout} className="mt-8 flex items-center gap-3 rounded bg-red-600 px-8 py-3 font-bold hover:bg-red-700">
            <FaSignOutAlt/> Sign Out
          </button>

        </section>
      </main>
    </div>
  );
}

export default Profile;