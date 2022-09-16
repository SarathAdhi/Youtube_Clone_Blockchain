import PageLayout from "@layouts/PageLayout";
import React from "react";
import { Component } from "types/page";
import Loading from "./index";

const LoadingPage: React.FC<Component> = ({ children }) => {
  return (
    <PageLayout title="YT | Loading" className="justify-center items-center">
      <Loading className="w-10 h-10" />
      {children}
    </PageLayout>
  );
};

export default LoadingPage;
