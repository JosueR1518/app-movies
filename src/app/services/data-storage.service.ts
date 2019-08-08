import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {



  peliculas:PeliculaDetalle[]=[];
  constructor(private storage:Storage,private toast:ToastController) { 




  }




  guardarPelicula(pelicula:PeliculaDetalle):boolean{

    let existe;

    if(this.peliculas.find(item=>item.id===pelicula.id)){
      this.peliculas= this.peliculas.filter(item=>item.id!==pelicula.id);
      existe=true;
      this.showMessage('Pelicula removida de favoritos');
      
    }else{
      existe=false;
      this.peliculas.unshift(pelicula);
      this.showMessage('Pelicula agregada a favoritos');
    }
   

    this.storage.set('favoritos',this.peliculas);
   

    return existe;

  }


  async cargarPeliculas():Promise<PeliculaDetalle[]>{


  const peliculas = await  this.storage.get('favoritos');

  this.peliculas = peliculas || [];


  return this.peliculas;
  }





 async showMessage(mensaje:string){

  const toast = await this.toast.create({
    message:mensaje,
    duration:1000
  });




  toast.present();

  }
}
