import { createContext, useState, useContext, React } from 'react';

export const TreeContext = createContext();

const baseLeaves = [
    {
        id: 1, name: "Node 1", children:[{id: 3, name: "Node 3", children: []}]
    },
    {
        id: 2, name: "Node 2", children: []
    }
]

export const TreeProvider = ({children}) => {
    const [tree, setTree] = useState(baseLeaves);
    const [chosenLeafId, setChosenLeafId] = useState(null);

    const addLeaf = (newLeaf) => {
        if (chosenLeafId === null) {
            const newLeafWithId = { ...newLeaf, id: Date.now(), children: [] };
            setTree([...tree, newLeafWithId]); 
        } else {
            const updatedTree = addLeafRecursively(tree, chosenLeafId, newLeaf);
            setTree(updatedTree);
        }
        console.log(tree);
        setChosenLeafId(null);
    };

    const addLeafRecursively = (leaves, parentId, newLeaf) => {
        return leaves.map(leaf => {
            if (leaf.id === parentId) {
                const newLeafWithId = { ...newLeaf, id: Date.now(), children: [] }; 
                console.log(newLeafWithId);
                return { ...leaf, children: [...leaf.children, newLeafWithId] };
            }
            if (leaf.children) {
                return { ...leaf, children: addLeafRecursively(leaf.children, parentId, newLeaf) };
            }
            return leaf;
        });
    };

    const deleteLeaf = () => {
        const updatedTree = deleteLeafRecursively(tree, chosenLeafId);
        setTree(updatedTree);
        setChosenLeafId(null);
    }

    const deleteLeafRecursively = (tree, id) => {
        return tree.filter(leaf => {
            if (leaf.id === id) return false;
            if (leaf.children.length > 0) {
                leaf.children = deleteLeafRecursively(leaf.children, id);
            }
            return true;
        });
    }

    const resetTree = () => {
        setTree(baseLeaves);
    }

    const chooseLeaf = (id) => {
        setChosenLeafId(id === chosenLeafId ? null : id);
        console.log(chosenLeafId);
    }


    return (
        <TreeContext.Provider value={{tree, setTree, resetTree, addLeaf, deleteLeaf, chooseLeaf, chosenLeafId, setChosenLeafId}}>
            {children}
        </TreeContext.Provider>
    )
}

export const useTree = () => {
    return useContext(TreeContext);
}