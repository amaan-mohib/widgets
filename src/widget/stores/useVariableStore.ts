import { create } from "zustand";
import { IMedia, ISystemInformation } from "../types/variables";

export interface IVariableStore {
  currentDate: Date;
  media: IMedia[];
  currentMedia: IMedia | null;
  selectedMediaPlayer: string | null;
  systemInfo: Partial<ISystemInformation>;
}

export const useVariableStore = create<IVariableStore>(() => ({
  currentDate: new Date(),
  media: [],
  currentMedia: null,
  selectedMediaPlayer: null,
  systemInfo: {},
}));

export const useDynamicTextStore = create<
  Record<string, (format?: string) => string>
>(() => ({}));
