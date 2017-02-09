import { Injectable }    from '@angular/core';
import { HttpClient } from './http-client';

@Injectable()
export class UserService  {
  private loggedIn = false;
 httpClient: HttpClient;
 containerType = "";

 constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  login(name,pass){
    let body = "_username="+name+"&_password="+pass;
    return this.httpClient.login_post(this.httpClient.getRootUrl()+"login_check", body)
      .map(res => res.json())
      .map((res) => {
        var result = false;
        if (!res['code']) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
          result = true;
        } else {
          result = false;
        }

        return result;
      });
  }

  register(user, email, password, firstname, lastname) {
    let body = "user="+user+"&email"+email+"&password"+password+"&firstname"+firstname+"&lastname"+lastname;
    return this.httpClient.register_post(this.httpClient.getRootUrl()+"usuarios/create.json", body)
            .map(res => res.json())
            .map((res) => {
            if (res.success) {
              localStorage.setItem('auth_token', res.auth_token);
              this.loggedIn = true;
            }
    
            return res.success;
          });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  ListJson(containerType): Promise<Object>{
    let body =    "containerType="+containerType+"&templateCode=ux_TreeRootNode&searchCode=&searchType&searchDto=&options.Start=0&options.Limit=500&options.SortColumn=&options.SortOrder=&"
    return this.httpClient.post(this.httpClient.getRootUrl()+"Characteristics/ListJson", body)
               .toPromise()
               .then(response => response.json().data.root)
               .catch(this.handleError);
  }
  login_token(name,pass): Promise<String>{
    let body = "username="+name+"&password="+pass+"&grant_type=password";
    return this.httpClient.login_post(this.httpClient.getRootUrl()+"oauth2/token", body)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  // Getimage(code): Promise<String>{
  //   return this.httpClient.get(this.httpClient.getRootUrl()+"characteristics/GetCharacteristicImageDescriptionThumbnailJson?&characteristicCode=44ffe54b-d1b5-44da-a5a3-5a7ce8e2f022&width=30&height=30")
  //              .toPromise()
  //              .then(response => response.json())
  //              .catch(this.handleError);
  // }

  Test(): Promise<Object>{
    let body =    "containerType=Item"
    return this.httpClient.get("https://test-a.gfxsymphony.com/v1/characteristics/GetCharacteristics?Items")
               .toPromise()
               .then(response => response.json().root)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
