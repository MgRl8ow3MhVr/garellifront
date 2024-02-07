import { create } from "zustand";
import { apiUrl } from "../config";

export const appStore = create((set, get) => ({
  // # # # # # # # STORE DATA # # # # # # #
  user: {
    jwt: localStorage.getItem("jwt") || "",
    id: localStorage.getItem("id") || "",
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
  },
  snackbar: { on: false, text: "", error: false },
  resetSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, on: false } })),
  showSnackbar: (text, error = false) =>
    set(() => ({ snackbar: { on: true, text, error } })),
  disconnect: () => {
    localStorage.clear();
    set(() => ({
      user: {
        jwt: "",
        id: "",
        username: "",
        email: "",
      },
    }));
  },

  // # # # # # # # SECURE FETCH METHOD # # # # # # #
  fetchApi: async (endpoint, params, method, successAction, failAction) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + get().user.jwt,
        },
        body: method !== "GET" ? JSON.stringify(params) : null,
      });

      if (!response.ok) {
        const data = await response.json();
        const error = data?.error?.message;
        throw new TypeError(error);
      }
      const data = await response.json();
      if (successAction) {
        successAction(data);
      }
      return data;
    } catch (error) {
      if (failAction) {
        failAction(error);
      }
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  },

  // # # # # # # # LOGIN AND TOKEN HANDLING # # # # # # #

  apiLogin: (params) =>
    get().fetchApi(
      "/auth/local",
      params,
      "POST",
      (data) => {
        get().showSnackbar("bienvenue bogoss");
        set({
          user: {
            jwt: data.jwt,
            id: data.user?.id,
            username: data.user?.username,
            email: data.user?.email,
          },
        });
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("id", data.user?.id);
        localStorage.setItem("username", data.user?.username);
        localStorage.setItem("email", data.user?.email);
      },
      (data) => {
        get().showSnackbar("Identifiant ou mot de passe non reconnu", true);
      }
    ),

  // # # # # # # # CALLS # # # # # # #

  apiFetchTeenages: async () => {
    // This is this the first call after automatic login.
    // So jwt and user infos might be expired
    const query = `filters[educator][id][$eq]=${get().user.id}`;
    const response = await get().fetchApi(
      `/teenagers?${query}`,
      null,
      "GET",
      () => {
        get().showSnackbar(`Bienvenue ${get().user.username}`);
      },
      () => {
        get().showSnackbar("Vous devez vous re-connecter", true);
        get().disconnect();
      }
    );
    return response.data.map((t) => {
      return { ...t.attributes, id: t.id };
    });
  },
}));
