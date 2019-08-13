import { Directive, Renderer2, ElementRef, HostListener, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appExpandTable]'
})
export class ExpandTableDirective implements OnInit {
  @Input() isExpanded: boolean = false;
  
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(){
    console.log(this.isExpanded)
    if(this.isExpanded){
      this.renderer.setStyle(this.elRef.nativeElement,'display','none');
    }else{
      this.renderer.setStyle(this.elRef.nativeElement,'display','none');
    }
  }

  // @HostListener('click') ExpandTableDirective(){
  //   console.log(this.elRef)
  //   if(!this.isExpanded){
  //     this.isExpanded = true;
  //   this.renderer.setStyle(this.elRef.nativeElement.parentElement.parentElement.children[2],'display','flex');
    
  //   }else{
  //     this.isExpanded = false;
  //     this.renderer.setStyle(this.elRef.nativeElement.parentElement.parentElement.children[2],'display','none');
  //   }
  // }

}
