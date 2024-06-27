export const environment = {
  production: true,
  url_ : "/", //"http://149.202.84.49:8080",
  baseUrl : "api_phcien",
  get url () {
    return this.url_ + this.baseUrl +"/"
  }
};
