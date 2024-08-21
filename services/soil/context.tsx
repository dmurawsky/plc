"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Firebase
import { initializeFirebase } from "@/services/soil/init";

// Types
import type { FirebaseOptions } from "firebase/app";
import { User } from "firebase/auth";
import { getIsUserAdmin } from "./auth";

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝
*/
type BaseSoilContext = {
  user: User | null | undefined;
  isAdmin: boolean;
};

const SoilContext = createContext<BaseSoilContext | undefined>(undefined);

export const useSoilContext = () => {
  const useContextResult = useContext(SoilContext);

  if (!useContextResult)
    throw new Error(
      "You must wrap your component in an instance of SoilContext"
    );

  return useContextResult;
};

type TProps = {
  children: ReactNode;
  firebaseOptions: FirebaseOptions;
  anonymousSignIn?: boolean;
};

export const SoilContextProviderComponent = ({
  children,
  firebaseOptions,
  anonymousSignIn = false,
}: TProps) => {
  const [user, setUser] = useState<User | null>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    initializeFirebase(firebaseOptions, async (u) => {
      setUser(u);
      if (u) {
        getIsUserAdmin()
          .then(setIsAdmin)
          .catch(() => setIsAdmin(false));
      }
    });

    return () => {
      setUser(null);
      setIsAdmin(false);
    };
  }, [firebaseOptions, anonymousSignIn]);

  const ctx = useMemo(
    () => ({
      user,
      isAdmin,
    }),
    [user, isAdmin]
  );

  return <SoilContext.Provider value={ctx}>{children}</SoilContext.Provider>;
};
