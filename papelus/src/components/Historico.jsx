export default function Historico({ vendas }) {
  function fmtPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function fmtData(data) {
    return new Date(data).toLocaleString('pt-BR')
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Histórico de Vendas</h2>

      {vendas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Nenhuma venda registrada ainda.</p>
      ) : (
        vendas.map(venda => (
          <div
            key={venda.id}
            style={{ border: '1px solid #f0f0f0', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontWeight: '600', fontSize: '15px' }}>{venda.cliente}</span>
                <span style={{ fontSize: '12px', color: '#888', marginLeft: '10px' }}>{venda.canal}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '600', color: '#a855a0' }}>{fmtPreco(venda.total)}</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{fmtData(venda.data)}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed #f0f0f0', paddingTop: '10px' }}>
              {venda.itens.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  <span>{item.quantidade}x {item.nome}</span>
                  <span>{fmtPreco(item.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}