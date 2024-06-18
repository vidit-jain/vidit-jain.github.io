---
title: Maximum Satisfiability
date: "2023-02-02T01:40:40.169Z"
template: "post"
draft: false
slug: "/posts/maximum-satisfiability"
category: "Algorithm Analysis"
tags:
  - "Randomization"
  - "SAT"
  - "Advanced Algorithms"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
Satisfiability problems essentially involve solving CNF formulas

$$
(x_{1} \lor x_{2} \lor x_{3}) \land (x_{1}\lor \bar x_{2} \lor x_{5}) \land \dots
$$
$\text{MAXSAT}$: Given a set of $m$ clauses over $n$-variables, determine the max number of clauses that can be satisfied.

## Randomized Algorithm to solve $\text{MAXSAT}$
We set each variable $x_{i}$ to $T$  or $F$ with equal probability

**Theorem -** Given any $m$ clauses, there is a truth assignment for the variables that satisfies at least $\frac{m}{2}$ clauses.\
**Proof -**\
We define $Z_{i}$, $1 \leq i \leq m$ which indicates if the clause has been satisfied or not.
$$
Z_{i} = \begin{cases}
1  & \text{if clause } i \text{ is satisfied}  \\
0  & \text{otherwise}
\end{cases}
$$
Given that we randomly assign each variable $x_{i}$ a value,
$$
\mathbb{P}[Z_{i}=1] = 1 - 2^{-k}
$$
Given there are $k$ literals in clause $i$ (there's only 1 assignment of the $k$ literals which would result in $Z_{i} = 0$).

Since we know $k \geq 1$, we know $\mathbb{P}[Z_{i} = 1] \geq \frac{1}{2}$.

Calculating expected number of satisfied clauses,
$$
\mathbb{E}\left[\sum\limits_{i=1}^{m}Z_{i}\right]= \sum\limits_{i=1}^{m}\mathbb{E}[Z_{i}] \geq \frac{m}{2}
$$
Now, we find the probability that the actual number of clauses is less than the expected value. Using a technique called *reverse markov*.
$$
\mathbb{P}[Z < \mathbb{E}[Z]] = \mathbb{P}[m - Z > m - \mathbb{E}[Z]] < \frac{\mathbb{E}[m -Z]}{m-\mathbb{E}[Z]} = 1
$$
Hence, there's a non-zero chance that the actual number of clauses satisfied is greater than the expected value, directly implying
$$
\mathbb{P}\left[Z \geq \frac{m}{2}\right]\neq 0
$$
Hence proved.

This type of proof is known as **Probabilistic Method**, where you show the existence of an object by showing it has a non-zero probability of occurring when chosen randomly.

## Performance Ratio
Given an instance $I$, let $m_{*}(I)$ be the maximum number of clauses that can be satisfied. Let $m_{A}(I)$ be the number of clauses satisfiable by algorithm $A$.

We define the performance ratio of $A$ to be defined as follows

$$
\text{PerfRatio(A)} = \text{inf}_{I} \frac{m_{A}(I)}{m_{*}(I)}
$$
If $\text{PerfRatio(A)} = \alpha$, then $A$ is an $\alpha-$approximation algorithm. The randomized algorithm discussed above is a $\frac{1}{2}$-approximation algorithm.

The approximation factor of our algorithm can be improved if we are allowed to assume that every clause has at least $2$ literals, giving us a $\frac{3}{4}$-approximation algorithm.

## LP Relaxations & Randomized Rounding
### Forming an Integer Program for $\text{MAXSAT}$
We define variable $z_{j}\ \forall j \in [m]$
$$
z_{j}= \begin{cases}
1 & \text{if clause } j \text{ is satisfied} \\
0 & \text{otherwise}
 \end{cases}
$$
define variable $y_{i}\ \forall i \in [n]$
$$
y_{i} = \begin{cases}
1  & \text{if } x_{i} \text{ is True} \\
0 & \text{otherwise}
\end{cases}
$$
and $C_{j}^{+}$ as the set of literals that appear unnegated in clause $j$, while $C_{j}^{-}$ is the set of literals that appear negated in clause $j$.

We want to maximize
$$
\sum\limits_{j=1}^{m}z_{j}
$$
Subject to constraints
1. $y_{i}$ and $z_{j} \in \{0, 1\}\ \forall i \in [n], \forall j \in [m]$.
2. $\sum\limits_{i\in C_{j}^{+}} y_{i} + \sum\limits_{i' \in C_{j}^{-}}(1 - y_{i'}) \geq z_{j}\ \forall j \in [m]$


### Relaxing Integer Constraints
Solving an Integer Programming problem can take exponential time, as opposed to LP, which can take polynomial time, hence we relax the integer constraints on $y_{i}, z_{j}$, updating the first constraint to
1. $y_{i}$ and $z_{j} \in [0, 1]\ \forall i \in [n], \forall j \in [m]$

The LP will then provide us the solutions $\hat y_{i}, \hat z_{j}$ such that $\sum\limits_{j=1}^{m} z_{j} \leq \sum\limits_{j=1}^{m} \hat z_{j}$ (the LP has essentially more solutions to work with, so it's best case will be greater than or equal to the integer constraints case).

### Randomized Rounding
Given $\hat y_{i}, \hat z_{j}$, we perform randomized rounding on them to obtain $y_{i}, z_{j}$

$$
y_{i} = \begin{cases}
1  & \text{w.p } \hat y_{i}\\
0  & \text{otherwise}
\end{cases}
$$
$$
z_{j} = \begin{cases}
1  & \text{w.p } \hat z_{j}\\
0  & \text{otherwise}
\end{cases}
$$

**Lemma -** Let clause $C_{j}$ have $k$ literals, The probability that $C_{j}$ is satisfied by randomized rounding is $\geq \beta_{k}\hat z_{j}$ where $\beta_{k} = 1 - (1 - \frac{1}{k})^{k}$\
**Proof -**\
Since we are working with one clause, we just assume nothing is negated for simplicity, i.e
$$
C_{j} = x_{1} \lor x_{2} \lor \dots \lor x_{k}
$$
From the linear program, we know that $\sum\limits_{i=1}^{k} \hat y_{i} \geq \hat z_{j}$\
For the clause to not be satisfied, all $\hat y_{i}$ should've been rounded down to $0$, and we need to compute the probability of that not occurring.

$$
\begin{aligned}
\mathbb{P}[C_{j} \text{ is satisfied}] &= 1 - \prod_{i=1}^{k} ( 1 - \hat y_{i})\\
& \geq 1 - \left[\frac{\sum\limits_{i=1}^{k}(1 - \hat y_{i})}{k}\right]^{k} & \text{(AM-GM Inequality)}\\
& \geq 1 - \left[\frac{k - \hat z_{j}}{k}\right]^{k} & \left(\sum\limits_{i=1}^{k}\hat y_{i} \geq z_{j}\right)\\
&= 1 - \left(1 - \frac{\hat z_{j}}{k}\right)^{k}\\
& \geq \left[1 - \left(1 - \frac{1}{k}\right)^{k}\right]\hat z_{j}\\
&= \beta_{k} \hat z_{j}
\end{aligned}
$$
The last step makes use of the claim that when $f(x) = 1 - (1 - \frac{x}{k})^{k}$ and $g(x) = \beta x$, then $f(x) \geq g(x)\ \forall x \in [0, 1]$.
