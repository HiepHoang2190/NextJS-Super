"use client";
import RefreshToken from "@/components/refresh-token";
import { getAccessTokenFromLocalStorage, removeTokensFromLocalStorage } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createContext, useCallback, useContext, useEffect, useState } from "react"



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
const AppContext = createContext({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {},
});
export const useAppContext = () => {
  return useContext(AppContext);
};
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuth, setIsAuthState] = useState(false)
  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage()
    if(accessToken) {
      setIsAuthState(true)
    }
  }, [])

  //  Các bạn nào mà dùng Next.js 15 và React 19 thì không cần useCallback đoạn này cũng được
  const  setIsAuth = useCallback((isAuth : boolean) => {
    if(isAuth) {
      setIsAuthState(true)
    }else {
      setIsAuthState(false)
      removeTokensFromLocalStorage()
    }
  },[])
  //  Nếu mọi người dùng React 19 và Next.js 15 thì không cần AppContext.Provider , chỉ cần AppContext là đủ
  return (
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <RefreshToken></RefreshToken>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
