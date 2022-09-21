export class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class Tree {
  root = null
  arr
  constructor(arr) {
    this.arr = arr
  }

  getRoot() {
    return Tree.root
  }

  buildTree(arr) {
    const noDuplicates = removeDuplicates(arr)
    const sortedArr = noDuplicates.sort((a, b) => a - b)
    const arrayLength = sortedArr.length

    const sortedArrayToBST = (arr, start, end) => {
      //base case
      if (start > end) {
        return null
      }

      //Find middle element and make it root
      const mid = parseInt((start + end) / 2)
      const node = new Node(arr[mid])

      //Recursively construct left subtree and make it left child of root
      node.left = sortedArrayToBST(arr, start, mid - 1)

      //Recursively construct right subtree and make it right child of root
      node.right = sortedArrayToBST(arr, mid + 1, end)
      return node
    }

    const result = sortedArrayToBST(sortedArr, 0, arrayLength - 1)
    Tree.root = result
    return result
  }

  insert(value) {
    const newNode = new Node(value)
    if (Tree.root == null) {
      Tree.root = newNode
      return
    }
    let prev = null
    let temp = Tree.root
    while (temp !== null) {
      if (temp.value > newNode.value) {
        prev = temp
        temp = temp.left
      } else if (temp.value < newNode.value) {
        prev = temp
        temp = temp.right
      }
    }
    if (prev.value > newNode.value) {
      prev.left = newNode
    } else {
      prev.right = newNode
    }
  }

  delete(value) {
    // https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/?ref=lbp
  }
}

export const removeDuplicates = (arr) => {
  let unique = []
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element)
    }
  })
  return unique
}

//Figure out why this isn't working -- format?
//Function received from TOP assignment that prints out the tree in a structured format
export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}
