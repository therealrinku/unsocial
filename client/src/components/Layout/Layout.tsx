import { ReactChild } from "react";
import Navbar from "../Navbar";

type LayoutTypes = {
  children: ReactChild;
};

export default function Layout({ children }: LayoutTypes) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
