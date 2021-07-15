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
    it('deletes task, resets selectedTaskId and parentId, and sets restore data', () => {
      const restoreData1 = {
        task: { title: '첫번째 할일', subTasks: [], isOpen: true },
        selfId: 1,
        parentId: 0,
      };

      const restoreData2 = {
        task: { title: '두번째 할일', subTasks: [], isOpen: true },
        selfId: 2,
        parentId: 0,
      };

      const oldState = {
        completedTasks: [restoreData1],
        selectedTaskId: 3,
        parentId: 2,
        nextTaskId: 4,
        remainingTasks: {
          0: { title: 'root', subTasks: [3, 2], isOpen: true },
          2: { title: '두번째 할일', subTasks: [], isOpen: true },
          3: { title: '세번째 할일', subTasks: [], isOpen: true },
        },
      };
      const newState = {
        completedTasks: [restoreData1, restoreData2],
        selectedTaskId: 0,
        parentId: 0,
        nextTaskId: 4,
        remainingTasks: {
          0: { title: 'root', subTasks: [3], isOpen: true },
          3: { title: '세번째 할일', subTasks: [], isOpen: true },
        },
      };

      expect(reducer(
        oldState,
        deleteTask(2),
      )).toEqual(newState);
    });
  });

  describe('emptyCompletedTasks', () => {
    const restoreData = {
      task: { title: '첫번째 할일', subTasks: [], isOpen: true },
      selfId: 1,
      parentId: 0,
    };

    const oldState = {
      completedTasks: [restoreData],
    };

    const newState = {
      completedTasks: [],
    };

    expect(reducer(
      oldState,
      emptyCompletedTasks(),
    )).toEqual(newState);
  });

  describe('restoreTask', () => {
    context("when there aren't any deleted task", () => {
      it('does nothing', () => {
        const oldState = {
          completedTasks: [],
          selectedTaskId: 0,
          isLogBookOpen: true,
          nextTaskId: 4,
          tasks: {
            0: { title: 'root', subTasks: [3], isOpen: true },
            3: { title: '세번째 할일', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          restoreTask(),
        )).toEqual(oldState);
      });
    });

    context('when there are only one deleted task', () => {
      it('retores deleted task with id and closes logBook', () => {
        const restoreData1 = {
          task: { title: '첫번째 할일', subTasks: [], isOpen: true },
          selfId: 1,
          parentId: 0,
        };

        const oldState = {
          completedTasks: [restoreData1],
          isLogBookOpen: true,
          selectedTaskId: 0,
          nextTaskId: 3,
          remainingTasks: {
            0: { title: 'root', subTasks: [2], isOpen: true },
            2: { title: '두번째 할일', subTasks: [], isOpen: true },
          },
        };

        const newState = {
          completedTasks: [],
          isLogBookOpen: false,
          selectedTaskId: 0,
          nextTaskId: 3,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: true },
            2: { title: '두번째 할일', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          restoreTask(),
        )).toEqual(newState);
      });
    });

    context('when there are more than one deleted task', () => {
      it('retores deleted task with id', () => {
        const restoreData1 = {
          task: { title: '첫번째 할일', subTasks: [], isOpen: true },
          selfId: 1,
          parentId: 0,
        };

        const restoreData3 = {
          task: { title: '세번째 할일', subTasks: [], isOpen: true },
          selfId: 3,
          parentId: 0,
        };

        const oldState = {
          completedTasks: [restoreData1, restoreData3],
          isLogBookOpen: true,
          selectedTaskId: 0,
          nextTaskId: 4,
          remainingTasks: {
            0: { title: 'root', subTasks: [2], isOpen: true },
            2: { title: '두번째 할일', subTasks: [], isOpen: true },
          },
        };

        const newState = {
          completedTasks: [restoreData1],
          isLogBookOpen: true,
          selectedTaskId: 0,
          nextTaskId: 4,
          remainingTasks: {
            0: { title: 'root', subTasks: [3, 2], isOpen: true },
            2: { title: '두번째 할일', subTasks: [], isOpen: true },
            3: { title: '세번째 할일', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          restoreTask(),
        )).toEqual(newState);
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

    context('When selected task is tail of subTasks', () => {
      given('selectedTaskId', () => 1);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectNext());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When selected task is not tail of subTasks', () => {
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

    context('When selected task is head of subTasks', () => {
      given('selectedTaskId', () => 2);

      it('does nothing', () => {
        const newState = reducer(given.oldState, selectPrevious());

        expect(newState).toEqual(given.oldState);
      });
    });

    context('When selected task is not head of subTasks', () => {
      given('selectedTaskId', () => 1);

      it('selects previous id in subTasks', () => {
        const newState = reducer(given.oldState, selectPrevious());

        const { selectedTaskId } = newState;

        expect(selectedTaskId).toBe(2);
      });
    });
  });
});
