import { API_component } from "./api.js";
import { VACANCIES_component } from "./renderVacancies.js";
const form = document.querySelector(".bottom__search");

class Search {
  ROOT_element;
  titleSearchElement;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderSearchTitle(count, searchValue) {
    const root = document.querySelector("main > .container");
    const title = document.createElement("h1");
    title.className = "found";
    title.innerHTML = `
          ${count} вакансий &laquo;<span class="found__item">${searchValue}</span
          >&raquo;`;
    this.titleSearchElement = title;
    root.prepend(title);
  }
  removeSearchTitle() {
    if (this.titleSearchElement) {
      this.titleSearchElement.remove();
    }
  }
  initSearch() {
    form.addEventListener("submit", async () => {
      event.preventDefault();
      if (this.titleSearchElement) {
        this.titleSearchElement.remove();
      }
      if (form.search.value.length === 0) {
        return;
      }
      const result = await API_component.getVacanciesBySearch(
        form.search.value
      );

      VACANCIES_component.removeVacancy();
      VACANCIES_component.renderVacancy(result);
      this.renderSearchTitle(result.length, form.search.value);
      form.reset();
      form.search.blur();
    });
  }
}

const SEARCH_component = new Search(form);
export { SEARCH_component };
