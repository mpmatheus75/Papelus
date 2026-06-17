import { useState } from 'react'

const categorias = [
  'Cadernos',
  'Canetas e lápis',
  'Tintas e marcadores',
  'Adesivos e washi tape',
  'Papéis',
  'Fichários e pastas',
  'Outros',
]

export default function CadastroProduto({ onSalvar }) {
  const [form, setForm] = useState({
    nome: '',
    categoria: 'Cadernos',
    preco: '',
    quantidade: '',
    minimo: '5',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSalvar() {
    if (!form.nome) return alert('Digite o nome do produto.')
    if (!form.preco || form.preco <= 0) return alert('Digite um preço válido.')

    onSalvar({
      nome: form.nome,
      categoria: form.categoria,
      preco: parseFloat(form.preco),
      quantidade: parseInt(form.quantidade) || 0,
      minimo: parseInt(form.minimo) || 5,
    })

    setForm({ nome: '', categoria: 'Cadernos', preco: '', quantidade: '', minimo: '5' })
    alert('Produto cadastrado com sucesso! ✅')
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Novo Produto</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Nome do produto</label>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Caderno espiral 96fls" />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Categoria</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            {categorias.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Preço de venda (R$)</label>
          <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="0,00" min="0" step="0.01" />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Quantidade em estoque</label>
          <input name="quantidade" type="number" value={form.quantidade} onChange={handleChange} placeholder="0" min="0" />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Estoque mínimo (alerta)</label>
          <input name="minimo" type="number" value={form.minimo} onChange={handleChange} placeholder="5" min="0" />
        </div>

      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSalvar}
          style={{ padding: '10px 24px', background: '#a855a0', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px' }}
        >
          Salvar produto
        </button>
      </div>
    </div>
  )
}