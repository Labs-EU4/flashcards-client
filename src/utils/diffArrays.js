export default function diffArrays(arr1, arr2) {
  const diffRemove = arr1.filter(tag => !arr2.includes(tag)).map(tag => tag);
  const diffAdd = arr2.filter(tag => !arr1.includes(tag)).map(tag => tag);
  return [diffRemove, diffAdd];
}
