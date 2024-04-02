import { API_component } from "./api.js";

const modal = document.querySelector(".overlay_vacancy");

class ModalVacancy {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderModal(id) {
    const data = await API_component.getSingleVacancy(id);
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
    <h2 class="modal__title">${data.title}</h2>
    <p class="modal__compensation">${data.compensation}</p>
    <p class="modal__employer">${data.employer}</p>
    <p class="modal__address">${data.address}</p>
    <p class="modal__experience">Требуемый опыт работы: ${data.experience}</p>
    <p class="modal__employment">${data.employment.join(", ")}</p>
    <p class="modal__description">${data.description}</p>
    <div class="modal__skills skills">
        <h2 class="skills__title">Подробнее:</h2>
        <ul class="skills__list">
        </ul>
    </div>

  <button class="modal__response">Отправить резюме</button>
  `;
    data.skills.forEach((el) => {
      let li = document.createElement("li");
      li.className = "skills__item";
      li.textContent = el;
      modal.querySelector(".skills__list").append(li);
    });

    let btnClose = document.createElement("button");
    btnClose.className = "modal__close";
    btnClose.textContent = "X";
    btnClose.addEventListener("click", () => {
      this.removeModalVacancy();
    });
    modal.prepend(btnClose);
    this.ROOT_element.style.display = "block";
    this.ROOT_element.append(modal);
    this.adaListenerForOverlayToClose(this.ROOT_element);
  }
  removeModalVacancy() {
    this.ROOT_element.style.display = "none";
    this.ROOT_element.innerHTML = "";
  }
  adaListenerForOverlayToClose(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      if (event.target.classList.contains("overlay_vacancy")) {
        this.removeModalVacancy();
      }
      return;
    });
  }
}

const MODAL_VACANCY = new ModalVacancy(modal);
export { MODAL_VACANCY };
