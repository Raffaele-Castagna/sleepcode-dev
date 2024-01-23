import { authModalState } from "@/atoms/authModelAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { useSetRecoilState } from "recoil";

type LogoutLogicProps = {};

const LogoutLogic: React.FC<LogoutLogicProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false, type: "login" }));
    signOut();
    router.push("/auth");
  };
  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};
export default LogoutLogic;
