import React, { useEffect, useState } from 'react';
import { Hit } from './types';
import { fetchAlgoria } from './utils';

function App() {
  const [hits, setHits] = useState<Hit[]>([]);
  useEffect(() => {
    fetchAlgoria().then((res) => {
      setHits(res.hits);
    })
  }, []);

  return (
    <div className="App">
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
