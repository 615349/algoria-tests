import React, { useState, MouseEvent } from 'react';
import { Hit } from './types';
import { fetchAlgoria } from './utils';

function App() {
  const [hits, setHits] = useState<Hit[]>([]);

  const handleRefresh = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const response = await fetchAlgoria();
      setHits(response.hits);
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <span>Author: {hit.author}</span>
            <span style={{ marginLeft: 10 }}>Title: {hit.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
