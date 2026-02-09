import type { Dispatch, SetStateAction } from "react";
import type { IVideoObj } from "../../types/interface";
import { Link } from "react-router";
import cn from "../../utils/cn";

interface Props extends IVideoObj {
  setCategory?: Dispatch<SetStateAction<string>>;
}

const VideoCard = ({
  title,
  thumbnailUrl,
  categoryName,
  categorySlug,
  slug,
  setCategory,
}: Props) => {
  return (
    <Link to={`/watch/${slug}`}>
      <div className="video-card flex flex-col cursor-pointer hover:bg-purple-100 rounded-md p-2">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg"
        />

        <h3 className="mt-2 font-semibold line-clamp-2" title={title}>
          {title}
        </h3>

        <div className="other-info">
          <div
            className={cn(
              "category text-sm text-zinc-500",
              setCategory && "hover:underline cursor-pointer",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setCategory && setCategory(categorySlug);
            }}
          >
            {categoryName}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default VideoCard;
