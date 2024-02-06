import { create } from "zustand";
import { apiUrl } from "../config";

export const appStore = create((set, get) => ({
  // # # # # # # # STORE DATA # # # # # # #
  user: {
    username: "notLogued",
  },
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA2Nzc5MzI1LCJleHAiOjE3MDkzNzEzMjV9.TP-ZoDuqhxEa73e-CKk0pzyiG49ifa9dJGsz46b3sBk",
  // jwt: "",
  disconnect: () => set((state) => ({ jwt: "" })),

  // # # # # # # # SECURE FETCH METHOD # # # # # # #
  fetchApi: async (endpoint, params, method, action) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + get().jwt,
        },
        body: method !== "GET" ? JSON.stringify(params) : null,
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
      return data;
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
  apiFetchTeenages: async () => {
    // console.log("call api", get().user.id);
    const userId = 3;
    const query = `filters[educator][id][$eq]=${userId}`;
    const response = await get().fetchApi(
      `/teenagers?${query}`,
      null,
      "GET",
      null
    );
    return response.data.map((t) => {
      // return "test";
      return { ...t.attributes, id: t.id };
    });
  },
}));
