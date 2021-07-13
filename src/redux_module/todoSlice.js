/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import {
  isEmpty, findIndex, equals, head, last, find, keys,
} from 'ramda';

import {
  includesTarget,
  addRestoreData,
  removeTaskIdFromParentSubTasks,
  removeTaskFromRemaingTasks,
} from './helper';

const initialState = {
  isLogBookOpen: false,
  completedTasks: [],
  selectedTaskId: 0,
  parentId: 0,
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

      const typed = (newTaskTitle !== '');

      if (!typed) {
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

      removeTaskFromRemaingTasks(state, targetId);

      removeTaskIdFromParentSubTasks(state, targetId);
    },

    restoreTask: (state) => {
      if (isEmpty(state.completedTasks)) {
        return;
      }

      const restoreData = state.completedTasks.pop();

      if (isEmpty(state.completedTasks)) {
        state.isLogBookOpen = false;
      }

      const { task, selfId, parentId } = restoreData;
      const { subTasks } = state.remainingTasks[parentId];

      state.remainingTasks[selfId] = task;
      state.remainingTasks[parentId].subTasks = [...subTasks, selfId].sort().reverse();
    },

    updateSelectedTaskId: (state, action) => {
      const { remainingTasks } = state;
      const { payload: target } = action;

      const parentId = find(
        includesTarget(remainingTasks, target),
        keys(remainingTasks),
      );

      state.parentId = parseInt(parentId, 10);

      state.selectedTaskId = target;
    },

    toggleSubTasksOpen: (state, action) => {
      const { payload: id } = action;
      const { isOpen } = state.remainingTasks[id];

      state.remainingTasks[id].isOpen = !isOpen;
    },

    toggleLogBookOpen: (state, action) => {
      const { payload: want } = action;

      state.isLogBookOpen = want ?? !state.isLogBookOpen;
    },

    emptyCompletedTasks: (state) => {
      state.completedTasks = [];
    },

    selectNext: (state) => {
      const { selectedTaskId, parentId } = state;
      const { subTasks } = state.remainingTasks[parentId];

      if ((selectedTaskId === 0) || (selectedTaskId === last(subTasks))) {
        return;
      }

      const currentIndex = findIndex(equals(selectedTaskId), subTasks);

      state.selectedTaskId = subTasks[currentIndex + 1];
    },

    selectPrevious: (state) => {
      const { selectedTaskId, parentId } = state;
      const { subTasks } = state.remainingTasks[parentId];

      if ((selectedTaskId === 0) || (selectedTaskId === head(subTasks))) {
        return;
      }

      const currentIndex = findIndex(equals(selectedTaskId), subTasks);

      state.selectedTaskId = subTasks[currentIndex - 1];
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
  selectNext,
  selectPrevious,
} = actions;

export default reducer;
