export default function Estoque({ produtos, onDeletar }) {
  function getStatus(produto) {
    if (produto.quantidade === 0) return { label: 'Sem estoque', cor: '#fee2e2', texto: '#991b1b' }
    if (produto.quantidade <= produto.minimo) return { label: 'Estoque baixo', cor: '#fef3c7', texto: '#92400e' }
    return { label: 'Ok', cor: '#dcfce7', texto: '#166534' }
  }

  function fmtPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{fmtPreco(produto.preco)}</span>
                      <span style={{ fontSize: '13px', color: '#555' }}>Qtd: <strong>{produto.quantidade}</strong></span>
                      <span style={{ background: status.cor, color: status.texto, padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '500' }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeletar(produto.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer', marginLeft: '12px' }}
                  >
                    🗑️
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}