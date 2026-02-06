import { useState } from "react";
import { createContext, useContext } from "react";

type ConnectionStatus = "online" | "offline";

interface AppContextType {
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  pendingMessages: number;
}

const AppContext = createContext<AppContextType>({
  connectionStatus: "online",
  setConnectionStatus: () => {},
  pendingMessages: 0,
});

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("online");
  const pendingMessages = connectionStatus === "offline" ? 3 : 0;

  return (
    <AppContext.Provider value={{ connectionStatus, setConnectionStatus, pendingMessages }}>
      {children}
    </AppContext.Provider>
  );
}
