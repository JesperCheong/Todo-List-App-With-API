async function fetchTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    //organise data for ease of use later
    organizedData = data.map(datum => {
      return {
        "id": String(datum.id),
        "title": String(datum.title),
        "userId": String(datum.userId),
        "completed": String(datum.completed),
      };
    });
    todoList = organizedData;
    //remove loading spinner
    const loading = document.getElementById("loading-spinner");
    loading.remove();
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
  //clear list
  const tableBody = document.getElementsByTagName("tbody");
  while (tableBody[0].firstChild) {
    tableBody[0].removeChild(tableBody[0].firstChild);
  }
  
  // filter list
  const filterStatusInput = statusFilter.value;
  const filterUserInput = userFilter.value;
  const filteredList = todoList.filter(todo => {
    return (filterStatusInput === "All" || todo.completed === filterStatusInput) &&
      (filterUserInput === "All" || todo.userId === filterUserInput);
  })

  // render filtered list
  filteredList.forEach((todo) => {
    const row = document.createElement("tr");
    // dislpay checkmark if todo is completed
    for (const item in todo) {
      const cell = document.createElement("td");
      if (item === "completed") {
        if (todo[item] === "true") {
          cell.textContent = "✔";
        } else if (todo[item] === "false") {
          cell.textContent = ""
        }
      } else {
        cell.textContent = todo[item];
      }
      row.appendChild(cell);
    }
    tableBody[0].appendChild(row);
  });
}
function renderUserFilter() {
  // to eliminate duplicates & grab unique user id
  const uniqueUserIds = [...new Set(todoList.map(item => item.userId))];
  // create options for filter
  const filterByUser = document.getElementById("userFilter");
  uniqueUserIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    filterByUser.appendChild(option);
  })
}
function renderStatusFilter() {
  // to eliminate duplicates and grab unique status
  const uniqueStatus = [...new Set(todoList.map(item => item.completed))];
  // create options for filter
  const filterByStatus = document.getElementById("statusFilter");
  uniqueStatus.forEach((status) => {
    const option = document.createElement("option");
    if (status === "true") {
      option.value = "true";
      option.textContent = "Completed"; // for display
    } else if (status === "false") {
      option.value = "false";
      option.textContent = "Incomplete"; // for display
    } else {
      option.value = "others";
      option.textContent = "others"
    }
    filterByStatus.appendChild(option);
  })
}

let todoList;
render(); // initial rendering

const statusFilter = document.getElementById('statusFilter');
const userFilter = document.getElementById('userFilter');
statusFilter.addEventListener("change", renderList);
userFilter.addEventListener("change", renderList);