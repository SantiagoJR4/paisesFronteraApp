import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent implements OnInit {

  miFormulario:FormGroup=this.fb.group({
    region:['',[Validators.required]]
  })

  //llenar selectores
  regiones:string[]=[];


  constructor( private fb:FormBuilder, private paisesService:PaisesService) { }

  ngOnInit(): void {
    this.regiones=this.paisesService.regiones;
  }

  guardar(){

  }

}
