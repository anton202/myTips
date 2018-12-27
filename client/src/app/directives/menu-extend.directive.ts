import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector:'[appMinimize]'
})
export class MenuExtendDirective{
    toggleMenu = false;

    constructor(private renderr: Renderer2, private elRef: ElementRef){}

    @HostListener('click') minimize(){
        if(this.toggleMenu === true){
            this.toggleMenu = false
            this.renderr.setStyle(this.elRef.nativeElement.children[1],'display','none');  
            return
        }
        this.renderr.setStyle(this.elRef.nativeElement.children[1],'display','block');
        this.toggleMenu = true
       
    }

}