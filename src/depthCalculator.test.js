import depthCalcutaor from './depthCalculator';

describe('depthCalculator', () => {
  it('calculates depthInfo of deletedTask', () => {
    const deletedTasks = [
      {
        task: { title: 'task3', subTasks: [], isOpen: true },
        selfId: 3,
        parentId: 2,
      },
      {
        task: { title: 'task1', subTasks: [], isOpen: true },
        selfId: 1,
        parentId: 0,
      },
      {
        task: { title: 'task2', subTasks: [], isOpen: true },
        selfId: 2,
        parentId: 0,
      },
    ];

    const result = {
      2: 1,
      1: 1,
      3: 2,
    };

    expect(depthCalcutaor(deletedTasks)).toEqual(result);
  });
});
