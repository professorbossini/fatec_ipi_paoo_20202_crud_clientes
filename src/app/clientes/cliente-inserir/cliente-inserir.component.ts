import { Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms';

import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent{
  /*nome: string;
  fone: string;
  email: string;

  @Output() clienteAdicionado = new EventEmitter<Cliente>();*/

  constructor (public clienteService: ClienteService){

  }



  onAdicionarCliente (form: NgForm){
    if (form.invalid)
      return;

    this.clienteService.adicionarCliente(
      form.value.nome,
      form.value.fone,
      form.value.email
    )
    form.resetForm()
    /*const cliente: Cliente = {
      nome: form.value.nome,
      fone: form.value.fone,
      email: form.value.email
    };
    this.clienteAdicionado.emit(cliente);
    //console.log ("Inserindo cliente...");*/
  }
}
