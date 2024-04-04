import { API_component } from "./api.js";
import { FILTR_SORT_component } from "./filterAndSort.js";
import { LOCAL_STORAGE_component } from "./localStorage.js";
import { MODAL_VACANCY } from "./openModalVacancy.js";
import { SEARCH_component } from "./search.js";
const resultList = document.querySelector(".wrapper__result");
const headerLogo = document.querySelector(".middle__logo");
headerLogo.addEventListener("click", async () => {
  SEARCH_component.removeSearchTitle();
  VACANCIES_component.removeVacancy();
  let dataArr = null;
  if (LOCAL_STORAGE_component.getItem("mainLocationHH")) {
    dataArr = await API_component.getVacanciesByLocation(
      LOCAL_STORAGE_component.getItem("mainLocationHH")[0],
      LOCAL_STORAGE_component.getItem("mainLocationHH")[1]
    );
    dataArr = FILTR_SORT_component.sortByParams(dataArr);
    VACANCIES_component.DATA_VACANCIES = dataArr;
    VACANCIES_component.renderVacancy(dataArr);
    return;
  }
  VACANCIES_component.renderVacancy();
});

class Vacancies {
  ROOT_element;
  DATA_VACANCIES = [];
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderVacancy(dataVacancy, filteredData = false) {
    let data = null;
    if (dataVacancy) {
      data = dataVacancy;
    } else {
      data = await API_component.getVacancies();
    }
    if(filteredData === false){
      data = FILTR_SORT_component.sortByParams(data);
    }



    const list = document.createElement("ul");
    list.className = "result__list";

    const elems = data.map((item) => {
      const li = document.createElement("li");
      li.className = "result__item";
      li.innerHTML = `
                <article class="vacancy">
                  <h2 class="vacancy__title">
                    <a class="vacancy__open-modal" data-vacancy="${item.id}"
                      >${item.title}</a
                    >
                  </h2>
                  <p class="vacancy__compensation">
                    ${item.compensation}
                  </p>
                  <p class="vacancy__work-schedule">${item.workSchedule}</p>
                  <div class="vacancy__employer">
                    <p class="vacancy__employer-title">${item.employer}</p>
                    <p class="vacancy__employer-address">${item.address}</p>
                  </div>
                  <p class="vacancy__description">
                  ${item.description}
                  </p>
                  <p class="vacancy__date">
                    <time datetime="2022-02-25">${item.date}</time>
                  </p>
                  <div class="vacancy__wrapper-btn">
                    <a
                      class="vacancy__response vacancy__open-modal"
                      data-vacancy="${item.id}"
                      >Откликнуться</a
                    >
                    <button class="vacancy__contacts">Показать контакты</button>
                  </div>
                </article>`;
      return li;
    });
    list.append(...elems);
    this.ROOT_element.append(list);

    this.initListener(list);
  }
  removeVacancy() {
    this.ROOT_element.innerHTML = "";
  }
  initListener(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      if (!event.target.dataset.vacancy) {
        return;
      }
      MODAL_VACANCY.renderModal(event.target.dataset.vacancy);
    });
  }
}

const VACANCIES_component = new Vacancies(resultList);
export { VACANCIES_component };
