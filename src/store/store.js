import { create } from "zustand";
import { apiUrl } from "../config";
import { queryMaker } from "../utils/utils";

export const appStore = create((set, get) => ({
  // # # # # # # # STORE DATA # # # # # # #
  user: {
    jwt: localStorage.getItem("jwt") || "",
    id: localStorage.getItem("id") || "",
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
  },
  teen: null,
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

  // # # # # # # # SCREEN FIND-TEENAGE # # # # # # #

  apiFetchTeenages: async () => {
    // This is this the first call after automatic login.
    // So jwt and user infos might be expired -- see fail action
    const query = queryMaker({
      fields: ["first_name", "last_name", "birth_date"],
      filters: [`[educator][id][$eq]=${get().user.id}`],
    });
    const response = await get().fetchApi(
      `/teenagers?${query}`,
      null,
      "GET",
      // on success
      () => {
        get().showSnackbar(`Bienvenue ${get().user.username}`);
      },
      // on fail - especially if token not available anymore
      () => {
        get().showSnackbar("Vous devez vous re-connecter", true);
        get().disconnect();
      }
    );
    return response.data.map((t) => {
      return { ...t.attributes, id: t.id };
    });
  },

  // # # # # # # # SCREEN TEEN PROFILE # # # # # # #

  apiFetchOneTeen: async (teenId) => {
    const query = queryMaker({
      populate: [
        `[evaluations][fields][0]=status`,
        `[evaluations][populate][0]=evaluation_time`,
      ],
    });

    const response = await get().fetchApi(
      `/teenagers/${teenId}?${query}`,
      null,
      "GET",
      ({ data }) => {
        set(() => ({
          teen: {
            id: data.id,
            ...data?.attributes,
            evaluations: data.attributes?.evaluations?.data,
          },
        }));
        get().showSnackbar(`Yessaie`);
      },
      () => {
        get().showSnackbar("Il y a eu un pb avec le gars");
      }
    );
    // console.log("res", response.data);
    // return response?.data?.attributes.?evaluations?.data;
  },
}));
