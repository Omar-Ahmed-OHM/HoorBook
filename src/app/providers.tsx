"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientId = "1032985552950-qf4vso1huv5erlscvqud7mjqb23rjap4.apps.googleusercontent.com";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      <ToastContainer rtl position="top-right" />
    </GoogleOAuthProvider>
  );
}
