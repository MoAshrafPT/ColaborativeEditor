export default function operationalTransform(delta, operations) {
  console.log(delta, "delta in OT start");
  if (delta.ops[0] && !('retain' in delta.ops[0])) {
    delta.ops.unshift({ 'retain': 0 });
  }
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].delta.ops[0] && !('retain' in operations[i].delta.ops[0])) {
      operations[i].delta.ops.unshift({ 'retain': 0 });
    }
    if ('insert' in delta.ops[1]) {
      if ('insert' in operations[i].delta.ops[1]) {
        if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
          delta.ops[0].retain += operations[i].delta.ops[1].insert.length;
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
    if (operations[i].delta.ops[0] && operations[i].delta.ops[0].retain == 0) {
      operations[i].delta.ops = [operations[i].delta.ops[1]]
    }
  }
  if (delta.ops[0] && delta.ops[0].retain == 0) {
    delta.ops = [delta.ops[1]]
  }
  console.log(delta, "delta in OT end");
  return delta;
}