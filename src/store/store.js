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
  currentEval: {
    answers: null,
    categories: null,
    id: null,
    lastCat: null,
    months: null,
    status: null,
  },
  currentIndexes: { catIndex: 0, catPrev: 0, critIndex: 0, critPrev: 0 },
  showPastEvals: false,
  pastEvals: null,
  // UTILITIES
  resetTeen: () => set((state) => ({ teen: null })),
  resetSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, on: false } })),
  resetCurrentEval: () =>
    set((state) => ({
      currentEval: {
        answers: null,
        categories: null,
        id: null,
        lastCat: null,
        months: null,
        status: null,
      },
      currentIndexes: { catIndex: 0, catPrev: 0, critIndex: 0, critPrev: 0 },
      pastEvals: null,
      showPastEvals: false,
    })),
  changeCatIndex: (i) => {
    set((state) => ({
      currentIndexes: {
        ...state.currentIndexes,
        catIndex: i,
        catPrev: state.currentIndexes.catIndex,
      },
    }));
  },
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
  togglePastEvals: () =>
    set((state) => ({ showPastEvals: !state.showPastEvals })),
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
        get().showSnackbar("bienvenue " + data.user?.username);
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
      fields: ["first_name", "last_name", "birth_date", "exit_date"],
      filters: [
        `[educator][id][$eq]=${get().user.id}`,
        `[exit_date][$null]=true`,
      ],
      populate: ["[photo][fields][0]=url"],
    });
    const response = await get().fetchApi(
      `/teenagers?${query}`,
      null,
      "GET",
      // on success
      () => {
        // get().showSnackbar(`Bienvenue ${get().user.username}`);
      },
      // on fail - especially if token not available anymore
      () => {
        get().showSnackbar("Vous devez vous re-connecter", true);
        get().disconnect();
      }
    );
    return response.data.map((t) => {
      return {
        ...t.attributes,
        id: t.id,
        photo: t.attributes?.photo?.data?.attributes?.url,
      };
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
        "[photo][fields][0]=url",
      ],
    });

    const response = await get().fetchApi(
      `/teenagers/${teenId}?${query}`,
      null,
      "GET",
      async ({ data }) => {
        // first let's get evalTime if they haven't been fetched yet
        if (!get().evalTimes) {
          await get().apiFetchTimes();
        }
        const evalTimes = get().evalTimes;
        // if no eval available at all : initiate the first and last eval
        if (data.attributes?.evaluations?.data.length === 0) {
          // create first
          await get().apiCreateEval(evalTimes[0].id, data.id);
          // create last
          await get().apiCreateEval(
            evalTimes[evalTimes.length - 1].id,
            data.id
          );
          // then REFECTH TEEN because those 2 evals have just been created
          await get().apiFetchOneTeen(teenId);
          get().showSnackbar(
            "Bienvenu dans ton parcours " + data.attributes.first_name
          );

          // otherwise, it's okay to set teen in the store. Then profile page will display ok
        } else {
          set(() => ({
            teen: {
              id: data.id,
              ...data?.attributes,
              evaluations: data.attributes?.evaluations?.data,
              photo: data.attributes?.photo?.data?.attributes?.url,
            },
          }));
        }
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

  apiCreateEval: async (evaluation_time, teenIdparam) => {
    const response = await get().fetchApi(
      `/evaluations`,
      { data: { evaluation_time, teenager: teenIdparam || get().teen.id } },
      "POST",
      ({ data }) => {
        // refetch teen to show new unlocked eval
        const teenId = get().teen?.id;
        teenId && get().apiFetchOneTeen(teenId);
        // SnackBar
        if (!teenIdparam) {
          get().showSnackbar(
            "Vos résultats ont bien été envoyés. Le prochain questionnaire est disponible"
          );
        }
      }
    );
    return !!response;
  },
  apiFetchEval: async (evalId, catPos, evalMonths) => {
    const query = queryMaker({
      fields: ["answers", "progression", "status"],
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
            lastCat: data.attributes?.progression?.length - 1,
            months: evalMonths,
            status: data.attributes.status,
          },
          currentIndexes: {
            ...state.currentIndexes,
            catIndex: catPos,
          },
        }));
      }
    );
    return !!response;
  },

  // # # # # # # # SCREEN EVALUATION # # # # # # #

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

        if (
          get().currentIndexes.catPos === data.attributes.progression.length
        ) {
          const complete = data.attributes.progression.reduce(
            (acc, p) => acc === true && p.percent === 100,
            true
          );
          if (complete) {
            get().showSnackbar(
              "Vous avez complété le questionnaire, vous pouvez désormais la valider"
            );
          }
        }
      }
    );

    return !!response;
  },
  apiProduceResults: async (evalId) => {
    const response = await get().fetchApi(
      `/results/produceresults/${evalId}`,
      {},
      "POST",
      () => {
        get().apiUpdateEvaluation(evalId);
      },
      ({ data }) => {
        get().showSnackbar(
          "Il y a eu un problème avec l'envoi du questionnaire",
          true
        );
        throw new TypeError("error");
      }
    );
    return !!response;
  },
  apiUpdateEvaluation: async (evalId) => {
    const now = new Date();
    const response = await get().fetchApi(
      `/evaluations/${evalId}`,
      {
        data: {
          status: "finished",
          submission_date: now.toISOString().split("T")[0],
        },
      },
      "PUT",
      async ({ data }) => {
        await get().apiFetchOneTeen(get().teen.id);
        get().showSnackbar("Le questionnaire a bien été envoyé, merci !");
      },
      ({ data }) => {
        get().showSnackbar(
          "Il y a eu un problème avec la mise à jour du statut du questionnaire",
          true
        );
      }
    );
    return !!response;
  },
  apiFetchPastEvals: async () => {
    const query = queryMaker({
      fields: ["answers"],
      filters: [
        `[teenager][id][$eq]=${get().teen.id}`,
        `[evaluation_time][months][$lt]=${get().currentEval?.months}`,
      ],
      populate: [`[evaluation_time][fields][0]=months`],
    });
    const response = await get().fetchApi(
      `/evaluations?${query}`,
      null,
      "GET",
      // on success
      (data) => {
        set((state) => ({
          pastEvals: data?.data.map((ev) => ({
            answers: ev?.attributes?.answers,
            months: ev?.attributes?.evaluation_time?.data?.attributes?.months,
          })),
        }));
      },
      () => {
        get().showSnackbar(
          "Echec de récupération des anciennes évaluations",
          true
        );
      }
    );
    return !!response;
  },
}));
