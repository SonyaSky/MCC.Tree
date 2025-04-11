import React, { useState } from 'react';

import './tree.css';
import Button from '../button/button';
import Leaf from '../leaf/Leaf';
import { useTree } from '../../context/TreeContext';

const Tree = () => {
  const { deleteLeaf, addLeaf, tree, resetTree, setChosenLeafId, clearTree, editing, editLeaf } =
    useTree();

  const handleDelete = () => {
    deleteLeaf();
  };

  const handleAddLeaf = () => {
    const newLeaf = { name: 'New Node' };
    addLeaf(newLeaf);
  };

  const handleContainerClick = (e) => {
    if (!(editing || e.target.closest('.leaf') || e.target.closest('.blue-btn'))) {
      setChosenLeafId(null);
    }
  };

  return (
    <div className="tree-div" onClick={handleContainerClick}>
      <div className="buttons-div">
        <Button title="Add" onClick={handleAddLeaf} />
        <Button title="Delete" onClick={handleDelete} />
        <Button title={editing ? 'Save' : 'Edit'} onClick={editLeaf} />
        <Button title="Reset" onClick={resetTree} />
        <Button title="Clear" onClick={clearTree} />
      </div>
      <div className="right-div">
        <h1 className="title">tree</h1>
        <div className="tree-container">
          {tree.map(({ id, name, children }) => (
            <Leaf key={id} name={name} childrenLeaves={children} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tree;
