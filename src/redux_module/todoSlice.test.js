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
    context('when title is not empty string', () => {
      it('adds new task to todoList and updates nextTaskId', () => {
        const oldState = {
          completedTasks: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
          },
        };
        const newState = {
          completedTasks: [],
          selectedTaskId: 0,
          nextTaskId: 3,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          addTask('task2'),
        )).toEqual(newState);
      });
    });

    context('when title is empty string', () => {
      it('does nothing', () => {
        const oldState = {
          completedTasks: [],
          selectedTaskId: 1,
          nextTaskId: 2,
          remainingTasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          addTask(''),
        )).toEqual(oldState);
      });
    });
  });

  describe('deleteTask', () => {
    it('deletes task, resets selectedTaskId, and sets restore data', () => {
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
        selectedTaskId: 2,
        nextTaskId: 2,
        remainingTasks: {
          0: { title: 'root', subTasks: [2], isOpen: true },
          2: { title: '두번째 할일', subTasks: [], isOpen: true },
        },
      };
      const newState = {
        completedTasks: [restoreData1, restoreData2],
        selectedTaskId: 0,
        nextTaskId: 2,
        remainingTasks: { 0: { title: 'root', subTasks: [], isOpen: true } },
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
    context('when selected task id is 0', () => {
      it('does nothing', () => {
        const oldState = {
          selectedTaskId: 0,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectNext(),
        )).toEqual(oldState);
      });
    });

    context('When boundaries are met', () => {
      it('does nothing', () => {
        const oldState = {
          selectedTaskId: 1,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectNext(),
        )).toEqual(oldState);
      });
    });

    context('When boundaries are not met', () => {
      it('sets selectedTaskId to next id in subTasks', () => {
        const oldState = {
          selectedTaskId: 2,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
          },
        };

        const newState = {
          selectedTaskId: 1,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectNext(),
        )).toEqual(newState);
      });
    });
  });

  describe('selectPrevious', () => {
    context('when selected task id is 0', () => {
      it('does nothing', () => {
        const oldState = {
          selectedTaskId: 0,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectNext(),
        )).toEqual(oldState);
      });
    });

    context('When boundaries are met', () => {
      it('does nothing', () => {
        const oldState = {
          selectedTaskId: 2,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
            2: { title: 'task2', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectPrevious(),
        )).toEqual(oldState);
      });
    });

    context('When boundaries are not met', () => {
      it('sets selectedTaskId to previous id in subTasks', () => {
        const oldState = {
          selectedTaskId: 1,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
          },
        };

        const newState = {
          selectedTaskId: 2,
          parentId: 0,
          remainingTasks: {
            0: { title: 'root', subTasks: [2, 1], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          selectPrevious(),
        )).toEqual(newState);
      });
    });
  });
});
