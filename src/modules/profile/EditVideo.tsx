import Form from "@components/form";
import Modal from "@components/Modal";
import Input from "@elements/Input";
import TextArea from "@elements/Textarea";
import { PencilIcon } from "@heroicons/react/solid";
import { loginDetails as _loginDetails } from "@utils/recoil";
import { updateVideo } from "@utils/video";
import { SelectedVideoProps } from "pages/profile";
import React from "react";
import * as y from "yup";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (values: boolean) => void;
  videoValues: SelectedVideoProps;
};

const schema = y.object().shape({
  title: y
    .string()
    .max(100, "Title must be below 100 characters")
    .required("Title is required"),
  description: y.string().required("Description is required"),
});

const initialValues = {
  title: "",
  description: "",
  id: "",
};

const EditVideo: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  videoValues = initialValues,
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={`Update Video - ${videoValues.title}`}
      buttonProps={{
        name: "",
        Icon: PencilIcon,
        className: `hidden`,
      }}
    >
      <Form
        initialValues={videoValues}
        schema={schema}
        onSubmit={async (values) => {
          const data = await updateVideo({ ...values, id: videoValues.id });
          console.log(data);

          setIsModalOpen(false);
        }}
        submitButton={{ title: "Update" }}
      >
        <Input
          label="Title"
          name="title"
          placeholder="Update your title"
          isDark
          required
        />

        <TextArea
          label="Description"
          name="description"
          placeholder="Update your description"
          isDark
          required
        />
      </Form>
    </Modal>
  );
};

export default EditVideo;
