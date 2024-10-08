import { create } from "zustand";

type OpenAccountState = {
  isOpen: boolean;
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccount = create<OpenAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
