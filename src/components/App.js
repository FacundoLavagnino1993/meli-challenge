import React, { useState } from 'react';
import SearcherBox from './searcher/searcher';

export function App() {
  return (
    <div> 
      <header className="nav-header">
        <a className="nav-logo" href="//localhost:3000/"></a>
        <SearcherBox/ >
      </header>
    </div>
  );
}
