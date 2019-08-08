import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


const URL=environment.imgPath;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, size: string='w500'): any {

    if(image){
    
      return `${URL}/${size}/${image}`;
    }
    return './assets/img/no-image-banner.jpg';
  }

}
