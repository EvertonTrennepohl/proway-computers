import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  valorTotal: number = 0;

  constructor(private carrinhoService: CarrinhoService, private router: Router) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaValorTotal();
  }

  removeItem(produtoId: number): void {
    this.itensCarrinho = this.carrinhoService.removerItemCarrinho(produtoId);
    this.calculaValorTotal();
  }

  atualizaQuantidadeItem(produto: IProdutoCarrinho) {
    this.carrinhoService.atualizaQuantidadeProduto(produto);
  }

  calculaValorTotal(): void {
    this.valorTotal = this.itensCarrinho.reduce(
      (prev, curr) => prev + curr.preco * curr.quantidade, 0 );
  }

  atualizaCarrinho(produto: IProdutoCarrinho) {
    this.atualizaQuantidadeItem(produto);
    this.calculaValorTotal();
  }

  comprar() {
    alert('Compra efetuada com sucesso!');
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }
}
