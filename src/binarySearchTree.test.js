import { Tree, removeDuplicates, prettyPrint } from "./binarySearchTree"

test("log node", () => {
  const test = new Tree()
  const testArr = [1, 2, 3, 4, 5, 4, 2]
  test.buildTree(testArr)
  prettyPrint(test.getRoot())
  test.insert(12)
  prettyPrint(test.getRoot())
})
