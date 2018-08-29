import { Component, OnInit } from '@angular/core';
import { Incidencias } from '../../models/incidencias';
import { IncidenciasService } from '../../services/incidencias.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  incidencias:Incidencias[];
  constructor(public _service: IncidenciasService,private _router: Router) { }

  ngOnInit() {
    this.getIncidencias();
  }

  getIncidencias():void{
    this._service.getIncidencias().subscribe(data => {
      this.incidencias = data;
    });
  }
  
  detail(id:string):void{
    this._router.navigate(['detail',id]);
  }
}
