import { useMemo, useState } from "react";
import ALL_VIDEOS from "../../data";
import CategoryList from "./components/CategoryList";
import VideoCard from "../../components/VideoCard";
import type { IVideoObj } from "../../types/interface";

const HomePage = () => {
  const [category, setCategory] = useState<string>("all");

  const videos: IVideoObj[] = useMemo(() => {
    const videoList =
      category === "all"
        ? ALL_VIDEOS.map((v) =>
            v.contents.map((c) => ({
              ...c,
              categoryName: v.category.name,
              categorySlug: v.category.slug,
              categoryIconUrl: v.category.iconUrl,
            })),
          ).flat()
        : ALL_VIDEOS.filter((v) => v.category.slug === category)
            .map((v) =>
              v.contents.map((c) => ({
                ...c,
                categoryName: v.category.name,
                categorySlug: v.category.slug,
                categoryIconUrl: v.category.iconUrl,
              })),
            )
            .flat();

    return videoList;
  }, [category]);

  return (
    <div className="videos">
      <CategoryList category={category} setCategory={setCategory} />

      {videos.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">No videos found</div>
      ) : (
        <section className="video-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {videos.map((v) => (
            <VideoCard key={v.slug} {...v} setCategory={setCategory} />
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
