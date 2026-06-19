import { useStat, useState } from 'react'

const DADOS_INICIAIS = {
    produtos: [
    { id: 1, nome: 'Caderno Inteligente BySophie', categoria: 'Caderno', preco: 90.99, custo: 52.90, quantidade: 1, minimo: 1 },
    { id: 2, nome: 'Caderno Inteligente Mini Verde ', categoria: 'Caderno', preco: 69.90, custo: 39.90, quantidade: 1, minimo: 1 },
    { id: 3, nome: 'Caderno Inteligente Mini Grey Love', categoria: 'Caderno', preco: 69.90, quantidade: 1, custo: 39.90, minimo: 1 },
  ],
  vendas: [],
  proximoId: 4
}

function carregarDados() {
    try {
        const salvo = localStorage.getItem('papelus_daods')
        return salvo ? JSON.parse(salvo) : DADOS_INICIAIS
    } catch {
        return DADOS_INICIAIS
    }
}

function salvarDados (dados) {
    localStorage.setItem('papelus_dados', JSON.stringify(dados))
}

export function useEstoque() {
    const [dados, setDados] = useState(carregarDados)

    function atualizar(novosDados) {
        setDados(novosDados)
        salvarDados(novosDados)
    }

    function adicionarProdutos(produto) {
        const novo = { ...produto, id: dados.proximoId }
        atualizar({
            ...dados,
            produtos: [...dados.produtos, novo],
            proximoId: dados.proximoId + 1
        })
    }

    function deletarProduto(id) {
        atualizar({
            ...dados,
            produtos: dados.produto.filter(p => p.id !== id)
        })
    }

    function editarProduto(produtoAtualizado) {
  atualizar({
    ...dados,
    produtos: dados.produtos.map(p => 
      p.id === produtoAtualizado.id ? produtoAtualizado : p
    )
        })
    }

    function registrarVenda(venda) {
        const produtosAtualizados = dados.produtos.map(p => {
            const item = venda.itens.find(i => i.produtoId === p.id)
            if (item) return {...p, quantidade: p.quantidade - item.quantidade}
            return p
        })
        atualizar({
            ...dados,
            produtos: produtosAtualizados,
            vendas: [venda, ...dados.vendas]
        })

    }

    return{dados, adicionarProdutos, deletarProduto, registrarVenda, editarProduto }
}
