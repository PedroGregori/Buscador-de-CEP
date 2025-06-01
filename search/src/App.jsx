import { useState, useEffect } from 'react';
import Search from './components/search';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    // Verifica a preferência do navegador
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return 'light'; // Fallback
  });

  // Atualiza a classe do body quando o tema muda
  useEffect(() => {
    document.body.className = theme;
    // Adiciona a imagem de fundo correspondente
    document.body.style.backgroundImage = `url(${
      theme === 'light' 
        ? '/assets/background-light.png' 
        : '/assets/background-dark.png'
    })`;
  }, [theme]);

  // Observa mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <Search theme={theme} />
    </div>
  );
}

export default App;