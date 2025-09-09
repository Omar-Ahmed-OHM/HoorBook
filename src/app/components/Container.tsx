"use client"
import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div
  className={`ml-3 mr-3 mt-5   'lg:ml-[95px]' : 'lg:ml-[270px]'} text-white `}>{children}</div>;
};

export default Container;