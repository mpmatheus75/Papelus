import { useState } from 'react'
import { useEstoque } from './hooks/useEstoque'
import Estoque from './components/Estoque'
import NovaVenda from './components/NovaVenda'
import Historico from './components/Historico'
import CadastroProduto from './components/CadastroProduto'

const abas = [
  { id: 'estoque', label: '📦 Estoque' },
  { id: 'venda', label: '🛒 Nova Venda' },
  { id: 'historico', label: '📋 Histórico' },
  { id: 'cadastro', label: '➕ Cadastrar Produto' },
]

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('estoque')
  const { dados, adicionarProduto, deletarProduto, registrarVenda, editarProduto } = useEstoque()

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>

      <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#a855a0' }}>
        🌸 Papelus — Gestão de Estoque
      </h1>

      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {abas.map(aba => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: abaAtiva === aba.id ? '#a855a0' : '#ddd',
              background: abaAtiva === aba.id ? '#a855a0' : 'white',
              color: abaAtiva === aba.id ? 'white' : '#555',
              fontWeight: abaAtiva === aba.id ? '600' : '400',
              fontSize: '14px',
            }}
          >
            {aba.label}
          </button>
        ))}
      </nav>

      {abaAtiva === 'estoque' && (
       <Estoque produtos={dados.produtos} onDeletar={deletarProduto} onEditar={editarProduto} />
      )}
      {abaAtiva === 'venda' && (
        <NovaVenda produtos={dados.produtos} onVenda={registrarVenda} />
      )}
      {abaAtiva === 'historico' && (
        <Historico vendas={dados.vendas} />
      )}
      {abaAtiva === 'cadastro' && (
        <CadastroProduto onSalvar={adicionarProduto} />
      )}

    </div>
  )
}