import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gigi',
  imports: [FormsModule],
  templateUrl: './gigi.html',
    standalone: true,
  styleUrl: './gigi.css',
})
export class Gigi {
  name :string = '';

  count   = 0;
  inc() {
    this.count++;
    alert("+1")
  }
}
