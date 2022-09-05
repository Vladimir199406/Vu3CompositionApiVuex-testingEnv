import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State, TaskItem } from "./state";
import axios from "axios";

//enum Actions
export enum ActionTypes {
  GetTaskItems = "GET_Task_ITEMS",
  SetCreateModal = "SET_CREATE_MODAL",
  SetEditModal = "SET_EDIT_MODAL",
  CreateNewTask = "CREATE_NEW_TASK",
  RemoveTask = "REMOVE_TASK",

  CompleteTask = "COMPLETE_TASK",
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
  [ActionTypes.CreateNewTask](context: ActionAugments, task: TaskItem): void;
  [ActionTypes.RemoveTask](context: ActionAugments, task: TaskItem): void;

  [ActionTypes.CompleteTask](context: ActionAugments, task: TaskItem): void;
};

//delay local
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//export all actions
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTaskItems]({ commit }) {
    commit(MutationType.SetLoading, true);
    await sleep(1000);
    commit(MutationType.SetLoading, false);
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        commit(MutationType.SetTasks, response.data);
        console.log("tasks", response.data);
      })
      .catch((error) => {
        console.log("Erorr: ", error.message);
      });
  },
  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true);
  },
  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, { showModal: true, taskId: 1 });
  },
  async [ActionTypes.CreateNewTask]({ commit }, task: TaskItem) {
    await axios
      .post("http://localhost:3001/tasks", task)
      .then((response) => {
        commit(MutationType.SetTasks, response.data);
        console.log("Task created, new Tasks: ", response.data);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  },

  async [ActionTypes.RemoveTask]({ commit }, task: TaskItem) {
    await axios
      .delete(`http://localhost:3001/tasks/${task.id}`)
      .then((response) => {
        commit(MutationType.RemoveTask, task);
        console.log("Task was DELETED, new Tasks: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  },

  async [ActionTypes.CompleteTask]({ commit }, task: TaskItem) {
    await axios
      .patch(`http://localhost:3001/tasks/${task.id}`, {
        completed: task.completed ? true : false,
      })
      .then((response) => {
        commit(MutationType.CompleteTask, task);
        console.log("Task was COMPLEATED: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  },
};
