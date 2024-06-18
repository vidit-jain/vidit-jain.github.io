---
title: Boruvka's Algorithm
date: "2023-02-02T01:40:34.169Z"
template: "post"
draft: false
slug: "/posts/boruvkas-algorithm"
category: "Algorithm Analysis"
tags:
  - "Minimum Spanning Tree"
  - "Parallelization"
  - "Graphs"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
Boruvka's algorithm is used to find the minimum spanning tree of a graph.\
*(We assume that the edge weights are distinct)*\
The algorithm uses concepts similar to supernodes & superedges.
## Working
1. For every vertex, pick an edge that is the edge of least weight incident on it.
2. Contract all these edges to form super nodes.
3. Edge between supernodes $(u, v) =$  Edge of least weight between them.
4. While $\#\text{supernodes} > 1$ repeat.

When $\#\text{supernodes} = 1$, output all contracted edges. These edges form an MST.
## Correctness of Boruvka's Algorithm
### Taking least edge weight in super edge is optimal
**Claim -** Edge of least weight incident on a vertex $\in \text{MST}$. More generally, a least weight edge of a cut belongs belongs to MST.

**Proof By Exchange Argument -** Assume we don't take the least edge weight of a vertex $e$, and we instead take a heavier edge $e'$. This would still form a spanning tree, but we could drop $e'$ from the set of edges picked for the spanning tree, pick edge $e$ and still end up with a spanning tree, which would have a smaller cost.
### No triangle of edges can be contracted
**Claim -** There is no such case that in an iteration, the edges chosen form a triangle (assuming edges are distinct).\
**Proof -** Assume vertices $1, 2, 3$, where the edge weights are
$$
\begin{aligned}
(1, 2) &= a\\
(1, 3) &= b\\
(2, 3) &= c \\
\end{aligned}
$$
Without loss of generality, we can assume that vertex $1$ picks edge of weight $a$. That inherently implies that $a < b$. As we want to form a triangle, it would mean that vertex $2$ doesn't choose the same edge, and instead chooses $c$, hence $c < a$

Therefore
$$c < a < b$$
But if vertex 3 chooses $b$ to form the triangle, it would contradict the relation $c < b$, hence a triangle can't exist.

You can generalize this argument to prove that a cycle of edges won't be contracted.

Hence, we know that it's impossible for us to pick a set of edges which form a cycle, guaranteeing that the edges we contract form a spanning tree.
## Time Complexity Analysis
### Decrease in number of super nodes per iteration
**Claim -** $\#\text{supernodes}$ decreases by at least fraction of $\frac{1}{2}$ in each iteration.\
**Proof -** Contracting an edge decreases the number of super nodes by $1$. If we have $n$ vertices, there can be at max $(n - 1)$ unique edges picked. In the worst case, each edge is picked twice, giving us a minimum possible count of $\frac{n}{2}$ , hence reducing the number of super nodes by half in each iteration.

As a result, Boruvka's algorithm works in a time complexity of $O(E \log V)$

## Why Boruvka's over Prim's and Kruskal's?
One of the major differences between Boruvka's and other MST finding algorithms is that Boruvka's can be parallelized.
