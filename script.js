
async function fetchTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    todoList = data;

  } catch (error) {
    console.warn(error);
    alert(error);
  }
}


/* async function render() {
  await fetchTodo();
  const tableBody = document.getElementsByTagName("tbody");
  todoList.forEach((todo) => {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    cell1.textContent = todo.id;
    cell2.textContent = todo.title;
    cell3.textContent = todo.userId;
    cell4.textContent = todo.completed;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    tableBody[0].appendChild(row);
  });
} */

let todoList;
render()
