import { create } from 'zustand';

export type ScrollMode = 'chaos' | 'drift' | 'warning' | 'order';

interface AppState {
    mode: ScrollMode;
    setMode: (mode: ScrollMode) => void;
}

export const useStore = create<AppState>((set) => ({
    mode: 'chaos',
    setMode: (mode) => set({ mode }),
}));
