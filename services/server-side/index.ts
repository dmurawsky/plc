import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { CreateRequest, getAuth, UpdateRequest } from "firebase-admin/auth";

// Types
import type { AppOptions } from "firebase-admin/app";

const getRef = (path: string, allowRootQuery: boolean = false) => {
  if (!path || (!allowRootQuery && path === "/"))
    throw new Error("We don't like root queries");

  return getDatabase().ref(path);
};

export const createUser = (createRequest: CreateRequest) =>
  getAuth().createUser(createRequest);

export const get = <T>(path: string) =>
  getRef(path)
    .get()
    .then((snap) => snap.val() as T | null);

export const set = <T>(path: string, data: T) => getRef(path).set(data);

export const update = <T extends object>(
  path: string,
  data: T,
  allowRootQuery: boolean = false
) => getRef(path, allowRootQuery).update(data);

export function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  // General options for the app - test, develop, production
  const initOptions: AppOptions = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  };

  // Initialize the app
  return admin.initializeApp(initOptions);
}

export const updateUser = (uid: string, updateRequest: UpdateRequest) =>
  getAuth().updateUser(uid, updateRequest);

export const resetPassword = (uid: string, updateRequest: UpdateRequest) =>
  getAuth().updateUser(uid, updateRequest);

export function verifyIdToken(token: string) {
  return getAuth().verifyIdToken(token);
}
