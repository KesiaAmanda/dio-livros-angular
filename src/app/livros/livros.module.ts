import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';
import { CadastroLivrosComponent } from './cadastro-livros/cadastro-livros.component';
import { ListagemLivrosComponent } from './listagem-filmes/listagem-livros.component';
import { CamposModule } from '../shared/components/campos/campos.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule
  ],
  declarations: [CadastroLivrosComponent, ListagemLivrosComponent]
})
export class LivroModule { }
