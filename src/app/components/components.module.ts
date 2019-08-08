import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';

@NgModule({
  entryComponents:[DetallePeliculaComponent],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetallePeliculaComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[SlideshowBackdropComponent,
    SlideshowPosterComponent,
  SlideshowParesComponent]
})
export class ComponentsModule { }
