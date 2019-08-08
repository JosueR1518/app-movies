import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const URL = environment.url;
const apiKey=environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http:HttpClient) { }




private popularesPage:number=0;



  getFeature(){
    const hoy = new Date();
    let ultimoDia = new Date();
    ultimoDia.setDate(hoy.getDate()+30);
    
    const url= `/discover/movie?primary_release_date.gte=${hoy.toJSON().slice(0,10)}&primary_release_date.lte=${ultimoDia.toJSON().slice(0,10)}`;

    return   this.ejecutarQuery<RespuestaMDB>(url);
  }


  getPopulares(){
    this.popularesPage++;
    const url= `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
   return   this.ejecutarQuery<RespuestaMDB>(url);
  }


  getDetallePelicula(id:string){
  return  this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id:string){
    return  this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
    }


    findByKeyword(texto:string){



      return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
    }


    getCategorias():Promise<Genre[]>{


      return new Promise(resolve=>{

        this.ejecutarQuery<Genre[]>(`/genre/movie/list?a=1`).subscribe(resp=>{

          resolve(resp['genres']);
        });

      });
     
    }
  


  private ejecutarQuery<T>(query:string){
        query = URL+query;
        query+=`&api_key=${apiKey}&language=es&include_image_language=es`;


        return this.http.get<T>(query);
  }

}
