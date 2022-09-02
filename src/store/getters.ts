import { GetterTree } from "vuex";
import { State, TaskItem } from "./state";

//type Getters
export type Getters = {
  completedTaskCount(state: State): number;
  totalTaskCount(state: State): number;
  getTaskById(state: State): (id: number) => TaskItem | undefined;
};

//export all getters
export const getters: GetterTree<State, State> & Getters = {
  completedTaskCount(state) {
    return state.tasks.filter((element) => element.completed).length;
  },
  totalTaskCount(state) {
    return state.tasks.length;
  },
  getTaskById: (state) => (id: number) => {
    return state.tasks.find((task) => task.id === id);
  },
};
