/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import {
  isEmpty, findIndex, equals, head, last,
} from 'ramda';

import {
  addRestoreData,
  removeTaskIdFromParentSubTasks,
  removeTaskFromRemaingTasks,
  findParentWithId,
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

      state.remainingTasks[selectedTaskId].subTasks.push(nextTaskId);

      const newTask = { title: newTaskTitle, subTasks: [], isOpen: true };

      state.remainingTasks[nextTaskId] = newTask;
    },

    deleteTask: (state, action) => {
      const { payload: targetId } = action;

      state.selectedTaskId = 0;
      state.parentId = 0;

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
      state.remainingTasks[parentId].subTasks = [...subTasks, selfId].sort();
    },

    selectNewTask: (state, action) => {
      const { remainingTasks } = state;
      const { payload: target } = action;

      if (target === 0) {
        state.parentId = 0;

        state.selectedTaskId = 0;

        return;
      }

      const parentId = findParentWithId(remainingTasks, target);

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

      const isLast = [0, last(subTasks)].includes(selectedTaskId);

      if (isLast) {
        return;
      }

      const currentIndex = findIndex(equals(selectedTaskId), subTasks);

      state.selectedTaskId = subTasks[currentIndex + 1];
    },

    selectPrevious: (state) => {
      const { selectedTaskId, parentId } = state;
      const { subTasks } = state.remainingTasks[parentId];

      const isFirst = [0, head(subTasks)].includes(selectedTaskId);

      if (isFirst) {
        return;
      }

      const currentIndex = findIndex(equals(selectedTaskId), subTasks);

      state.selectedTaskId = subTasks[currentIndex - 1];
    },

    selectInside: (state) => {
      const { selectedTaskId, remainingTasks } = state;

      const isInnerMost = isEmpty(remainingTasks[selectedTaskId].subTasks);

      if (isInnerMost) {
        return;
      }

      const { subTasks: [first] } = remainingTasks[selectedTaskId];

      state.parentId = selectedTaskId;
      state.selectedTaskId = first;
    },

    selectOutside: (state) => {
      const { selectedTaskId, parentId, remainingTasks } = state;

      const isOuterMost = selectedTaskId === 0;

      if (isOuterMost) {
        return;
      }

      state.selectedTaskId = parentId;
      state.parentId = findParentWithId(remainingTasks, parentId);
    },
  },
});

export const {
  addTask,
  deleteTask,
  restoreTask,
  selectNewTask,
  toggleSubTasksOpen,
  toggleLogBookOpen,
  emptyCompletedTasks,
  selectNext,
  selectPrevious,
  selectInside,
  selectOutside,
} = actions;

export default reducer;
