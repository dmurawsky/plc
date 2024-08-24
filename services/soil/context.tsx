"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Firebase
import { initializeFirebase } from "@/services/soil/init";
import { getIsUserAdmin } from "@/services/soil/auth";

// Types
import type { FirebaseOptions } from "firebase/app";
import type { User } from "firebase/auth";

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
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  editingDataKey?: string;
  setEditingDataKey: Dispatch<SetStateAction<string | undefined>>;
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
}: TProps) => {
  const [user, setUser] = useState<User | null>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDataKey, setEditingDataKey] = useState<string>();

  useEffect(() => {
    initializeFirebase(firebaseOptions, async (u) => {
      setUser(u);
      if (u) {
        getIsUserAdmin()
          .then(setIsAdmin)
          .catch(() => setIsAdmin(false));
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      setUser(null);
      setIsAdmin(false);
    };
  }, [firebaseOptions]);

  const ctx = useMemo(
    () => ({
      user,
      isAdmin,
      isEditing,
      setIsEditing,
      editingDataKey,
      setEditingDataKey,
    }),
    [user, isAdmin, isEditing, setIsEditing, editingDataKey, setEditingDataKey]
  );

  return <SoilContext.Provider value={ctx}>{children}</SoilContext.Provider>;
};
