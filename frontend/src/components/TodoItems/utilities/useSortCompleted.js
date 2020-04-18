export const useSortCompleted = (todoItems) => {
  const completeItems = [];
  const incompleteItems = [];

  todoItems.map((item) =>
    item.isCompleted ? completeItems.push(item) : incompleteItems.push(item)
  );

  return [completeItems, incompleteItems];
};
