export type Task = {
  title: string
  subTasks: number[]
  isOpen: boolean
};

export type Tasks = {
  [id: number]: Task
};

export type RestoreData = {
  task: Task
  selfId: number
  parentId: number
};

export type TodoState = {
  recentDeleted: RestoreData[]
  currentTaskId: number
  nextTaskId: number
  tasks: Tasks
};
