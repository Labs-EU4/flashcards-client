export default function diffArrays(arr1, arr2) {
  const diffRemove = arr1.filter(tag => !arr2.includes(tag)).map(tag => tag + 1);
  const diffAdd = arr2.filter(tag => !arr1.includes(tag)).map(tag => tag + 1);
  return [diffRemove, diffAdd];
}
