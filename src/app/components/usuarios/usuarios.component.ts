import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'
import { UsuarioModel } from '../../model/usuarioModel'
import { MatFormFieldModule} from '@angular/material/form-field';
import { IUsuario } from '../../interfaces/IUsuario'
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {
 
  
  columns: string[] = ['id', 'email', 'senha'];
  // origem dos dados
  dataSource!: MatTableDataSource<IUsuario>;
  

  constructor(private usuarioSrv: UsuarioService,
    private router: Router,
    private active: ActivatedRoute) {
  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    console.log("inicio")
    const usuarios = await this.usuarioSrv.GetAll();
    console.log ("----");
    console.log(usuarios);
    console.log ("----");
    this.dataSource = new MatTableDataSource(usuarios.data);    
  }
  

  async delete(usuario: UsuarioModel): Promise<void> {
      const result = await this.usuarioSrv.delete(usuario.id);
      this.bind();     
      this.router.navigateByUrl('/usuarios');      
  }
}
