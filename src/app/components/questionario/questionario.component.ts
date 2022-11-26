import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/services/sistema.service';
import { SistemaModel } from '../../model/sistemaModel'
import { MatFormFieldModule} from '@angular/material/form-field';
import { ISistema} from '../../interfaces/ISistema'
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})

export class QuestionarioComponent implements OnInit {

  columns: string[] = ['id', 'atualizado', 'ferramenta', 'objetivo','campo'];
  // origem dos dados
  dataSource!: MatTableDataSource<ISistema>;
  

  constructor(private sistemaSrv: SistemaService,
    private router: Router,
    private active: ActivatedRoute) {
  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    console.log("inicio")
    const sistemas = await this.sistemaSrv.GetAll();
    console.log ("----");
    console.log(sistemas);
    console.log ("----");
    this.dataSource = new MatTableDataSource(sistemas.data);    
  }
  

  async delete(sistema: SistemaModel): Promise<void> {
      const result = await this.sistemaSrv.delete(sistema.id);
      this.bind();     
      this.router.navigateByUrl('/questoes');      
  }
}
