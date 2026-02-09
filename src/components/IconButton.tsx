import type { LucideProps } from "lucide-react";

interface Props {
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
const IconButton = ({ Icon, onClick }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="p-2 rounded-full hover:bg-zinc-200 cursor-pointer bg-zinc-50"
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};
export default IconButton;
