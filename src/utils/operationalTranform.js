export default function operationalTransform(delta, operations) {
    console.log(delta, "delta in OT start");
    if (!('retain' in delta.ops[0])) {
      delta.ops.unshift({ 'retain': 0 });
    }
    for (let i = 0; i < operations.length; i++) {
      if ('insert' in delta.ops[1]) {
        if ('insert' in operations[i].delta.ops[1]) {
          if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
            delta.ops[0].retain += operations[i].delta.ops[1].length;
          }
        } else if ('delete' in operations[i].delta.ops[1]) {
          if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
            delta.ops[0].retain -= operations[i].delta.ops[1];
          }
        }
      } else if ('delete' in delta.ops[1]) {
        if ('insert' in operations[i].delta.ops[1]) {
          if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
            delta.ops[0].retain += operations[i].delta.ops[1].length;
          }
        } else if ('delete' in operations[i].delta.ops[1]) {
          if (delta.ops[0].retain >= operations[i].delta.ops[0].retain) {
            delta.ops[0].retain -= operations[i].delta.ops[1];
          }
        }
      }
    }
    console.log(delta, "delta in OT end");
    return delta;
  }