import VideoCard from "@components/VideoCard";
import { SelectedVideoProps } from "pages/profile";
import React, { useState } from "react";
import { Component } from "types/page";
import { VideoProps } from "types/video";
import EditVideo from "./EditVideo";

type Props = {
  allVideos: VideoProps[];
};

const VideosContainer: React.FC<Component & Props> = ({ allVideos = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 desktop:grid-cols-6 gap-y-5 gap-x-10">
        {allVideos?.map((video) => (
          <VideoCard
            key={video.uuid}
            showOptions
            handleEdit={() => {
              setSelectedVideo({
                title: video.title,
                description: video.description,
                uuid: video.uuid,
                id: video.id,
              });

              setIsModalOpen(true);
            }}
            {...video}
          />
        ))}
      </div>

      <EditVideo
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoValues={selectedVideo as SelectedVideoProps}
      />
    </>
  );
};

export default VideosContainer;
