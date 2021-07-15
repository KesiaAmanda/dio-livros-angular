import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from 'src/app/core/livros.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Livro } from 'src/app/shared/models/livro';

@Component({
  selector: 'dio-cadastro-livros',
  templateUrl: './cadastro-livros.component.html',
  styleUrls: ['./cadastro-livros.component.scss']
})
export class CadastroLivrosComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  id: number;


  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog, 
              private fb: FormBuilder,
              private livroService: LivrosService,
              private router: Router,
              private ar: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    if (this.id) {
      this.livroService.visualizar(this.id).subscribe((livro: Livro) => this.criarForm(livro));
    } else {
      this.criarForm(this.criarLivroEmBranco());
    }

    this.generos=['Ação','Aventura','Ficção Científica','Romance','Terror','Comédia','Drama'];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const livro = this.cadastro.getRawValue() as Livro;
    if (this.id){
      livro.id = this.id;
      this.editar(livro);
    } else {
      this.salvar(livro)
    };
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarLivroEmBranco(): Livro {
    return {
      id: null,
      titulo: null,
      urlCapa: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlSkoob: null,
      genero: null
    } as Livro;
  }

  private criarForm(livro: Livro) : void {
    this.cadastro = this.fb.group({
      titulo: [livro.titulo , [Validators.required, Validators.minLength(1), Validators.maxLength(256)]],
      urlCapa: [livro.urlCapa , [Validators.minLength(10), Validators.maxLength(256)]],
      dtLancamento: [livro.dtLancamento , [Validators.required]],
      descricao: [livro.descricao , Validators.maxLength(256)],
      nota: [livro.nota , [Validators.required, Validators.min(0), Validators.max(5)]],
      urlSkoob: [livro.urlSkoob , [Validators.minLength(10), Validators.maxLength(256)]],
      genero: [livro.genero , [Validators.required]]
    });
  }

  private salvar(livro: Livro): void {
    this.livroService.salvar(livro).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo livro',
          corBtnCancelar: 'primary',
          possuiBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao){
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro',
          descricao: 'Não foi possível salvar o registro, favor tentar novamente mais tarde!',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(livro: Livro): void {
    this.livroService.editar(livro).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso',
          btnSucesso: 'Ir para a listagem'
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
          this.router.navigateByUrl('filmes');
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não foi possível atualizar o registro, favor tentar novamente mais tarde!',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}
