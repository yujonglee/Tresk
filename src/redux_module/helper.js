/* eslint-disable no-param-reassign */
import * as R from 'ramda';

export function removeTaskIdFromParentSubTasks(state, targetId) {
  const subTasksCompactor = (value, key) => {
    const { subTasks } = value;

    if (subTasks.includes(targetId)) {
      const parentId = parseInt(key, 10);

      const targetRemovedSubTasks = R.reject(R.equals(targetId), subTasks);
      state.tasks[parentId].subTasks = targetRemovedSubTasks;
    }
  };

  R.forEachObjIndexed(subTasksCompactor, state.tasks);
}

export function addRestoreData(state, targetId) {
  const restoreDataCollector = (value, key) => {
    const { subTasks } = value;

    if (subTasks.includes(targetId)) {
      const parentId = parseInt(key, 10);

      const restoreData = {
        task: state.tasks[targetId],
        selfId: targetId,
        parentId,
      };

      state.recentDeleted.push(restoreData);
    }
  };

  R.forEachObjIndexed(restoreDataCollector, state.tasks);
}

export function removeTaskFromTasks(state, ...targetIds) {
  const targets = R.map(R.toString, targetIds);

  state.tasks = R.omit(targets, state.tasks);
}
