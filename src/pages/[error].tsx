import LinkedItem from "@components/LinkedItem";
import { errorCodes } from "@constants/error-code";
import Button from "@elements/Button";
import { H2, H4 } from "@elements/Text";
import { BackspaceIcon, HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { Component } from "types/page";

const PageWrapper: React.FC<Component> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="h-screen bg-[#181818] grid place-items-center place-content-center">
      <div className="flex items-center justify-center gap-5 flex-wrap">
        <Button
          onClick={() => router.back()}
          className="mb-10 text-white flex items-center gap-1"
        >
          <BackspaceIcon className="w- h-5" />
          Back
        </Button>

        <LinkedItem
          href="/"
          className="mb-10 text-white flex items-center gap-1"
        >
          <HomeIcon className="w- h-5" />
          Home
        </LinkedItem>
      </div>

      {children}
    </div>
  );
};

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const isErrorCodeExist = errorCodes.find(({ code }) => code === error);

  if (!isErrorCodeExist) {
    return (
      <PageWrapper>
        <H2 className="whitespace-pre-wrap text-center text-white">
          <span className="bg-gray-500 px-2 rounded-md">Error code</span> not
          found
        </H2>
      </PageWrapper>
    );
  }

  const { message, note } = isErrorCodeExist;

  return (
    <PageWrapper>
      <H2 className="whitespace-pre-wrap text-center text-white">{message}</H2>
      {note && (
        <H4 className="whitespace-pre-wrap text-center text-gray-500">
          {note}
        </H4>
      )}
    </PageWrapper>
  );
};

export default ErrorPage;
