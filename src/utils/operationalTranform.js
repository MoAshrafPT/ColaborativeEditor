export default function operationalTransform(delta, operations) {
  console.log(delta, "delta in OT start");
  if (delta.ops[0] && !('retain' in delta.ops[0])) {
    delta.ops.unshift({ 'retain': 0 });
  }
  for (let i = 0; i < operations.length; i++) {
    console.log("I survived", i, "times");
    console.log(delta.ops, "delta.ops");
    console.log(operations[i], "operations[i]");
    if ('insert' in delta.ops[1]) {
      if ('insert' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          console.log("I am insert insert", i);
          console.log(delta.ops[0].retain, "Retain1 in insert insert");
          console.log(operations[i].ops[1].insert.length, "Retain2 in insert insert");
          console.log(delta.ops[0].retain + operations[i].ops[1].insert.length, "Retain3 in insert insert");
          delta.ops[0].retain += operations[i].ops[1].insert.length;
          console.log(delta.ops[0].retain, "Retain4 in insert insert");
        }
      } else if ('delete' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain -= operations[i].delta.ops[1].delete;
        }
      }
    } else if ('delete' in delta.ops[1]) {
      if ('insert' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain += operations[i].delta.ops[1].insert.length;
        }
      } else if ('delete' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain -= operations[i].delta.ops[1].delete;
        }
      }
    }
  }
  console.log(delta, "delta in OT end");
  return delta;
}