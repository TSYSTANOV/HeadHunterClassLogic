class API {
  BASE_URL;
  constructor(url) {
    this.BASE_URL = url;
  }
  getVacancies() {
    return fetch(`${this.BASE_URL}/api/vacancy`).then((response) =>
      response.json()
    );
  }
  getVacanciesBySearch(search) {
    return fetch(`${this.BASE_URL}/api/vacancy?search=${search}`).then(
      (response) => response.json()
    );
  }
  getSingleVacancy(id) {
    return fetch(`${this.BASE_URL}/api/vacancy/${id}`).then((response) =>
      response.json()
    );
  }
  getVacanciesByLocation(param, location) {
    return fetch(`${this.BASE_URL}/api/vacancy?${param}=${location}`).then(
      (response) => response.json()
    );
  }
}

const API_component = new API("http://localhost:3000");
export { API_component };
