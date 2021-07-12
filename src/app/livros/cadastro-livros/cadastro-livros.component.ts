import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-livros',
  templateUrl: './cadastro-livros.component.html',
  styleUrls: ['./cadastro-livros.component.scss']
})
export class CadastroLivrosComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;


  constructor(public validacao: ValidarCamposService, 
              private fb: FormBuilder) { }

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

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    alert('SUCESSO!!\n\n' + JSON.stringify(this.cadastro.value, null, 4))
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

}
