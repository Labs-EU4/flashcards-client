const partionListByIndex = (list, index) => {
  return list.reduce(
    (accumulator, currentValue, currentIndex) => {
      const [before, after] = accumulator;
      if (currentIndex < index) {
        return [[...before, currentValue], after];
      } else if (currentIndex > index) {
        return [before, [...after, currentValue]];
      } else {
        return accumulator;
      }
    },
    [[], []]
  );
};
class ZipList {
  constructor(zipList) {
    this.length = zipList.length;
    delete zipList.length;
    this.zipList = zipList;
  }
  static fromArray(arr) {
    const [current, ...rest] = arr;
    return new ZipList({
      previous: [],
      current,
      next: rest,
      length: arr.length,
    });
  }
  active() {
    return this.zipList.current;
  }
  isActive(item) {
    return this.zipList.current === item;
  }
  setActive(item) {
    if (this.zipList.previous.includes(item)) {
      const [previousItemsBeforeActive, previousItemsAfterActive] = partionListByIndex(
        this.zipList.previous,
        this.zipList.previous.findIndex(i => i === item)
      );
      return new ZipList({
        previous: [...previousItemsBeforeActive],
        current: item,
        next: [...previousItemsAfterActive, this.zipList.current, ...this.zipList.next],
      });
    } else if (this.zipList.next.includes(item)) {
      const [nextItemsBeforeActive, nextItemsAfterActive] = partionListByIndex(
        this.zipList.next,
        this.zipList.next.findIndex(i => i === item)
      );
      return new ZipList({
        previous: [
          ...this.zipList.previous,
          this.zipList.current,
          ...nextItemsBeforeActive,
        ],
        current: item,
        next: [...nextItemsAfterActive],
      });
    } else {
      return this;
    }
  }
  asArray() {
    return [...this.zipList.previous, this.zipList.current, ...this.zipList.next];
  }
}
export default ZipList;
