import { Directive, HostListener, Renderer, ElementRef } from "@angular/core";

@Directive({
    selector: '[highLightSelection]'
})
export class HighLightTip {
    selectedTip = [];

    constructor(private renderer: Renderer, private el: ElementRef) { }

    select(element) {
        this.renderer.setElementStyle(element, 'background-color', '#016270');
        this.renderer.setElementStyle(element, 'color', 'white');
    }

    unSelect(element) {
        this.renderer.setElementStyle(element, 'background-color', 'white');
        this.renderer.setElementStyle(element, 'color', '#016270');
    }


    @HostListener('click', ['$event.target.parentElement']) onClick(tip) {
        let trElement = tip
        this.selectedTip.push(trElement);
        if (this.selectedTip.length < 2) {
            this.select(trElement);
        } else if (this.selectedTip.length > 1) {
            if(this.selectedTip[0] === trElement){
                this.unSelect(trElement)
                this.selectedTip = [];
                return
            }
            this.unSelect(this.selectedTip[0]);
            this.select(trElement);
            this.selectedTip.shift();
        }
    }


}