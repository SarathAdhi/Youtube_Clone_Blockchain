import Loading from "@components/Loading";
import PageLayout from "@layouts/PageLayout";
import UserSection from "@modules/profile/UserSection";
import VideosContainer from "@modules/profile/VideosContainer";
import { loginDetails, userDetails as _userDetails } from "@utils/recoil";
import { getAllVideos, getMyProfile } from "@utils/video";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "types/user";
import { Video, VideoProps } from "types/video";

export type SelectedVideoProps = {
  title: string;
  description: string;
  uuid: string;
  id: Video["id"];
};

const ViewProfile = () => {
  const [{ currentAccount }] = useRecoilState(loginDetails);
  const [userDetails, setUserDetails] = useRecoilState(_userDetails);

  const [isLoading, setIsLoading] = useState(true);
  const [allVideos, setAllVideos] = useState<VideoProps[]>([]);

  const getChannelVideos = async () => {
    const data: VideoProps[] = await getAllVideos();

    const filterMyVideos = data.filter(
      (video) => video.owner.toLowerCase() === currentAccount.toLowerCase()
    );

    setAllVideos(filterMyVideos);

    setIsLoading(false);
  };

  const getUserDetails = async () => {
    const data = await getMyProfile();
    setUserDetails(data);
  };

  useEffect(() => {
    getUserDetails();

    const getVideosInterval = setInterval(() => getChannelVideos(), 2000);

    return () => {
      clearInterval(getVideosInterval);
    };
  }, [currentAccount]);

  const isNewUser = !userDetails.username;

  // console.log(userDetails);

  return (
    <PageLayout title="My Profile" className="gap-10">
      <UserSection isNewUser={isNewUser} {...userDetails} />

      {isLoading && <Loading className="w-6 h-6 mx-auto" />}

      <VideosContainer allVideos={allVideos} />
    </PageLayout>
  );
};

export default ViewProfile;
