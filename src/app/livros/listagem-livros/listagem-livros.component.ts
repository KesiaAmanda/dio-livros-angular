import { Component, OnInit } from '@angular/core';
import { LivrosService } from 'src/app/core/livros.service';
import { Livro } from 'src/app/shared/models/livro';

@Component({
  selector: 'dio-listagem-livros',
  templateUrl: './listagem-livros.component.html',
  styleUrls: ['./listagem-livros.component.scss']
})
export class ListagemLivrosComponent implements OnInit {

  readonly qtdPagina = 4;
  livros: Livro[] = [];
  pagina = 0;

  constructor(private livrosService: LivrosService) { }

  ngOnInit(): void {
    this.listarLivros();
  }

  onScroll(): void {
    this.listarLivros();
  }

  private listarLivros(): void{
    this.pagina++;
    this.livrosService.listar(this.pagina, this.qtdPagina).subscribe((livros: Livro[]) => this.livros.push(...livros));
  }
}
