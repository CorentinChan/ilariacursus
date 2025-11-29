import { Component, signal,Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule, FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gigi } from './gigi/gigi';
import { Nono } from './nono/nono';
import { Img } from './img/img';
import { ImgList } from './img-list';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Gigi,Nono,Img,FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('helloword');
 
  private imgList = inject(ImgList);
  images: string[] = [];
email:string='';
password:string='';
  submitted = false;

onSubmit(){
      this.submitted = true;

  console.log("your mail is " + this.email + ", and password en clair : " +this.password) 
}

  ngOnInit() {
    //this.images= this.imgList.getImg();
     this.images= this.imgList.getImgAPI();

  }

  messageRecup:string='';
  messageFrom(message:string){
    this.messageRecup=message;
     console.log("message from child : "+message);

  }
  /*
    images = [
    'https://master.salamandre.org/media/21911/telle-est-la-bete-2-1707x1200.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mouette.jpg/1200px-Mouette.jpg',
    'https://www.neosoft.fr/wp-content/uploads/2023/02/angular.png'
  ];
  */

    index:number=0;
     changeImg(){
      this.index++;
       console.log(this.index);
       if(this.index>2)this.index=0;
       
     }

  

}
