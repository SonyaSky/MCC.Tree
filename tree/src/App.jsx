import React from 'react';

import './App.css';
import Tree from './components/tree/Tree';
import { TreeProvider } from './context/TreeContext';

function App() {
  return (
    <>
      <TreeProvider>
        <Tree />
      </TreeProvider>
    </>
  );
}

export default App;
