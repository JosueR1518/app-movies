import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {



  @Input() peliculas:Pelicula[]=[];
  optionsSlide= {
    slidesPerView: 3.2,
    freeMode:true
};

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}


  async verDetalle(id:string) {


    console.log(id);
    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: { id}
    });
    return await modal.present();
  }

}
