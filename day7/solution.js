const fs = require("fs");

/**
 *
 *
 *
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day7/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const fileTree = createFileSystemTree(fileAsArray);
    const {sum, folderSizes} = sumDirectoriesWithSizeAtMost100000(fileTree.children[0]);
    console.log(sum);
    console.log(sizeOfDirectoryToDelete(fileTree.children[0], folderSizes));
  }
);

/**
 node looks like 
 {
  name: string, 
  size: number, 
  type: 'file' | 'folder',
  children: node[]
}
*/
const createFileSystemTree = (terminalOutput) => {
  let topFolder;
  let currentFolder = {
    parent: null,
    name: "",
    size: 0,
    type: "folder",
    children: [{ name: "/", size: 0, type: "folder", children: [] }],
  };
  for (let i = 0; i < terminalOutput.length; i++) {
    const line = terminalOutput[i].split(" ");
    if (line[0] === "$") {
      // command
      if (line[1] === "cd") {
        if (line[2] === "..") {
          currentFolder = currentFolder.parent;
        } else {
          if (line[2] === "/") {
            topFolder = currentFolder;
          }
          currentFolder = currentFolder.children.find((x) => {
            return x.name === line[2] && x.type === "folder";
          });
        }
      } else {
        // ignore ls
      }
    } else {
      // dir or file
      if (line[0] === "dir") {
        currentFolder.children.push({
          parent: currentFolder,
          name: line[1],
          size: 0,
          type: "folder",
          children: [],
        });
      } else {
        //currentFolder.size += parseInt(line[0]);
        currentFolder.children.push({
          parent: currentFolder,
          name: line[1],
          size: parseInt(line[0]),
          type: "file",
          children: null,
        });
      }
    }
  }
  return topFolder;
};

/**
 * find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes.
 */
const sumDirectoriesWithSizeAtMost100000 = (fileSystemTree) => {
  let sum = 0;
  let folderSizes = [];
  const fillFolderSizes = (tree) => {
    const children = tree.children;
    if (!children || children.length <= 0) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === "file") {
        tree.size += children[i].size;
      } else {
        if (children[i].size === 0) {
          fillFolderSizes(children[i]);
          tree.size += children[i].size;
        } else {
          tree.size += children[i].size;
        }
      }
    }
    folderSizes.push(tree.size);
    if (tree.size <= 100000) {
      sum += tree.size;
    }
  };
  fillFolderSizes(fileSystemTree);
  return {sum, folderSizes};
};

/** 
The total disk space available to the filesystem is 70000000. 
To run the update, you need unused space of at least 30000000. 
You need to find a directory you can delete that will free up enough space to run the update. 
Find the smallest directory to delete to get to 30000000 free space. Return total size of that directory */
const sizeOfDirectoryToDelete = (fileSystemTree, folderSizes) => {
  const totalSpace = 70000000;
  const totalSpaceNeeded = 30000000;
  const spaceUsed = fileSystemTree.size;
  const spaceRemaining = totalSpace - spaceUsed;
  const spaceToEmpty = totalSpaceNeeded - spaceRemaining; 

  folderSizes.sort((a,b) => parseInt(a) - parseInt(b));
  for(let i = 0; i< folderSizes.length; i++){
    if(folderSizes[i] > spaceToEmpty){
      return folderSizes[i];
    }
  }
};