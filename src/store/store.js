import { create } from "zustand";
import { apiUrl } from "../config";

export const appStore = create((set, get) => ({
  // # # # # # # # STORE DATA # # # # # # #
  user: {
    username: "notLogued",
  },
  jwt: "",
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  increaseJwt: () => set((state) => ({ jwt: state.jwt + "0" })),
  disconnect: () => set((state) => ({ jwt: "" })),

  // # # # # # # # FETCH METHOD # # # # # # #
  fetchApi: async (endpoint, params, method, action) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + get().jwt,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = data?.error?.message;
        throw new TypeError(error);
      }
      const data = await response.json();
      if (action) {
        action(data);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      // envoyer SNACK BAR
    }
  },
  // # # # # # # # api calls and actions # # # # # # #

  apiLogin: (params) =>
    get().fetchApi("/auth/local", params, "POST", (data) => {
      set({ user: data.user, jwt: data.jwt });
    }),
}));
