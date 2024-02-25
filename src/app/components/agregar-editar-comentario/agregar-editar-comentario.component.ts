import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {

  agregarComentario: FormGroup;
  accion = 'Agregar';
  id = 0;
  comentario: Comentario | undefined;

  constructor(private fb: FormBuilder,
              private _comentarioService: ComentarioService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.agregarComentario = this.fb.group({
      title: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required]
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar(){
    if(this.id !== 0){
      this.accion = 'Editar';
      this._comentarioService.getComentario(this.id).subscribe(data=>{
        //console.log(data);
        this.comentario = data;
        this.agregarComentario.patchValue({
          title: data.title,
          texto: data.texto,
          creador: data.creador,
        })
      }, error => {
        console.log(error);
      })
    }
  }

  agregarEditarComentario(){
    if(this.comentario == undefined){
      //Agregamos un nuevo comentario
      const comentario: Comentario = {
        title: this.agregarComentario.get('title')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fechaCreacion: new Date()
      }
      this._comentarioService.saveComentario(comentario).subscribe(data=>{
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    } else {
      // Editar el comentario
      const comentario: Comentario = {
        id: this.comentario.id,
        title: this.agregarComentario.get('title')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fechaCreacion: this.comentario.fechaCreacion,
      }

      this._comentarioService.updateComentario(this.id, comentario).subscribe( data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    }


  }

}
