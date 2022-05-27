const addTime = new Date();
const userNameArr = ["John", "Michael", "David", "Anna"];
const month = () => {
  if (addTime.getMonth() + 1 < 10) {
    return "0" + (addTime.getMonth() + 1);
  }
};
const minutes = () => {
  if (addTime.getMinutes() < 10) {
    return "0" + addTime.getMinutes();
  }
  return addTime.getMinutes();
};
const seconds = (sum) => {
  if (addTime.getSeconds() < 10) {
    return "0" + (addTime.getSeconds() + sum);
  }
  return addTime.getSeconds() + sum;
};
const users = userNameArr.map((userName, index) => ({
  id: index,
  userName: userName,
  date: `${addTime.getDate()}.${month()}.${addTime.getFullYear()} ${addTime.getHours()}:${minutes()}:${seconds(
    index
  )}`,

  persID: getRandomInt(11111, 99999),
}));
// Random ID for Users
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// List users from start array
const addData = (list) => {
  document.querySelector(".user-data").innerHTML = list
    .map(
      (el, index) =>
        `<tr class="user-stroke user-stroke-id${el.id}">
    <td class="number" style="min-width: 60px;">${index + 1}</td>
    <td class="user-id user-id${el.id}">${el.persID}</td>
    <td class="user-name user-name-id${el.id} name-width">${el.userName}</td>
    
    <td>

    <button class="edit-user edit-btn-id${el.id} btn btn-primary" id="${
          el.id
        }"><img class="icon" id="${el.id}" src="edit.png"></img></button>
        
    <button class="no-btn  btn btn-primary hidden-btn btn-no-id${el.id}" id="${
          el.id
        }"><img class="icon" id="${el.id}" src="x.png"/></button>
    
    </td>
    <td><button id="${
      el.id
    }" type="button" class="delete-user btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <img class="icon" id="${el.id}" src="trash.png"></img></button></td>
    <td class="add-data">${el.date}</td>
    </tr>`
    )
    .join(" ");
  [...document.querySelectorAll(".delete-user")].forEach((button) =>
    button.addEventListener("click", delUser.bind(this))
  );
  [...document.querySelectorAll(".edit-user")].forEach((button) =>
    button.addEventListener("click", editUser.bind(this))
  );
  // buttons sort name
  [...document.querySelectorAll(".sort-name")].forEach((button) =>
    button.addEventListener("click", sortNameAsc)
  );

  document
    .querySelector(".sort-name-asc")
    .addEventListener("click", sortNameDesc);
  //buttons sort Number

  [...document.querySelectorAll(".sort-num")].forEach((button) =>
    button.addEventListener("click", sortNumAsc)
  );
  document
    .querySelector(".sort-num-asc")
    .addEventListener("click", sortNumDesc);
  //buttons sort ID
  [...document.querySelectorAll(".sort-id")].forEach((button) =>
    button.addEventListener("click", sortIdAsc)
  );
  document.querySelector(".sort-id-asc").addEventListener("click", sortIdDesc);
  // buttons sort date
  [...document.querySelectorAll(".sort-date")].forEach((button) =>
    button.addEventListener("click", sortDateAsc)
  );
  document
    .querySelector(".sort-date-asc")
    .addEventListener("click", sortDateDesc);
};
//  Add new user
const addUser = () => {
  userNameArr.push(document.querySelector(".input-new-name").value);
  users.push({
    id: userNameArr.length - 1,
    userName: document.querySelector(".input-new-name").value,
    date: Date().replace("GMT+0300 (Москва, стандартное время)", ""),
    persID: getRandomInt(11111, 99999),
  });
  document.querySelector(".input-new-name").value = "";
  document.querySelector(".btn-add").disabled = true;
  newUser = document.createElement("tr");

  id = users.length - 1;
  newUser.classList = "user-stroke user-stroke-id" + id;
  newUser.innerHTML = `<tr class="user-stroke user-stroke-id${id}">
    <td class="number" style="min-width: 60px;">${users.length}</td>
    <td class="user-id user-id${id}">${users[id].persID}</td>
    <td class="user-name user-name-id${id} name-width">${users[id].userName}</td>
    
    <td>

    <button class="edit-user edit-btn-id${id} btn btn-primary" id="${id}"><img class="icon" id="${id}" src="edit.png"></img></button>
        
    <button class="no-btn  btn btn-primary hidden-btn btn-no-id${id}" id="${id}"><img class="icon" id="${id}" src="x.png"/></button>
    
    </td>
    <td><button id="${id}" type="button" class="delete-user btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <img class="icon" id="${id}" src="trash.png"></img></button></td>
    <td class="add-data">${users[id].date}</td>
    </tr>`;
  document.querySelector(".user-data").append(newUser);
  [...document.querySelectorAll(".delete-user")].forEach((button) =>
    button.addEventListener("click", delUser.bind(this))
  );
  [...document.querySelectorAll(".edit-user")].forEach((button) =>
    button.addEventListener("click", editUser.bind(this))
  );
};
//  Delete user from array and table
const delUser = (event) => {
  id = event.target.id;
  searchName = userNameArr[id];
  idValue = document.querySelector(".user-id" + id).firstChild.nodeValue;
  index = users.findIndex((el) => el.userName === searchName);
  document.querySelector(".modal-body").innerHTML =
    "ID: " + idValue + " " + "Name: " + searchName;
  document
    .querySelector(".confirm")
    .addEventListener("click", confirmDeleteUser);
};

