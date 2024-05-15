export default function operationalTransform(delta, operations) {
  console.log(delta, "delta in OT start");
  if (delta.ops[0] && !('retain' in delta.ops[0])) {
    delta.ops.unshift({ retain: 0 });
  }
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].delta.ops[0] && !('retain' in operations[i].delta.ops[0])) {
      operations[i].delta.ops.unshift({ retain: 0 });
    }
    console.log("delta @ ", i, delta);
    console.log("ops delta @ ", i, operations[i].delta);
    if ('insert' in delta.ops[1]) {
      if ('insert' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          console.log("I am insert insert", i);
          console.log("data insert insert", operations[i].delta.ops[1].insert.length);
          Object.assign(delta.ops[0].retain, delta.ops[0].retain + operations[i].delta.ops[1].insert.length);
          //delta.ops[0].retain += operations[i].delta.ops[1].insert.length;
          console.log(operations);
          console.log("data 2 insert insert", delta.ops[0].retain);
        }
      } else if ('delete' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain -= operations[i].delta.ops[1].delete;
          console.log("I am insert delete");
        }
      }
    } else if ('delete' in delta.ops[1]) {
      if ('insert' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain += operations[i].delta.ops[1].insert.length;
          console.log("I am delete insert");
        }
      } else if ('delete' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain -= operations[i].delta.ops[1].delete;
          console.log("I am delete delete");
        }
      }
    }
    if (operations[i].delta.ops[0] && operations[i].delta.ops[0].retain === 0) {
      operations[i].delta.ops = [operations[i].delta.ops[1]]
    }
  }
  if (delta.ops[0] && delta.ops[0].retain === 0) {
    delta.ops = [delta.ops[1]]
  }
  console.log(delta, "delta in OT end");
  return delta;
}