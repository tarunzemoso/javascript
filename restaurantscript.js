var tables = {
    table1: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table2: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table3: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table4: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table5: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table6: {
      cost: 0,
      items: 0,
      orders: {},
    },
    table7: {
      cost: 0,
      items: 0,
      orders: {},
    },
  };
  
  const menu = {
    item1: {
      name: "Paneer Tikka",
      cost: 200,
      category: "Starter",
    },
    item2: {
      name: "Chicken 65",
      cost: 225,
      category: "Starter",
    },
    item3: {
      name: "Veg Kebab",
      cost: 175,
      category: "Starter",
    },
    item4: {
      name: "Veg Pulao",
      cost: 300,
      category: "Main course",
    },
    item5: {
      name: "Chicken Biryani",
      cost: 500,
      category: "Main course",
    },
    item6: {
      name: "Roti",
      cost: 30,
      category: "Main course",
    },
    item7: {
        name: "Butter Chicken",
        cost: 180,
        category: "Main course",
      },
    item8: {
      name: "Thickshake",
      cost: 150,
      category: "Desserts",
    },
    item9: {
      name: "Ice cream",
      cost: 75,
      category: "Desserts",
    },
  };
  
  
  var tableId = document.getElementById("tables");
  var menuId = document.getElementById("menu-items");
  var modal = document.getElementById("modal");
  
  function setup() {
    if (localStorage.getItem("tables") == null) {
      localStorage.setItem("tables", JSON.stringify(tables));
    }
    refreshTables();
    showMenu();
  }
  
  
  function createTableItem(i, cost, items) {
    let tableItem = `<div id="table-box" ondrop="drop(event,'table${i}')" ondragover="allowDrop(event)" onclick="openModal('table${i}')" >
      <h2>Table-${i}</h2>
      <p>
          Rs. <span id="cost">
                  ${cost}
          </span>
          |
          Total items
          <span id="items">
                  ${items}
          </span>
      </p>    
      </div>`;
    return tableItem;
  }
  
  function createMenuItem(i, name, cost, category) {
    let menuItemEle = `<div id="item${i}"  class="menu-item" draggable="true" ondragstart="drag(event)">
            <h2>
                ${name}    
            </h2>
            <p>
                Rs
                <span id="price">
                    ${cost}
                </span>  
                <span id="category">
                    ${category}
                </span>
            </p>
            </div>`;
    return menuItemEle;
  }
  
  function refreshTables() {
    let i = 1;
    tableId.innerHTML = "";
    tables = JSON.parse(localStorage.getItem("tables"));
    console.log(tables);
    while (tables["table" + i] != undefined) {
      let { cost, items } = tables["table" + i];
      let tableEle = createTableItem(i, cost, items);
      tableId.innerHTML += tableEle;
      i = i + 1;
    }
  }
  
  function showMenu() {
    menuId.innerHTML = "";
    let i = 1;
    while (menu["item" + i] != undefined) {
      let { name, cost, category } = menu["item" + i];
      let menuItemEle = createMenuItem(i, name, cost, category);
      menuId.innerHTML += menuItemEle;
      i = i + 1;
    }
  }
  
  function searchTable() {
    let searchKey = table_name.value;
    if (searchKey == "") {
      refreshTables();
      return;
    }
    let num = searchKey.split("-");
    if (num[1] != undefined && num[1] != "") {
      let tableNo = parseInt(num[1]);
      tables = JSON.parse(localStorage.getItem("tables"));
  
      if (tables["table" + tableNo] == undefined) return;
  
      let { cost, items } = tables["table" + tableNo];
  
      let tableEle = createTableItem(tableNo, cost, items);
      tableId.innerHTML = tableEle;
    }
  }
  
  function searchMenu() {
    let searchKey = menu_search.value;
    searchKey = searchKey.toLowerCase();
    if (searchKey == "") {
      showMenu();
    }
    if (searchKey.length < 3) return;
    let menuId = document.getElementById("menu-items");
    menuId.innerHTML = " ";
    let i = 1;
    //   let c = 0;
    while (menu["item" + i] != undefined) {
      let { name, cost, category } = menu["item" + i];
      let lowerCaseName = name.toLowerCase();
      if (lowerCaseName.includes(searchKey)) {
        let menuEle = createMenuItem(i, name, cost, category);
        menuId.innerHTML += menuEle;
      } else if (category.includes(searchKey)) {
        let menuEle = createMenuItem(i, name, cost, category);
        menuId.innerHTML += menuEle;
      }
  
      i = i + 1;
    }
  }
  
  function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function drop(event, tableName) {
    event.preventDefault();
    
    addItemToTable(tableName, event.dataTransfer.getData("id"));
  }
  
  function addItemToTable(tableName, menuItemName) {
    console.log(tableName);
    console.log(menuItemName);
    let tables = JSON.parse(localStorage.getItem("tables"));
    console.log(tables);
    let currentOrder = menu[menuItemName];
    if (tables[tableName]["orders"][menuItemName] == undefined) {
      tables[tableName]["orders"][menuItemName] = 1;
    } else {
      tables[tableName]["orders"][menuItemName] += 1;
    }
    tables[tableName].cost += parseInt(currentOrder.cost);
    tables[tableName]["items"] += 1;
    localStorage.setItem("tables", JSON.stringify(tables));
    refreshTables();
    searchTable();
  }
  var tableInfoId = document.getElementById("table-info-items");
  
  function openModal(tableName) {
    modal.style.display = "block";
    document.getElementById(
      "modal-table-name"
    ).innerHTML = `<h2> ${tableName.toUpperCase()}
     <\h2>`;
    tableInfoId.innerHTML = `<tr>
      <td>
          S.No
      </td>
      <td>
          Item Name
      </td>
      <td>
          Quantity
      </td>
      <td>
          Price
      </td>
      <td>
          Delete
      </td>
  </tr>`;
    createRows(tableName);
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  
  function createRows(tableName) {
    let i = 0;
    let tables = JSON.parse(localStorage.getItem("tables"));
    let { cost, orders: currentOrders } = tables[tableName];
    console.log(cost);
    for (let [item, quantity] of Object.entries(currentOrders)) {
      i++;
      tableInfoId.innerHTML += `<tr>
      <td>
          ${i}
      </td>
      <td>
           ${menu[item].name}
      </td>
      <td>
      <button onclick="reduceItem('${tableName}','${item}')" class="change">-</button>
        ${quantity}
      <button onclick="increaseItem('${tableName}','${item}')" class="change">+</button>
      </td>
      <td>
           ${menu[item].cost*quantity}
      </td>
      <td>
      <button onclick="deleteItem('${tableName}','${item}')">
      Delete
      </button>
      </td>   
  </tr>`;
    }
    let footer = document.getElementById("modal-footer");
    footer.innerHTML = "";
    let generateBillButton = document.getElementById("generate-bill");
    generateBillButton.innerHTML = "";
    if (cost != 0) {
      footer.innerHTML = `
        <h2>
          Total Cost :
          ${cost}
        </h2>
        `;
  
      generateBillButton.innerHTML = `<button onclick="generateBill('${tableName}')" id="button-close">
            Close(Generate Bill)
          </button>`;
    }
  }
  
  function reduceItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tables"));
    let currentTable = tables[tableName];
    if (currentTable["orders"][item] == 1) {
      console.log("Cannot delete 1 item");
      return;
    }
    let itemCost = menu[item]["cost"];
    currentTable["orders"][item] = currentTable["orders"][item] - 1;
    currentTable["cost"] = currentTable["cost"] - itemCost;
    currentTable["items"] -= 1;
    tables[tableName] = currentTable;
    localStorage.setItem("tables", JSON.stringify(tables));
    refreshTables();
    openModal(tableName);
  }
  
  function increaseItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tables"));
    let currentTable = tables[tableName];
    let itemCost = menu[item]["cost"];
    currentTable["orders"][item] = currentTable["orders"][item] + 1;
    currentTable["cost"] = parseInt(currentTable["cost"]) + itemCost;
    currentTable["items"] += 1;
    tables[tableName] = currentTable;
    localStorage.setItem("tables", JSON.stringify(tables));
    refreshTables();
    openModal(tableName);
  }
  
  function deleteItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tables"));
    let currentTable = tables[tableName];
    let itemCount = currentTable["orders"][item];
    let itemCost = menu[item]["cost"];
    delete currentTable["orders"][item];
    currentTable["cost"] = parseInt(currentTable["cost"]) - itemCount * itemCost;
    currentTable["items"] -= itemCount;
    tables[tableName] = currentTable;
    localStorage.setItem("tables", JSON.stringify(tables));
    refreshTables();
    openModal(tableName);
  }
  
  function generateBill(tableName) {
    let tables = JSON.parse(localStorage.getItem("tables"));
    let currentTable = tables[tableName];
    let { cost } = currentTable;
    let emptyOrderObject = {};
    currentTable["cost"] = 0;
    currentTable["items"] = 0;
    currentTable["orders"] = emptyOrderObject;
    tables[tableName] = currentTable;
    localStorage.setItem("tables", JSON.stringify(tables));
    window.alert(`Receive bill of ${cost} on ${tableName}`);
    closeModal();
    refreshTables();
  }