// Confirm delete user
const confirmDeleteUser = (event) => {
  users.splice(index, 1);
  addData(users);
};
// Cancel edit user
const editCancel = (event) => {
  id = event.target.id;
  document.querySelector(".edit-btn-id" + id).classList.toggle("hidden-btn");
  document.querySelector(".btn-no-id" + id).classList.toggle("hidden-btn");
  document.querySelector(".user-name-id" + id).innerHTML = `${userNameArr[id]}`;
  document.querySelector(".btn-no-id" + event.target.id).disabled = false;
};
// Confirm delete user
const confirmEdit = (event) => {
  id = event.target.id;
  searchName = userNameArr[id];
  index = users.findIndex((el) => el.userName === searchName);
  document.querySelector(".edit-btn-id" + id).classList.toggle("hidden-btn");
  document.querySelector(".btn-no-id" + id).classList.toggle("hidden-btn");

  userNameArr[id] = `${
    document.querySelector(".user-name-id" + id).firstChild.value
  }`;
  users[index].userName = `${
    document.querySelector(".user-name-id" + id).firstChild.value
  }`;
  document.querySelector(".user-name-id" + id).innerHTML =
    document.querySelector(".user-name-id" + id).firstChild.value;
};
// Input edit user
const editUser = (event) => {
  id = event.target.id;
  document.querySelector(
    ".user-name-id" + id
  ).innerHTML = `<input class="edit-name" id="${id}" value="${userNameArr[id]}"/> <button id="${id}" class="btn btn-primary confirm-edit confirm-btn-id${id} "><img class="icon" id="${id}" src="../check.png"/></button>`;
  document.querySelector(".edit-btn-id" + id).classList.toggle("hidden-btn");
  document.querySelector(".btn-no-id" + id).classList.toggle("hidden-btn");
  document
    .querySelector(".btn-no-id" + id)
    .addEventListener("click", editCancel);

  document
    .querySelector(".confirm-btn-id" + id)
    .addEventListener("click", confirmEdit);
  [...document.querySelectorAll(".edit-name")].forEach((input) =>
    input.addEventListener("keyup", function (event) {
      document.querySelector(".confirm-btn-id" + event.target.id).disabled =
        !event.target.value.length;
    })
  );
};
// Check input new user
document
  .querySelector(".input-new-name")
  .addEventListener(
    "keyup",
    (event) =>
      (document.querySelector(".btn-add").disabled = !event.target.value.length)
  );
document.querySelector(".btn-add").addEventListener("click", addUser);
document.querySelector(".confirm").addEventListener("click", confirmDeleteUser);
document.querySelector(".button-close").addEventListener("click", (event) => {
  document.querySelector(".input-new-name").value = "";
  document.querySelector(".btn-add").disabled = true;
});
// sorting

const sortingAsc = (sort, btn, subBtn) => {
  addData(users);
  chkSort();
  let sorting = [...document.querySelectorAll(sort)]
    .map((el) => el.firstChild.nodeValue)
    .sort(function (s1, s2) {
      (l = s1.toLowerCase()), (m = s2.toLowerCase());
      return l === m ? 0 : l > m ? 1 : -1;
    });

  document.querySelector(".user-data").innerHTML = sorting
    .map((el) => {
      searchEl = el;
      index = [...document.querySelectorAll(sort)].findIndex(
        (el) => el.innerHTML === searchEl
      );
      arrSorting = [];
      arrSorting.push(
        `<tr class="user-stroke user-stroke-id${index}">${
          document.querySelector(".user-stroke-id" + index).innerHTML
        }</tr>`
      );
      return arrSorting;
    })
    .join(" ");
  [...document.querySelectorAll(".delete-user")].forEach((button) =>
    button.addEventListener("click", delUser.bind(this))
  );
  [...document.querySelectorAll(".edit-user")].forEach((button) =>
    button.addEventListener("click", editUser.bind(this))
  );
  if (!document.querySelector(btn).classList.contains("hidden-btn")) {
    document.querySelector(btn).classList.toggle("hidden-btn");
  }
  if (document.querySelector(subBtn).classList.contains("hidden-btn")) {
    document.querySelector(subBtn).classList.toggle("hidden-btn");
  }
};

