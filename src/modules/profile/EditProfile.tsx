import Form from "@components/form";
import Modal from "@components/Modal";
import Input from "@elements/Input";
import InputFile from "@elements/InputFile";
import { PencilIcon } from "@heroicons/react/solid";
import { loginDetails as _loginDetails } from "@utils/recoil";
import { createOrUpdateUserDetails } from "@utils/video";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "types/user";

type Props = {
  buttonClassName?: string;
  userDetails: User | null;
  isNewUser: boolean;
};

const EditProfile: React.FC<Props> = ({
  buttonClassName = "",
  userDetails,
  isNewUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ currentAccount }] = useRecoilState(_loginDetails);

  const initialValues = {
    ...userDetails,
    walletId: currentAccount,
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={isNewUser ? "Update profile" : `Edit profile`}
      buttonProps={{
        name: "",
        Icon: PencilIcon,
        className: `bg-gray-400 p-1 rounded-full ${buttonClassName}`,
      }}
    >
      <Form
        initialValues={initialValues}
        onSubmit={async (values) => {
          await createOrUpdateUserDetails(
            values,
            isNewUser ? "create" : "update"
          );

          setIsModalOpen(false);
        }}
        submitButton={{ title: "Save" }}
      >
        <Input
          label="Username"
          name="username"
          placeholder="Enter a username"
          isDark
          required
          disabled={!isNewUser}
        />

        <Input
          label="Channel Name"
          name="channelName"
          placeholder="Enter a channel name"
          isDark
          required
          disabled={!isNewUser}
        />

        <InputFile label="Cover Image" name="coverImage" isDark required />

        <InputFile label="Profile Image" name="profileImage" isDark required />

        <Input label="Wallet Address" name="walletId" isDark disabled />
      </Form>
    </Modal>
  );
};

export default EditProfile;
