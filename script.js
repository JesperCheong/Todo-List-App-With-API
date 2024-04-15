
async function fetchTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    //organise data for ease of use later
    organizedData = data.map(datum => ({
      "id": datum.id,
      "title": datum.title,
      "userId": datum.userId,
      "completed": datum.completed,
    }));
    todoList = organizedData; 
  } catch (error) {
    console.warn(error);
    alert(error);
  }
}


async function render() {
  await fetchTodo();
  const tableBody = document.getElementsByTagName("tbody");
  todoList.forEach((todo) => {
    const row = document.createElement("tr");
    for (const item in todo) {
      const cell = document.createElement("td");
      cell.textContent = todo[item];
      row.appendChild(cell);
    }
    tableBody[0].appendChild(row);
  });
}

let todoList;
render()
