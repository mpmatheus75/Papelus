import { useStat, useState } from 'react'

const DADOS_INICIAIS = {
    produtos: [
    { id: 1, nome: 'Caderno espiral 96fls', categoria: 'Cadernos', preco: 18.90, quantidade: 12, minimo: 5 },
    { id: 2, nome: 'Caneta esferográfica azul', categoria: 'Canetas e lápis', preco: 2.50, quantidade: 3, minimo: 10 },
    { id: 3, nome: 'Washi tape floral', categoria: 'Adesivos', preco: 9.90, quantidade: 8, minimo: 4 },
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

    function registrarVenda(venda) {
        const produtosAtualizados = dados.produtos.map(p=> {
            const item = venda.itens.find(i => i.produtoID === p.id)
            if (item) return {...p, quantidade: p.quantidade - item.quantidade}
            return p
        })
        atualizar({
            ...dados,
            produtos: produtosAtualizados,
            vendas: [vendas, ...dados.vendas]
        })

    }

    return{dados, adicionarProdutos, deletarProduto, registrarVenda }
}
