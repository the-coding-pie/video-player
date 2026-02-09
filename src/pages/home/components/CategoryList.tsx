import { useMemo, type Dispatch, type SetStateAction } from "react";
import ALL_VIDEOS from "../../../data";
import cn from "../../../utils/cn";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryList = ({ category, setCategory }: Props) => {
  const allCategories = useMemo(() => {
    const categories = ALL_VIDEOS.map((v) => ({
      slug: v.category.slug,
      name: v.category.name,
      iconUrl: v.category.iconUrl,
    }));
    return [
      {
        slug: "all",
        name: "All",
        iconUrl: "",
      },
      ...categories,
    ];
  }, []);

  return (
    <div className="categories flex items-center gap-2 overflow-x-auto w-full invisible-scrollbar">
      {allCategories.map((c) => (
        <div
          key={c.slug}
          className={cn(
            "category-card bg-zinc-100 rounded-md flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-semibold text-nowrap",
            category === c.slug && "bg-zinc-800 border-zinc-800 text-white",
          )}
          onClick={() => setCategory(c.slug)}
        >
          {c.iconUrl && (
            <img
              src={c.iconUrl}
              alt={c.name}
              className="category-icon w-5 h-5 object-contain"
            />
          )}
          <span>{c.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
