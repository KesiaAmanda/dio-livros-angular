import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../shared/models/livro';

const url = 'http://localhost:3000/livros/';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient) { }

  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(url, livro);
  }

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(url);
  }

}
