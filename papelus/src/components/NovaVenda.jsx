import { useState } from 'react'

export default function NovaVenda({ produtos, onVenda }) {
  const [cliente, setCliente] = useState('')
  const [canal, setCanal] = useState('Instagram')
  const [itens, setItens] = useState([{ produtoId: '', quantidade: 1 }])
  const [recibo, setRecibo] = useState(null)

  const produtosDisponiveis = produtos.filter(p => p.quantidade > 0)

  function fmtPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function adicionarItem() {
    setItens([...itens, { produtoId: '', quantidade: 1 }])
  }

  function removerItem(index) {
    setItens(itens.filter((_, i) => i !== index))
  }

  function atualizarItem(index, campo, valor) {
    const novosItens = itens.map((item, i) => {
      if (i !== index) return item
      return { ...item, [campo]: campo === 'quantidade' ? parseInt(valor) || 1 : valor }
    })
    setItens(novosItens)
  }

  function calcularTotal() {
    return itens.reduce((soma, item) => {
      const produto = produtos.find(p => p.id === parseInt(item.produtoId))
      if (!produto) return soma
      return soma + produto.preco * item.quantidade
    }, 0)
  }

  function finalizar() {
    const itensValidos = itens.filter(item => item.produtoId !== '')

    if (itensValidos.length === 0) return alert('Adicione ao menos um produto.')

    for (const item of itensValidos) {
      const produto = produtos.find(p => p.id === parseInt(item.produtoId))
      if (item.quantidade > produto.quantidade) {
        return alert(`Quantidade insuficiente de "${produto.nome}". Disponível: ${produto.quantidade}`)
      }
    }

    const venda = {
      id: Date.now(),
      cliente: cliente || 'Cliente não identificado',
      canal,
      itens: itensValidos.map(item => {
        const produto = produtos.find(p => p.id === parseInt(item.produtoId))
        return { produtoId: produto.id, nome: produto.nome, quantidade: item.quantidade, preco: produto.preco }
      }),
      total: calcularTotal(),
      data: new Date().toISOString(),
    }

    onVenda(venda)
    setRecibo(venda)
    setCliente('')
    setCanal('Instagram')
    setItens([{ produtoId: '', quantidade: 1 }])
  }

  return (
    <div>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Nova Venda</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Nome do cliente</label>
            <input value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ex: Maria Silva" />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Canal de venda</label>
            <select value={canal} onChange={e => setCanal(e.target.value)}>
              <option>Instagram</option>
              <option>WhatsApp</option>
              <option>Presencial</option>
            </select>
          </div>
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Itens da venda</h3>

        {itens.map((item, index) => {
          const produto = produtos.find(p => p.id === parseInt(item.produtoId))
          return (
            <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
              <select
                value={item.produtoId}
                onChange={e => atualizarItem(index, 'produtoId', e.target.value)}
                style={{ flex: 3 }}
              >
                <option value="">Selecionar produto...</option>
                {produtosDisponiveis.map(p => (
                  <option key={p.id} value={p.id}>{p.nome} ({p.quantidade} em estoque)</option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantidade}
                onChange={e => atualizarItem(index, 'quantidade', e.target.value)}
                style={{ width: '80px', flex: 'none' }}
              />

              <span style={{ fontSize: '14px', color: '#666', minWidth: '80px' }}>
                {produto ? fmtPreco(produto.preco * item.quantidade) : '—'}
              </span>

              {itens.length > 1 && (
                <button
                  onClick={() => removerItem(index)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '18px' }}
                >×</button>
              )}
            </div>
          )
        })}

        <button
          onClick={adicionarItem}
          style={{ fontSize: '13px', color: '#a855a0', background: 'none', border: '1px dashed #a855a0', borderRadius: '8px', padding: '6px 14px', marginTop: '4px' }}
        >
          + Adicionar item
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>Total: {fmtPreco(calcularTotal())}</span>
          <button
            onClick={finalizar}
            style={{ padding: '10px 24px', background: '#a855a0', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px' }}
          >
            Finalizar venda ✓
          </button>
        </div>
      </div>

      {recibo && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontFamily: 'monospace' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>🌸 Recibo de Venda</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{new Date(recibo.data).toLocaleString('pt-BR')}</div>
          </div>
          <div style={{ borderTop: '1px dashed #ddd', borderBottom: '1px dashed #ddd', padding: '12px 0', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Cliente</span><span>{recibo.cliente}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Canal</span><span>{recibo.canal}</span>
            </div>
          </div>
          {recibo.itens.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span>{item.quantidade}x {item.nome}</span>
              <span>{fmtPreco(item.preco * item.quantidade)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '15px', borderTop: '1px dashed #ddd', paddingTop: '12px', marginTop: '8px' }}>
            <span>Total</span><span>{fmtPreco(recibo.total)}</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#888' }}>Obrigada pela compra! 💖</div>
        </div>
      )}
    </div>
  )
}