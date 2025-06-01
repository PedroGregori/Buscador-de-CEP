// Função para fazer fetch com timeout
const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Tempo de resposta excedido.')), timeout)
    ),
  ]);
};

// Função para buscar dados do CEP
export const fetchCep = async (cep) => {
  if (cep.length !== 8) {
    throw new Error('CEP inválido. Deve ter 8 dígitos.');
  }

  const response = await fetchWithTimeout(`https://viacep.com.br/ws/${cep}/json/`);
  const result = await response.json();

  if (result.erro) {
    throw new Error('CEP não encontrado.');
  }

return result;
};
