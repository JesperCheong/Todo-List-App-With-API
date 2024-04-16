async function fetchTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    //organise data for ease of use later
    organizedData = data.map(datum => {
      if (datum.completed === true) {
        datum.completed = "✔";
      } else if (datum.completed === false) {
        datum.completed = "";
      }
      return {
        "id": datum.id,
        "title": datum.title,
        "userId": datum.userId,
        "completed": datum.completed,
      };
    });
    todoList = organizedData;
  } catch (error) {
    console.warn(error);
    alert(error);
  }
}


async function render() {
  await fetchTodo();
  renderUserFilter();
  renderStatusFilter();
  renderList();
}

function renderList() {
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
function renderUserFilter() {
  const uniqueUserIds = [...new Set(todoList.map(item => item.userId))];
  const filterByUser = document.getElementById("filter-by-user");
  uniqueUserIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    filterByUser.appendChild(option);
  })
}
function renderStatusFilter() {
  const uniqueStatus = [...new Set(todoList.map(item => item.completed))];
  const filterByStatus = document.getElementById("filter-by-status");
  uniqueStatus.forEach((status) => {
    const option = document.createElement("option");
    if (status === "✔") {
      option.value = "Completed";
      option.textContent = "Completed";
    } else if (status === "") {
      option.value = "Incomplete";
      option.textContent = "Incomplete";
    }
    
    filterByStatus.appendChild(option);
  })
}


let todoList;
render();