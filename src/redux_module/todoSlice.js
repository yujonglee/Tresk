/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import {
  addRestoreData,
  removeTaskIdFromParentSubTasks,
  removeTaskFromTasks,
} from './helper';

const initialState = {
  isLogBookOpen: false,
  completedTasks: [],
  selectedTaskId: 0,
  nextTaskId: 1,
  remainingTasks: {
    0: { title: 'root', subTasks: [], isOpen: true },
  },
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    addTask: (state, action) => {
      const { selectedTaskId, nextTaskId } = state;
      const { payload: newTaskTitle } = action;

      const nothingIsTyped = newTaskTitle === '';

      if (nothingIsTyped) {
        return;
      }

      state.nextTaskId = nextTaskId + 1;

      state.remainingTasks[selectedTaskId].subTasks.unshift(nextTaskId);

      const newTask = { title: newTaskTitle, subTasks: [], isOpen: true };

      state.remainingTasks[nextTaskId] = newTask;
    },

    deleteTask: (state, action) => {
      const { payload: targetId } = action;

      state.selectedTaskId = 0;

      addRestoreData(state, targetId);

      removeTaskFromTasks(state, targetId);

      removeTaskIdFromParentSubTasks(state, targetId);
    },

    restoreTask: (state) => {
      if (state.completedTasks.length === 0) {
        return;
      }

      if (state.completedTasks.length === 1) {
        state.isLogBookOpen = false;
      }

      const restoreData = state.completedTasks.pop();

      const { task, selfId, parentId } = restoreData;
      const { subTasks } = state.remainingTasks[parentId];

      state.remainingTasks[selfId] = task;
      state.remainingTasks[parentId].subTasks = [...subTasks, selfId].sort().reverse();
    },

    updateSelectedTaskId: (state, action) => {
      const { payload: id } = action;

      state.selectedTaskId = id;
    },

    toggleSubTasksOpen: (state, action) => {
      const { payload: id } = action;
      const { isOpen } = state.remainingTasks[id];

      state.remainingTasks[id].isOpen = !isOpen;
    },

    toggleLogBookOpen: (state, action) => {
      const { payload: want } = action;

      state.isLogBookOpen = (want === undefined)
        ? !state.isLogBookOpen
        : want;
    },

    emptyCompletedTasks: (state) => {
      state.completedTasks = [];
    },
  },

});

export const {
  addTask,
  deleteTask,
  restoreTask,
  updateSelectedTaskId,
  toggleSubTasksOpen,
  emptyCompletedTasks,
  toggleLogBookOpen,
} = actions;

export default reducer;
