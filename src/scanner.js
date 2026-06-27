const fileSystem = require('fs').promises;
const path = require('path');

async function scanDirectory(currentPath) {
    const fileItemDetails = await fileSystem.stat(currentPath);
    const itemName = path.basename(currentPath);

    if (!fileItemDetails.isDirectory()) {
        return { 
            name: itemName, 
            type: 'file', 
            absolutePath: currentPath 
        };
    }

    const directoryContents = await fileSystem.readdir(currentPath);
    const parsedChildrenElements = [];

    for (const childItemName of directoryContents) {
        const isSystemFolder = childItemName === 'node_modules' || childItemName === '.git';
        if (isSystemFolder) continue;

        const childItemPath = path.join(currentPath, childItemName);
        
        const nestedChildNode = await scanDirectory(childItemPath); 
        parsedChildrenElements.push(nestedChildNode);
    }

    return { 
        name: itemName, 
        type: 'folder', 
        children: parsedChildrenElements 
    };
}

module.exports = { scanDirectory };