import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivrosService } from 'src/app/core/livros.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
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
              private fb: FormBuilder,
              private livroService: LivrosService) { }

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
      alert('Ok');
    },
    () => {
      alert('Erro ao salvar!')
    });
  }
}
