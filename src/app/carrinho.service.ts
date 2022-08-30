import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];
  quantidadeItens: number = 0;

  constructor() {}

  obtemCarrinho(): IProdutoCarrinho[] {
    this.itens = JSON.parse(localStorage.getItem('carrinho') || '[]');
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho): void {
    let produtoNoCarrinho = this.itens.find((item) => item.id === produto.id);
    let quantidade = produto.quantidade;
    console.log("CarrinhoService-> produto.quantidade", quantidade);
    if (produtoNoCarrinho) {
      this.atualizaQuantidadeProduto(produtoNoCarrinho);
      this.atualizarQuantidadeItensCarrinho();
    } else {
      this.itens.push(produto);
      this.atualizarQuantidadeItensCarrinho();
    }
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }

  removerItemCarrinho(produtoId: number): IProdutoCarrinho[] {
    this.itens = this.itens.filter((item) => item.id !== produtoId);
    this.atualizarQuantidadeItensCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
    return this.itens;
  }

  atualizarQuantidadeItensCarrinho() {
    this.quantidadeItens = this.itens.reduce((prev, current) => prev + current.quantidade, 0);
  }

  atualizaQuantidadeProduto(produto: IProdutoCarrinho): void {
      let i: number = this.itens.indexOf(produto);
      this.itens[i].quantidade += produto.quantidade!;
      console.log(`this.itens[i].quantidade: ${this.itens[i].quantidade} produto.quantidade: ${produto.quantidade}`);
      this.atualizarQuantidadeItensCarrinho();
  }

  limparCarrinho(): void {
    this.itens = [];
    localStorage.clear();
  }
}
