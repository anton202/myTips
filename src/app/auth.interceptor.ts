import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler ,HttpRequest, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "./auth/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authToken:Auth){}

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        const token = this.authToken.token;
        const authReq = req.clone({
            headers: req.headers.set('Authorization','Berrar'+ token)
        })
        return next.handle(authReq);
    }
}