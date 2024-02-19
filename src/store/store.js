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
  evalTimes: null,
  snackbar: { on: false, text: "", error: false },
  currentEval: { answers: null, categories: null, id: null },
  currentIndexes: { catIndex: 0, catPrev: 0, critIndex: 0, critPrev: 0 },
  // UTILITIES
  resetSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, on: false } })),
  resetCurrentEval: () => set((state) => ({ currentEval: null })),
  changeCatIndex: (i) =>
    set((state) => ({
      currentIndexes: {
        ...state.currentIndexes,
        catIndex: i,
        catPrev: state.currentIndexes.catIndex,
      },
    })),
  changeCritIndex: (i) =>
    set((state) => ({
      currentIndexes: {
        ...state.currentIndexes,
        critIndex: i,
        critPrev: state.currentIndexes.critIndex,
      },
    })),

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
      } else {
        () => {
          get().showSnackbar("Problème réseau");
        };
      }
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      return "error";
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
        localStorage.setItem("entity", data.user?.email);
      },
      () => {
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
        `[evaluations][fields][1]=progression`,
        `[evaluations][fields][2]=latest`,
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
      },
      () => {
        get().showSnackbar("Problème réseau pour récupérer le jeune");
      }
    );
  },
  apiFetchTimes: async () => {
    const response = await get().fetchApi(
      `/evaluation-times`,
      null,
      "GET",
      ({ data }) => {
        set(() => ({
          evalTimes: data.map((time) => {
            return {
              id: time.id,
              ...time.attributes,
            };
          }),
        }));
      }
    );
    // return response?.data?.attributes.?evaluations?.data;
  },

  apiCreateEval: async (evaluation_time) => {
    const response = await get().fetchApi(
      `/evaluations`,
      { data: { evaluation_time, teenager: get().teen.id } },
      "POST",
      ({ data }) => {
        set((state) => ({ currentEval: data.attributes.answers }));
        get().showSnackbar("Démarrez l'évaluation");
      }
    );
    return !!response;
  },
  apiFetchEval: async (evalId) => {
    const query = queryMaker({
      fields: ["answers", "progression"],
    });
    const response = await get().fetchApi(
      `/evaluations/${evalId}?${query}`,
      null,
      "GET",
      ({ data }) => {
        set((state) => ({
          currentEval: {
            answers: data.attributes.answers,
            categories: data.attributes.progression,
            id: data.id,
          },
        }));
      }
    );
    return !!response;
  },
  apiAnswer: async (value) => {
    const cat_index = get().currentIndexes?.catIndex;
    const crit_index = get().currentIndexes?.critIndex;
    const id = get().currentEval?.id;
    const response = await get().fetchApi(
      `/evaluations/addanswer/${id}?cat_index=${cat_index}&crit_index=${crit_index}&value=${value}`,
      {},
      "POST",
      ({ data }) => {
        set((state) => ({
          currentEval: {
            ...state.currentEval,
            answers: data.attributes.answers,
          },
        }));
      }
    );

    return !!response;
  },
}));
