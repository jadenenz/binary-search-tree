import { Tree, prettyPrint } from "./binarySearchTree"

// test("insert method works", () => {
//   const test = new Tree()
//   const testArr = [1, 2, 3, 4, 5, 4, 2]
//   test.buildTree(testArr)
//   // prettyPrint(test.getRoot())
//   test.insert(12)
//   // prettyPrint(test.getRoot())
// })

test("delete method works", () => {
  const testArr = [1, 2, 3, 4, 5]
  const test = new Tree(testArr)
  // prettyPrint(test.getRoot())
  test.deleteNode(4)
  // console.log("-------------------------")
  // prettyPrint(test.getRoot())
})

test("find method works", () => {
  const testArray = [50, 24, 3001, 62, 99, 1, 42]
  const test1 = new Tree(testArray)
  // prettyPrint(test1.getRoot())
  // console.log(test1.find(24))
})

test("levelOrder console logs the nodes in order", () => {
  const testArray1 = [50, 24, 3001, 62, 99, 1, 42]
  const test2 = new Tree(testArray1)
  // test2.levelOrder((element) => console.log(element))
  // console.log(test2.levelOrder())
})

test("postOrder console logs the nodes in order", () => {
  const testArray = [50, 24, 3001, 62, 99, 1, 42]
  const test = new Tree(testArray)
  // console.log(test.postOrder())
  // test.postOrder((element) => console.log(element))
  // console.log(test.postOrder())
})

test("depth returns number representing depth of node", () => {
  const testArray = [50, 24, 3001, 62, 99, 1, 42]
  const test = new Tree(testArray)
  // console.log(test.depth())
})

test("height returns number representing height of node", () => {
  const testArray = [50, 24, 3001, 62, 99, 1, 42]
  const test = new Tree(testArray)
  // console.log(test.height())
  test.insert(30000)
  expect(test.height()).toBe(3)
})

// test("isBalance correctly determines if a tree is balanced", () => {
//   const testArray = [50, 24, 3001, 62, 99, 1, 42]
//   const test = new Tree(testArray)
//   // prettyPrint(test.getRoot())
//   expect(test.isBalanced()).toBe(true)
//   test.insert(500)
//   test.insert(7000)
//   test.insert(60000)
//   test.insert(532)
//   expect(test.isBalanced()).toBe(false)
// })

test("rebalance correctly rebalances the tree", () => {
  const testArray = [300, 420, 1, 3, 6000, 27, 843, 1932, 21562, 72]
  const test = new Tree(testArray)
  // prettyPrint(test.getRoot())
  expect(test.isBalanced()).toBe(true)
  test.insert(350)
  test.insert(247)
  test.insert(4000)
  test.insert(5533)
  test.insert(120)
  test.insert(117)
  prettyPrint(test.getRoot())
  expect(test.isBalanced()).toBe(false)
  test.rebalance()
  expect(test.isBalanced()).toBe(true)
  console.log(
    "post: ",
    test.postOrder(),
    "in: ",
    test.inOrder(),
    "pre: ",
    test.preOrder(),
    "level: ",
    test.levelOrder()
  )
})
