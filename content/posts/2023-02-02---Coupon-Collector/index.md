---
title: Coupon Collector Problem
date: "2023-02-02T01:40:33.169Z"
template: "post"
draft: false
slug: "/posts/coupon-collector"
category: "Algorithm Analysis"
tags:
  - "Expected Value"
  - "Probability"
description: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
---
There are many cereal boxes, and in each cereal box with equal probability there is one of the $n$ coupons $C_{1}, C_{2}, C_{3}, \dots C_{n}$.

How many boxes do we have to buy to collect all $n$ coupons?

$X_{i}$ - Random variable that is defined to be equal to the number of purchases needed to get $i^{\text{th}}$ coupon.\
Our answer is $E\left[\sum\limits_{i=1}^{n}X_{i}\right]= \sum\limits_{i=1}^{n} E[X_{i}]$

$X_{1} = 1$ as the first box will always result in a new coupon for us
## Finding $X_{i}$
We know the probability of success when you're opening a box for getting the second new coupon is
$$
Pr[\text{success}] = \frac{n - 1}{n}
$$

Therefore the expected number of trials for getting the second coupon is
$$
E[X_{2}] = \frac{n}{n - 1}
$$
Hence, for general $X_{i}$,
$$
E[X_{i}] = \frac{n}{n - (i - 1)}
$$
Hence using linearity of expectation
$$
\sum\limits_{i=1}^{n} E[X_{i}] = \frac{n}{n} + \frac{n}{n - 1} + \frac{n}{n - 2} + \dots + \frac{n}{1} \approx n \ln n
$$
## Probability of deviation from expected value
If we use Markov's inequality for this problem to find the probability that it takes $\geq 2 \cdot E[X]$ coupons, we'd get the bound
$$
P[X \geq 2 E[X]] \leq \frac{E[X]}{2 E[X]} = \frac{1}{2}
$$
However, that may not be a very good bound. We can instead use Chebyshev's Inequality, which says -

$$
P(|x - \mu | \geq a) \leq \frac{Var(X)}{a^{2}}
$$

## Finding tighter bound for Coupon Collector problem
Variance of geometric distribution $= \frac{1 - p}{p^{2}}$\
For independent random variables $X_{1}, X_{2}, \dots, X_{n}$, we can sum the variances
$$
\begin{aligned}
Var[X] &= \sum\limits_{i=1}^{n}Var[X_{i}]\\
&= \sum\limits_{i=1}^{n}\frac{(1 - p_i)}{p_{i}^{2}}\\
&= \sum\limits_{i=1}^{n}\frac{\left(1 - \left(\frac{n - i + 1}{n}\right)\right)}{\left(\frac{n -i + 1}{n}\right)^{2}}\\
&= \sum\limits_{i=1}^{n} \frac{\left(\frac{i - 1}{n}\right)}{\frac{(n - i + 1)^{2}}{n^{2}}}\\
&= \sum\limits_{i=1}^{n}\frac{n(i - 1)}{(n - i + 1)^{2}}\\
&= \sum\limits_{j=1}^{n}\frac{n(n - j)}{j^{2}} & (j &= n - i + 1)\\
&= \left(n^{2}\sum\limits_{j=1}^{n}\frac{1}{j^{2}}\right)- \left(n \sum\limits_{j=1}^{n}\frac{1}{j}\right)\\
& \leq \frac{n^{2}\pi^{2}}{6} - n \cdot H_{n}\\
&\leq \frac{n^{2}\pi^{2}}{6}
\end{aligned}
$$

Now, finding the probability that it takes $\geq 2 E[X] \approx 2 n \lg n$ coupons is

$$
Pr[X \geq 2 E[X]] \leq Pr[|X - E[X]| \geq E[X]]
$$
Using Chebyshev's Inequality, $a = E[X]$.
$$
\begin{aligned}
Pr[|X - E[X]| \geq E[X]] &\leq \frac{Var(X)}{E[X]^{2}} \leq \frac{\pi^{2}n^{2}}{6n^{2}H_{n}^{2}}\\
&= \frac{\pi^{2}}{6H_{n}^{2}} \leq \frac{2}{\ln^{2} (n)}
\end{aligned}
 $$
