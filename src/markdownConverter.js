export default function markdownConverter(deletedTasks) {
  const initial = {
    0: {
      title: 'TID',
      subTasks: [],
    },
  };

  const result = deletedTasks.reduce((acc, cur) => {
    const { task: { title }, selfId, parentId } = cur;

    return {
      ...acc,
      [parentId]: {
        ...acc[parentId],
        subTasks: [
          ...acc[parentId].subTasks,
          {
            [selfId]: {
              title,
              subTasks: [],
            },
          },
        ],
      },
    };
  }, initial);

  return result;
}
