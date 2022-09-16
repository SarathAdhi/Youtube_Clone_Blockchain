import LinkedItem from "@components/LinkedItem";
import Loading from "@components/Loading";
import VideoCard from "@components/VideoCard";
import PageLayout from "@layouts/PageLayout";
import { allVideos as _allVideos, loginDetails } from "@utils/recoil";
import { getAllVideos } from "@utils/video";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Home: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allVideos, setAllVideos] = useRecoilState(_allVideos);
  const [{ currentAccount }] = useRecoilState(loginDetails);

  const fetchAllVideos = async () => {
    const data = await getAllVideos();
    setAllVideos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentAccount) {
      const fetchPollsInterval = setInterval(() => fetchAllVideos(), 2000);

      return () => {
        clearInterval(fetchPollsInterval);
      };
    }
  }, [currentAccount]);

  const searchParams = router.query.search as string;

  const filteredVideos = allVideos.filter((video) =>
    searchParams
      ? video.title.toLowerCase().includes(searchParams.toLowerCase())
      : video
  );

  console.log(filteredVideos);

  return (
    <PageLayout title="Home" className="">
      {isLoading && (
        <Loading className="absolute top-[50%] left-[50%] w-8 h-8" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 desktop:grid-cols-6 gap-y-5 gap-x-10">
        {filteredVideos?.map((video) => (
          <VideoCard key={video.uuid} {...video} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
