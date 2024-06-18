---
title: Polynomial Identity Testing
date: "2023-02-02T01:40:37.169Z"
template: "post"
draft: false
slug: "/posts/polynomial-identity-testing"
category: "Algorithm Analysis"
tags:
  - "Randomization"
  - "Advanced Algorithms"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
## DeMillo-Lipton-Schwartz–Zippel Lemma
Let $P$ be a non-zero polynomial on $n$ variables of degree $d$.\
Let $S$ be the set of size at least $d + 1$.\
We randomly sample $n$ values, $a_{1}, a_{2}, \dots, a_{i}$ from $S$ independently, uniformly and randomly. The theorem states that
$$
\mathbb{P}[P(a_{1}, a_{2}, \dots, a_{n}) = 0] \leq \frac{d}{|S|}
$$
### Proof
Proof using mathematical induction on $n$.\
**Base Case -** $n = 1$\
We know that a $d$-degree polynomial can have at most $d$ roots (Fundamental theorem of algebra). Hence, the bound holds true for $n = 1$ variable polynomials.\
**Induction state -** Assume it's true for $n \leq k - 1$, prove for $n = k$\
We have the variables $x_{1}, x_{2}, \dots, x_{n}$\
We can restructure the $n$ variable polynomial in terms of coefficients of $x_{1}$
$$
P(x_{1}, \dots, x_{n}) = \sum\limits_{i=0}^{d}x_{1}^{i}P_{i}(x_{2}, \dots, x_{n})
$$
From our initial assumption, it's known that $P$ is not identically $0$, therefore we find the *largest* $i$ such that $P_{i}$ is not identically $0$.\
Note that for any $i$, $\operatorname{deg} P_{i} \leq d - i$, as the degree of $x_{1}^{i}P_{i}$ is at most $d$

We aim to prove the bound defined by the lemma using this structure
$$
\begin{aligned}
\mathbb{P}[A] &= \mathbb{P}[A \cap B] + \mathbb{P}[A \cap B^{c}]\\
&= \mathbb{P}[A | B] \mathbb{P}[B] + \mathbb{P}[A | B^{c}]\mathbb{P}[B^{c}]\\
& \leq \mathbb{P}[B]+ \mathbb{P}[A | B^{c}]
\end{aligned}
$$
Here, we define events $A, B$ as\
$$
\begin{aligned}
A:\  P(r_{1}, r_{2}, \dots, r_{n}) = 0\\
B:\ P_{i}(r_{2}, r_{3}, \dots, r_{n}) = 0
\end{aligned}
$$
Where $r_{i}$ are independently, uniformly, and randomly (i.u.a.r) sampled from $S$.

#### $\mathbb{P}[B]$
We know that the degree of $P_{i}$ is $\leq d - i$. Therefore, by the induction hypothesis, for an $n - 1$ variable polynomial we get
$$
\mathbb{P}[P_{i}(r_{2}, r_{3}, \dots, r_{n}) = 0] \leq \frac{d-i}{|S|}
$$
#### $\mathbb{P}[A | B^{c}]$
If $P_{i}(r_{2}, r_{3}, \dots, r_{n}) \neq 0$, $B^{c}$ occurs, we now know that the degree of the polynomial $P$ is $i$, since all the $P_{j} \equiv 0, \forall j > i$.  We can plug in the values of $r_{2}, r_{3}, \dots, r_{n}$, and get an $i$-degree univariate polynomial in terms of $x_{i}$.

Therefore, with the help of the induction hypothesis, for a univariate polynomial we can say that
$$
\mathbb{P}[P(r_{1}, r_{2}, \dots, r_{n}) = 0 | P_{i}(r_{2}, r_{3}, \dots, r_{n}) \neq 0] \leq \frac{i}{|S|}
$$
#### $\mathbb{P}[A]$
Therefore, we get
$$
\begin{aligned}
\mathbb{P}[P(r_{1}, r_{2}, \dots, r_{n}) = 0] &\leq \mathbb{P}[B] + \mathbb{P}[A | B^{c}]\\
& \leq \frac{d-i}{|S|} + \frac{i}{|S|} = \frac{d}{|S|}
\end{aligned}
$$
Hence, proved.

