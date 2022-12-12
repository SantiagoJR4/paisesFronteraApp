import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent implements OnInit {

  miFormulario:FormGroup=this.fb.group({
    region:['',[Validators.required]],
    pais:['',[Validators.required]],
    frontera:['',[Validators.required]]
  })

  //llenar selectores
  regiones:string[]=[];
  paises:PaisSmall[]=[];


  constructor( private fb:FormBuilder, private paisesService:PaisesService) { }

  ngOnInit(): void {
    this.regiones=this.paisesService.regiones;

    //cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe(region =>{
    //     console.log(region);

    //     this.paisesService.getPaisesPorRegion(region)
    //       .subscribe(paises=>{
    //         console.log(paises);
    //         this.paises=paises;
    //       });
    //   })

    //cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_)=>{
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe(paises=>{
        this.paises=paises;
      });

    //cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
      .subscribe(codigo=>{
        console.log(codigo);
        
      })

  }

  guardar(){

  }

}
