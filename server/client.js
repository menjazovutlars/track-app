updateTable();

// let select1 = document.getElementById("table-select");
// console.log(select1.value);

function updateTable() {
  fetch(`http://localhost:3000/tables/`)
    .then((response) => {
      response.json().then((json) => {
        renderTable(
          json.map((e) => [
            e.id,
            e.name,
            e.start_point,
            e.end_point,
            e.length,
            e.duration,
          ])
        );
        console.log("JSON DATA", json.data);
        fillSelect();
      });
    })
    .catch((err) => {
      console.warn("Something went wrong.", err);
    });
}

function updateTable2(table) {
  fetch(`http://localhost:3000/tables/${table}`)
    .then((response) => {
      response.json().then((json) => {
        hideSections(table);
        let jsonKeys = Object.keys(json[0]);
        // console.log(jsonKeys);
        // console.log("data button", dataButton);
        renderTableColumns(jsonKeys);
        renderTable(
          json.map((e) => [
            e.id,
            e.name,
            e.start_point,
            e.end_point,
            e.length,
            e.duration,
          ])
        );
        // console.log("JSON DATA", json.data);
        fillSelect();
      });
    })
    .catch((err) => {
      console.warn("Something went wrong.", err);
    });

  //
  console.log("update 2");
}

function renderTableColumns(colums) {
  let tableColumns = document.getElementById("table-colums");
  var tableHeader = "";

  // console.log(colums);

  for (let colum of colums) {
    tableHeader += `<th>${colum}`;
    // console.log(tableList);
    // const columnHead = document.getElementsByTagName("th");
    // columnHead.innerHTML = `${colum}`;
    // tableColumns.appendChild(columnHead);
  }

  tableColumns.innerHTML = tableHeader;
}

function renderTable(content) {
  let tableBody = document.getElementById("table-content");
  var tableContent = "";

  console.log("renderTable Content", content);

  for (let row of content) {
    tableContent += "<tr>";
    for (let column of row) {
      tableContent += `<td>${column}</td>`;
    }
    tableContent += "</tr>";
  }

  tableBody.innerHTML = tableContent;
}

// document
//   .getElementById("insert-data-button")
//   .addEventListener("click", createEntry);

// function sayHello2() {
//   console.log("hello-world");
// }

function createEntry() {
  let table = document.getElementById("table-select").value;
  console.log(table);
  let entryName;
  let entryStartpoint;
  let entryEndpoint;
  let entryLength;
  let entryDuration;
  let statusField;
  let nameField;
  let startpointField;
  let endpointField;
  let lengthField;
  let durationField;
  let data;

  if (table === "hiking_routes") {
    nameField = document.getElementById(`name-${table}`);
    startpointField = document.getElementById(`start-point-${table}`);
    endpointField = document.getElementById(`end-point-${table}`);
    lengthField = document.getElementById(`length-${table}`);
    durationField = document.getElementById(`duration-${table}`);
    statusField = document.getElementById(`form-status-${table}`);

    entryName = nameField.value;
    entryStartpoint = startpointField.value;
    entryEndpoint = endpointField.value;
    entryLength = lengthField.value;
    entryDuration = durationField.value;

    if (
      !entryName &&
      entryStartpoint &&
      entryEndpoint &&
      entryLength &&
      entryDuration !== undefined
    ) {
      statusField.innerHTML = "Bitte gib alle Daten ein!";
      return false;
    }

    data = {
      name: entryName,
      start_point: entryStartpoint,
      end_point: entryEndpoint,
      length: entryLength,
      duration: entryDuration,
    };
  }
  if (table === "audiotracks") {
    nameField = document.getElementById(`name-${table}`);
    durationField = document.getElementById(`duration-${table}`);
    statusField = document.getElementById(`form-status-${table}`);

    console.log(durationField);
    entryName = nameField.value;
    entryDuration = durationField.value;

    if (!entryName && entryDuration !== undefined) {
      statusField.innerHTML = "Bitte gib alle Daten ein!";
      return false;
    }

    data = {
      name: entryName,
      duration: entryDuration,
    };
  }
  // if (
  //   !entryName &&
  //   entryStartpoint &&
  //   entryEndpoint &&
  //   entryLength &&
  //   entryDuration !== undefined
  // ) {
  //   statusField.innerHTML = "Bitte gib alle Daten ein!";
  //   return false;
  // }

  // let data = {
  //   name: entryName,
  //   start_point: entryStartpoint,
  //   end_point: entryEndpoint,
  //   length: entryLength,
  //   duration: entryDuration,
  // };

  fetch(`http://localhost:3000/insert/${table}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(data);
      if (!response.ok) {
        statusField.innerHTML = "Speichern fehlgeschlagen";
        return;
      }

      if (table === "hiking_routes") {
        statusField.innerHTML = "";
        nameField.value = "";
        startpointField.value = "";
        endpointField.value = "";
        lengthField.value = "";
        durationField.value = "";
      }

      if (table === "audiotracks") {
        statusField.innerHTML = "";
        nameField.value = "";

        durationField.value = "";
      }

      updateTable2(table);
      return true;
    })
    .catch((error) => {
      statusField.innerHTML = "Speichern fehlgeschlagen: " + error;
    });
}

function hideSections(table) {
  const sections = document.body.getElementsByClassName("input_section");
  // console.log(sections[1]);
  // const section = document.getElementById(`${table}_section`);
  // console.log(section);

  // const section2 = document.getElementById("add-song-section");
  for (let item of sections) {
    if (item.id === `${table}_section`) {
      item.style = "display: inital";
      // console.log(item);
    }
    if (item.id !== `${table}_section`) {
      item.style = "display: none";
      // console.log(item);
    }
  }
  // section2.style = "display: none;";
}

function renderTableList(tableList) {
  let select = document.getElementById("table-select");

  let tables = [
    `hiking_routes`,
    `points_of_interest`,
    `audiotracks`,
    `category`,
  ];
  if (select.children.length < 4) {
    for (let table of tables) {
      // console.log(tableList);
      const listItem = document.createElement("option");
      listItem.appendChild(document.createTextNode(`${table}`));
      select.appendChild(listItem);
    }
  }
}

function getTableList() {
  let tableList = document.getElementById("table-list");

  fetch(`http://localhost:3000/tables/`)
    .then(() => {
      renderTableList(tableList);
    })
    .catch((err) => {
      console.warn("Etwas ist schief gegangen ", err);
    });
}

function fillSelect() {
  const select = document.getElementById("table-select");
  // for (let table of options) {
  //   select.options[select.options.length] = new Option(table.name, table.id);
  // }

  select.addEventListener("click", () => {
    // select.innerHTML = "";
    getTableList();
  });

  select.addEventListener("change", () => {
    changeTable(select.value);
  });
  // getTableList(select.options[select.selectedIndex].value);
  // document
  //   .getElementById("song-add-button")
  //   .addEventListener("click", createSong);
}

function changeTable(table) {
  console.log(table);
  let tableList = document.getElementById("table-list");

  fetch(`http://localhost:3000/tables/${table}`)
    .then(() => {
      renderTableList(tableList);
    })
    .then(() => {
      updateTable2(table);
      document
        .getElementById(`insert-data-button-${table}`)
        .addEventListener("click", createEntry);
    })
    .catch((err) => {
      console.warn("Etwas ist schief gegangen ", err);
    });
}

// let dataButton;
// console.log(dataButton);
// dataButton.addEventListener("click", createEntry);
