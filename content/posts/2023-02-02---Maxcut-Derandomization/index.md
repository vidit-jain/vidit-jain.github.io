---
title: Maxcut and Derandomization
date: "2023-02-02T01:40:41.169Z"
template: "post"
draft: false
slug: "/posts/maxcut-derandomization"
category: "Algorithm Analysis"
tags:
  - "Randomization"
  - "SAT"
  - "Advanced Algorithms"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
**Cut -** A partition of vertices into $2$ disjoint sets and value of the cut is the weight of all edges crossing the cut.

$\text{MAXCUT}$: Given a graph $G = (V, E)$, such that all the weight of edges in $E$ is $1$, find the maximum value of a cut attainable in $G$.

## Randomized Algorithm to Approximate
This problem is NP-hard, but we can try approximating using randomness. We take each vertex in $V$, and with probability $\frac{1}{2}$ put it in $A$, else put it in $B$ .

**Theorem -** Let $G = (V, E)$ be an undirected graph on $n$ vertices and $m$ edges. There exists a partition of $V$ into disjoint sets $A$ and $B$ such that the cut value is at least $\frac{m}{2}$.\
**Proof -** We make use of the approach mentioned above, and name the edges $e_{1}, e_{2}, \dots, e_{m}$\
We define $X_{i}$ for each edge in the set

$$
X_{i} = \begin{cases}
1  & \text{if edge } i \text{ connects } A \text{ to } B \\
0  & \text{otherwise}
\end{cases}
$$
$$
\mathbb{P}[X_{i}= 1] = \mathbb{P}[\text{Endpoints are in different sets}] = \frac{1}{2}
$$
Hence,
$$
\mathbb{E}[X_{i}] = \frac{1}{2}
$$
$$
\mathbb{E}[|Cut(A, B)|] = \mathbb{E}\left[\sum\limits_{i=1}^{m}X_{i}\right] = \sum\limits_{i=1}^{m}\mathbb{E}[X_{i}] = \frac{m}{2}
$$
Since the expected value is $\frac{m}{2}$, there exists a partition $A, B$ such that at least $\frac{m}{2}$ edges connect $A$ to $B$ (proven using *reverse markov*).

### Expected number of trials to find cut value $\geq \frac{m}{2}$
Take $p$ to be the probability that a random cut has $\geq \frac{m}{2}$ edges.

$$
\begin{aligned}
\frac{m}{2} &= \mathbb{E}[|Cut(A, B)|]\\
&= \sum\limits_{i\leq \frac{m}{2} - 1} i \cdot \mathbb{P}[|Cut(A, B)| = i] + \sum\limits_{i \geq \frac{m}{2}} i \cdot \mathbb{P}[|Cut(A, B)| = i]\\
& \leq \left(\frac{m}{2} - 1\right)\cdot (1 - p) + m \cdot p\\
&= \frac{m}{2}- 1 - \frac{mp}{2} + p + mp\\
\implies & p \geq  \frac{1}{\frac{m}{2}+ 1}
\end{aligned}
$$

Therefore, the expected number of trials is $\frac{1}{p} \leq \frac{m}{2} +1$.

## Derandomization using Conditional Expectation
Instead of placing vertices in $A$ or $B$ uniformly and independently like the earlier method, we now place vertices in a deterministic way, one at a time in an arbitrary order $v_{1}, v_{2}, \dots, v_{n}$.

Define $x_{i}$ to be the set where $v_{i}$ is placed, $x_{i} \in \{A, B\}$.

Suppose the first $k$ vertices are already placed. We then define the expected value of the cut as randomizing over the $n - k$ vertices left, while fixing the first $k$.
$$
\mathbb{E}[|Cut(A, B)| | x_{1}, x_{2}, \dots, x_{k}]
$$
**Algorithm -**\
Given $k$ vertices have been placed, we look on which value of $x_{k+1}$ gives a higher expected value, and place the $k + 1$ vertex in that set. i.e, find the value of $x_{k+1}$ such that -
$$
\mathbb{E}[|Cut(A,B)| | x_{1}, \dots, x_{k}] \leq \mathbb{E}[|Cut(A, B)|| x_{1}, \dots, x_{k}, x_{k+1}]
$$
We claim this algorithm will give us a cut of size $\geq \frac{m}{2}$ by proving using induction.
### Inductive Proof
#### Base Case
$$
\mathbb{E}[|Cut(A, B)|] = \mathbb{E}[|Cut(A, B)|| x_{1}]
$$
Doesn't matter which set you put $v_{1}$ in, as the case is symmetric.

#### Induction Step
We need to show that
$$
\mathbb{E}[|Cut(A,B)| | x_{1}, \dots, x_{k}] \leq \mathbb{E}[|Cut(A, B)|| x_{1}, \dots, x_{k}, x_{k+1}]
$$
If we placed $v_{k+1}$ randomly in one of the sets $A, B$, then we'd get
$$
\begin{aligned}

\mathbb{E}[|Cut(A, B) || x_{1}, \dots, x_{k}, x_{k+1}] &= \frac{1}{2} \mathbb{E}[|Cut(A, B)||x_{1}, \dots, x_{k}, Y_{k+1} = A]\\
 &+ \frac{1}{2} \mathbb{E}[|Cut(A, B)||x_{1}, \dots, x_{k}, Y_{k+1} = B]\\
 &\leq \max\{I, II\}

\end{aligned}
$$
where
$$
I = \mathbb{E}[|Cut(A, B)||x_{1}, \dots, x_{k}, Y_{k+1} = A]
$$
and
$$
II = \mathbb{E}[|Cut(A, B)||x_{1}, \dots, x_{k}, Y_{k+1} = B]
$$

If we compute $I, II$, we can just take the max of them, and increase our expected value accordingly.

Since we start with an expected value $\frac{m}{2}$, and only increase as we place more and more vertices, we'll end up with a deterministic cut size $\geq \frac{m}{2}$.

