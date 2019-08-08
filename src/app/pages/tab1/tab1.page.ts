import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{


  peliculas:Pelicula[]=[];
  populares:Pelicula[]=[];
  optionsSlide= {
    slidesPerView: 1.3,
  freeMode:true};

  constructor(private peliculaService:PeliculasService){}



  ngOnInit(){

   this.peliculaService.getFeature().subscribe(resp=>{

    this.peliculas = resp.results;
    console.log(this.peliculas);
   });

  this.cargarPopulares();


  }




  cargarMas(){

    this.cargarPopulares();

  }


  cargarPopulares(){

    this.peliculaService.getPopulares().subscribe(data=>{


      const tempArray = [...this.populares,...data.results];
      this.populares= tempArray;
      //this.populares=data.results;
    });
 

  }
}
