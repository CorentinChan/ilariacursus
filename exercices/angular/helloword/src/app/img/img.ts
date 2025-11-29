import { Component,Input, OnChanges,SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-img',
  imports: [],
  templateUrl: './img.html',
  styleUrl: './img.css',
})
export class Img {
  @Input() img: string[] = [];
@Input() index!: number;

  ngOnChanges(changes: SimpleChanges) {
    // Optionnel : on peut réagir aux changements d'index ou d'images
    if (changes['index']) {
      // par exemple, on pourrait faire une animation
      console.log('Index changé vers', this.index);
    }
  }


}
