export const filterTask = (tasks, id, body = [], columnName) => {
    return tasks.filter((task) => {
        if (task._id !== id) {
            const obj = {
                content: task.content,
                column: task.column,
                columnName: columnName,
            };
            body.push(obj);
        }
        return task;
    });
};
