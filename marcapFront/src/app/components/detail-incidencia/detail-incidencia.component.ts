import { Component, OnInit} from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IncidenciasService } from '../../services/incidencias.service';
import { Incidencias } from '../../models/incidencias';



@Component({
  selector: 'app-detail-incidencia',
  templateUrl: './detail-incidencia.component.html',
  styleUrls: ['./detail-incidencia.component.css']
})
export class DetailIncidenciaComponent implements OnInit {

  incidencia:Incidencias;
  registerForm: FormGroup;
  submitted = false;

  constructor(private _route: ActivatedRoute, 
              private _routeNav: Router,
              private _service:IncidenciasService,
              private formBuilder: FormBuilder,
              ) { 
    this.incidencia = new Incidencias('','','','');
  }

  ngOnInit() {
    this.getIncidencia();
    this.registerForm = this.formBuilder.group({
      catalogo: ['', Validators.required],
      area: ['', Validators.required],
      item: ['', [Validators.required]]
    });
  }
  
  get f() { return this.registerForm.controls; }

  getIncidencia():void{
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      this._service.getIncidencia(id).subscribe(data => {
        if(data && data._id){
          this.incidencia = data;
        }else{
          alert('No existe ninguna incidencia con este id');
          this._routeNav.navigate(['home']);
        }
      });
    }
  }
  
  saveEdit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._service.updateIncidencia(this.incidencia).subscribe(
      data => {
        let resp = data ? data : {message:'', error:1};
        if(resp.error){
          console.log(resp.message);
          alert('Ocurrio un error');
        }else{
          alert('Se guardaron correctamente los cambios');
        }
      }
    );
  }

  delete(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._service.deleteIncidencia(this.incidencia._id).subscribe(
      data => {
        let resp = data ? data : {message:'', error:1};
        if(resp.error){
          console.log(resp.message);
          alert('Ocurrio un error');
        }else{
          alert('Se elimino correctamente');
          this._routeNav.navigate(['home']);
        }
      }
    );
  }
  
  save(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._service.createInsidencia(this.incidencia).subscribe(
       (data) => {
        let resp = data ? data : {message:'',error:1};
        if(resp && resp.error == 1){
          alert('No se pudo crear la Incidencia');
        }else{
          alert('Se creo correctamente la Incidencia');
          this.incidencia = new Incidencias('','','','');
          this.submitted = false;
        }
      }
    );
  }
}
