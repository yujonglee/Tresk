/* eslint-disable no-param-reassign */
import * as R from 'ramda';
import {
  pipe, prop, includes, __,
} from 'ramda';

export const getSubTasksById = (array) => pipe(
  prop(__, array),
  prop('subTasks'),
);

export const includesTarget = (array, target) => pipe(
  getSubTasksById(array),
  includes(target),
);

export function removeTaskIdFromParentSubTasks(state, targetId) {
  const subTasksCompactor = (value, key) => {
    const { subTasks } = value;

    if (subTasks.includes(targetId)) {
      const parentId = parseInt(key, 10);

      const targetRemovedSubTasks = R.reject(R.equals(targetId), subTasks);
      state.remainingTasks[parentId].subTasks = targetRemovedSubTasks;
    }
  };

  R.forEachObjIndexed(subTasksCompactor, state.remainingTasks);
}

export function addRestoreData(state, targetId) {
  const restoreDataCollector = (value, key) => {
    const { subTasks } = value;

    if (subTasks.includes(targetId)) {
      const parentId = parseInt(key, 10);

      const restoreData = {
        task: state.remainingTasks[targetId],
        selfId: targetId,
        parentId,
      };

      state.completedTasks.push(restoreData);
    }
  };

  R.forEachObjIndexed(restoreDataCollector, state.remainingTasks);
}

export function removeTaskFromRemaingTasks(state, targetId) {
  state.remainingTasks = R.omit(
    R.toString(targetId),
    state.remainingTasks,
  );
}
