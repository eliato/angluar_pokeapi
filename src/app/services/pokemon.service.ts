import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Obtiene pokemon
  // tslint:disable-next-line: typedef
  getPokemons(index){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
  
  // tslint:disable-next-line: typedef
  getevolutions(indexx){
    return this.http.get<any>(`${this.baseUrl}/evolution-chain/${indexx}`);
  }
}