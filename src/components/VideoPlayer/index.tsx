import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { IVideoObj } from "../../types/interface";
import IconButton from "../IconButton";
import { ChevronDown, Maximize, PauseIcon, PlayIcon } from "lucide-react";
import cn from "../../utils/cn";
import Timeline from "./Timeline";
import useVideoStore from "./videoStore";
import { formatTime } from "./utils";
import { useNavigate } from "react-router";

interface Props extends IVideoObj {}

const VideoPlayer = ({ slug, thumbnailUrl, mediaUrl }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [mouseOver, setMouseOver] = useState(false);
  const navigate = useNavigate();

  const {
    isPipActive,
    setPipActive,
    isPlaying,
    duration,
    setDuration,
    clearVideo,
    updatePlaybackState,
    currentTime,
  } = useVideoStore();

  useLayoutEffect(() => {
    clearVideo();

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setPipActive(false);
    }

    const video = document.pictureInPictureElement as HTMLVideoElement | null;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    const videoEl = ref.current;
    if (!videoEl || !mediaUrl) return;

    const handleLoadedMetadata = () => {
      setDuration(ref.current!.duration);
    };

    const handleTimeUpdate = () => {
      updatePlaybackState(videoEl.currentTime, !videoEl.paused);
    };

    const handlePipClose = () => {
      setPipActive(false);
      document.exitPictureInPicture();
      clearVideo();

      const video = document.pictureInPictureElement as HTMLVideoElement | null;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("leavepictureinpicture", handlePipClose);
    videoEl.addEventListener("resize", handlePipClose);

    return () => {
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("leavepictureinpicture", handlePipClose);
    };
  }, [mediaUrl]);

  // reset state when slug changes and close pip if open
  useEffect(() => {
    // unmute after 0 seconds
    if (ref.current) {
      setTimeout(() => {
        ref.current!.muted = false;
      }, 2);
    }
  }, [ref.current, slug]);

  return (
    <div
      className="video-container relative w-full z-30 rounded-md overflow-hidden"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={() => {
        ref.current?.paused ? ref.current.play() : ref.current?.pause();
      }}
    >
      <video
        ref={ref}
        className="w-full aspect-video object-contain z-20"
        muted
        autoPlay
        poster={thumbnailUrl}
        playsInline
        controlsList="nodownload"
      >
        <source src={mediaUrl} type="video/mp4" />
        <p>
          Your browser doesn't support HTML5 video. Here is a{" "}
          <a href={mediaUrl}>link to the video</a>.
        </p>
      </video>

      <div
        className={cn(
          "controls absolute w-full left-0 right-0 top-0 hidden z-30",
          mouseOver && "flex flex-col justify-between h-full p-4",
          isPipActive && "hidden",
        )}
      >
        <div className="top w-full flex items-center justify-between gap-2">
          <IconButton
            Icon={ChevronDown}
            onClick={() => {
              ref.current?.requestPictureInPicture();
              setPipActive(true);
              // move user to home page
              navigate("/");
            }}
          />
          {/* <IconButton Icon={SettingsIcon} onClick={() => {}} /> */}
        </div>
        <div className="middle w-full flex items-center justify-center gap-2">
          {!isPlaying ? (
            <PlayIcon className="size-12 text-zinc-800 bg-white rounded-full p-1" />
          ) : (
            <PauseIcon className="size-12 text-zinc-800 bg-white rounded-full p-1" />
          )}
        </div>
        <div className="bottom w-full flex flex-col gap-2">
          <div className="other-actions flex items-center justify-between gap-2">
            <div className="time noselect bg-zinc-50 px-1 py-0.5 rounded-full text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className="full-screen">
              <IconButton Icon={Maximize} onClick={() => {}} />
            </div>
          </div>
          <Timeline videoRef={ref} />
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
