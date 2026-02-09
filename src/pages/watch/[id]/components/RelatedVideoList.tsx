import { useMemo } from "react";
import ALL_VIDEOS from "../../../../data";
import VideoCard from "../../../../components/VideoCard";
import type { IVideoObj } from "../../../../types/interface";

interface Props {
  categorySlug: string;
  currentVideoSlug: string;
}

const RelatedVideoList = ({ currentVideoSlug, categorySlug }: Props) => {
  const relatedVideos = useMemo(() => {
    // find related videos based on categorySlug and exclude currentVideoSlug
    const videos: IVideoObj[] = ALL_VIDEOS.filter(
      (v) => v.category.slug === categorySlug,
    )
      .map((v) =>
        v.contents
          .filter((c) => c.slug !== currentVideoSlug)
          .map((c) => ({
            ...c,
            categoryName: v.category.name,
            categorySlug: v.category.slug,
            categoryIconUrl: v.category.iconUrl,
          })),
      )
      .flat();

    return videos;
  }, [categorySlug, currentVideoSlug]);

  return !relatedVideos.length ? (
    <div className="text-center text-gray-500 mt-20">
      No related videos found
    </div>
  ) : (
    <section className="related-video-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {relatedVideos.map((v) => (
        <VideoCard key={v.slug} {...v} />
      ))}
    </section>
  );
};
export default RelatedVideoList;
