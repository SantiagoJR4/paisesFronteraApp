import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones:string[]=['Africa','Americas','Asia','Europe','Oceania'];

  private baseUrl:string='https://restcountries.com/v3.1';


  get regiones() : string[]{
    return [...this._regiones]
  }

  constructor(private http:HttpClient) { }

  getPaisesPorRegion(region:string): Observable<PaisSmall[]>{

    const url:string=`${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo:string):Observable<Country | null>{

    if(!codigo){
      return of(null)
    }

    const url = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Country>(url);
  }

  getPaisPorCodigoSmall(codigo:string):Observable<PaisSmall>{
    const url = `${this.baseUrl}/alpha/${codigo}?fields=name,cca3`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders:string[]): Observable<PaisSmall[]>{
    if(!borders){
      return of ([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach(codigo => {
      const peticion=this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }

}
