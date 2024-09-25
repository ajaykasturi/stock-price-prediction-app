import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";

const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const { isError, isSuccess, data } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    }
  );
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: isSuccess,
      }}
    >
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
