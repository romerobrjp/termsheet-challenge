import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.transition = '.5s ease';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.reset();
  }

  private highlight() {
    this.element.nativeElement.style.color = '#5A759E';
    this.element.nativeElement.style.animation = 'glow 1s ease-in-out infinite alternate';
  }

  private reset() {
    this.element.nativeElement.style.color = '#000';
    this.element.nativeElement.style.animation = '';
  }
}
