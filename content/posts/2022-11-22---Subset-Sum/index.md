---
title: Subset Sum is NP-Complete
date: "2022-11-22T01:40:43.169Z"
template: "post"
draft: false
slug: "/posts/subset-sum"
category: "Complexity Theory"
tags:
  - "Complexity Theory"
  - "Reductions"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
$$
\text{SUBSET-SUM} = \{\langle S, t \rangle | S = \{x_1, \dots, x_k\}\ \text{and for some}\ \{y_1, \dots, y_l\} \subseteq \{x_1, \dots, x_k\},\sum y_i = t \}
$$

We will try to prove that the **Subset Sum Problem** is **NP-Complete.** To do this, we'll assume that the $3-\text{SAT}$ problem is **NP-Complete**, and we'll show that we can reduce the $3-\text{SAT}$ problem to the Subset Sum problem in polynomial time.

Hence, given a boolean formula in $3-\text{CNF}$ $\phi$, we will try to construct an instance of the Subset Sum Problem in polynomial time such that the subset problem will be satisfiable if and only if $\phi$ is satisfiable.

The boolean variables in the formula $\phi$ will be $x_1, x_2, \dots, x_l$ and the clauses will be $c_1, c_2, \dots, c_k$.

An example of a 3-CNF we'll use for demonstrative purposes is

$$
(x_1 \lor \bar x_2 \lor x_3) \land (x_2 \lor x_3 \lor \dots) \land \dots \land (\bar x_3 \lor \dots \lor \dots)
$$
We'll construct a set of numbers, with each variable and clause corresponding to 2 numbers each.
![Subset Sum](/media/subsetsum.png)

Every boolean variable $x_i$  will correspond to 2 numbers $y_i$ and $z_i$, while every clause corresponds to 2 numbers $g_i$ and $h_i$.

Every number we construct will be in the decimal base system even though we're only using 0s and 1s, and they will all be of $l + k$ digits, where $l$ is the number of boolean variables and $k$ is the number of clauses.

We'll talk about each number with respect to indexing from the MSB and not the LSB, as it will make it easier to understand.
### Numbers corresponding to boolean variables i.e. $y_i, z_i$
Initially set all the digits to $0$, and set digits according to this method.

#### First $l$ digits
For $y_i$ and $z_i$, set the $i^\text{th}$ digit to $1$, and keep the rest of the $l - 1$ digits in the first $l$ digits set to $0$.

#### Last $k$ digits

If $x_i$ appears in clause $c_j$, then the $l + j$ digit will be set to $1$ for $y_i$. In the table, $y_3$'s $l + 1$ digit is set to $1$ as $x_3$ appears in the first clause.

Similarly, if a variable $\bar x_i$ appears in clause $c_j$, then the $l + j$ digit will be set to $1$ for $z_i$. As $\bar x_2$ appears in the first clause, the $l + 1$  digit is set to $1$ for $z_2$.

### Numbers corresponding to clauses i.e $g_i, h_i$

For each clause $c_i$, we have 2 corresponding numbers in the set - $g_i$ and $h_i$. These two numbers are identical, and only have the $l + i$ digit set to $1$, and the rest to $0$.

The target sum $t$ is given as $1111\dots1333\dots3$, where we have the first $l$  digits as $1$, and the last $k$   digits as $3$. We claim that we can pick a subset of the set of numbers we constructed if and only if the $3-\text{CNF}$ is satisfiable.

### Proof this instance of subset sum is equivalent to $3-\text{SAT}$

#### Fixing values for variables

The first property we ensure is that we pick either $x_i$ or $\bar x_i$ for a given $i$. We can't pick both, or pick none, we must pick exactly one of them.

This property is ensured by the fact that the first $l$ digits are $1$s. We know that only $y_i$ and $z_i$ can have a digit in the first $l$ digits be set. For a given position $a$ in the first $l$ positions, we know that there are only two numbers that have the $a^{th}$ digit set, $y_a$  and $z_a$.

Hence, we have the option of choosing exactly one of them in the subset, as choosing both would set the sum of digits at the position to be $2$, and choosing none would sum up to $0$  for that position, both cases which don't satisfy the target sum.

#### Ensuring all clauses are true

For $\phi$  to be satisfiable, it must make sure that every clause has at least one term that is true. This is ensured by the last $k$ digits of every number.

First, we'll consider only the numbers $y_i$  and $z_i$. We need to pick the numbers in such a way that each clause has at least one true variable. In terms of the subset problem, we can restate the problem as ensuring that digits $l + 1$ to $l + k$ in the sum are all $\geq 1$, as this implies that we've picked at least one true variable for each clause.

The max value a digit can have amongst the last $k$ digits is $3$ (when all three variables are true in a clause). To ensure that you can reach exactly $3$, we have $g_i$ and $h_i$.
- If $b^\text{th}\ \text{digit}\ = 3$, no need to pick extra variables.
- If $b^\text{th}\ \text{digit}\ = 2$, pick $g_b$ or $h_b$.
- If $b^\text{th}\ \text{digit}\ = 1$, pick both $g_b$ and $h_b$.
- If $b^\text{th}\ \text{digit}\ = 0$, it's unsatisfiable.

Hence, we can say that $g_i$, $h_i$ were added to the set to provide some sort of padding for testing if each clause is true for a given subset of numbers chosen.


If there exists a subset of numbers that satisfy the subset problem constructed, we get a satisfying assignment to variables for the $3-\text{SAT}$ problem. For all $i$ where $y_i$ was chosen, we assign $x_i = 1$, and for the rest we assign $x_i = 0$.

Hence, we've proven that the $3-\text{SAT}$ problem can be reduced to the Subset Sum Problem, proving that Subset Sum Problem is $\text{NP-complete}$
