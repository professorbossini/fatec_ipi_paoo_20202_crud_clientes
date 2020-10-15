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

  constructor(public clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.clienteSubscription = this.clienteService.getListaClientesAtualizada()
    .subscribe( (clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  ngOnDestroy (): void {
    this.clienteSubscription.unsubscribe();
  }
}
