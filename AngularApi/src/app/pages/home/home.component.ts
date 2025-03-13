import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioListar } from '../../models/Usuario';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuarios: UsuarioListar[] = [];
  usuariosGeral: UsuarioListar[] = [];

  constructor(private serviceUsuario:UsuarioService){}
  ngOnInit(): void {
    this.serviceUsuario.GetUsuarios().subscribe(response => {
      this.usuarios = response.dados;
      this.usuariosGeral = response.dados;

      //console.log(response);

    })
  }

  search(event:Event){

    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    //console.log("TARGET", target)
    //console.log("VALUE", value)

    this.usuarios = this.usuariosGeral.filter(usuario =>{
      return usuario.nomeCompleto.toLowerCase().includes(value)
    });
  }

  deletar(id:number | undefined){
    this.serviceUsuario.DeletarUsuario(id).subscribe(response => {

      //console.log(response);
      window.location.reload();
    })
  }
 

}
