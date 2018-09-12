import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';

@Injectable()
export class Auth{


    constructor(private http: HttpClient){}

    register(data){
     return this.http.post(environment.apiUrl+'/user/signUp',data);
    }

    login(data){
       return this.http.post<{token:string}>(environment.apiUrl+'/user/login',data)
      
  }    
    
}