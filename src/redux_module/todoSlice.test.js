import reducer,
{
  addTask,
  deleteTask,
  restoreTask,
  toggleSubTasksOpen,
  updateSelectedTaskId,
  emptyCompletedTasks,
  toggleLogBookOpen,
  selectNext,
  selectPrevious,
} from './todoSlice';

describe('todoSlice reducer', () => {
  describe('addTask', () => {
    const oldState = {
      selectedTaskId: 0,
      nextTaskId: 2,
      remainingTasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: 'task1', subTasks: [], isOpen: true },
      },
    };

    context('when nothing is typed', () => {
      const title = '';

      it('does nothing', () => {
        const newState = reducer(oldState, addTask(title));

        expect(newState).toEqual(oldState);
      });
    });

    context('when something is typed', () => {
      const title = 'task2';

      it('adds new task to todoList and updates nextTaskId', () => {
        const newState = reducer(oldState, addTask(title));

        const { nextTaskId, remainingTasks } = newState;

        expect(remainingTasks['0'].subTasks).toEqual(
          [2, 1],
        );

        expect(remainingTasks['2']).toEqual(
          { title: 'task2', subTasks: [], isOpen: true },
        );

        expect(nextTaskId).toBe(2 + 1);
      });
    });
  });

  describe('deleteTask', () => {
    const restoreDataOfTask4 = {
      task: { title: 'task4', subTasks: [], isOpen: true },
      selfId: 4,
      parentId: 1,
    };

    const restoreDataOfTask2 = {
      task: { title: 'task2', subTasks: [], isOpen: true },
      selfId: 2,
      parentId: 1,
    };

    const oldState = {
      completedTasks: [restoreDataOfTask4],
      selectedTaskId: 3,
      parentId: 1,
      remainingTasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: 'task1', subTasks: [2, 3], isOpen: true },
        2: { title: 'task2', subTasks: [], isOpen: true },
        3: { title: 'task3', subTasks: [], isOpen: true },
      },
    };

    it('deletes task with id', () => {
      const newState = reducer(oldState, deleteTask(2));

      const { remainingTasks } = newState;

      expect(remainingTasks['2']).toBeUndefined();

      expect(
        remainingTasks['1'].subTasks.includes(2),
      ).toBe(false);
    });

    it('resets selectedTaskId and parentId', () => {
      const newState = reducer(oldState, deleteTask(2));

      const { selectedTaskId, parentId } = newState;

      expect(selectedTaskId).toBe(0);
      expect(parentId).toBe(0);
    });

    it('adds restore data', () => {
      const newState = reducer(oldState, deleteTask(2));

      const { completedTasks } = newState;

      expect(completedTasks).toEqual(
        [restoreDataOfTask4, restoreDataOfTask2],
      );
      expect(completedTasks).not.toEqual(
        [restoreDataOfTask2, restoreDataOfTask4],
      );
    });
  });

  describe('emptyCompletedTasks', () => {
    it('removes all items from completedTasks', () => {
      const restoreData = {
        task: { title: '첫번째 할일', subTasks: [], isOpen: true },
        selfId: 1,
        parentId: 0,
      };

      const oldState = {
        completedTasks: [restoreData],
      };

      const newState = reducer(oldState, emptyCompletedTasks());

      expect(newState.completedTasks).toEqual([]);
    });
  });

  describe('restoreTask', () => {
    const restoreDataOfTask1 = {
      task: { title: 'task1', subTasks: [], isOpen: true },
      selfId: 1,
      parentId: 0,
    };

    const restoreDataOfTask3 = {
      task: { title: 'task3', subTasks: [], isOpen: true },
      selfId: 3,
      parentId: 0,
    };

    context("when there aren't any deleted task", () => {
      it('does nothing', () => {
        const oldState = {
          completedTasks: [],
          remainingTasks: {
            0: { title: 'root', subTasks: [], isOpen: true },
          },
        };

        const newState = reducer(oldState, restoreTask());

        expect(newState).toEqual(oldState);
      });
    });

    context('when there are only one deleted task', () => {
      const oldState = {
        completedTasks: [restoreDataOfTask1],
        isLogBookOpen: true,
        remainingTasks: {
          0: { title: 'root', subTasks: [2], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
        },
      };

      it('retores deleted task with id', () => {
        const newState = reducer(oldState, restoreTask());

        const { completedTasks, remainingTasks } = newState;
        const { selfId, parentId, task } = restoreDataOfTask1;

        expect(completedTasks).toEqual([]);

        expect(remainingTasks[selfId]).toEqual(task);

        expect(remainingTasks[parentId].subTasks).toEqual([2, 1]);
        expect(remainingTasks[parentId].subTasks).not.toEqual([1, 2]);
      });

      it('closes logBook', () => {
        const newState = reducer(oldState, restoreTask());

        const { isLogBookOpen } = newState;

        expect(isLogBookOpen).toEqual(!true);
      });
    });

    context('when there are more than one deleted task', () => {
      it('retores deleted task with id', () => {
        const oldState = {
          completedTasks: [restoreDataOfTask1, restoreDataOfTask3],
          remainingTasks: {
            0: { title: 'root', subTasks: [2], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };

        const newState = reducer(oldState, restoreTask());

        const { completedTasks, remainingTasks } = newState;
        const { selfId, parentId, task } = restoreDataOfTask3;

        expect(completedTasks).toEqual([restoreDataOfTask1]);

        expect(remainingTasks[selfId]).toEqual(task);

        expect(remainingTasks[parentId].subTasks).toEqual([3, 2]);
        expect(remainingTasks[parentId].subTasks).not.toEqual([2, 3]);
      });
    });

    describe('updateSelectedTaskId', () => {
      it('updates current task id and parent id', () => {
        const oldState = {
          completedTasks: [],
          selectedTaskId: 0,
          parentId: 0,
          nextTaskId: 3,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [2], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };
        const newState = {
          completedTasks: [],
          selectedTaskId: 2,
          parentId: 1,
          nextTaskId: 3,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [2], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          updateSelectedTaskId(2),
        )).toEqual(newState);
      });
    });

    describe('toggleSubTasksOpen', () => {
      it('toggles isOpen with taskId', () => {
        const oldState = {
          completedTasks: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: true },
          },
        };

        const newState = {
          completedTasks: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: false },
          },
        };
        expect(reducer(
          oldState,
          toggleSubTasksOpen(1),
        )).toEqual(newState);
      });
    });

    describe('toggleLogBookOpen', () => {
      context('when 0 argument is given', () => {
        it('toggles isLogBookOpen', () => {
          const oldState = {
            isLogBookOpen: false,
          };

          const newState = {
            isLogBookOpen: true,
          };
          expect(reducer(
            oldState,
            toggleLogBookOpen(),
          )).toEqual(newState);
        });
      });

      context('when 1 argument is given', () => {
        it('sets isLogBookOpen', () => {
          const oldState1 = {
            isLogBookOpen: true,
          };

          const newState1 = {
            isLogBookOpen: true,
          };
          expect(reducer(
            oldState1,
            toggleLogBookOpen(true),
          )).toEqual(newState1);

          const oldState2 = {
            isLogBookOpen: false,
          };

          const newState2 = {
            isLogBookOpen: false,
          };
          expect(reducer(
            oldState2,
            toggleLogBookOpen(false),
          )).toEqual(newState2);
        });
      });
    });
  });

  describe('selectNext', () => {
    given('oldState', () => ({
      selectedTaskId: given.selectedTaskId,
      parentId: 0,
      remainingTasks: {
        0: { title: 'root', subTasks: [2, 1], isOpen: true },
        1: { title: 'task1', subTasks: [], isOpen: true },
        2: { title: 'task2', subTasks: [], isOpen: true },
      },
    }));

    context('when selected task id is 0', () => {
      given('selectedTaskId', () => 0);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectNext());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When next task is not exist', () => {
      given('selectedTaskId', () => 1);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectNext());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When next task is exist', () => {
      given('selectedTaskId', () => 2);

      it('selects next id in subTasks', () => {
        const newState = reducer(given.oldState, selectNext());

        const { selectedTaskId } = newState;

        expect(selectedTaskId).toBe(1);
      });
    });
  });

  describe('selectPrevious', () => {
    given('oldState', () => ({
      selectedTaskId: given.selectedTaskId,
      parentId: 0,
      remainingTasks: {
        0: { title: 'root', subTasks: [2, 1], isOpen: true },
        1: { title: 'task1', subTasks: [], isOpen: true },
        2: { title: 'task2', subTasks: [], isOpen: true },
      },
    }));

    context('when selected task id is 0', () => {
      given('selectedTaskId', () => 0);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectPrevious());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When previous task is not exist', () => {
      given('selectedTaskId', () => 2);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectPrevious());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When previous task is exist', () => {
      given('selectedTaskId', () => 1);

      it('selects previous id in subTasks', () => {
        const newState = reducer(given.oldState, selectPrevious());

        const { selectedTaskId } = newState;

        expect(selectedTaskId).toBe(2);
      });
    });
  });
});
