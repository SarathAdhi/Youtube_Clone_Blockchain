import Form from "@components/form";
import Input from "@elements/Input";
import InputFile from "@elements/InputFile";
import TextArea from "@elements/Textarea";
import PageLayout from "@layouts/PageLayout";
import React, { useEffect } from "react";
import { uploadVideo } from "@utils/video";
import * as y from "yup";
import { useRecoilState } from "recoil";
import {
  loginDetails as _loginDetails,
  userDetails as _userDetails,
} from "@utils/recoil";
import { useRouter } from "next/router";
import { showErrorAlert } from "@utils/alert";
import { DownloadIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

const initialValues = {
  title: "",
  videoCID: "",
  thumbnailCID: "",
  description: "",
};

const schema = y.object().shape({
  title: y
    .string()
    .max(100, "Title must be below 100 characters")
    .required("Title is required"),
  videoCID: y.array().required("Video is required"),
  thumbnailCID: y.array().required("Thumbnail is required"),
  description: y.string().required("Description is required"),
});

const Upload = () => {
  const [userDetails] = useRecoilState(_userDetails);
  const [{ currentAccount }] = useRecoilState(_loginDetails);

  const router = useRouter();

  const isAllowed =
    !!userDetails.username &&
    !!userDetails.channelName &&
    !!userDetails.coverImage &&
    !!userDetails.profileImage;

  useEffect(() => {
    if (!isAllowed && currentAccount) {
      showErrorAlert("Please complete your profile first", "", () => {
        router.replace("/profile");
      });
    }
  }, []);

  return (
    <PageLayout title="Upload" className="items-center justify-center">
      <a
        href="/assets/sample_video.mp4"
        className="absolute bottom-4 right-5 flex items-center gap-1 font-medium bg-gray-500 p-2 rounded-md"
        download
      >
        <DownloadIcon className="w-5 h-5" />
        Sample video
      </a>

      <Form
        className="w-11/12"
        initialValues={initialValues}
        schema={schema}
        onSubmit={async (values, reset) => {
          if (
            values.videoCID.length === 0 ||
            values.thumbnailCID.length === 0
          ) {
            toast.error("Please upload video and thumbnail");
            return;
          }

          const newValues = {
            ...values,
            cids: [...values.videoCID, ...values.thumbnailCID],
          };

          console.log(newValues);

          await uploadVideo(newValues);
          reset();
          router.replace("/");
        }}
        submitButton={{ title: "Upload" }}
      >
        <Input
          label="Title"
          name="title"
          placeholder="Enter your video title"
          required
        />

        <InputFile label="Upload your video" name="videoCID" required />

        <InputFile
          label="Upload your video thumbnail"
          name="thumbnailCID"
          required
        />

        <TextArea
          label="Description"
          name="description"
          placeholder="Enter your video description"
          required
        />
      </Form>
    </PageLayout>
  );
};

export default Upload;
