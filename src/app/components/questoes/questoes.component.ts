import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/services/sistema.service';
import { SistemaModel } from 'src/app/model/sistemaModel';
import { Router, ActivatedRoute } from '@angular/router';

import { MatFormFieldModule} from '@angular/material/form-field';
import { ISistema } from '../../interfaces/ISistema'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-questoes',
  templateUrl: './questoes.component.html',
  styleUrls: ['./questoes.component.scss']
})
export class QuestoesComponent implements OnInit {

  model: SistemaModel = new SistemaModel();

  constructor(
    private sistsrv: SistemaService,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p['id']));
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.sistsrv.GetById(id);
    this.model = result.data as SistemaModel;
  }

  async save(): Promise<void> {
    const result = await this.sistsrv.post(this.model);
    if (result.success) {
      this.router.navigateByUrl('/questoes');
    }
  }
}

