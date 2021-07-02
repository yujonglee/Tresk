export default function depthCalcutaor(deletedTasks) {
  return deletedTasks.reduceRight((acc, cur) => {
    const { selfId, parentId } = cur;

    return {
      ...acc,
      [selfId]: acc[parentId] + 1 || 1,
    };
  }, {});
}
