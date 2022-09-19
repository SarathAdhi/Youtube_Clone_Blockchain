import Button from "@elements/Button";
import { P } from "@elements/Text";
import {
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { showWarningAlert } from "@utils/alert";
import { userDetails } from "@utils/recoil";
import { deleteVideo } from "@utils/video";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "types/user";
import { Video } from "types/video";
import DropDownMenu from "./DropDownMenu";
import LinkedItem from "./LinkedItem";

type Props = {
  isMini?: boolean;
  handleEdit?: () => void;
  showOptions?: boolean;
} & Video &
  User;

const VideoCard: React.FC<Props> = ({
  id,
  title,
  uuid,
  views,
  description,
  channelName,
  profileImage,
  handleEdit,
  thumbnailUrl,
  owner,
  showOptions = false,
  isMini = false,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [{ walletId }] = useRecoilState(userDetails);

  // const video = `https://${cids[0]}.ipfs.dweb.link/${cids[1]}`;

  const deleteVideoById = async (uuid: string) => {
    await deleteVideo(uuid);
  };

  const isUserVideo = walletId.toLowerCase() === owner.toLowerCase();

  const options = [
    { name: "Edit", Icon: PencilIcon, onClick: handleEdit },
    {
      name: "Delete",
      Icon: TrashIcon,
      onClick: () => {
        showWarningAlert(
          "This action cannot be undone",
          `Are you sure you want to delete ${title}?`,
          () => deleteVideoById(uuid)
        );
      },
    },
  ];

  return (
    <div className="relative group">
      <LinkedItem
        href={`/video/${uuid}`}
        className={clsx("w-full grid gap-3", isMini ? "grid-cols-5" : "")}
      >
        <img
          className={clsx("w-full", isMini ? "col-span-2 h-full" : "h-full")}
          src={
            isLoading
              ? "https://c.tenor.com/sdd4YyHo-qUAAAAC/image-loading-loading.gif"
              : thumbnailUrl
          }
          onLoad={() => setIsLoading(false)}
          alt={title}
        />

        <div className={clsx("flex gap-3", isMini ? "col-span-3" : "")}>
          {!isMini && (
            <img
              src={profileImage}
              className="w-10 h-10 rounded-full"
              alt={channelName}
            />
          )}

          <P className={clsx("w-full", isMini ? "flex flex-col" : "grid")}>
            <span className="w-full inline-block text-lg font-medium text-ellipsis truncate">
              {title}
            </span>

            <LinkedItem
              href={`/channel/${channelName}`}
              className="relative z-30 text-sm hover:underline"
            >
              {channelName}
            </LinkedItem>

            <span className="text-sm">{views.toNumber()} views</span>
          </P>
        </div>
      </LinkedItem>

      {isUserVideo && showOptions && (
        <DropDownMenu
          className="hidden group-hover:block absolute bottom-0 right-0"
          options={options}
          buttonProps={{
            title: "",
            Icon: DotsVerticalIcon,
            className: "text-white",
          }}
        />
      )}
    </div>
  );
};

export default VideoCard;
