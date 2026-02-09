import { useRef, useState } from "react";
import useVideoStore from "./videoStore";

interface Props {
  videoRef: any;
}

const Timeline = ({ videoRef }: Props) => {
  const { currentTime, duration } = useVideoStore();

  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const timeline = timelineRef.current;
    const videoEl = videoRef.current;
    if (!timeline || !videoEl) return;

    e.stopPropagation();

    const rect = timeline.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoEl.currentTime = pos * duration;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSeek(e);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={timelineRef}
      className="timeline w-full h-2 bg-zinc-300/50 rounded-full cursor-pointer relative overflow-hidden"
      onClick={handleSeek}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="progress absolute top-0 left-0 h-full bg-purple-500 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default Timeline;
