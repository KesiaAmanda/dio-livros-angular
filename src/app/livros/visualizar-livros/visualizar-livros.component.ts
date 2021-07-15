import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from 'src/app/core/livros.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Livro } from 'src/app/shared/models/livro';

@Component({
  selector: 'dio-visualizar-livros',
  templateUrl: './visualizar-livros.component.html',
  styleUrls: ['./visualizar-livros.component.scss']
})
export class VisualizarLivrosComponent implements OnInit {

  readonly semCapa = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png';
  livro: Livro;
  id: number;

  constructor(public dialog: MatDialog,
              private ar: ActivatedRoute,
              private livrosService: LivrosService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void{
    this.router.navigateByUrl("/livros/cadastro/" + this.id);
  }

  excluir(): void {
        const config = {
          data: {
            titulo: 'Você tem certeza que deseja excluir esse registro?',
            descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
            corBtnSucesso: 'warn',
            corBtnCancelar: 'accent',
            possuiBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if(opcao){
            this.livrosService.excluir(this.id).subscribe();
            this.router.navigateByUrl('filmes');
          }
        });
  }

  private visualizar(): void{
    this.livrosService.visualizar(this.id).subscribe((livro: Livro) => this.livro = livro);
  }
}
