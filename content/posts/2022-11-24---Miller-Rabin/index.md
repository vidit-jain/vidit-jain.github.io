---
title: Miller-Rabin Primality Test
date: "2022-11-24T01:40:43.169Z"
template: "post"
draft: false
slug: "/posts/miller-rabin"
category: "Algorithm Analysis"
tags:
  - "Primality Testing"
  - "Randomization"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---

Miller-Rabin is a co-RP algorithm to test if a given number $p$ is in $\text{PRIMES}$ or not.

### What is co-RP?
A problem is said to be in co-RP if there exists an algorithm such that
- In runs in polynomial time with respect to input size
- If the correct answer is Yes, it outputs Yes with probability $1$
- If the correct answer is No, then it returns No with probability $\geq 1/2$.

Hence $\text{PRIMES}$ is in co-RP as Miller-Rabin will output that a number $p$ is prime with probability $1$ if the number is prime, and if composite, will output that $p$ is composite with probability $\geq 1/2$.

### Algorithm
**Input:** An integer $p$.

1. If $p = 2$, then accept (claim number is prime). Else, if $p$ is even, then reject (claim the number of composite).
2. Pick $k$ numbers, $a_1, a_2,\dots, a_k$ from $\mathbb{Z}^+_p$ (Numbers $0,1,\dots, p - 2, p - 1$).
3. For each $i$ from $1\ \text{to}\ k$
    1. Compute $a_i^{p - 1} \bmod p$ and reject if different from 1. This is in accordance with Fermat's Little Theorem, which states that $a^{p - 1} \equiv 1\ \text{mod}\ p$ if $p$ is prime.
    2. Since we are only dealing with odd values of $p$ (we reach a verdict for all even numbers in step 1) we can say that $p - 1$ is even. Hence, we can factorize $p - 1 = 2^k\cdot s$, where $s$ is some odd number.
    3. We then compute the sequence $a_i^{s\cdot 2^0}, a_i^{s\cdot 2^1},\dots,a_i^{s\cdot2^k} \bmod p$.
    4. We read from right to left, and try to find an element in this sequence that is not $1$. If the first number we come across a number which is not $1$, and that number isn't $-1 \bmod p$, then we reject $p$.
4. If we haven't rejected the number $p$ till now, it implies that it's passed all the tests, hence we accept the number $p$.

### Proof: A prime number is always accepted with probability $1$
If the prime number is even and 2, then we automatically accept it in the first step itself.

Else the prime number is odd.

In step $3.1$, primes will always pass this test as $a^{p - 1} \equiv 1 \mod p$ according to Fermat's Little Theorem.

In step $3.4$, we need to prove that the first number we come across from right to left that's not $1$ has to be $-1$ if the given number is prime.

**Proof By Contradiction:**

We can notice that the sequence that we calculate is just $a_i^{s \cdot 2^0}$ squared repeatedly. Hence an element in the sequence is just the square of the previous term (except for the first term).

Take the first term that is not $1$ as $b$. We'll formally state that $b \not\equiv 1 \mod p$  trivially, and make the assumption $b \not\equiv -1 \mod p$ to arrive at a contradiction later.

Since $b$ is the first term from the right that is not $1$, we know the term to its right is $1$.

Hence $b^2 \equiv 1 \mod p  \implies b^2 - 1 \equiv 0 \mod p$. Any number that is equivalent to $0 \bmod p$ implies that the number is divisible by $p.$

We can factorize $b^2 - 1$ as

$$
b^2 - 1 = (b - 1)(b + 1) \equiv 0 \mod  p
$$

Since $(b - 1)(b + 1) \equiv 0 \mod p$, this implies that at least one of the two, $(b - 1)\ \text{or}\ (b + 1)$  are divisible by $p$, as $p$ is prime.

If $(b - 1)$ is divisible by $p$, it implies that $(b - 1) \equiv 0 \mod p$. Hence, $b \equiv 1 \mod p$. However, this goes against our earlier assumption that $b \not\equiv 1 \mod p$.

If $(b + 1)$  is divisible by $p$, it implies that $(b + 1) \equiv 0 \mod p$. Hence, $b \equiv -1 \mod p$. However, this goes against our other assumption that $b \not\equiv -1 \mod p$

Hence, we arrive at a contradiction. Hence, if $b \not\equiv 1 \mod p$, then $b \equiv -1 \mod p$ when $p$  is an odd prime number.

### Proof: An Odd Composite Number will be rejected with Probability $\geq \frac{1}{2}$
We define *witnesses* to be numbers that fail the tests at steps $3.1$ or $3.4$\

