import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponce, Gif } from '../interfaces/gift.Interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apykey: string =  "gEHdzC6tlGloVZkswWUybC9tIc1yeuES";
  private _historial: string[] = [];
  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient ){

     this._historial = JSON.parse (localStorage.getItem('historial')!) ||[];
     this.resultados = JSON.parse (localStorage.getItem('ultimoResultado')!)|| []

  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http.get<SearchGifsResponce>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apykey}&q=${query}&limit=10`)
      .subscribe((resp) =>{
        this.resultados = resp.data;
        localStorage.setItem('ultimoResultado', JSON.stringify(resp.data))
      });

  }

}
