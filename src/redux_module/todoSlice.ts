/* eslint-disable no-param-reassign */

import * as R from 'ramda';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task, RestoreData, TodoState } from './types';

const stringToDecimal = (target: string): number => parseInt(target, 10);

const keysAsNumberFrom = (
  obj: Record<string, unknown>,
): number[] => R.map<string, number>(
  stringToDecimal,
  Object.keys(obj),
);

const initialState: TodoState = {
  recentDeleted: [],
  currentTaskId: 0,
  nextTaskId: 1,
  tasks: {
    0: { title: 'root', subTasks: [], isOpen: true },
  },
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const { payload: newTaskTitle } = action;

      if (newTaskTitle === '') {
        return;
      }

      const newTask: Task = { title: newTaskTitle, subTasks: [], isOpen: true };

      const { currentTaskId, nextTaskId } = state;

      state.tasks[nextTaskId] = newTask;

      state.tasks[currentTaskId].subTasks.push(nextTaskId);

      state.nextTaskId = nextTaskId + 1;
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.currentTaskId = 0;

      const { payload: targetId } = action;

      const deletedTask = state.tasks[targetId];

      state.tasks = R.omit([String(targetId)], state.tasks);

      const taskIds: number[] = keysAsNumberFrom(state.tasks);

      taskIds.forEach((id) => {
        const { subTasks } = state.tasks[id];

        if (subTasks.includes(targetId)) {
          const targetRemovedSubTasks = R.reject(R.equals(targetId), subTasks);
          state.tasks[id].subTasks = targetRemovedSubTasks;

          const restoreData: RestoreData = {
            task: deletedTask,
            selfId: targetId,
            parentId: id,
          };

          state.recentDeleted.push(restoreData);
        }
      });
    },

    restoreTask: (state) => {
      const restoreData = state.recentDeleted.pop();

      if (!restoreData) {
        return;
      }

      const { task, selfId, parentId } = restoreData;

      state.tasks[selfId] = task;
      state.tasks[parentId].subTasks.push(selfId);
    },

    updateCurrentTaskId: (state, action: PayloadAction<number>) => {
      state.currentTaskId = action.payload;
    },

    toggleOpen: (state, action: PayloadAction<number>) => {
      const { payload: id } = action;
      const { isOpen } = state.tasks[id];

      state.tasks[id].isOpen = !isOpen;
    },
  },
});

export const {
  addTask,
  deleteTask,
  restoreTask,
  updateCurrentTaskId,
  toggleOpen,
} = actions;

export default reducer;
