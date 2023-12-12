import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [tasks, setTasks] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      // TODO: Replace with your contract's ABI
      const abi = [];
      // TODO: Replace with your contract's address
      const contractAddress = '';

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi, contractAddress);

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
    };

    init();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      const taskCount = await contract.methods.taskCount().call();
      const loadedTasks = [];

      for (let i = 0; i < taskCount; i++) {
        const task = await contract.methods.tasks(i).call();
        loadedTasks.push(task);
      }

      setTasks(loadedTasks);
    };

    if (contract) {
      loadTasks();
    }
  }, [contract]);

  const createTask = async (content) => {
    await contract.methods.createTask(content).send({ from: accounts[0] });
  };

  const toggleCompleted = async (taskId) => {
    await contract.methods.toggleCompleted(taskId).send({ from: accounts[0] });
  };

  return (
    <div>
      <h1>Todo List</h1>
      {tasks.map((task, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(index)}
          />
          <label>{task.content}</label>
        </div>
      ))}
      <form onSubmit={(event) => {
        event.preventDefault();
        createTask(event.target.elements[0].value);
      }}>
        <input type="text" placeholder="New task..." />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default App;
