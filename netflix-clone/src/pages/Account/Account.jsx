import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import {
  FaLock,
  FaCreditCard,
  FaSignOutAlt,
  FaTv,
  FaBell,
  FaEdit,
  FaCheck
} from "react-icons/fa";

function Account() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [editing,setEditing] = useState(false);
  const [name,setName] = useState(user?.displayName || "Netflix User");
  const [password,setPassword] = useState("");
  const [currentPassword,setCurrentPassword] = useState("");
  const [notifications,setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );
  const [saving,setSaving] = useState(false);


  async function saveName(){
    if(!name.trim()) return toast.error("Enter name");

    try{
      setSaving(true);

      await updateUserProfile({
        displayName:name.trim()
      });

      toast.success("Profile updated");
      setEditing(false);

    }catch{
      toast.error("Update failed");
    }finally{
      setSaving(false);
    }
  }


  async function changePassword(){

    if(!currentPassword || !password)
      return toast.error("Fill both passwords");

    try{

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(
        user,
        credential
      );

      await updatePassword(
        user,
        password
      );

      toast.success("Password changed");

      setPassword("");
      setCurrentPassword("");

    }catch{
      toast.error("Password update failed");
    }
  }


  async function handleLogout(){
    await logout();
    navigate("/login");
  }


  function toggleNotifications(){

    const value=!notifications;

    setNotifications(value);

    localStorage.setItem(
      "notifications",
      value
    );
  }


  return(
    <div className="min-h-screen bg-black text-white">

      <Navbar/>

      <main className="px-5 pt-28 md:px-20">

        <h1 className="mb-8 text-4xl font-bold">
          Account
        </h1>


        <section className="max-w-5xl space-y-6">


          <div className="rounded bg-[#181818] p-6">

            <div className="flex items-center gap-5">

              <img
                src={
                  user?.photoURL ||
                  "https://static.vecteezy.com/system/resources/previews/027/571/259/large_2x/cute-boy-and-girl-3d-cartoon-character-free-photo.jpg"
                }
                className="h-24 w-24 rounded object-cover"
              />


              <div>

                {
                  editing ? (

                    <div className="flex gap-2">

                      <input
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="rounded bg-[#333] px-4 py-2 outline-none"
                      />

                      <button
                        disabled={saving}
                        onClick={saveName}
                        className="rounded bg-red-600 px-4"
                      >
                        <FaCheck/>
                      </button>

                    </div>

                  ):(
                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        {user?.displayName || "Netflix User"}
                      </h2>

                      <button
                        onClick={()=>setEditing(true)}
                        className="text-gray-400 hover:text-white"
                      >
                        <FaEdit/>
                      </button>

                    </div>
                  )
                }


                <p className="text-gray-400">
                  {user?.email}
                </p>


                <span className="mt-3 inline-block rounded bg-red-600 px-4 py-1 text-sm font-bold">
                  PREMIUM
                </span>

              </div>

            </div>

          </div>



          <div className="rounded bg-[#181818] p-6">

            <div className="mb-4 flex items-center gap-3">

              <FaCreditCard className="text-red-600"/>

              <h2 className="text-xl font-bold">
                Membership & Billing
              </h2>

            </div>


            <h3 className="text-xl font-bold">
              Premium Plan
            </h3>

            <p className="mt-2 text-gray-400">
              4K Ultra HD • Unlimited screens • No ads
            </p>


            <button className="mt-4 rounded bg-white px-5 py-2 font-bold text-black">
              Manage Plan
            </button>

          </div>




          <div className="rounded bg-[#181818] p-6">

            <div className="mb-4 flex items-center gap-3">
              <FaLock className="text-red-600"/>
              <h2 className="text-xl font-bold">
                Security
              </h2>
            </div>


            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={e=>setCurrentPassword(e.target.value)}
              className="mb-3 w-full rounded bg-[#333] p-3 md:w-96"
            />


            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="w-full rounded bg-[#333] p-3 md:w-96"
            />


            <button
              onClick={changePassword}
              className="mt-4 rounded border border-gray-600 px-5 py-2 hover:bg-gray-800"
            >
              Change Password
            </button>

          </div>




          <div className="rounded bg-[#181818] p-6">

            <div className="mb-4 flex items-center gap-3">
              <FaTv className="text-red-600"/>
              <h2 className="text-xl font-bold">
                Devices
              </h2>
            </div>

            <p className="text-gray-400">
              Chrome • Android • Windows
            </p>

            <button className="mt-4 rounded border border-gray-600 px-5 py-2">
              Manage Devices
            </button>

          </div>




          <div className="rounded bg-[#181818] p-6">

            <div className="mb-4 flex items-center gap-3">
              <FaBell className="text-red-600"/>
              <h2 className="text-xl font-bold">
                Notifications
              </h2>
            </div>


            <button
              onClick={toggleNotifications}
              className={`rounded px-5 py-2 ${
                notifications
                ?"bg-red-600"
                :"bg-gray-700"
              }`}
            >
              {notifications?"Enabled":"Disabled"}
            </button>

          </div>



          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded bg-red-600 px-8 py-3 font-bold hover:bg-red-700"
          >
            <FaSignOutAlt/>
            Sign Out
          </button>


        </section>

      </main>

    </div>
  );
}

export default Account;
