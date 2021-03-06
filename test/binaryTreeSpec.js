var expect = require('chai').expect;
var BinarySearchTree = require('../binaryTree.js');

describe('BinarySearchTree', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(8);
  });

  it('should be a function', function() {
    expect(typeof BinarySearchTree).to.equal('function');
  });

  it('should have properties: left, right', function() {
    expect(myBinarySearchTree).to.have.property('left');
    expect(myBinarySearchTree).to.have.property('right');
  });

  it('should have methods: insert, contains, depthFirstLog, isBalanced, breadthFirstSearch, inOrder, preOrder, postOrder', function() {
    expect(myBinarySearchTree).to.have.property('insert');
    expect(myBinarySearchTree).to.have.property('contains');
    expect(myBinarySearchTree).to.have.property('depthFirstLog');
    expect(myBinarySearchTree).to.have.property('isBalanced');
    expect(myBinarySearchTree).to.have.property('breadthFirstSearch');
    expect(myBinarySearchTree).to.have.property('inOrder');
    expect(myBinarySearchTree).to.have.property('preOrder');
    expect(myBinarySearchTree).to.have.property('postOrder');
  });

  it('root node should be the value of 8', function() {
    expect(myBinarySearchTree.value).to.equal(8);
  });
});

describe('BinarySearchTree.insert', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(8);
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.insert).to.equal('function');
  });

  it('the value argument should be a number or throw error', function() {
    var error = 'argument must be an number';
    expect(myBinarySearchTree.insert('string')).to.equal(error);
    expect(myBinarySearchTree.insert({})).to.equal(error);
    expect(myBinarySearchTree.insert([])).to.equal(error);
    expect(myBinarySearchTree.insert(function() {})).to.equal(error);
    expect(myBinarySearchTree.insert(undefined)).to.equal(error);
    expect(myBinarySearchTree.insert(null)).to.equal(error);
  });

  it('should instantiate a tree and assign it to the left property if value is less than root value', function() {
    myBinarySearchTree.insert(7);
    expect(myBinarySearchTree.left.value).to.equal(7);
  });

  it('should instantiate a tree and assign it to the right property if value is less than root value', function() {
    myBinarySearchTree.insert(9);
    expect(myBinarySearchTree.right.value).to.equal(9);
  });
});

describe('BinarySearchTree.contains', function() {
  var myBinarySearchTree;
  var insertValue = [3, 10, 1, 6, 14, 4, 7, 13];

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(8);
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.contains).to.equal('function');
  });

  it('should return true if node is found within the tree', function() {
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });
    expect(myBinarySearchTree.contains(13)).to.equal(true);
  });

  it('should return false if node is found within the tree', function() {
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });
    expect(myBinarySearchTree.contains(2)).to.equal(false);
  });
});

describe('BinarySearchTree.depthFirstLog', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(8);
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.depthFirstLog).to.equal('function');
  });

  it('should take in a function as argument or throw error', function() {
    var error = 'argument must be a function';
    expect(myBinarySearchTree.depthFirstLog('string')).to.equal(error);
    expect(myBinarySearchTree.depthFirstLog(7)).to.equal(error);
    expect(myBinarySearchTree.depthFirstLog({})).to.equal(error);
    expect(myBinarySearchTree.depthFirstLog([])).to.equal(error);
    expect(myBinarySearchTree.depthFirstLog(undefined)).to.equal(error);
    expect(myBinarySearchTree.depthFirstLog(null)).to.equal(error);
  });

  it('should invoke callback on every node', function() {
    var resultValues = [4, 11, 2, 7, 15, 5, 8, 14];
    var insertValue = [3, 10, 1, 6, 14, 4, 7, 13];
    function add1(number) {
      return number + 1;
    };
    //build tree with values
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });

    //add one to the value of every node
    myBinarySearchTree.depthFirstLog(add1);

    resultValues.forEach(function(value) {
      expect(myBinarySearchTree.contains(value)).to.equal(true);
    });
  });
});

describe('BinarySearchTree.isBalanced', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(5);
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.isBalanced).to.equal('function');
  });

  it('should return true if tree is not balanced', function() {
    var insertValue = [4, 6];
    insertValue.forEach(function(node) {
      myBinarySearchTree.insert(node);
    });
    expect(myBinarySearchTree.isBalanced()).to.equal(true);
  });

  it('should return false if tree is not balanced', function() {
    var insertValue = [2, 6];
    insertValue.forEach(function(node) {
      myBinarySearchTree.insert(node);
    });
    expect(myBinarySearchTree.isBalanced()).to.equal(false);
  });
});

describe('BinarySearchTree.breadthFirstSearch', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    myBinarySearchTree = new BinarySearchTree(8);
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.breadthFirstSearch).to.equal('function');
  });

  it('should search a node and it\'s sibling before going to any of the children', function() {
    var insertValue = [3, 10, 1, 6, 14, 4, 7, 13];
    var results = [];

    function pushValue(value) {
      results.push(value);
    };

    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });

    myBinarySearchTree.breadthFirstSearch(pushValue);

    expect(results).to.deep.equal([8, 3, 10, 1, 6, 14, 4, 7, 13]);
  });
});

describe('BinarySearchTree.inOrder', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    var insertValue = [1, 3];
    myBinarySearchTree = new BinarySearchTree(2);
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.inOrder).to.equal('function');
  });

  it('should traverse left node, current node, and right node', function() {
    var results = [];
    function pushValue(value) {
      results.push(value);
    };

    myBinarySearchTree.inOrder(pushValue);
    expect(results).to.deep.equal([1,2,3]);
  });
});

describe('BinarySearchTree.preOrder', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    var insertValue = [1, 3];
    myBinarySearchTree = new BinarySearchTree(2);
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.preOrder).to.equal('function');
  });

  it('should traverse current node, left node, and right node', function() {
    var results = [];
    function pushValue(value) {
      results.push(value);
    };

    myBinarySearchTree.preOrder(pushValue);
    expect(results).to.deep.equal([2,1,3]);
  });
});

describe('BinarySearchTree.postOrder', function() {
  var myBinarySearchTree;

  beforeEach(function() {
    var insertValue = [1, 3];
    myBinarySearchTree = new BinarySearchTree(2);
    insertValue.forEach(function(value) {
      myBinarySearchTree.insert(value);
    });
  });

  it('should be a function', function() {
    expect(typeof myBinarySearchTree.postOrder).to.equal('function');
  });

  it('should traverse current node, left node, and right node', function() {
    var results = [];
    function pushValue(value) {
      results.push(value);
    };

    myBinarySearchTree.postOrder(pushValue);
    expect(results).to.deep.equal([1, 3, 2]);
  });
});