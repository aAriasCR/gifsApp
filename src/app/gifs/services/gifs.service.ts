import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponce, Gif } from '../interfaces/gift.Interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apykey: string =  "gEHdzC6tlGloVZkswWUybC9tIc1yeuES";
  private rutabase:string = "https://api.giphy.com/v1/gifs";
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

    const params = new HttpParams()
                   .set('api_key', this.apykey)
                   .set('limit', '10')
                   .set('q', query)
                   

    this.http.get<SearchGifsResponce>(`${this.rutabase}/search`, {params})
      .subscribe((resp) =>{
        this.resultados = resp.data;
        localStorage.setItem('ultimoResultado', JSON.stringify(resp.data))
      });

  }

}
