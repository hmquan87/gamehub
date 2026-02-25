import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const useAuthPrivy = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useWeb3Privy must be used within a AuthPrivyProvider");
  }

  return context;
};

export default useAuthPrivy;
