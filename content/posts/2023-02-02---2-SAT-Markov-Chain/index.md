---
title: Solving 2-SAT with Markov Chains
date: "2023-02-02T01:40:43.169Z"
template: "post"
draft: false
slug: "/posts/2-sat-markov-chains"
category: "Algorithm Analysis"
tags:
  - "Markov Chains"
  - "SAT"
  - "Advanced Algorithms"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
socialImage: ""
---
2-SAT is a CNF over $n$ variables

$$
F = C_{1}\land C_{2}\land \dots \land C_{m}, C_{i} = L_{i_{1}} \lor L_{i_{2}} \forall i \in [m]
$$
We want to assign truth values to each of the variables to satisfy $F$ (such an assignment may or may not exist).

## Algorithm for 2-SAT
1. Start with an arbitrary truth assignment
2. Repeat until all clauses are satisfied or at most $2mn^{2}$ many iterations
	1. Choose an arbitrary clause that is not satisfied
	2. Choose a literal at random and flip the value of the variable corresponding to the literal.
3. If a valid truth assignment was found return that assignment, else return $\text{UNSAT}$.

### Correctness & Guarantees of Algorithm
Let's take $S$ to be a satisfying assignment for the $n$ variables.\
$A_{i}$ : Assignment to the variables after step $i$.\
$X_{i}$ : Number of variables having the same values in $A_{i}$ and $S$
$$
X_{i} = |\{j | A_{i}(x_{j}) = S(x_{j})\}|
$$
If $X_{i'} = n$, then $A_{i'} = S$ and that is a satisfying assignment.

### Expected Time to Reach $S$
We know that
$$
\mathbb{P}[X_{i+1}=1|X_{i} = 0 ] = 1
$$
Suppose $1 \leq X_{i} \leq n - 1$

And let $C$ be a clause that is not satisfied by $A_{i}$. If this is the case, then we know at least one of the two variable assignments in $C$ is inconsistent with $S$.\
If both variable assignments were consistent with $S$, then the clause should've been satisfied, else $S$ wouldn't be a satisfying assignment.

If we randomly pick any one of the two variables and flip them, the probability that $X_{i+1}$ increases is $ \geq \frac{1}{2}$.

$$
\begin{aligned}
\mathbb{P}[X_{i+1} = j + 1 | X_{i} = j] \geq \frac{1}{2}\\
\mathbb{P}[X_{i+1} = j - 1 | X_{i} = j] \leq \frac{1}{2}
\end{aligned}
$$
### Equivalence with Markov Chain
While the graph induced by $X_{0}, X_{1}, \dots, X_{n}$ may not be a Markov chain, we can study a very similar Markov process and analyze the expected running time of this algorithm.

We look at $Y_{0}, Y_{1}, \dots, Y_{n}$.
$$
\begin{aligned}
\mathbb{P}[Y_{i+1} = 1 | Y_{i} = 0] &= 1\\
\mathbb{P}[Y_{i+1}=j+1 |Y_{i}=j] &= \frac{1}{2}\\
\mathbb{P}[Y_{i+1}=j-1 |Y_{i}=j] &= \frac{1}{2}
\end{aligned}
$$

The transition probability matrix would be given as

$$
P_{ij}= \begin{cases}
\frac{1}{2} & \text{if } j=i+1 \text{ or } i - 1\ \forall 1 \leq i \leq n - 1\\
1  & \text{if } i = 0 \text { and } j = i\\
1  & \text{if } i = j = n \\
0  & \text{otherwise}
\end{cases}
$$
### Deriving a formula for expected number of steps
We have a random variable $Z_{j}$ that represents the number of steps to reach $n$ from $j$. Let $h_{j}= \mathbb{E}[Z_{j}]$.

We know that $h_{n}= 0$ and $h_{0} = h_{1} + 1$.

Further $h_{j} \geq$  expected number of steps to fully agree with $S$ starting from $A_{0}$ which agrees with $S$ in $j$ locations, as the probability of $X_{i}$ increasing is $\geq \frac{1}{2}$.

$$
Z_{j} = \begin{cases}
1 + Z_{j-1}  & \text{with probability } \frac{1}{2}\\
1 + Z_{j+1}  & \text{with probability } \frac{1}{2}
\end{cases}
$$
Hence,
$$
\begin{aligned}
\mathbb{E}[Z_{j}] &= \frac{1}{2}(1 + \mathbb{E}[Z_{j-1}]) + \frac{1}{2}(1 + \mathbb{E}[Z_{j+1}])\\
2h_{j} &= h_{j+1} + h_{j-1} + 2\\
h_{j+1} - h_{j} &= (h_{j} - h_{j-1}) - 2\\
\sum\limits_{j=1}^{k}(h_{j+1} - h_{j}) &= \sum\limits_{j=1}^{k}\left((h_{j}- h_{j-1}) - 2\right)
\end{aligned}
$$
This gives us
$$
\begin{aligned}
h_{k+1}- h_{1}&= h_{k}- h_{0}- 2k\\
h_{k+1} &= h_{k} + (h_{1}- h_{0}) - 2k\\
h_{k+1} &= h_{k} - 2k - 1
\end{aligned}
$$
This can be rearranged to give us
$$
h_{k}- h_{k+1} = 2k + 1
$$
### Expected Steps from $h_{0}$
Using this, we can derive the expected value for all indices,
$$
\begin{aligned}
h_{n} &= 0\\
h_{n - 1} &= 2(n - 1) + 1 + h_{n}=2(n-1)+1\\
\dots
\end{aligned}
$$
$$
\begin{aligned}
\sum\limits_{k=0}^{n-1}(h_{k}- h_{k+1}) &= \sum\limits_{k=0}^{n-1}(2k + 1)\\
h_{0}- h_{n}&= \frac{2n(n-1)}{2} + n=n^{2}\\
h_{0}&= n^{2}
\end{aligned}
$$
Therefore, we know that the expected number of steps to find a satisfying assignment is $\leq n^{2}$.
### Success Probability
By Markov's Inequality

$$
\mathbb{P}[Z_{0} > 2n^{2}] \leq \frac{\mathbb{E}[Z_{0}]}{2n^{2}} = \frac{h_{0}}{2n^{2}} = \frac{n^{2}}{2n^{2}} = \frac{1}{2}
$$
Now, we can boost the success probability by running this algorithm multiple times. We run this for $2mn^{2}$ steps, and analyze as if we run the experiment $m$ times.

When we split this into $m$ blocks each, the probability of failure in each block is at most $\frac{1}{2}$, with the condition that no satisfying assignment was found in the previous block.

For Markov Chains, the history does not matter, so if we aren't able to find a satisfying assignment after $(2n^{2})\cdot i$ steps, it's as if we just started a new trial with an "arbitrary assignment".

Hence, the probability of success in finding a satisfying assignment after $2mn^{2}$ steps is
$$
1 - \frac{1}{2^{m}}
$$
If we take $m=n$, the runtime ends up to be $2n^{3} = \mathcal{O}(n^{3})$, with success probability $1 - \frac{1}{2^{n}}$.
