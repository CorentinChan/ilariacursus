import { createPlatform, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageItem } from './interface/ImageItem';



@Injectable({
  providedIn: 'root',
})
export class ImgList {
      images = [
    'https://master.salamandre.org/media/21911/telle-est-la-bete-2-1707x1200.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mouette.jpg/1200px-Mouette.jpg',
    'https://www.neosoft.fr/wp-content/uploads/2023/02/angular.png'
  ];
  images2:string[]=[];
  getImg(){
    return this.images;
  }
  
  private http = inject(HttpClient);
  loading = false;
  error = '';
  i:number=0;

  
  getImgAPI(){
    
//  this.http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`);

    this.http.get<ImageItem>("/imgjson.json").subscribe((data) => {
      console.log(data);
     console.log(data.image);

      console.log(data.image[0]);

      this.images=[];
      this.images=data.image;

      //this.images2.push()
     // return data['title'];

    })  
          return this.images;

  }

  
}
