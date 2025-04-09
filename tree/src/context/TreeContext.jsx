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
    let idCounter = 4;

    const addLeaf = (parentId, newLeaf) => {
        const updatedTree = addLeafRecursively(tree, parentId, newLeaf);
        setTree(updatedTree);
        // console.log(tree);
    };

    const addLeafRecursively = (leaves, parentId, newLeaf) => {
        return leaves.map(leaf => {
            if (leaf.id === parentId) {
                const newLeafWithId = { ...newLeaf, id: idCounter++, children: [] }; 
                console.log(newLeafWithId);
                return { ...leaf, children: [...leaf.children, newLeafWithId] };
            }
            if (leaf.children) {
                return { ...leaves, children: addLeafRecursively(leaf.children, parentId, newLeaf) };
            }
            return leaf;
        });
    };

    const deleteLeaf = (id) => {
        const updatedTree = deleteLeafRecursively(tree, id);
        setTree(updatedTree);
    }

    const deleteLeafRecursively = (tree, id) => {
        return tree.reduce((acc, leaf) => {
            if (leaf.id === id) {
                return acc;
            }
            const updatedChildren = deleteLeafRecursively(leaf.children, id);
            if (updatedChildren.length > 0 || leaf.children.length === 0) {
                acc.push({...leaf, children: updatedChildren});
            }
        }, [])
    }


    return (
        <TreeContext.Provider value={{tree, setTree, addLeaf, deleteLeaf}}>
            {children}
        </TreeContext.Provider>
    )
}

export const useTree = () => {
    return useContext(TreeContext);
}