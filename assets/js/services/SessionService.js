export class SessionService{
  constructor(key = "searchHistory"){
    this.key = key;
    this.limit= 3;
  }

  getSearches(){
    return JSON.parse(sessionStorage.getItem(this.key)) || [];
  }

  saveSearch(city){
    let searches = this.getSearches();

    if( city && !searches.includes(city)){
        searches.unshift(city);
        searches = searches.slice(0, this.limit);
        sessionStorage.setItem(this.key, JSON.stringify(searches));

    }

    window.dispatchEvent(new CustomEvent("historyUpdated", { detail: history }));
  }
}