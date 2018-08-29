import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class Auth{
token:string;

    constructor(private http: HttpClient){}

    register(data){
     return this.http.post('http://localhost:8000/api/user/signUp',data);
    }

    login(data){
        return this.http.post<{token:string}>('http://localhost:8000/api/user/login',data);    
    }
}