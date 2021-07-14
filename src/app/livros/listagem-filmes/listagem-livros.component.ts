import { Component, OnInit } from '@angular/core';
import { LivrosService } from 'src/app/core/livros.service';
import { Livro } from 'src/app/shared/models/livro';

@Component({
  selector: 'dio-listagem-livros',
  templateUrl: './listagem-livros.component.html',
  styleUrls: ['./listagem-livros.component.scss']
})
export class ListagemLivrosComponent implements OnInit {

  livros: Livro[];

  constructor(private livrosService: LivrosService) { }

  ngOnInit() {
    this.livrosService.listar().subscribe((livros: Livro[]) => this.livros = livros);
  }
}
