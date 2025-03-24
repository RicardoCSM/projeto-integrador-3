import { create } from 'zustand';

export interface GoogleOAuthTokenState {
  googleOAuthToken: string | null;
  setGoogleOAuthToken: (token: string) => void;
  removeGoogleOAuthToken: () => void;
}

export const useGoogleOAuthToken = create<GoogleOAuthTokenState>((set) => ({
  googleOAuthToken: null,
  setGoogleOAuthToken: (token) => set({ googleOAuthToken: token }),
  removeGoogleOAuthToken: () => set({ googleOAuthToken: null }),
}));
