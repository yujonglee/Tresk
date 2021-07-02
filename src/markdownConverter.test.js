import markdownConverter from './markdownConverter';

describe('markdownConverter', () => {
  it('converts deletedTasks array to markdown', () => {
    const deletedTasks = [
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
    //   {
    //     task: { title: 'task3', subTasks: [], isOpen: true },
    //     selfId: 3,
    //     parentId: 2,
    //   },
    ];

    const result = {
      0: {
        title: 'TID',
        subTasks: [
          {
            1: {
              title: 'task1',
              subTasks: [],
            },
          },
          {
            2: {
              title: 'task2',
              subTasks: [],
            },
          },
        ],
      },
    };

    expect(markdownConverter(deletedTasks)).toEqual(result);
  });
});
