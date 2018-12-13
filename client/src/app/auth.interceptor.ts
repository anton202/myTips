import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler ,HttpRequest, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "./auth/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:Auth){}

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const authReq = req.clone({
            headers: req.headers.set('Authorization','Berrar ' + token)
        })
        return next.handle(authReq);
    }
}