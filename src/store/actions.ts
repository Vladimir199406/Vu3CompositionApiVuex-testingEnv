import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

//enum Actions
export enum ActionTypes {
  GetTaskItems = "GET_Task_ITEMS",
  SetCreateModal = "SET_CREATE_MODAL",
  SetEditModal = "SET_EDIT_MODAL",
}

//type ActionAugments
type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

//type Actions
export type Actions = {
  [ActionTypes.GetTaskItems](context: ActionAugments): void;
  [ActionTypes.SetCreateModal](context: ActionAugments): void;
  [ActionTypes.SetEditModal](context: ActionAugments): void;
};

//delay local
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//export all actions
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTaskItems]({ commit }) {
    commit(MutationType.SetLoading, true);
    await sleep(1000);
    commit(MutationType.SetLoading, false);
    commit(MutationType.SetTasks, [
      {
        id: 1,
        title: "Create a new programming language",
        description:
          "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
        createdBy: "lorem lorem",
        assignedTo: "lorem lorem",
        completed: false,
        editing: false,
      },
    ]);
  },
  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true);
  },
  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, { showModal: true, taskId: 1 });
  },
};
