import React, { useState, useEffect } from 'react';

import './leaf.css';
import { useTree } from '../../context/TreeContext';

const Leaf = ({ id, name, childrenLeaves }) => {
  const { chooseLeaf, chosenLeafId, renameLeaf, editing, editLeaf } = useTree();

  const handleNameChange = (event) => {
    renameLeaf(id, event.target.value);
  };

  const handleClick = () => {
    if (!editing) {
      chooseLeaf(id);
    }
  };

  return (
    <>
      <div className={chosenLeafId === id ? 'leaf chosen' : 'leaf'} onClick={handleClick}>
        {chosenLeafId === id && editing ? (
          <textarea
            className="leaf-area"
            value={name}
            autoFocus
            cols={100}
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                editLeaf();
              }
            }}
            rows={1}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div className="children-div">
        {!childrenLeaves.Empty &&
          childrenLeaves.map(({ id, name, children }) => (
            <Leaf key={id} name={name} childrenLeaves={children} id={id} />
          ))}
      </div>
    </>
  );
};

export default Leaf;
