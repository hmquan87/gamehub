import { useContext } from "react";
import { BalanceContext } from "@/contexts/BalanceProvider";

const useBalances = () => {
  const context = useContext(BalanceContext);

  if (context === null) {
    throw new Error("useBalances must be used within a BalanceProvider");
  }

  return context;
};

export default useBalances;
