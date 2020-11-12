import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable ({providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject <Cliente[]>();

  constructor (
    private httpClient: HttpClient,
    private router: Router
  ){

  }

  getCliente (idCliente: string){
    return this.httpClient.get<{_id: string, nome: string, fone: string, email: string}>(
      `http://localhost:3000/api/clientes/${idCliente}`
    )
    /*return {...this.clientes.find(c => c.id === idCliente)};*/
    /*let cli = this.clientes.find((c) => c.id === idCliente);
    return cli;*/
  }

  getClientes(): void{
    this.httpClient.get<{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes').
    pipe(map((dados => {
      return dados.clientes.map((cliente) => {
        return {
          id: cliente._id,
          nome: cliente.nome,
          fone: cliente.fone,
          email: cliente.email
        }
      });
    }))).
    subscribe((clientes) => {
      this.clientes = clientes;
      this.listaClientesAtualizada.next([...this.clientes]);//push
    })
    //return [...this.clientes];
  }

  atualizarCliente (id: string, nome: string, fone: string, email: string){
    const cliente: Cliente = {id, nome, fone, email};
    this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
    .subscribe(res => {
      const copia = [...this.clientes];
      const indice = copia.findIndex (cli => cli.id === cliente.id);
      copia[indice] = cliente;
      this.clientes = copia;
      this.listaClientesAtualizada.next([...this.clientes]);
      this.router.navigate(['/']);
    });
  }

  adicionarCliente (nome: string, fone: string, email: string): void{
    const cliente: Cliente = {
      id: null,
      nome: nome,
      fone: fone,
      email: email
    };
    this.httpClient.post <{mensagem: string, id:string}> ('http://localhost:3000/api/clientes', cliente).subscribe((resposta) =>{
      console.log (resposta.mensagem);
      cliente.id = resposta.id;
      this.clientes.push(cliente);
      this.listaClientesAtualizada.next([...this.clientes]);
      this.router.navigate(['/'])
    })
    //this.clientes.push(cliente);
    //this.listaClientesAtualizada.next([...this.clientes]);
  }

  removerCliente (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`)
    .subscribe(() => {
      this.clientes = this.clientes.filter((cli) => {
        return cli.id !== id
      })
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }

  getListaClientesAtualizada () {
    return this.listaClientesAtualizada.asObservable();
  }
}
