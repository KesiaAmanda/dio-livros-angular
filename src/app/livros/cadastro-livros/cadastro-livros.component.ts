import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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


  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog, 
              private fb: FormBuilder,
              private livroService: LivrosService,
              private router: Router) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(256)]],
      urlCapa: ['', [Validators.minLength(10), Validators.maxLength(256)]],
      dtLancamento: ['', [Validators.required]],
      descricao: ['', Validators.maxLength(256)],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      urlSkoob: ['', [Validators.minLength(10), Validators.maxLength(256)]],
      genero: ['', [Validators.required]]
    });

    this.generos=['Ação','Aventura','Ficção Científica','Romance','Terror','Comédia','Drama'];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const livro = this.cadastro.getRawValue() as Livro;
    this.salvar(livro);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
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
}
