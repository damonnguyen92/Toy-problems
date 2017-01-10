function Stack() {
  this.stack = {}
  this.stackSize = 0;
  this.stackMin = [];
  this.currentMin = undefined;
};

Stack.prototype.push = function(value) {
  //value must be a number or string
  if (typeof value !== 'string' && typeof value !== 'number') {
    return 'argument must be string or number';
  }
  //define current minimum if undefined
  if (this.currentMin === undefined) {
    this.currentMin = value;
  }

  if (value < this.currentMin) {
    this.currentMin = value;
  }
  this.stackMin.push(this.currentMin);
  this.stack[this.stackSize] = value;
  this.stackSize++;
  return this.stack;
};

Stack.prototype.pop = function() {
  if (this.stackSize > 0) {
    this.stackMin.pop();
    this.stackSize--
    var popped_value = this.stack[this.stackSize];
    delete this.stack[this.stackSize];
    return popped_value;
  } else {
    this.stackSize = 0;
    return 'no more item on stack!';
  }
};

Stack.prototype.min = function() {
  return this.stackMin[this.stackSize - 1];
}

Stack.prototype.length = function() {
  return this.stackSize;
};

//################################SetOfStacks####################################
function SetOfStacks() {
  this.stack = {};
  this.stackSize = 0;
  this.threshold = 20;
}

SetOfStacks.prototype.push = function(stack) {
  if (stack.length() > this.threshold) {
    return 'argument stack must be less or equal to 20';
  }
  this.stack[this.stackSize] = stack;
  this.stackSize++;
};

SetOfStacks.prototype.pop = function() {
  if (this.stackSize > 0) {
    this.stackSize--;
    var poppedStack = this.stack[this.stackSize];
    delete this.stack[this.stackSize];
    return poppedStack;
  } else {
    this.stackSize = 0;
    return 'no more item on stack!';
  }
};

SetOfStacks.prototype.length = function() {
  return this.stackSize;
};

module.exports = {
  Stack: Stack,
  SetOfStacks: SetOfStacks
};