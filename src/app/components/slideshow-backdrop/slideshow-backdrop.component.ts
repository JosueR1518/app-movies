import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {


  @Input() peliculas:Pelicula[]=[];
  optionsSlide= {
    slidesPerView: 1.5,
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
