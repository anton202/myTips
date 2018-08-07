import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from "@angular/core";
import { ExpectedConditions } from "protractor";
import { normalize } from "path";

@Directive({
    selector:'[appMinimize]'
})
export class WaitrsBookDirective{

    constructor(private renderr: Renderer2, private elRef: ElementRef){}

    @HostListener('submit') minimize(){
        this.renderr.setStyle(this.elRef.nativeElement.children[0],'display','none');
        this.renderr.setStyle(this.elRef.nativeElement.children[1],'display','block');
        
        this.renderr.listen(this.elRef.nativeElement.children[1],'click',()=>{
            this.renderr.setStyle(this.elRef.nativeElement.children[0],'display','block');
            this.renderr.setStyle(this.elRef.nativeElement.children[1],'display','none');  
        })
       
    }

}