const sortingDesc = (sort, btn, subBtn, tBtn) => {
  addData(users);
  chkSort();
  let sorting = [...document.querySelectorAll(sort)]
    .map((el) => el.firstChild.nodeValue)
    .sort(function (s1, s2) {
      (l = s1.toLowerCase()), (m = s2.toLowerCase());
      return l === m ? 0 : l < m ? 1 : -1;
    });

  document.querySelector(".user-data").innerHTML = sorting
    .map((el) => {
      searchEl = el;
      index = [...document.querySelectorAll(sort)].findIndex(
        (el) => el.innerHTML === searchEl
      );
      arrSorting = [];
      arrSorting.push(
        `<tr class="user-stroke user-stroke-id${index}">${
          document.querySelector(".user-stroke-id" + index).innerHTML
        }</tr>`
      );
      return arrSorting;
    })
    .join(" ");
  [...document.querySelectorAll(".delete-user")].forEach((button) =>
    button.addEventListener("click", delUser.bind(this))
  );
  [...document.querySelectorAll(".edit-user")].forEach((button) =>
    button.addEventListener("click", editUser.bind(this))
  );
  if (!document.querySelector(btn).classList.contains("hidden-btn")) {
    document.querySelector(btn).classList.toggle("hidden-btn");
  }
  if (!document.querySelector(subBtn).classList.contains("hidden-btn")) {
    document.querySelector(subBtn).classList.toggle("hidden-btn");
  }

  document.querySelector(tBtn).classList.toggle("hidden-btn");
};

// Sort users using number

const sortNumAsc = () => sortingAsc(".number", ".btn-num", ".num-asc");

const sortNumDesc = () =>
  sortingDesc(".number", ".btn-num", ".num-asc", ".num-desc");

// Sort users using personal ID

const sortIdAsc = () => sortingAsc(".user-id", ".btn-id", ".id-asc");

const sortIdDesc = () =>
  sortingDesc(".user-id", ".btn-id", ".id-asc", ".id-desc");
// Sort users using Date

const sortDateAsc = () => sortingAsc(".add-data", ".btn-date", ".date-asc");

const sortDateDesc = () =>
  sortingDesc(".add-data", ".btn-date", ".date-asc", ".date-desc");

// Check sort button

const chkSort = () => {
  //   chk num
  if (
    document
      .querySelector(".first-sort-btn.btn-num")
      .classList.contains("hidden-btn")
  ) {
    document
      .querySelector(".first-sort-btn.btn-num")
      .classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".num-asc").classList.contains("hidden-btn")) {
    document.querySelector(".num-asc").classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".num-desc").classList.contains("hidden-btn")) {
    document.querySelector(".num-desc").classList.toggle("hidden-btn");
  }
  //   chk name
  if (
    document
      .querySelector(".first-sort-btn.btn-name")
      .classList.contains("hidden-btn")
  ) {
    document
      .querySelector(".first-sort-btn.btn-name")
      .classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".name-asc").classList.contains("hidden-btn")) {
    document.querySelector(".name-asc").classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".name-desc").classList.contains("hidden-btn")) {
    document.querySelector(".name-desc").classList.toggle("hidden-btn");
  }

  // chk ID
  if (
    document
      .querySelector(".first-sort-btn.btn-id")
      .classList.contains("hidden-btn")
  ) {
    document
      .querySelector(".first-sort-btn.btn-id")
      .classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".id-asc").classList.contains("hidden-btn")) {
    document.querySelector(".id-asc").classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".id-desc").classList.contains("hidden-btn")) {
    document.querySelector(".id-desc").classList.toggle("hidden-btn");
  }

  // chk date
  if (
    document
      .querySelector(".first-sort-btn.btn-date")
      .classList.contains("hidden-btn")
  ) {
    document
      .querySelector(".first-sort-btn.btn-date")
      .classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".date-asc").classList.contains("hidden-btn")) {
    document.querySelector(".date-asc").classList.toggle("hidden-btn");
  }
  if (!document.querySelector(".date-desc").classList.contains("hidden-btn")) {
    document.querySelector(".date-desc").classList.toggle("hidden-btn");
  }
  return;
};

// Sort user using Name
const sortNameAsc = () => sortingAsc(".user-name", ".btn-name", ".name-asc");

const sortNameDesc = () =>
  sortingDesc(".user-name", ".btn-name", ".name-asc", ".name-desc");

addData(users);
