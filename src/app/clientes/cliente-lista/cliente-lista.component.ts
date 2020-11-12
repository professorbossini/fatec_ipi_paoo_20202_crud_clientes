import { Component, OnInit, OnDestroy} from '@angular/core';

import { Cliente } from '../cliente.model'
import { ClienteService } from '../cliente.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit {
  clientes: Cliente[] = [];
  private clienteSubscription: Subscription;
  public estaCarregando: boolean = false;

  constructor(public clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.clienteService.getClientes();
    this.clienteSubscription = this.clienteService.getListaClientesAtualizada()
    .subscribe( (clientes: Cliente[]) => {
      this.estaCarregando = false;
      this.clientes = clientes;
    });
  }

  onDelete (id: string): void{
    this.clienteService.removerCliente(id);
  }


  ngOnDestroy (): void {
    this.clienteSubscription.unsubscribe();
  }
}
