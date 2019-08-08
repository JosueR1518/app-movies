import { Component, OnInit, ViewChild,ApplicationRef } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { ModalController, IonSegment } from '@ionic/angular';
import { DetallePeliculaComponent } from '../../components/detalle-pelicula/detalle-pelicula.component';
import { Genre, PeliculaDetalle } from '../../interfaces/interfaces';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  generos:string[]=[];
  genres:Genre[]=[];



  @ViewChild(IonSegment) segmento:IonSegment;
  segmentoActivo:string ='';
  favoritoGenero:any[]  =[];


  constructor(
    public  dataStorage    :DataStorageService,
    private modalCtrl      :ModalController,
    private peliculaService:PeliculasService,
  private aplicationRef:ApplicationRef){}



   ionViewWillEnter(){
    this.cargarFavoritosGenero();
     this.aplicationRef.tick();
  }



 async cargarFavoritosGenero(){
  const peliculas = await this.dataStorage.cargarPeliculas();
  this.genres   = await this.peliculaService.getCategorias();


  await this.pelisPorGenero(this.genres,peliculas);



  }




  async verDetalle(id){
    const  modal = await this.modalCtrl.create({
                            component:DetallePeliculaComponent,
                            componentProps:{id}
                              });
    modal.present();

    modal.onWillDismiss().then(data=>{

      this.cargarFavoritosGenero();
    })
  }


  cambiarCategoria(eventoSegment){
    this.segmentoActivo =this.segmento.value;
  }



  pelisPorGenero(generos:Genre[],peliculas:PeliculaDetalle[]){


      this.favoritoGenero =[];
          generos.forEach(genero => {

                   let pelis = peliculas.filter(pelicula=>{
                    return  pelicula.genres.find(genre=>genre.id===genero.id)
                  });


                   if(pelis.length >0){

                    this.favoritoGenero.push({
                      genero:genero.name,
                      pelis: pelis
                    });
                   }


          });


          if(this.favoritoGenero.length>0){

            let generoTemp=[];

            this.favoritoGenero.forEach(favorito =>generoTemp.push(favorito['genero']));

            this.generos= generoTemp;
            this.segmentoActivo = this.favoritoGenero[0]['genero'];


          }


  }





}
