import UserLoadingAnimation from "@components/Loading/UserLoadingAnimation";
import Button from "@elements/Button";
import { H2, Label } from "@elements/Text";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { showWarningAlert } from "@utils/alert";
import { loginDetails, userDetails as _userDetails } from "@utils/recoil";
import { addSubscribe } from "@utils/video";
import clsx from "clsx";
import React from "react";
import { useRecoilState } from "recoil";
import { User } from "types/user";
import EditProfile from "./EditProfile";

type Props = {
  isNewUser: boolean;
  isProfilePage?: boolean;
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
  isProfilePage = false,
}) => {
  const [{ currentAccount }] = useRecoilState(loginDetails);

  const userDetails = {
    id,
    username,
    profileImage,
    coverImage,
    channelName,
    walletId,
    subscribers,
  };

  const isUserProfile =
    currentAccount?.toLowerCase() === walletId?.toLowerCase();

  const isUserAlreadySubscribed = subscribers?.some(
    (sub) => sub.toLowerCase() === currentAccount.toLowerCase()
  );

  const handleSubscribe = async () => {
    showWarningAlert(
      "NOTE",
      `This action cannot be undone. Are you sure you want to subscribe to this channel?`,
      async () => {
        await addSubscribe(id);
      }
    );
  };

  const isCEO = channelName === "SarathYT";

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
        referrerPolicy="no-referrer"
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
                <H2 className="flex items-center gap-2">
                  <span>{username}</span>

                  {isCEO && (
                    <div className="relative group">
                      <span className="hidden group-hover:block top-0.5 ml-8 w-[117px] absolute text-sm">
                        {"Verified & Founder"}
                      </span>

                      <BadgeCheckIcon className="w-6 h-6 text-sky-500" />
                    </div>
                  )}
                </H2>
                {channelName && <Label>Channel Name: {channelName}</Label>}
                {<Label>{subscribers.length} subscribers</Label>}
              </div>
            </div>

            <Button
              onClick={() => {
                if (!isUserAlreadySubscribed) handleSubscribe();
              }}
              className="bg-red-600 px-2 py-1 rounded-sm"
              disabled={isUserProfile || isUserAlreadySubscribed}
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

      {isProfilePage && (
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
