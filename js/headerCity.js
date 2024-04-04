import { API_component } from "./api.js";
import { FILTR_SORT_component } from "./filterAndSort.js";
import { LOCAL_STORAGE_component } from "./localStorage.js";
import { VACANCIES_component } from "./renderVacancies.js";
import { SEARCH_component } from "./search.js";

const btnOpen = document.querySelector(".top__city");

class HeaderCity {
  ROOT_element;
  btnOpenWidnow;
  activeClass;
  isWindowOpen = false;
  constructor(elem, activeClass, root) {
    this.btnOpenWidnow = elem;
    this.activeClass = activeClass;
    this.ROOT_element = root;
  }
  async initHeader() {
    let param = null;
    if (LOCAL_STORAGE_component.getItem("mainLocationHH")) {
      this.btnOpenWidnow.textContent =
        LOCAL_STORAGE_component.getItem("mainLocationHH")[1];
      param = LOCAL_STORAGE_component.getItem("mainLocationHH")[0];

      const urlData = new URL(location)
      if(urlData.searchParams.has('location')){
        urlData.searchParams.set('location', LOCAL_STORAGE_component.getItem("mainLocationHH")[1])
      }else{
        urlData.searchParams.append('location', LOCAL_STORAGE_component.getItem("mainLocationHH")[1])
      }
      history.pushState(null, null, urlData)

    } else {
      this.btnOpenWidnow.textContent = "Украина";
      const urlData = new URL(location)
      if(urlData.searchParams.has('location')){
        urlData.searchParams.set('location', 'Украина')
      }else{
        urlData.searchParams.append('location', 'Украина')
      }
      history.pushState(null, null, urlData)
    }
    let data = await API_component.getVacanciesByLocation(
      param ? param : "country",
      this.btnOpenWidnow.textContent
    );
    VACANCIES_component.DATA_VACANCIES = data;
    VACANCIES_component.removeVacancy();
    VACANCIES_component.renderVacancy(data);

    this.btnOpenWidnow.addEventListener("click", () => {
      if (this.isWindowOpen) {
        this.removeWindow();
      } else {
        this.renderWindow();
      }
    });
  }
  removeWindow() {
    document
      .querySelector(this.ROOT_element)
      .querySelector(`.${this.activeClass}`)
      .remove();
    this.isWindowOpen = false;
  }
  renderWindow() {
    this.isWindowOpen = true;
    const city = document.createElement("div");
    city.className = `city ${this.activeClass}`;
    city.innerHTML = `
      <div class="container city__container">
        <button class="city__close">✕</button>
        <form class="city__form">
          <label class="city__label" for="city__label"
            >Укажите город, который требуется найти:</label
          >
          <div class="city__input-wrapper">
            <input
              type="search"
              class="city__input"
              id="city__label"
              placeholder="Поис по городам"
            />
            <button type="submit" class="city__search-button"></button>
          </div>
        </form>
        <div class="city__region">
          <ul class="city__region-list">
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Россия</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Москва</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Санкт-Петербург</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Владивосток</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Екатеринбург</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Челябинск</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Калининград</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Украина</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Киев</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Днепропетровск</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Донецк</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Львов</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Одесса</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Харьков</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Казахстан</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Нур-Султан</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Актобе</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Алматы</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Павлодар</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Тараз</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Усть-Каменогорск</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Беларусь</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Минск</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Брест</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Витебск</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Гомель</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Гродно</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Могилев</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Узбекистан</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Ташкент</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Азербайджан</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Баку</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Грузия</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Тбилиси</a>
                </li>
              </ul>
            </li>
            <li class="city__region-item">
              <ul class="city__list">
                <li class="city__item">
                  <a class="city__link" href="#country">Кыргызстан</a>
                </li>
                <li class="city__item">
                  <a class="city__link" href="#city">Бишкек</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>`;
    document.querySelector(this.ROOT_element).append(city);
    this.cityChoose(city);
  }
  cityChoose(HTMLelement) {
    HTMLelement.addEventListener("click", async () => {
      if (event.target.classList.contains("city__close")) {
        this.removeWindow();
        return;
      }
      SEARCH_component.removeSearchTitle();
      if (event.target.classList.contains("city__link")) {
        this.btnOpenWidnow.textContent = event.target.textContent;
        const urlData = new URL(location)
        if(urlData.searchParams.has('location')){
          urlData.searchParams.set('location',this.btnOpenWidnow.textContent)
        }else{
          urlData.searchParams.append('location',this.btnOpenWidnow.textContent)
        }

        console.log(urlData)
        history.pushState(null,null,urlData)
        const param = event.target.getAttribute("href").slice(1);
        LOCAL_STORAGE_component.setItem("mainLocationHH", [
          param,
          event.target.textContent,
        ]);
        let data = await API_component.getVacanciesByLocation(
          param,
          event.target.textContent
        );

        VACANCIES_component.DATA_VACANCIES = data;

        data = FILTR_SORT_component.sortByParams(data);
        VACANCIES_component.removeVacancy();
        VACANCIES_component.renderVacancy(data);
        this.removeWindow();
        return;
      }
      return;
    });
  }
}

const HEADER_CITY_component = new HeaderCity(btnOpen, "city_active", "body");
export { HEADER_CITY_component };
