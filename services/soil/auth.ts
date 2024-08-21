import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const getFriendlyAuthError = (errorMessage: string) => {
  if (errorMessage.includes("auth/email-already-in-use")) {
    return "That email is already in use. Please sign in or use another email.";
  }
  if (
    errorMessage.includes("auth/wrong-password") ||
    errorMessage.includes("auth/invalid-credential")
  ) {
    return "Incorrect password. Please try again.";
  }
  if (errorMessage.includes("auth/user-not-found"))
    return "No user found that matches that email.";
  if (errorMessage.includes("weak-password"))
    return "Password should be at least 6 characters.";

  return errorMessage;
};

/*
 █████╗ ██╗   ██╗████████╗██╗  ██╗
██╔══██╗██║   ██║╚══██╔══╝██║  ██║
███████║██║   ██║   ██║   ███████║
██╔══██║██║   ██║   ██║   ██╔══██║
██║  ██║╚██████╔╝   ██║   ██║  ██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
*/
export function getCurrentUser() {
  return getAuth().currentUser;
}

export async function getIsUserAdmin() {
  const idTokenResult = await getCurrentUser()?.getIdTokenResult();

  return !!idTokenResult?.claims.admin;
}

export async function getIdToken() {
  return getCurrentUser()?.getIdToken();
}

export const signIn = (
  email: string,
  password: string,
  setError: (error: string) => void
) => {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password).catch((e) =>
    setError(getFriendlyAuthError(e.message))
  );
};

export const forgotPassword = (email: string) =>
  sendPasswordResetEmail(getAuth(), email);

export const signUserOut = () => signOut(getAuth());

export const updateUserEmail = (email: string) => {
  const cu = getCurrentUser();
  if (cu) updateEmail(cu, email);
  else throw new Error("You must be signed in to update your email.");
};

export const updateUserPassword = (newPassword: string) => {
  const cu = getCurrentUser();
  if (cu) return updatePassword(cu, newPassword);
  throw new Error("You must be signed in to update your password.");
};
