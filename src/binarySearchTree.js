import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers"

export class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class Tree {
  constructor(arr) {
    this.arr = arr
    this.root = this.buildTree(this.arr)
  }

  getRoot() {
    return this.root
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
    this.root = result
    return result
  }

  insert(value) {
    const newNode = new Node(value)
    if (this.root == null) {
      this.root = newNode
      return
    }
    let prev = null
    let temp = this.root
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

  deleteNode(value, root = this.root) {
    if (root == null) {
      return root
    }

    if (root.value > value) {
      root.left = this.deleteNode(value, root.left)
    } else if (root.value < value) {
      root.right = this.deleteNode(value, root.right)
    } else {
      if (root.left == null) {
        return root.right
      } else if (root.right == null) {
        return root.left
      }
      root.value = minValue(root)
      root.right = this.deleteNode(root.right, root.value)
    }

    return root
  }

  find(value, root = this.root) {
    if (root == null) {
      return root
    }

    if (root.value > value) {
      return this.find(value, root.left)
    } else if (root.value < value) {
      return this.find(value, root.right)
    } else {
      return root
    }
  }

  //Calls callback function on each node in the tree in level order, otherwise returns array
  //of values in level order
  levelOrder(callback) {
    let queue = []
    let nodeArray = []
    queue.push(this.root)
    while (queue.length !== 0) {
      let tempNode = queue.shift()
      if (arguments.length === 0) {
        nodeArray.push(tempNode.value)
      } else {
        callback(tempNode)
      }

      //enqueue left child
      if (tempNode.left != null) {
        queue.push(tempNode.left)
      }

      //enqueue right child
      if (tempNode.right != null) {
        queue.push(tempNode.right)
      }
    }
    if (arguments.length === 0) {
      return nodeArray
    }
  }

  //Calls callback function on each node in the tree in post order, otherwise returns array
  //of values in post order
  postOrder(callback, node = this.root, nodeArray = []) {
    if (node === null) return

    this.postOrder(callback, node.left, nodeArray)
    this.postOrder(callback, node.right, nodeArray)
    callback ? callback(node) : nodeArray.push(node.value)

    if (nodeArray.length > 0) return nodeArray
  }

  //Calls callback function on each node in the tree in in order, otherwise returns array
  //of values in in order
  inOrder(callback, node = this.root, nodeArray = []) {
    if (node === null) return

    this.inOrder(callback, node.left, nodeArray)
    callback ? callback(node) : nodeArray.push(node.value)
    this.inOrder(callback, node.right, nodeArray)

    if (nodeArray.length > 0) return nodeArray
  }

  //Calls callback function on each node in the tree in pre order, otherwise returns array
  //of values pre in order
  preOrder(callback, node = this.root, nodeArray = []) {
    if (node === null) return

    callback ? callback(node) : nodeArray.push(node.value)
    this.preOrder(callback, node.left, nodeArray)
    this.preOrder(callback, node.right, nodeArray)

    if (nodeArray.length > 0) return nodeArray
  }

  depth(node = this.root) {
    if (node === null) {
      return -1
    } else {
      let lDepth = this.depth(node.left)
      let rDepth = this.depth(node.right)

      //use the larger one
      if (lDepth > rDepth) {
        return lDepth + 1
      } else {
        return rDepth + 1
      }
    }
  }

  height(node = this.root) {
    if (node === null) {
      return -1
    } else {
      let lHeight = this.height(node.left)
      let rHeight = this.height(node.right)

      console.log("lHeight: ", lHeight, "node value: ", node.value)
      return Math.max(lHeight, rHeight) + 1
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return

    const heightDifference = Math.abs(
      this.height(node.left) - this.height(node.right)
    )

    console.log("heightDiff : ", heightDifference)

    // console.log("left abs: ", Math.abs(this.height(left)))
    // console.log("right abs: ", Math.abs(this.height(right)))

    if (heightDifference > 1) {
      return false
    } else {
      return true
    }
  }

  rebalance() {
    const inOrderArray = this.inOrder()
    console.log("inOrder: ", inOrderArray)
    this.buildTree(inOrderArray)
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${node.value} ${this.height(node)}`
    )
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
  }
}

function minValue(root) {
  let min = root.value
  while (root != null) {
    min = root.value
    root = root.left
  }
  return min
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
