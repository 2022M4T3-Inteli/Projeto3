/*
var arrays = [
  { name: "deleniti", results: 2 },
  { name: "ut", results: 2 },
  {
    _id: "637dc9e7fbb319e2e3273c5c",
    name: "deleniti",
    __v: 0,
  },
  { _id: "637dca29fbb319e2e3273c68", name: "ut", __v: 0 },
];

const result = arrays.reduce(
  (acc, { name, results, _id }, i, arr) => {
    console.log("acc: ", acc);
    console.log("typeof acc: ", typeof acc);
    console.log("name: ", name);
    console.log("results: ", results);
    console.log("_id: ", _id);
    console.log("i: ", i);
    console.log("arr: ", arr);
    console.log("=====================");
    return acc.push({ name });
  },
  [0]
);
*/

const people = [
  { name: "deleniti", results: 2 },
  { name: "ut", results: 2 },
  {
    _id: "637dc9e7fbb319e2e3273c5c",
    name: "deleniti",
    __v: 0,
  },
  { _id: "637dca29fbb319e2e3273c68", name: "ut", __v: 0 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const groupedPeople = groupBy(people, "name");
console.log(groupedPeople);
console.log("==============================");
console.log(groupedPeople.deleniti);
console.log("==============================");
let x = { ...groupedPeople.deleniti[0], ...groupedPeople.deleniti[1] };
console.log(x);
