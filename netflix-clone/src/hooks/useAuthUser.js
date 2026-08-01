import { useAuth } from "../context/AuthContext";

function useAuthUser() {
  return useAuth();
}

export default useAuthUser;