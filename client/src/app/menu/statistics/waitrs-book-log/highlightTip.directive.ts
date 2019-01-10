import { Directive, HostListener, Renderer, ElementRef } from "@angular/core";

@Directive({
    selector: '[highLightSelection]'
})
export class HighLightTip {
    isClicked = false;
    selectedTip = [];
    constructor(private renderer: Renderer, private el: ElementRef) { }

    @HostListener('click', ['$event.target.parentElement']) onClick(tip) {
        let trElement = tip
        this.selectedTip.push(trElement);
        if (this.selectedTip.length < 2) {
            this.renderer.setElementStyle(trElement, 'background-color', '#016270');
            this.renderer.setElementStyle(trElement, 'color', 'white');
        } else if (this.selectedTip.length > 1) {
            if (this.selectedTip[0] === this.selectedTip[1]) {
                this.renderer.setElementStyle(trElement, 'background-color', 'white');
                this.renderer.setElementStyle(trElement, 'color', '#016270');
                this.selectedTip = [];
            }else {
                this.selectedTip.pop()
                return
            }
        }
       
    }
}