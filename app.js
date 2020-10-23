const formEl = document.querySelector("#loginForm");
const showUsersButtonEl = document.querySelector(".showUsersButton");
const usersListEl = document.querySelector(".usersList");
const apiUrl = "https://reqres.in/";
const userInfoContainer = document.querySelector(".userInfoContainer");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(apiUrl + "api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerText = jsonData.error;
        errorMessageEl.classList.remove("hide");
      } else {
        showUsersButtonEl.classList.remove("hide");
      }
    });
});

showUsersButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "api/users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const users = data.data;
      const usersList = users
        .map((user) => {
          return `<li class="user" data-userid="${user.id}">${user.first_name}</li>`;
        })
        .join("");
      usersListEl.innerHTML = usersList;
    });
});

usersListEl.addEventListener("click", (e) => {
  console.log(e.target.dataset);
  const userId = e.target.dataset.userid;
  fetch(`${apiUrl}api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      userInfoContainer.innerHTML = "";

      const name = document.createElement("p");
      name.innerText = user.data.first_name + "" + user.data.last_name;
      userInfoContainer.appendChild(name);

      const avatarImg = document.createElement("img");
      avatarImg.src = user.data.avatar;
      userInfoContainer.appendChild(avatarImg);

      const email = document.createElement("p");
      email.innerText = user.data.email;
      userInfoContainer.append(email);
    });
});
