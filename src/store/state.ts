// type TaskItem
export type TaskItem = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  completed: boolean;
  editing: boolean;
};

// type State
export type State = {
  loading: boolean;
  tasks: TaskItem[];
  showCreateModal: boolean;
  showEditModal: boolean;
  showTaskModal: boolean;
  editModalTaskId: number | null;
  showTaskId: number | null;
};

// State
export const state: State = {
  loading: false,
  tasks: [],
  showCreateModal: false,
  showEditModal: false,
  showTaskModal: false,
  editModalTaskId: null,
  showTaskId: null,
};
