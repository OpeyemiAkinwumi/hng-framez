import { createContext } from "react";
import { AuthProp } from "./UserProvider";

import { User } from "firebase/auth";

type UsercontextProp = {
  user: User | null;
  userData: any | null; // Firestore user document
  login: (credentials: AuthProp) => Promise<void>;
  signup: (credentials: AuthProp) => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UsercontextProp | undefined>(
  undefined
);
