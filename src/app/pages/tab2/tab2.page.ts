import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallePeliculaComponent } from '../../components/detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{


  buscando:boolean=false;
  peliculas:Pelicula[]=[];
  constructor(private peliculaService:PeliculasService,
    private modalCtrl:ModalController){}



  ngOnInit(){}

  buscarPelicula(eventoBuscar){

    const texto=eventoBuscar.detail.value;
    if(texto === ''){
      return;
    }
    this.buscando = true;
    this.peliculaService.findByKeyword(texto).subscribe(resp=>{


  this.peliculas = resp.results;
  this.buscando=false;
});





  }



  async verDetalle(id){
    const  modal = await this.modalCtrl.create({
  component:DetallePeliculaComponent,
  componentProps:{id}


    });



    modal.present();


  }
}
