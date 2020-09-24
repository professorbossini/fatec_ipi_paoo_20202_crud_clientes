import { Component, EventEmitter, Output } from '@angular/core'

import { Cliente } from '../cliente.model'

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent{
  nome: string;
  fone: string;
  email: string;

  @Output() clienteAdicionado = new EventEmitter<Cliente>();
  onAdicionarCliente (){
    const cliente: Cliente = {
      nome: this.nome,
      fone: this.fone,
      email: this.email
    };
    this.clienteAdicionado.emit(cliente);
    //console.log ("Inserindo cliente...");
  }
}
