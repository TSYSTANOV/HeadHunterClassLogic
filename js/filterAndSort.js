import { VACANCIES_component } from "./renderVacancies.js";

class FilterAndSort {
  searhPeriodValue = 365;
  order_ByValue = "date";
  controller() {
    const option = document.querySelector(".option");
    const order = document.querySelector(".option__btn_order");
    const period = document.querySelector(".option__btn_period");
    const orderList = option.querySelector(".option__list_order");
    const periodList = option.querySelector(".option__list_period");
    order.addEventListener("click", () => {
      orderList.classList.toggle("option__list_active");
      periodList.classList.remove("option__list_active");
    });
    period.addEventListener("click", () => {
      periodList.classList.toggle("option__list_active");
      orderList.classList.remove("option__list_active");
    });
    orderList.addEventListener("click", () => {
      orderList
        .querySelector(".option__item_active")
        .classList.remove("option__item_active");
      order.textContent = event.target.textContent;
      event.target.classList.add("option__item_active");
      this.order_ByValue = event.target.dataset.sort;
      orderList.classList.toggle("option__list_active");
      this.sortByParams();
    });
    periodList.addEventListener("click", () => {
      periodList
        .querySelector(".option__item_active")
        .classList.remove("option__item_active");
      period.textContent = event.target.textContent;
      event.target.classList.add("option__item_active");
      this.searhPeriodValue = event.target.dataset.date;
      periodList.classList.toggle("option__list_active");
      this.sortByParams();
    });
  }
  sortByParams(dataArray) {
    let data = dataArray ? dataArray : VACANCIES_component.DATA_VACANCIES;
    data = this.sortByOrderValue(data);
    data = this.sortByPeriodValue(data);
    if (dataArray) {
      return data;
    }
    VACANCIES_component.removeVacancy();
    VACANCIES_component.renderVacancy(data);
  }
  sortByOrderValue(data) {
    switch (this.order_ByValue) {
      case "date":
        data.sort((a, b) => {
          return new Date(a.date).getTime() > new Date(b.date).getTime()
            ? -1
            : 1;
        });
        break;
      case "up":
        data.sort((a, b) => {
          return a.minCompensation > b.minCompensation ? -1 : 1;
        });
        break;
      case "down":
        data.sort((a, b) => {
          return a.minCompensation > b.minCompensation ? 1 : -1;
        });
        break;
    }
    return data;
  }
  sortByPeriodValue(data) {
    return data.filter((el) => {
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() - this.searhPeriodValue);
      if (new Date(dateNow).getTime() < new Date(el.date).getTime()) {
        return true;
      }
    });
  }
}
const FILTR_SORT_component = new FilterAndSort();
export { FILTR_SORT_component };
