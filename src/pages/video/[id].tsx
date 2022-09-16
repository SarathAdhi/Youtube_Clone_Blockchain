import LinkedItem from "@components/LinkedItem";
import LoadingPage from "@components/Loading/LoadingPage";
import VideoCard from "@components/VideoCard";
import Button from "@elements/Button";
import { H3, Label, P } from "@elements/Text";
import {
  ThumbUpIcon as ThumbUpIconSL,
  ThumbDownIcon as ThumbDownIconSL,
} from "@heroicons/react/solid";
import {
  ThumbUpIcon as ThumbUpIconOL,
  ThumbDownIcon as ThumbDownIconOL,
} from "@heroicons/react/outline";
import PageLayout from "@layouts/PageLayout";
import {
  allVideos as _allVideos,
  userDetails as _userDetails,
} from "@utils/recoil";
import {
  addDisLikes,
  addLikes,
  addSubscribe,
  addViews,
  getUserProfile,
  getVideoByUuid,
} from "@utils/video";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IsAuthProps } from "types/page";
import { User } from "types/user";
import { Video, VideoProps } from "types/video";
import { showWarningAlert } from "@utils/alert";

const ViewVideo = ({ isAuth }: IsAuthProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [videoDetails, setVideoDetails] = useState<VideoProps | null>(null);
  const [isAllowed, setIsAllowed] = useState(true);
  const [userDetails, setUserDetails] = useState<User>();

  const [allVideos] = useRecoilState(_allVideos);
  const [{ walletId }] = useRecoilState(_userDetails);

  const addViewsAndAllow = async (id: any, view: number) => {
    const result = await addViews(id);
    setIsAllowed(result);

    return view + 1;
  };

  const getUserDetails = async (walletId: string) => {
    const data = await getUserProfile(walletId);
    setUserDetails(data);
  };

  const getVideoById = async () => {
    const data = await getVideoByUuid(id as string);
    setVideoDetails(data);
    getUserDetails(data.owner);

    // const views = await addViewsAndAllow(data?.id, data?.views.toNumber());
    // setVideoDetails({ ...data, views });
  };

  useEffect(() => {
    if (isAuth) getVideoById();
    // else router.replace("/");
  }, [id, isAuth]);

  if (!id || !videoDetails) return <LoadingPage />;

  const addLikeOrDislike = async (method: string) => {
    showWarningAlert(
      "NOTE",
      `This action cannot be undone. Are you sure you want to ${method} this video.`,
      async () => {
        if (method === "like") {
          await addLikes(videoDetails.id);

          setVideoDetails({
            ...videoDetails,
            likes: [...videoDetails.likes, walletId],
          });
          return;
        }

        await addDisLikes(videoDetails.id);

        setVideoDetails({
          ...videoDetails,
          dislikes: [...videoDetails.dislikes, walletId],
        });
      }
    );
  };

  const handleSubscribe = async () => {
    await addSubscribe(videoDetails.owner);
  };

  const {
    title,
    cids,
    channelName,
    profileImage,
    views,
    description,
    likes,
    dislikes,
  } = videoDetails;

  const isUserLikedTheVideo = likes.some(
    (id) => walletId.toLowerCase() === id.toLowerCase()
  );

  const isUserDisLikedTheVideo = dislikes.some(
    (id) => walletId.toLowerCase() === id.toLowerCase()
  );

  const isUserAllowedToLikeOrDislike =
    isUserLikedTheVideo || isUserDisLikedTheVideo;

  const isUserAlreadySubscribed = userDetails?.subscribers?.some(
    (sub) => sub.toLowerCase() === walletId.toLowerCase()
  );

  const video = `https://${cids[0]}.ipfs.dweb.link/${cids[1]}`;

  return (
    <>
      {isAllowed ? (
        <PageLayout title={title} className="my-5">
          <div className="flex flex-col gap-5 items-center ">
            <video className="w-full h-full max-h-[80vh]" controls>
              <source src={video} type="video/mp4" />
            </video>

            <div className="w-full max-w-screen-2xl grid lg:grid-cols-5 gap-10">
              <div className="col-span-3 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <H3 className="!font-medium grid">
                    {title}

                    <span className="!text-base !font-medium">
                      {Number.isInteger(views) ? views : views.toNumber()} views
                    </span>
                  </H3>

                  <div className="flex flex-col justify-between gap-5">
                    <Button
                      onClick={handleSubscribe}
                      className="px-2 py-1 bg-red-600 rounded-md"
                      disabled={isUserAlreadySubscribed}
                    >
                      {isUserAlreadySubscribed ? "Subscribed" : "Subscribe"}
                    </Button>

                    <div className="flex items-center gap-5">
                      <Button
                        onClick={() => addLikeOrDislike("like")}
                        disabled={isUserAllowedToLikeOrDislike}
                        className="flex items-center gap-1"
                      >
                        {isUserLikedTheVideo ? (
                          <ThumbUpIconSL className="w-6 h-6" />
                        ) : (
                          <ThumbUpIconOL className="w-6 h-6" />
                        )}

                        {likes.length}
                      </Button>

                      <Button
                        onClick={() => addLikeOrDislike("dislike")}
                        disabled={isUserAllowedToLikeOrDislike}
                        className="flex items-center gap-1"
                      >
                        {isUserDisLikedTheVideo ? (
                          <ThumbDownIconSL className="w-6 h-6" />
                        ) : (
                          <ThumbDownIconOL className="w-6 h-6" />
                        )}

                        {dislikes.length}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 border-t-[2px] border-[#303030] pt-5">
                  <LinkedItem
                    href={`/channel/${channelName}`}
                    className="group flex gap-3"
                  >
                    <img
                      src={profileImage}
                      className="w-10 h-10 rounded-full"
                    />

                    <P className="cursor-pointer">
                      <span>{channelName}</span>

                      <Label>
                        {userDetails?.subscribers.length} subscribers
                      </Label>
                    </P>
                  </LinkedItem>
                </div>

                <P>{description}</P>
              </div>

              <div className="col-span-2 w-full flex flex-col gap-5">
                {allVideos.map((video) => {
                  if (video.uuid !== id)
                    return <VideoCard key={video.uuid} isMini {...video} />;
                })}
              </div>
            </div>
          </div>
        </PageLayout>
      ) : (
        <LoadingPage>
          <P className="mt-2 text-center">
            Waiting for the transaction to get approved
          </P>
        </LoadingPage>
      )}
    </>
  );
};

export default ViewVideo;