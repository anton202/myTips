import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEditTip]'
})
export class EditTipDirective {
  toggle: boolean = false;

  constructor(private renderr: Renderer2, private elRef:ElementRef) { }

  @HostListener('click') edit(event: Event){
    this.toggle = !this.toggle;
    if(this.toggle){
      this.renderr.setStyle(this.elRef.nativeElement.children[2], 'display', 'block');
    }else{
      this.renderr.setStyle(this.elRef.nativeElement.children[2], 'display', 'none');
    }
  }

}