There are two trivial non-witnesses, $1$ and $-1$. There are two types of non-witnesses as well, those which generate a sequence of only $1$s, and those which have some numbers which aren't $1$. $-1$ falls into the second kind.

We will find the non-witness of the second kind that generates a sequence with the $-1$ coming at the rightmost position possible. We consider that number as $h$, and the position of the $-1$ at position $j$, assuming $0$-based indexing.

Therefore $h^{s\cdot2^j} \equiv -1 \mod p$.

Since $p$ is composite, it must either be a power of a prime, or it can be represented as a product of two numbers that are relatively prime, $q,r$. We'll just go over the latter case.

Using the Chinese Remainder Theorem, we know there exists a number $t$ such that

$$
\begin{split}
t \equiv h \mod q\\
t \equiv 1 \mod r
\end{split}
$$

From this we can state that

$$
\begin{split}
t^{s\cdot 2^j} \equiv -1 \mod q\\
t^{s \cdot 2^j} \equiv 1 \mod r
\end{split}
$$

We know that $h^{s \cdot 2^j}$  can be represented in the form $a(qr) - 1$. Therefore, we can also represent it as $ar(q) - 1$, implying $h^{s\cdot 2^j} \equiv -1 \mod q$. Since $t \equiv h \mod q$, we can clearly conclude that $t^{s \cdot 2^j} \equiv -1 \mod q$.

The second equivalence is trivial as $t \equiv 1 \mod r$, hence raising it to any power will give $1$.

Now, we'll make the claim that $t$ is a witness.

If $t^{s\cdot 2^j} \equiv 1 \mod p$, Then we can write $t^{s\cdot 2^j} = kp + 1 = (kr)q + 1$. This implies $t^{s \cdot 2^j} \equiv 1 \mod q$, which is incorrect. Hence $t^{s \cdot 2^j} \not\equiv 1 \mod p$

If $t^{s \cdot 2^j} \equiv -1 \mod p$, Then we can write $t^{s\cdot 2^j} = kp - 1 = (kq)r - 1$. This implies that $t^{s\cdot 2^j} \equiv -1 \mod r$, which is incorrect.

Hence $t^{s\cdot 2^j} \not\equiv \pm 1 \mod p$.

However, since  $t^{s \cdot 2^{j + 1}} \equiv 1 \mod q$, and $t^{s \cdot 2^{j + 1}} \equiv 1 \mod r$, this implies that $t^{s \cdot 2^{j + 1}} - 1$  is divisible by both $q$ and $r$. Since $q$ and $r$ are relatively prime, we know that $t^{s \cdot 2^{j + 1}} \equiv 1 \mod p$

Since $t^{s \cdot 2^j} \not\equiv \pm 1 \mod p$ and $t^{s \cdot 2^{j +1}} \equiv 1 \mod p$, this implies that $t$ is a witness.

### Mapping each non-witness to a unique witness

We can prove that $dt \bmod p$ is a unique witness for each unique non-witness $d$.\
Since $d$ is a non-witness, it implies that $d^{s \cdot 2^j} \equiv \pm 1 \mod p$. However, $t^{s \cdot 2^j} \not \equiv \pm 1 \mod p$ as $t$ is a witness.\
Hence, $(dt)^{s \cdot 2^j} \equiv d^{s \cdot 2^j} \cdot t^{s \cdot 2^j} \equiv \pm 1 \cdot t^{s \cdot 2^j} \not \equiv \pm 1 \mod p$. Hence $dt$ is a witness as well.

Proving uniqueness of witnesses. i.e $d_1t \equiv d_2t \mod p \implies d_1 \equiv d_2 \mod p$

If $d_1t \equiv d_2t \mod p$, then

$$

\begin{split}
d_1 t \cdot t^{s 2^{j + 1} - 1} &\equiv d_2 t \cdot t ^{s \cdot 2^{j + 1} - 1}  \mod p \\
d_1t^{s \cdot 2^{j + 1}} & \equiv d_2t^{s \cdot 2^{j + 1}}  \mod p\\
d_1 \cdot 1 &\equiv d_2 \cdot 1 \mod p
\end{split}

$$

Hence we've proven that the witnesses are unique. Hence, we've proven that $|\text{Witnesses}| \ge | \text{Non-witnesses}|$. Hence, the probability of an odd composite number being rejected is $\geq 1/2$.

Hence, upon running the Miller-Rabin primality test with $k$ numbers, we get an accuracy of $(2^k - 1)/2^k$.
