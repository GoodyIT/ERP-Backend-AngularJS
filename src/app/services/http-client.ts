import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpClient {
    http: Http;
    root ='http://159.203.115.59:8001/api/';
    path ='https://test-a.gfxsymphony.com';
    // path ='http://localhost:15709';
    // root ='http://localhost:15709/v1/';

    composer = this.root;
    company_name;

    band = false;

  constructor(http: Http, private router: Router) {
    this.http = http;
    this.setCompanyCode();
  }

  createAuthorizationHeader() :Headers {
    let headers:Headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
  //  headers.append('x-company-code',localStorage.getItem("company_code"));
  //  headers.append('Authorization', "Bearer "+localStorage.getItem("token"));
    return headers;
  }
  setCompanyCode(){
    if(window.location.pathname.split("/")[2]=='login'){
    this.company_name=window.location.pathname.split("/")[1];
    console.log("Company name: ", this.company_name);
    localStorage.setItem("company_code",this.company_name);
    }
  }
  setToken(response){
    if(response.access_token){
    localStorage.setItem("token",response.access_token);
    console.log("Token: ", localStorage.getItem("token"));
    this.router.navigateByUrl('/home');
    }
    else{
    this.router.navigateByUrl('/logintoken');  
    }
  }

  getRootUrl(){
    return this.root;
  }
  getPathUrl(){
    return this.path;
  }

  get(url) {
    let headers:Headers = this.createAuthorizationHeader();

    return this.http.get(url, {
      // withCredentials: true,
      headers: headers
    });
  }

  pureGet(url) {
    return this.http.get(url);
  }
  put(url) {
    let headers:Headers = this.createAuthorizationHeader();

    return this.http.put(url,{}, {
      headers: headers
    });
  }

  //2017/2/4
  delete(url) {
    let headers:Headers = this.createAuthorizationHeader();

    return this.http.delete(url,{
      headers: headers
    });
  }

  post(url, data) {
   let headers = this.createAuthorizationHeader();

    return this.http.post(url, data, {
      headers: headers
    });
  }

  doPost(mod, action, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();
    let url = this.composer + mod + '/' + action;

    return this.http.post(url, data, options)
                    .toPromise()
                    .then((response) => response.json())
                    .catch(this.handleError);
  }

  //2017/2/4
  doPut(mod, action, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();
    let url = this.composer + mod + '/' + action;

    return this.http.put(url, data, options)
                    .toPromise()
                    .then((response) => {
                      //response.json()
                    })
                    .catch(this.handleError);
  }

  //2017/2/4
  doDelete(mod, action, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();
    let url = this.composer + mod + '/' + action;

    return this.http.delete(url, options)
                    .toPromise()
                    .then((response) => {
                      console.log(response);
                      // response.json()
                    })
                    .catch(this.handleError);
  }

  doPost_emptyResult(mod, action, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();

    let url = this.composer + mod + '/' + action;

    return this.http.post(url, data, options)
                    .toPromise()
                    .then((response) => "")
                    .catch(this.handleError);
  }

  doDelete_emptyResult(mod, action, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();

    let url = this.composer + mod + '/' + action;

    return this.http.delete(url, options)
                    .toPromise()
                    .then((response) => "")
                    .catch(this.handleError);
  }

  doPostURL(url, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();

    return this.http.post(url, data, options)
                    .toPromise()
                    .then((response) => response.json())
                    .catch(this.handleError);
  }

  doGetURL(url, data, options:any = {}) {
    options.headers = this.createAuthorizationHeader();

    return this.http.get(url, options)
                    .toPromise()
                    .then((response) => response.json())
                    .catch(this.handleError); 
  }

  login_post(url, data) {
    let headers = this.createAuthorizationHeader();

    return this.http.post(url, data, {
    //  withCredentials: true,
      headers: headers
    });
  }

  register_post(url, data) {
    let headers = this.createAuthorizationHeader();

    return this.http.post(url, data, {
   //   withCredentials: true,
      headers: headers
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
