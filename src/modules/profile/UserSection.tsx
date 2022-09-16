import UserLoadingAnimation from "@components/Loading/UserLoadingAnimation";
import Button from "@elements/Button";
import { H2, Label } from "@elements/Text";
import { userDetails as _userDetails } from "@utils/recoil";
import { addSubscribe } from "@utils/video";
import clsx from "clsx";
import React from "react";
import { useRecoilState } from "recoil";
import { User } from "types/user";
import EditProfile from "./EditProfile";

type Props = {
  isNewUser: boolean;
} & User;

const UserSection: React.FC<Props> = ({
  isNewUser,
  username,
  profileImage,
  coverImage,
  channelName,
  walletId,
  id,
  subscribers,
}) => {
  const [{ walletId: myAddress }] = useRecoilState(_userDetails);

  const userDetails = {
    id,
    username,
    profileImage,
    coverImage,
    channelName,
    walletId,
    subscribers,
  };

  const isUserProfile = myAddress?.toLowerCase() === walletId?.toLowerCase();

  const isUserAlreadySubscribed = subscribers?.some(
    (sub) => sub.toLowerCase() === myAddress.toLowerCase()
  );

  const handleSubscribe = async () => {
    await addSubscribe(id);
  };

  return (
    <div className="relative bg-[#111] grid gap-5 rounded-lg overflow-hidden">
      <img
        src={
          isNewUser || !coverImage
            ? "/assets/svgs/imageLoading.svg"
            : coverImage
        }
        className={clsx(
          "w-full h-60",
          isNewUser || !coverImage
            ? "object-contain py-10 animate-pulse border rounded-lg"
            : "object-cover"
        )}
      />

      <div className="flex items-start gap-5 pb-5 px-5">
        {isNewUser || !username ? (
          <UserLoadingAnimation />
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-5">
              {profileImage ? (
                <img
                  src={profileImage}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="w-24 h-24 rounded-full bg-gray-700" />
              )}

              <div>
                <H2>{username}</H2>
                {channelName && <Label>Channel Name: {channelName}</Label>}
                {<Label>{subscribers.length} subscribers</Label>}
              </div>
            </div>

            <Button
              onClick={() => {
                if (!isUserProfile) handleSubscribe();
              }}
              className="bg-red-600 px-2 py-1 rounded-sm"
            >
              {isUserAlreadySubscribed
                ? "Subscribed"
                : isUserProfile
                ? `${subscribers.length} Subscribers`
                : "Subscribe"}
            </Button>
          </div>
        )}
      </div>

      {isUserProfile && (
        <EditProfile
          buttonClassName="absolute top-3 right-3"
          userDetails={userDetails}
          isNewUser={isNewUser}
        />
      )}
    </div>
  );
};

export default UserSection;
