pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    struct Task {
        string content;
        bool completed;
    }

    Task[] public tasks;

    function createTask(string memory content) public {
        Task memory newTask = Task({
            content: content,
            completed: false
        });

        tasks.push(newTask);
    }

    function toggleCompleted(uint taskId) public {
        tasks[taskId].completed = !tasks[taskId].completed;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
