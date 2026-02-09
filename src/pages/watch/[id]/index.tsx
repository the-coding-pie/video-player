import { useMemo } from "react";
import { Link, useParams } from "react-router";
import ALL_VIDEOS from "../../../data";
import type { IVideoObj } from "../../../types/interface";
import RelatedVideoList from "./components/RelatedVideoList";
import VideoPlayer from "../../../components/VideoPlayer";

const DetailPage = () => {
  const { id } = useParams();

  const video = useMemo(() => {
    // fetch video url by id
    const v: IVideoObj | undefined = ALL_VIDEOS.map((v) =>
      v.contents.map((c) => ({
        ...c,
        categoryName: v.category.name,
        categorySlug: v.category.slug,
        categoryIconUrl: v.category.iconUrl,
      })),
    )
      .flat()
      .find((c) => c.slug === id);

    return v;
  }, [id]);

  if (!video) {
    return (
      <div className="flex flex-col w-full flex-1 gap-4 items-center justify-center">
        <h3 className="text-2xl">This Video isn't available anymore.</h3>
        <Link
          className="bg-zinc-800 text-white px-4 py-2 rounded-md w-max cursor-pointer text-sm"
          to="/"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl w-full mx-auto">
      <VideoPlayer key={video.slug} {...video} />

      <RelatedVideoList
        categorySlug={video.categorySlug}
        currentVideoSlug={video.slug}
      />
    </div>
  );
};

export default DetailPage;
