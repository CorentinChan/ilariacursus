import { Component,Input,EventEmitter,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nono',
  imports: [FormsModule ],
  templateUrl: './nono.html',
  styleUrl: './nono.css',
})
export class Nono {
    @Input() message: string = '';
    @Output() messageChild = new EventEmitter<string>();

    messageFromChild(){
      this.messageChild.emit(this.message);
    }

}
