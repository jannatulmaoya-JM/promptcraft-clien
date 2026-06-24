"use client";

import { Toaster } from "react-hot-toast";

export default function ClientWrapper({ children }) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}