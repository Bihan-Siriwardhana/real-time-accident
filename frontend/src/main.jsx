// src/main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './components/HomePage'; // ✅ import HomePage

function App() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-bgDark dark:bg-bgLight text-textDark dark:text-textLight transition-colors duration-500">
      <h1 className="text-5xl mb-6 font-system font-bold">Welcome to Accident Tracker</h1>

      {/* Accident list section */}
      <HomePage />

      <a href="#" className="text-primary hover:text-primaryHover mb-6 mt-4">
        Learn more
      </a>
      <button
        onClick={() => setDark(!dark)}
        className="rounded-lg border border-transparent px-6 py-3 font-medium bg-buttonBgDark dark:bg-buttonBgLight text-textDark dark:text-textLight hover:border-primary transition-colors"
      >
        Toggle {dark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
