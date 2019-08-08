import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

 

  @Input() peliculas:Pelicula[]=[];
  @Output() cargarMas = new EventEmitter();
  optionsSlide= {
    slidesPerView: 3.2,
    freeMode:true
};

  constructor(private modalCtrl:ModalController) {



   }

  ngOnInit() {}

  onClick(){

    this.cargarMas.emit();
  }



  
  async verDetalle(id:string) {

    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: { id}
    });
    return await modal.present();
  }

}
