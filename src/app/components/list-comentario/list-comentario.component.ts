import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-list-comentario',
  templateUrl: './list-comentario.component.html',
  styleUrls: ['./list-comentario.component.css']
})
export class ListComentarioComponent implements OnInit {

  listComentario: Comentario[] = []

  constructor(private _comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios(){
    this._comentarioService.getListComentarios().subscribe(data => {
      console.log(data);
      this.listComentario = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarComentario(id: any){
    console.log(id);
    this._comentarioService.deleteComentario(id).subscribe(data => {
      this.getComentarios();
    }, error =>{
      console.log(error);
    })
  }

}
