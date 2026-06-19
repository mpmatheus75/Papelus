import { useState } from 'react'

const categorias = [
  'Cadernos', 'Canetas e lápis', 'Tintas e marcadores',
  'Adesivos e washi tape', 'Papéis', 'Fichários e pastas', 'Outros'
]

export default function Estoque({ produtos, onDeletar, onEditar }) {
  const [editando, setEditando] = useState(null)

  function getStatus(produto) {
    if (produto.quantidade === 0) return { label: 'Sem estoque', cor: '#fee2e2', texto: '#991b1b' }
    if (produto.quantidade <= produto.minimo) return { label: 'Estoque baixo', cor: '#fef3c7', texto: '#92400e' }
    return { label: 'Ok', cor: '#dcfce7', texto: '#166534' }
  }

  function fmtPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function abrirEdicao(produto) {
    setEditando({ ...produto })
  }

  function handleChange(e) {
    setEditando({ ...editando, [e.target.name]: e.target.value })
  }

  function salvarEdicao() {
    if (!editando.nome) return alert('Digite o nome do produto.')
    if (!editando.preco || editando.preco <= 0) return alert('Digite um preço válido.')
    onEditar({
      ...editando,
      preco: parseFloat(editando.preco),
      custo: parseFloat(editando.custo) || 0,
      quantidade: parseInt(editando.quantidade) || 0,
      minimo: parseInt(editando.minimo) || 5,
    })
    setEditando(null)
  }

  const totalProdutos = produtos.length
  const totalItens = produtos.reduce((soma, p) => soma + p.quantidade, 0)
  const totalValor = produtos.reduce((soma, p) => soma + p.quantidade * p.preco, 0)
  const semEstoque = produtos.filter(p => p.quantidade === 0).length
  const baixoEstoque = produtos.filter(p => p.quantidade > 0 && p.quantidade <= p.minimo)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Produtos', valor: totalProdutos, cor: '#6366f1' },
          { label: 'Itens em estoque', valor: totalItens, cor: '#10b981' },
          { label: 'Valor total', valor: fmtPreco(totalValor), cor: '#f59e0b' },
          { label: 'Sem estoque', valor: semEstoque, cor: '#ef4444' },
        ].map(card => (
          <div key={card.label} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{card.label}</div>
            <div style={{ fontSize: '22px', fontWeight: '600', color: card.cor }}>{card.valor}</div>
          </div>
        ))}
      </div>

      {baixoEstoque.length > 0 && (
        <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#92400e' }}>
          ⚠️ Estoque baixo: {baixoEstoque.map(p => p.nome).join(', ')}
        </div>
      )}

      {/* MODAL DE EDIÇÃO */}
      {editando && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>✏️ Editar Produto</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Nome</label>
                <input name="nome" value={editando.nome} onChange={handleChange} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Categoria</label>
                <select name="categoria" value={editando.categoria} onChange={handleChange}>
                  {categorias.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Preço de venda (R$)</label>
                <input name="preco" type="number" value={editando.preco} onChange={handleChange} min="0" step="0.01" />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Preço de custo (R$)</label>
                <input name="custo" type="number" value={editando.custo || ''} onChange={handleChange} min="0" step="0.01" />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Quantidade</label>
                <input name="quantidade" type="number" value={editando.quantidade} onChange={handleChange} min="0" />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Estoque mínimo</label>
                <input name="minimo" type="number" value={editando.minimo} onChange={handleChange} min="0" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => setEditando(null)}
                style={{ padding: '10px 20px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', fontSize: '14px' }}
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                style={{ padding: '10px 24px', background: '#a855a0', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px' }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Produtos em estoque</h2>

        {produtos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Nenhum produto cadastrado ainda.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {produtos.map(produto => {
              const status = getStatus(produto)
              return (
                <div key={produto.id} style={{ border: '1px solid #f0f0f0', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{produto.nome}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{produto.categoria}</div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>Venda: {fmtPreco(produto.preco)}</span>
                      {produto.custo > 0 && (
                        <span style={{ fontSize: '13px', color: '#888' }}>Custo: {fmtPreco(produto.custo)}</span>
                      )}
                      {produto.custo > 0 && (
                        <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '500' }}>
                          Margem: {Math.round(((produto.preco - produto.custo) / produto.preco) * 100)}%
                        </span>
                      )}
                      <span style={{ fontSize: '13px', color: '#555' }}>Qtd: <strong>{produto.quantidade}</strong></span>
                      <span style={{ background: status.cor, color: status.texto, padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '500' }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                    <button
                      onClick={() => abrirEdicao(produto)}
                      style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDeletar(produto.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}