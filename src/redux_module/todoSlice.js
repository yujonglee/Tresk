/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import {
  addRestoreData,
  removeTaskIdFromParentSubTasks,
  removeTaskFromTasks,
} from './helper';

const initialState = {
  isLogBookOpen: false,
  recentDeleted: [],
  selectedTaskId: 0,
  nextTaskId: 1,
  tasks: {
    0: { title: 'root', subTasks: [], isOpen: true },
  },
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    addTask: (state, action) => {
      const { payload: newTaskTitle } = action;

      if (newTaskTitle === '') {
        return;
      }

      const newTask = { title: newTaskTitle, subTasks: [], isOpen: true };

      const { selectedTaskId, nextTaskId } = state;

      state.tasks[nextTaskId] = newTask;

      state.tasks[selectedTaskId].subTasks.unshift(nextTaskId);

      state.nextTaskId = nextTaskId + 1;
    },

    deleteTask: (state, action) => {
      const { payload: targetId } = action;

      state.selectedTaskId = 0;

      addRestoreData(state, targetId);

      removeTaskFromTasks(state, targetId);

      removeTaskIdFromParentSubTasks(state, targetId);
    },

    restoreTask: (state) => {
      if (state.recentDeleted.length === 0) {
        return;
      }

      if (state.recentDeleted.length === 1) {
        state.isLogBookOpen = false;
      }

      const restoreData = state.recentDeleted.pop();

      const { task, selfId, parentId } = restoreData;
      const { subTasks } = state.tasks[parentId];

      state.tasks[selfId] = task;
      state.tasks[parentId].subTasks = [...subTasks, selfId].sort().reverse();
    },

    updateSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },

    toggleSubTasksOpen: (state, action) => {
      const { payload: id } = action;
      const { isOpen } = state.tasks[id];

      state.tasks[id].isOpen = !isOpen;
    },

    toggleLogBookOpen: (state, action) => {
      const { payload: want } = action;

      state.isLogBookOpen = (want === undefined)
        ? !state.isLogBookOpen
        : want;
    },

    resetRecentDeleted: (state) => {
      state.recentDeleted = [];
    },
  },

});

export const {
  addTask,
  deleteTask,
  restoreTask,
  updateSelectedTaskId,
  toggleSubTasksOpen,
  resetRecentDeleted,
  toggleLogBookOpen,
} = actions;

export default reducer;
