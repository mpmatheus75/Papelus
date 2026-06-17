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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
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

      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Produtos em estoque</h2>

        {produtos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Nenhum produto cadastrado ainda.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                {['Produto', 'Categoria', 'Preço', 'Qtd.', 'Status', ''].map(col => (
                  <th key={col} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '12px', color: '#888', fontWeight: '500' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => {
                const status = getStatus(produto)
                return (
                  <tr key={produto.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={{ padding: '12px' }}>{produto.nome}</td>
                    <td style={{ padding: '12px', color: '#666' }}>{produto.categoria}</td>
                    <td style={{ padding: '12px' }}>{fmtPreco(produto.preco)}</td>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{produto.quantidade}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: status.cor, color: status.texto, padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500' }}>
                        {status.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => onDeletar(produto.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px', cursor: 'pointer' }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}