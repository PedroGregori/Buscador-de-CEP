import { useState } from 'react';
import './search.css';

import { fetchCep } from '../services/cepApi';

function Search({ theme }) {
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    setData(null);

    setLoading(true);

    try {
      const result = await fetchCep(cep);
      setData(result);
    } catch (err) {
      setError(err.message || 'Erro na busca. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${theme}`}>
      <h1>Buscador de CEP</h1>
      <div className='search-box'>
        <input className='input-box'
          type="text"
          placeholder="Digite o CEP (somente números)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button className='search-button' onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <p><strong>CEP:</strong> {data.cep}</p>
          <p><strong>Cidade:</strong> {data.localidade}</p>
          <p><strong>Estado:</strong> {data.uf}</p>
        </div>
      )}
    </div>
  );
}

export default Search;