import { Component, OnInit, Input } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { PeliculaDetalle, RespuestaCredits, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss'],
})
export class DetallePeliculaComponent implements OnInit {



  @Input() id;
  pelicula:PeliculaDetalle;
  actores:Cast[]=[];
  oculto:number=150;
  esFavorito:boolean=false;

  optionsSlide ={

    slidesPerView: 3.2,
    freeMode:true
  };
  constructor(
    private peliculaService:PeliculasService,
    private modalCtrl:ModalController,
    private dataStorage:DataStorageService) { }

  ngOnInit() {

    this.peliculaService.getDetallePelicula(this.id).subscribe(resp=>{


      this.pelicula=resp;
      if( this.dataStorage.peliculas.find(item=>item.id===this.pelicula.id)){
        this.esFavorito=true;
      }
    });


    this.peliculaService.getActoresPelicula(this.id).subscribe(resp=>{


      this.actores=resp.cast;
    });


   


  }


  regresar(){

    this.modalCtrl.dismiss();

  }


  favorito(){
    ;
    this.esFavorito=!this.dataStorage.guardarPelicula(this.pelicula);

  }

}
