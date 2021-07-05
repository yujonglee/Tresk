import reducer,
{
  addTask,
  deleteTask,
  restoreTask,
  toggleSubTasksOpen,
  updateSelectedTaskId,
  resetRecentDeleted,
  toggleLogBookOpen,
} from './todoSlice';

describe('todoSlice reducer', () => {
  describe('addTask', () => {
    context('when title is not empty string', () => {
      it('adds new task to todoList and updates nextTaskId', () => {
        const oldState = {
          recentDeleted: [],
          selectedTaskId: 1,
          nextTaskId: 2,
          tasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [], isOpen: true },
          },
        };
        const newState = {
          recentDeleted: [],
          selectedTaskId: 1,
          nextTaskId: 3,
          tasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: 'task1', subTasks: [2], isOpen: true },
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
          recentDeleted: [],
          selectedTaskId: 1,
          nextTaskId: 2,
          tasks: {
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
        recentDeleted: [restoreData1],
        selectedTaskId: 2,
        nextTaskId: 2,
        tasks: {
          0: { title: 'root', subTasks: [2], isOpen: true },
          2: { title: '두번째 할일', subTasks: [], isOpen: true },
        },
      };
      const newState = {
        recentDeleted: [restoreData1, restoreData2],
        selectedTaskId: 0,
        nextTaskId: 2,
        tasks: { 0: { title: 'root', subTasks: [], isOpen: true } },
      };

      expect(reducer(
        oldState,
        deleteTask(2),
      )).toEqual(newState);
    });
  });

  describe('resetRecentDeleted', () => {
    const restoreData = {
      task: { title: '첫번째 할일', subTasks: [], isOpen: true },
      selfId: 1,
      parentId: 0,
    };

    const oldState = {
      recentDeleted: [restoreData],
    };

    const newState = {
      recentDeleted: [],
    };

    expect(reducer(
      oldState,
      resetRecentDeleted(),
    )).toEqual(newState);
  });

  describe('restoreTask', () => {
    context("when there aren't any deleted task", () => {
      it('does nothing', () => {
        const oldState = {
          recentDeleted: [],
          selectedTaskId: 0,
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

    context('when there are deleted tasks', () => {
      it('retores deleted task with id', () => {
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
          recentDeleted: [restoreData1, restoreData2],
          selectedTaskId: 0,
          nextTaskId: 4,
          tasks: {
            0: { title: 'root', subTasks: [3], isOpen: true },
            3: { title: '세번째 할일', subTasks: [], isOpen: true },
          },
        };

        const newState = {
          recentDeleted: [restoreData1],
          selectedTaskId: 0,
          nextTaskId: 4,
          tasks: {
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
      it('updates current task id', () => {
        const oldState = {
          recentDeleted: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          tasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: true },
          },
        };
        const newState = {
          recentDeleted: [],
          selectedTaskId: 1,
          nextTaskId: 2,
          tasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: true },
          },
        };

        expect(reducer(
          oldState,
          updateSelectedTaskId(1),
        )).toEqual(newState);
      });
    });

    describe('toggleSubTasksOpen', () => {
      it('toggles isOpen with taskId', () => {
        const oldState = {
          recentDeleted: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          tasks: {
            0: { title: 'root', subTasks: [1], isOpen: true },
            1: { title: '첫번째 할일', subTasks: [], isOpen: true },
          },
        };

        const newState = {
          recentDeleted: [],
          selectedTaskId: 0,
          nextTaskId: 2,
          tasks: {
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
  });
});
