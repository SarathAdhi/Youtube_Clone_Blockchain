import LoadingPage from "@components/Loading/LoadingPage";
import VideoCard from "@components/VideoCard";
import PageLayout from "@layouts/PageLayout";
import UserSection from "@modules/profile/UserSection";
import { userDetails as _userDetails } from "@utils/recoil";
import { getAllVideos, getUserProfile } from "@utils/video";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IsAuthProps } from "types/page";
import { User } from "types/user";
import { Video } from "types/video";

const ViewChannel = ({ isAuth }: IsAuthProps) => {
  const router = useRouter();

  const [allVideos, setAllVideos] = useState<(Video & User)[]>([]);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const [{ channelName }] = useRecoilState(_userDetails);

  const { id } = router.query;

  const getUserDetails = async (walletId: string) => {
    const data = await getUserProfile(walletId);
    setUserDetails(data);
  };

  const getChannelVideos = async () => {
    const data: (Video & User)[] = await getAllVideos();

    const filterMyVideos = data.filter((video) => video.channelName === id);

    setAllVideos(filterMyVideos);

    const walletId = filterMyVideos[0].owner;
    getUserDetails(walletId);
  };

  useEffect(() => {
    if (channelName === id) router.replace("/profile");

    if (isAuth) {
      getChannelVideos();
    }
  }, [id, isAuth]);

  if (allVideos.length === 0) return <LoadingPage />;

  return (
    <PageLayout title="Channel" className="gap-5">
      <UserSection isNewUser={false} {...(userDetails as User)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 desktop:grid-cols-6 gap-y-5 gap-x-10">
        {allVideos?.map((video) => (
          <VideoCard key={video.uuid} showOptions {...video} />
        ))}
      </div>
    </PageLayout>
  );
};

export default ViewChannel;
