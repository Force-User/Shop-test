const Users = {
  usersArray: [],
  url: `https://jsonplaceholder.typicode.com/users/`,
  users: null,
  area: null,

  init() {
    this.createUser();
  },

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then((data) => data.json())
        .then((users) => {
          console.log(users);
          this.users = users;
          resolve();
        });
    });
  },
  createUser() {
    this.getUsers().then(() => {
      this.area = document.createElement("div");
      this.area.classList.add("user-area");

      this.users.forEach((user) => {
        const persona = document.createElement("div");
        persona.classList.add("user");
        const id = document.createElement("span");
        id.textContent = `id: ${user.id}`;
        const name = document.createElement("span");
        name.textContent = `Name: ${user.name}`;
        const username = document.createElement("span");
        username.textContent = `Username: ${user.username}`;
        const email = document.createElement("span");
        email.textContent = `Email: ${user.email}`;
        const phone = document.createElement("span");
        phone.textContent = `Phone: ${user.phone}`;
        persona.append(id, name, username, email, phone);
        this.area.append(persona);
      });
      document.querySelector(".clients > .wrapper").append(this.area);
    });
  },
};

const Modal = {
  modal: null,
  window: null,
  head: null,
  label: [],
  button: null,
  cross: null,

  init() {
    this.modal = document.createElement("div");
    this.window = document.createElement("form");

    this.label.push(this.createLabel("Login"));
    this.label.push(this.createLabel("Password"));
    this.button = document.createElement("button");

    this.modal.classList.add("modal--background", "modal--hidden");
    this.window.classList.add("modal");

    this.button.classList.add("modal__button");

    this.button.textContent = "Submit";

    this.window.append(this.createHead());
    this.label.forEach((item) => this.window.append(item));
    this.window.append(this.button);
    this.modal.append(this.window);
    document.body.prepend(this.modal);
    this.head
      .querySelector(".modal-head__cross")
      .addEventListener("click", () => {
        this.closeModalWindow();
      });
  },
  createHead() {
    const head = document.createElement("div");
    head.classList.add("modal-head");

    const cross = document.createElement("button");
    cross.classList.add("modal-head__cross", "material-icons");
    cross.textContent = "close";
    head.append(cross);
    this.head = head;
    return head;
  },

  createLabel(name) {
    const label = document.createElement("label");
    const labelName = document.createElement("span");
    const input = document.createElement("input");
    label.classList.add("modal-label");
    input.classList.add("modal-label__input");
    labelName.textContent = name;
    label.append(labelName);
    label.append(input);
    return label;
  },
  open() {
    this.modal.classList.remove("modal--hidden");
  },

  closeModalWindow() {
    this.modal.classList.add("modal--hidden");
  },
};

const Search = {
  main: null,
  input: null,
  button: null,

  init() {
    this.main = document.createElement("label");
    this.main.classList.add("search");

    this.input = document.createElement("input");
    this.input.classList.add("search__input");

    this.button = document.createElement("button");
    this.button.classList.add("search__button", "material-icons");
    this.button.textContent = "search";

    this.main.append(this.input);
    this.main.append(this.button);

    document.querySelector(".search--here").append(this.main);
    this.input.addEventListener("blur", () => this._toggleSearchArea());
  },

  _toggleSearchArea() {
    console.log(this.main);
    this.main.classList.toggle("search--showing");
  },

  _addEventsListenerOnElements() {
    this.input.addEventListener("blur", () => {
      toggleSearchArea();
    });
  },
};
//-----------------

const headerButtons = document.querySelector(".header-buttons");
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".menu");
Modal.init();

Search.init();

Users.init();

burger.addEventListener("click", toggleBurgerMenu);

headerButtons.addEventListener("click", (e) => {
  const selectedButton = e.target.closest("button");
  if (!selectedButton) return;

  if (selectedButton.dataset.name === "search") {
    Search._toggleSearchArea();
    return;
  }
  if (selectedButton.dataset.name === "modal") {
    Modal.open();
    return;
  }
});

function toggleBurgerMenu() {
  burger.classList.toggle("burger--rotate");
  burgerMenu.classList.toggle("menu--hidden");
}
