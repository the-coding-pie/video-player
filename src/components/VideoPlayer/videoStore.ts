import { create } from "zustand";
import type { IVideoObj } from "../../types/interface";

interface VideoStore {
  isPipActive: boolean;
  setPipActive: (active: boolean) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setDuration: (duration: number) => void;
  updatePlaybackState: (time: number, playing: boolean) => void;
  clearVideo: () => void;
}

const useVideoStore = create<VideoStore>((set) => ({
  isPipActive: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,

  setDuration: (duration) => set({ duration }),
  setPipActive: (active) => set({ isPipActive: active }),
  updatePlaybackState: (time, playing) =>
    set({ currentTime: time, isPlaying: playing }),
  clearVideo: () =>
    set({
      isPipActive: false,
      currentTime: 0,
      isPlaying: false,
      duration: 0,
    }),
}));

export default useVideoStore;
