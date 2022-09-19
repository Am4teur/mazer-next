interface TreeNode {
  parent: TreeNode | null;
  rootV: TreeNode | null;
}

class TreeNode {
  constructor() {
    this.parent = null;
    this.rootV = null;
  }

  getRoot = (): TreeNode => {
    //this recursion could be improved with "memory" of the root
    return this.parent == null ? this : this.parent.getRoot();
  };

  isConnected = (tree: TreeNode): boolean => {
    return this.getRoot() === tree.getRoot();
  };

  connect = (tree: TreeNode): void => {
    tree.getRoot().parent = this.getRoot();
  };
}

interface Edge {
  x1: number;
  y1: number;
  dir: string;
  x2: number;
  y2: number;
}

class Edge {
  constructor(x1: number, y1: number, dir: string, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.dir = dir;
    this.x2 = x2;
    this.y2 = y2;
  }
}

export interface Node {
  N: boolean;
  E: boolean;
  S: boolean;
  W: boolean;
}

/*_____________________ Functions _______________________*/
const shuffle = (array: Edge[], seed: number): Edge[] => {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
};

const random = (seed: number): number => {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

/********************************************
 * @name getMaze
 * @namespace initGroup
 *
 ********************************************/
export const generateMaze = (
  mazeSeed: number,
  rows: number,
  cols: number
): Node[][] => {
  /* using the x,y major order (or Column major order) != from memory and C (Row major order) */
  let positions: Node[][] = initPositions(rows, cols);

  let set: TreeNode[][] = initSet(rows, cols);

  let edges: Edge[] = initEdges(positions, mazeSeed);

  let board: Node[][] = kruskalAlgorithm(positions, set, edges);

  return board;
};

/********************************************
 * @name initPositions
 * @namespace initGroup
 *
 ********************************************/
const initPositions = (rows: number, cols: number): Node[][] => {
  const positions: Node[][] = [];

  for (let i = 0; i < rows; ++i) {
    positions.push([]);
    for (let j = 0; j < cols; ++j) {
      const newNode = {
        N: false,
        E: false,
        S: false,
        W: false,
      };
      positions[i].push(newNode);
    }
  }
  return positions;
};

/********************************************
 * @name initSet
 * @namespace initGroup
 *
 ********************************************/
const initSet = (rows: number, cols: number): TreeNode[][] => {
  let set: TreeNode[][] = [];
  for (var i = 0; i < rows; ++i) {
    set.push([]);
    for (var j = 0; j < cols; ++j) {
      set[i].push(new TreeNode());
    }
  }
  return set;
};

/********************************************
 * @name initEdges
 * @namespace initGroup
 *
 ********************************************/
const initEdges = (positions: Node[][], mazeSeed: number): Edge[] => {
  let edges: Edge[] = [];
  for (var i = 0; i < positions.length; ++i) {
    for (let j = 0; j < positions[i].length; ++j) {
      if (j > 0) {
        edges.push(new Edge(i, j, "N", i, j - 1));
      }
      if (i > 0) {
        edges.push(new Edge(i, j, "W", i - 1, j));
      }
    }
  }

  // shuffle with seed
  edges = shuffle(edges, mazeSeed);
  return edges;
};

/********************************************
 * @name kruskalAlgorithm
 *
 ********************************************/
const kruskalAlgorithm = (
  positions: Node[][],
  set: TreeNode[][],
  edges: Edge[]
): Node[][] => {
  let x1, y1, x2, y2, set1, set2;
  let opp: { [side: string]: string } = { N: "S", E: "W", S: "N", W: "E" };
  type NodeKey = keyof Node;

  for (let i = 0; i < edges.length; ++i) {
    x1 = edges[i].x1;
    y1 = edges[i].y1;
    x2 = edges[i].x2;
    y2 = edges[i].y2;

    set1 = set[x1][y1];
    set2 = set[x2][y2];
    if (!set1.isConnected(set2)) {
      set1.connect(set2);
      positions[y1][x1][edges[i].dir as NodeKey] = true;
      positions[y2][x2][opp[edges[i].dir] as NodeKey] = true;
    }
  }

  return positions;
};