Using this lemma, we can test if two multivariate polynomials $f, g$ are equal by identity testing polynomial $h = f - g$.
## Randomized Algorithm for Polynomial Identity Testing
1. Pick a set $S$ of size $\alpha d$, where $\alpha > 1$
2. Evaluate at a point $\bar a$ (a vector of size $n$) whose corrdinates are sample i.u.a.r from $S$.
3. If $f(\bar a) = 0$ assert $f \equiv 0$, else $f \not \equiv 0$ .
$$
\mathbb{P} [\text{Error}] \leq \frac{d}{|S|}= \frac{1}{\alpha}
$$
The possible error is that a non-zero polynomial is asserted as a zero-polynomial.

## Verifying Matrix Multiplication
An application of Polynomial Identity Testing is verifying matrix multiplication\
Given matrices $A, B, C$, we need to verify if $AB = C$.

This can be done in $O(n^{w})$ ($w$ is the matrix multiplication exponent), but we can speed this up using randomization.

Let $S$ be a finite subset of $\mathbb{R}$, and we choose $\bar x = (x_{1}, x_{2}, \dots, x_{n})$ i.u.a.r\
We then verify if $ABx = Cx$. If true, we say that $AB = C$, else return $AB \neq C$.\
Running this takes $O(n^{2})$ time, as finding $Bx$, $A(Bx)$ and $Cx$ are all $O(n^{2})$ time operations.
### Probability Analysis
$ABx, Cx$ are both vectors, whose entries are linear forms in $x$.

$$
\begin{aligned}
ABx &= (L_{1}(x), L_{2}(x), \dots, L_{n}(x))^T\\
Cx &= (L_{1}'(x), L_{2}'(x), \dots, L_{n}'(x))^T
\end{aligned}
$$
If $AB=C$, then we know that $\forall \bar x, AB\bar x = C \bar x$, which essentially means\
$\forall 1 \leq i \leq n, L_{i}(\bar x) - L_{i}'(\bar x)= 0$\
If $AB \neq C$, then there exists some vector $\bar x$ such that $L_{i}(\bar x) - L_{i}'(\bar x) \neq 0$

**Lemma -** For any linear polynomial $L(x)$
$$
\mathbb{P}[L(\bar a) = 0] \leq \frac{1}{|S|}
$$
**Proof -** We can arrive to this result using the principle of deferred decision.

We know that we can represent $L(x)$ as
$$
L(x) = \sum\limits_{i=1}^{n}b_{i}x_{i}
$$
Assume we randomly pick the first $n - 1$ values for $x$ as $a_{1}, a_{2}, \dots, a_{n-1}$, we'd get
$$
L(x) = b_{n}x_{n} + \sum\limits_{i=1}^{n -1}b_{i}a_{i}
$$
For $L(x) = 0$,
$$
b_{n}x_{n}= -\sum\limits_{i=1}^{n -1}b_{i}a_{i}
$$
There is at max $1$ possible value for $x_{n}$ in $S$ for which this equality holds true, hence the probability of this being true is $\leq \frac{1}{|S|}$.

**Claim -** If $AB \neq C$, then $\mathbb{P}[ABx = Cx] \leq \frac{1}{|S|}$\
**Proof -**
When $AB \neq C$, we say a *bad event* is when $L_{i}(\bar x) - L_{i}'(\bar x) =0\ \forall i \in [n]$, i.e we picked a vector such that $ABx = Cx$ event when $AB \neq C$, which causes us to incorrectly say that $AB = C$.

The probability of the bad event occurring is bounded by

$$
\mathbb{P}\left[\bigwedge_{i=1}^{n}(L_{i}(\bar x) - L_{i}'(\bar x) = 0)\right] \leq \max_{i}\left\{\mathbb{P}[L_{i}(\bar x) - L_{i}'(\bar x) = 0]\right\}
$$
And using the earlier Lemma, we can bound this further, giving us
$$
\mathbb{P}\left[\bigwedge_{i=1}^{n}(L_{i}(\bar x) - L_{i}'(\bar x) = 0)\right] \leq \max_{i}\left\{\mathbb{P}[L_{i}(\bar x) - L_{i}'(\bar x) = 0]\right\} \leq \frac{1}{|S|}
$$
Hence proved.
