/* eslint-disable no-param-reassign */
import {
  pipe, prop, includes, __, find, keys, omit, toString, reject, equals,
} from 'ramda';

export const getSubTasksById = (array) => pipe(
  prop(__, array),
  prop('subTasks'),
);

export const includesTarget = (array, target) => pipe(
  getSubTasksById(array),
  includes(target),
);

export const findParentWithId = (tasks, id) => {
  const result = find(
    includesTarget(tasks, id),
    keys(tasks),
  );

  return parseInt(result, 10);
};

export function removeTaskIdFromParentSubTasks(state, target) {
  const { remainingTasks } = state;

  const parentId = findParentWithId(remainingTasks, target);

  const { subTasks } = state.remainingTasks[parentId];

  const targetRemovedSubTasks = reject(equals(target), subTasks);

  state.remainingTasks[parentId].subTasks = targetRemovedSubTasks;
}

export function addRestoreData(state, target) {
  const { remainingTasks } = state;

  const parentId = findParentWithId(remainingTasks, target);

  const restoreData = {
    task: remainingTasks[target],
    selfId: target,
    parentId: parseInt(parentId, 10),
  };

  state.completedTasks.push(restoreData);
}

export function removeTaskFromRemaingTasks(state, targetId) {
  const { remainingTasks } = state;

  state.remainingTasks = omit(
    [toString(targetId)],
    remainingTasks,
  );
}
