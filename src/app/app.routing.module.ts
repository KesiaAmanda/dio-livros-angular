import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroLivrosComponent } from './livros/cadastro-livros/cadastro-livros.component';
import { ListagemLivrosComponent } from './livros/listagem-filmes/listagem-livros.component';
import { LivroModule } from './livros/livros.module';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'livros',
      pathMatch: 'full'
  },
  {
    path: 'livros',
    children: [
      {
        path: '',
        component: ListagemLivrosComponent
      },
      {
        path: 'cadastro',
        component: CadastroLivrosComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'livros' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LivroModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
