---
title: "Linear Regression"
description: "From First Principles to Production: The Complete Guide to Linear Regression"
author: divyanshu saini
authorLink: https://divyanshusaini.me
order: 2
image: "/images/lr.jpg"
---
#### from the paper, Regression Towards Mediocrity in Hereditary Stature by: [Sir Francis Galton](https://doi.org/10.2307/2841583) — Journal of the Anthropological Institute, 1886
---

## Introduction

Linear regression is where machine learning begins. Not historically — that honor belongs to Gauss and Legendre arguing over who invented least squares in the early 1800s — but pedagogically. It is the first algorithm that teaches you what it means for a machine to *learn* from data. Everything that follows — neural networks, transformers, diffusion models — is, in some deep sense, a nonlinear generalization of what linear regression does.

And what it does is deceptively simple: **draw a line through data**.

### What is Linear Regression?

**Definition**: Linear regression is a supervised learning algorithm that models the relationship between one or more independent variables (features) and a continuous dependent variable (target) by fitting a linear equation to observed data.

$$
\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \cdots + w_d x_d
$$

> ##### Predicted value = a weighted sum of features plus a bias term. Each feature contributes proportionally.

That equation is the entire model. The "learning" part is figuring out the right values of $w_0, w_1, \ldots, w_d$ — the weights — so the line (or hyperplane) fits the data as closely as possible.

**Purpose**: Given input features, predict a continuous numerical output. How much will this house sell for? What will the temperature be tomorrow? How many units will we sell next quarter?

**Why it exists**: Humans have always needed to predict things. Farmers needed to predict crop yields from rainfall. Astronomers needed to predict planetary positions from orbital parameters. Economists needed to predict GDP from trade data. Linear regression gives you a principled, mathematically optimal way to make such predictions when the underlying relationship is approximately linear.

**Problem it solves**: Given $n$ data points $\{(\mathbf{x}_1, y_1), (\mathbf{x}_2, y_2), \ldots, (\mathbf{x}_n, y_n)\}$, find the best linear function $f(\mathbf{x}) = \mathbf{w}^\top \mathbf{x} + w_0$ that minimizes the prediction error across all data points.

### Historical Background

The history of linear regression is a story of genius and priority disputes.

**1805**: Adrien-Marie Legendre publishes the method of least squares in *Nouvelles méthodes pour la détermination des orbites des comètes*. He needed to fit orbital curves to astronomical observations and invented the optimization criterion that linear regression still uses today: minimize the sum of squared errors.

**1809**: Carl Friedrich Gauss claims he'd been using the method since 1795 — a decade before Legendre — but never published it. In *Theoria Motus*, Gauss provides a deeper theoretical justification by connecting least squares to the normal distribution. He proves that if errors are Gaussian, least squares gives the maximum likelihood estimate.

**1886**: Francis Galton coins the term "regression" while studying the heights of parents and children. He observed that unusually tall parents tend to have children who are tall but closer to the average — they "regress toward mediocrity." The word stuck even though modern regression has nothing to do with mediocrity.

**1922**: Ronald Fisher formalizes the statistical framework around regression, establishing the theory of estimation, significance tests, and the analysis of variance (ANOVA) that we still use.

**Today**: Linear regression is embedded in virtually every data-driven industry. It is the first model data scientists try, the baseline every complex model is compared against, and the foundation upon which generalized linear models, ridge regression, LASSO, elastic net, and even neural networks are built.

### Real-World Intuition

You're selling your car. You don't know what price to set. So you look at similar cars: same model, same year, similar mileage. You notice a pattern: for every 10,000 extra kilometers, the price drops by about ₹50,000. And a base model from 2020 starts at around ₹8,00,000.

Without knowing it, you've just done linear regression in your head:

$$
\text{Price} = 8{,}00{,}000 - 50{,}000 \times \left(\frac{\text{Kilometers}}{10{,}000}\right)
$$

> ##### Your mental model is a linear equation. You estimated the intercept (base price) and slope (depreciation per km).

Linear regression automates this. It takes all the data points you'd look at, finds the best line through them, and gives you the equation. The difference is: it does it optimally, and it can handle dozens of features simultaneously.

---

## Motivation

### Why Do We Need This?

Suppose you're a real estate company. You have 10,000 records of past house sales. Each record has 20 features: area, bedrooms, bathrooms, location score, age, proximity to metro, school quality, crime rate, and so on. You need to price a new listing.

Option 1: A human expert eyeballs it. Takes 30 minutes. Accuracy varies wildly. Doesn't scale.

Option 2: A lookup table. Find the most similar past sale. But "most similar" across 20 features is hard to define, and one-to-one matches rarely exist.

Option 3: Linear regression. Feed all 10,000 records into the algorithm. It learns the weight of each feature. Then it prices any new house in milliseconds with a formula: $\text{Price} = w_0 + w_1 \cdot \text{area} + w_2 \cdot \text{bedrooms} + \cdots$

Option 3 is fast, consistent, transparent, and gives you interpretable coefficients ("each extra bedroom adds ₹3.2L on average").

### Why Traditional Methods Fail

| Method | Limitation |
|--------|-----------|
| **Expert judgment** | Slow, inconsistent, doesn't scale, can't handle 50 features simultaneously |
| **Simple averages** | Ignores feature relationships; the average house price tells you nothing about *your* house |
| **Lookup tables** | Sparse in high dimensions; exact matches rare; no interpolation |
| **Rule-based systems** | Rigid, require manual maintenance, miss nuanced patterns |

Linear regression solves all of these: it's fast, consistent, scalable, handles many features, interpolates naturally, and produces interpretable results.

### Practical Business Problems

| Industry | Problem | Linear Regression Application |
|----------|---------|------------------------------|
| **E-commerce** | Demand forecasting | Predict units sold from price, season, promotions, competitor pricing |
| **Finance** | Stock return prediction | Model expected return from market factors (CAPM is literally linear regression) |
| **Healthcare** | Drug dosage optimization | Predict patient response from weight, age, biomarkers |
| **Recommendation Systems** | Rating prediction | Baseline model: predict rating from user bias + item bias |
| **Cybersecurity** | Anomaly scoring | Model normal network traffic volume; flag deviations |
| **Marketing** | Ad spend optimization | Predict revenue from spend across channels (marketing mix modeling) |

**Finance deep-dive**: The Capital Asset Pricing Model (CAPM), one of the most important models in finance, is a linear regression:

$$
R_i - R_f = \alpha_i + \beta_i (R_m - R_f) + \epsilon_i
$$

> ##### A stock's excess return is linearly related to the market's excess return. Beta measures systematic risk. Alpha is the intercept — the "edge."

Every hedge fund, pension fund, and bank uses this daily. The $\beta$ coefficient tells you how sensitive a stock is to market movements. $\beta = 1.5$ means the stock moves 1.5× as much as the market. That's linear regression, running trillions of dollars.

---

## Core Intuition

### The Line-Fitting Analogy

Imagine you're standing in a field. Your friend throws a handful of pebbles across the grass. They don't land in a perfect line, but there's a rough diagonal pattern — more pebbles toward the upper-right.

Someone hands you a long stick and says: "Place this stick so that it best represents the general direction of the pebbles."

You'd rotate and shift the stick until it passes as close to as many pebbles as possible. Some pebbles would be above the stick, some below, but on average, the stick captures the trend.

That stick is the regression line. The pebbles are your data points. "As close as possible" is the optimization criterion.

### What Is the Algorithm Trying to Learn?

Linear regression is trying to learn two things:

**The direction** — how much does $y$ change when $x$ changes? This is the slope. If houses get ₹5,000 more expensive per additional square foot, the slope is 5,000.

**The starting point** — what's $y$ when $x$ is zero? This is the intercept. Even a house with zero square feet has some land value (conceptually).

Together, the slope and intercept define a line. In higher dimensions with multiple features, they define a hyperplane — a flat surface in multi-dimensional space.

### The Error Minimization Intuition

Why squared errors? Why not just absolute errors?

Imagine two lines through your data. Line A has errors of +3, -3, +3, -3 (total absolute error = 12, squared error = 36). Line B has errors of +1, -1, +5, -5 (total absolute error = 12, squared error = 52).

Both lines have the same total absolute error, but Line B has more extreme errors. Squaring penalizes large errors disproportionately — an error of 5 costs 25, not 5. This means the optimal line avoids big misses even at the cost of slightly worse small misses.

This property is exactly what you want in most applications. In predicting house prices, being off by ₹50L once is far worse than being off by ₹5L ten times, even though the total error is the same.

### Visual Thinking

```
  y
  |        x           x = data points
  |      x    x        ─ = regression line
  |    x ─────────x
  |  ─x───
  |─x─
  |x
  └──────────────── x_axis
```

The line minimizes the total vertical distance (squared) from each point to the line. Not horizontal distance. Not perpendicular distance. Vertical distance — because we're trying to predict $y$ from $x$, so the error is measured in the $y$ direction.

---

## Mathematical Foundation

### Notation

Before we derive anything, let's define every symbol:

| Symbol | Meaning | Why Needed |
|--------|---------|-----------|
| $n$ | Number of training samples | Defines dataset size |
| $d$ | Number of features | Defines input dimensionality |
| $\mathbf{x}_i \in \mathbb{R}^d$ | Feature vector of sample $i$ | The input we use to predict |
| $y_i \in \mathbb{R}$ | Target value of sample $i$ | The output we want to predict |
| $\mathbf{w} \in \mathbb{R}^d$ | Weight vector | Parameters to learn; how much each feature contributes |
| $w_0 \in \mathbb{R}$ | Bias (intercept) | The prediction when all features are zero |
| $\hat{y}_i$ | Predicted value for sample $i$ | Our model's estimate |
| $\epsilon_i$ | Error (residual) for sample $i$ | The gap between truth and prediction |
| $\mathbf{X} \in \mathbb{R}^{n \times (d+1)}$ | Design matrix | All data arranged for matrix computation |
| $\mathbf{y} \in \mathbb{R}^n$ | Target vector | All targets stacked |

### The Model

For a single sample:

$$
\hat{y}_i = w_0 + w_1 x_{i1} + w_2 x_{i2} + \cdots + w_d x_{id}
$$

> ##### The prediction is a weighted combination of features. Each weight captures a feature's importance.

To simplify notation, we absorb $w_0$ into the weight vector by prepending a 1 to each feature vector. Define $\mathbf{x}_i = [1, x_{i1}, x_{i2}, \ldots, x_{id}]^\top$ and $\mathbf{w} = [w_0, w_1, \ldots, w_d]^\top$. Then:

$$
\hat{y}_i = \mathbf{w}^\top \mathbf{x}_i
$$

> ##### Compact form: prediction = dot product of weights and features (with the bias trick).

For all $n$ samples simultaneously, stack into matrices:

$$
\hat{\mathbf{y}} = \mathbf{X} \mathbf{w}
$$

> ##### All predictions at once: the design matrix times the weight vector.

where $\mathbf{X}$ is the $n \times (d+1)$ design matrix with one row per sample, and $\hat{\mathbf{y}}$ is the $n$-dimensional prediction vector.

### The Assumptions

Linear regression makes five key assumptions (the Gauss-Markov conditions):

**Linearity**: The true relationship between features and target is linear: $y_i = \mathbf{w}^\top \mathbf{x}_i + \epsilon_i$. If the true relationship is quadratic, linear regression will systematically miss.

**Independence**: The errors $\epsilon_i$ are independent of each other. Knowing one error tells you nothing about another. Violation: time series data where today's error predicts tomorrow's.

**Homoscedasticity**: The variance of errors is constant: $\text{Var}(\epsilon_i) = \sigma^2$ for all $i$. The prediction quality doesn't depend on the input. Violation: predicting income — errors for high earners are larger than for low earners.

**Normality**: The errors follow a normal distribution: $\epsilon_i \sim \mathcal{N}(0, \sigma^2)$. This isn't needed for the least-squares solution to work, but it is needed for confidence intervals, hypothesis tests, and p-values.

**No perfect multicollinearity**: No feature is a perfect linear combination of other features. If $x_3 = 2x_1 + x_2$ exactly, the system is underdetermined — infinitely many weight vectors give the same predictions. The matrix $\mathbf{X}^\top\mathbf{X}$ becomes singular (non-invertible).

---

## Mathematical Formulation

### The Loss Function

We need a way to measure how bad our predictions are. Define the residual for sample $i$:

$$
\epsilon_i = y_i - \hat{y}_i = y_i - \mathbf{w}^\top \mathbf{x}_i
$$

> ##### Residual = truth - prediction. Positive means we underpredicted, negative means we overpredicted.

The **Mean Squared Error (MSE)** loss averages the squared residuals:

$$
\mathcal{L}(\mathbf{w}) = \frac{1}{n} \sum_{i=1}^{n} (y_i - \mathbf{w}^\top \mathbf{x}_i)^2
$$

> ##### Average squared distance from each point to the line. Lower is better. Zero means perfect fit.

Equivalently, we often work with the **Sum of Squared Errors (SSE)** or **Residual Sum of Squares (RSS)** which drops the $1/n$ factor since it doesn't affect the optimal $\mathbf{w}$:

$$
\text{RSS}(\mathbf{w}) = \sum_{i=1}^{n} (y_i - \mathbf{w}^\top \mathbf{x}_i)^2 = (\mathbf{y} - \mathbf{X}\mathbf{w})^\top (\mathbf{y} - \mathbf{X}\mathbf{w})
$$

> ##### In matrix form: the squared length of the residual vector. Elegant and efficient to compute.

### The Optimization Target

$$
\mathbf{w}^* = \arg\min_{\mathbf{w}} \; (\mathbf{y} - \mathbf{X}\mathbf{w})^\top (\mathbf{y} - \mathbf{X}\mathbf{w})
$$

> ##### Find the weight vector that minimizes the total squared error. This is the entire learning objective.

This is a convex optimization problem — the loss is a quadratic function of $\mathbf{w}$, shaped like a bowl. There is exactly one minimum, and we can find it analytically (no iterative search needed).

### Why Squared Error?

| Loss | Formula | Properties |
|------|---------|-----------|
| **Squared Error (L2)** | $(y - \hat{y})^2$ | Differentiable everywhere, unique minimum, sensitive to outliers |
| **Absolute Error (L1)** | $\lvert y - \hat{y} \rvert$ | Robust to outliers, not differentiable at 0, no closed-form solution |
| **Huber Loss** | L2 for small errors, L1 for large | Best of both, but has a hyperparameter |

We use squared error because it gives us a closed-form solution (the Normal Equation), is differentiable everywhere (needed for gradient-based optimization), and corresponds to maximum likelihood estimation under Gaussian noise.

---

## Derivation Step-by-Step

### Method 1: The Normal Equation (Analytical Solution)

This is the crown jewel of linear regression. We'll derive the closed-form solution from scratch.

**Start with the RSS in matrix form**:

$$
\text{RSS}(\mathbf{w}) = (\mathbf{y} - \mathbf{X}\mathbf{w})^\top (\mathbf{y} - \mathbf{X}\mathbf{w})
$$

**Expand the quadratic**:

$$
\text{RSS} = \mathbf{y}^\top\mathbf{y} - \mathbf{y}^\top\mathbf{X}\mathbf{w} - (\mathbf{X}\mathbf{w})^\top\mathbf{y} + (\mathbf{X}\mathbf{w})^\top(\mathbf{X}\mathbf{w})
$$

> ##### Expand $(a-b)^T(a-b) = a^Ta - a^Tb - b^Ta + b^Tb$ where $a = y$, $b = Xw$.

Note that $\mathbf{y}^\top\mathbf{X}\mathbf{w}$ is a scalar, so it equals its transpose $(\mathbf{X}\mathbf{w})^\top\mathbf{y} = \mathbf{w}^\top\mathbf{X}^\top\mathbf{y}$. So:

$$
\text{RSS} = \mathbf{y}^\top\mathbf{y} - 2\mathbf{w}^\top\mathbf{X}^\top\mathbf{y} + \mathbf{w}^\top\mathbf{X}^\top\mathbf{X}\mathbf{w}
$$

> ##### Simplified: a constant - 2(linear term) + (quadratic term). Classic bowl shape.

**Take the gradient with respect to $\mathbf{w}$**:

Using matrix calculus rules:
- $\frac{\partial}{\partial \mathbf{w}}(\mathbf{w}^\top \mathbf{a}) = \mathbf{a}$ for constant $\mathbf{a}$
- $\frac{\partial}{\partial \mathbf{w}}(\mathbf{w}^\top \mathbf{A} \mathbf{w}) = 2\mathbf{A}\mathbf{w}$ for symmetric $\mathbf{A}$

$$
\nabla_{\mathbf{w}} \text{RSS} = -2\mathbf{X}^\top\mathbf{y} + 2\mathbf{X}^\top\mathbf{X}\mathbf{w}
$$

> ##### The gradient: direction of steepest increase. We set it to zero to find the bottom of the bowl.

**Set gradient to zero and solve**:

$$
-2\mathbf{X}^\top\mathbf{y} + 2\mathbf{X}^\top\mathbf{X}\mathbf{w} = \mathbf{0}
$$

$$
\mathbf{X}^\top\mathbf{X}\mathbf{w} = \mathbf{X}^\top\mathbf{y}
$$

> ##### The Normal Equation. Named because the residual vector is orthogonal (normal) to the column space of X.

$$
\boxed{\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}}
$$

> ##### The closed-form solution. No iteration needed. One matrix computation gives the optimal weights.

This requires $\mathbf{X}^\top\mathbf{X}$ to be invertible (non-singular), which fails when features are perfectly correlated or when $n < d+1$ (more features than samples).

**Verify it's a minimum** (not a maximum or saddle point):

The Hessian (second derivative matrix) is:

$$
\mathbf{H} = \nabla^2_{\mathbf{w}} \text{RSS} = 2\mathbf{X}^\top\mathbf{X}
$$

> ##### The Hessian is positive semi-definite (it's a Gram matrix), confirming this is a minimum, not a maximum.

$\mathbf{X}^\top\mathbf{X}$ is positive semi-definite by construction: for any $\mathbf{v}$, $\mathbf{v}^\top\mathbf{X}^\top\mathbf{X}\mathbf{v} = \|\mathbf{X}\mathbf{v}\|^2 \geq 0$. So the critical point is indeed a global minimum.

### Method 2: Gradient Descent

When $\mathbf{X}^\top\mathbf{X}$ is too large to invert (millions of features), or when data arrives in a stream, we use gradient descent.

**Idea**: Start with random weights. Compute the gradient (direction of steepest increase). Take a step in the opposite direction. Repeat until convergence.

**Update rule**:

$$
\mathbf{w}_{t+1} = \mathbf{w}_t - \eta \nabla_{\mathbf{w}} \mathcal{L}(\mathbf{w}_t)
$$

> ##### New weights = old weights - learning rate times gradient. Roll downhill.

For MSE loss:

$$
\nabla_{\mathbf{w}} \mathcal{L} = \frac{-2}{n} \mathbf{X}^\top(\mathbf{y} - \mathbf{X}\mathbf{w})
$$

> ##### Gradient = scaled version of X transposed times the residual vector. Points uphill.

So the update becomes:

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \frac{2\eta}{n} \mathbf{X}^\top(\mathbf{y} - \mathbf{X}\mathbf{w}_t)
$$

> ##### Each step adjusts weights proportionally to the correlation between features and current errors.

**Variants**:

| Variant | Uses | Per-step cost | Convergence |
|---------|------|-------------|-------------|
| **Batch GD** | All $n$ samples | $O(nd)$ | Smooth, slow for large $n$ |
| **Stochastic GD (SGD)** | 1 random sample | $O(d)$ | Noisy, fast per step |
| **Mini-batch GD** | $B$ random samples | $O(Bd)$ | Best of both worlds |

### Method 3: Maximum Likelihood Estimation

If we assume Gaussian noise: $y_i = \mathbf{w}^\top \mathbf{x}_i + \epsilon_i$ where $\epsilon_i \sim \mathcal{N}(0, \sigma^2)$, then:

$$
P(y_i \mid \mathbf{x}_i, \mathbf{w}) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(y_i - \mathbf{w}^\top\mathbf{x}_i)^2}{2\sigma^2}\right)
$$

> ##### Each observation has a Gaussian probability centered at the prediction. Closer predictions are more likely.

The log-likelihood of all data (assuming independence):

$$
\log L(\mathbf{w}) = -\frac{n}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^{n}(y_i - \mathbf{w}^\top\mathbf{x}_i)^2
$$

> ##### Total log-probability of observing our data given the model. More likely = better model.

Maximizing this with respect to $\mathbf{w}$ is equivalent to minimizing $\sum(y_i - \mathbf{w}^\top\mathbf{x}_i)^2$ — which is exactly the least squares objective. **MLE under Gaussian noise gives the same solution as least squares.**

---

## Numerical Example

### Dataset

Six houses with one feature (area in hundreds of sq ft) and target (price in Lakhs):

| House | Area ($x$) | Price ($y$) |
|-------|-----------|------------|
| 1 | 1 | 1.5 |
| 2 | 2 | 3.0 |
| 3 | 3 | 4.0 |
| 4 | 4 | 5.5 |
| 5 | 5 | 6.0 |
| 6 | 6 | 8.0 |

We want to fit $\hat{y} = w_0 + w_1 x$.

### Step 1: Set Up the Design Matrix

Prepend a column of 1s for the intercept:

$$
\mathbf{X} = \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \\ 1 & 4 \\ 1 & 5 \\ 1 & 6 \end{bmatrix}, \quad
\mathbf{y} = \begin{bmatrix} 1.5 \\ 3.0 \\ 4.0 \\ 5.5 \\ 6.0 \\ 8.0 \end{bmatrix}
$$

### Step 2: Compute $\mathbf{X}^\top\mathbf{X}$

$$
\mathbf{X}^\top\mathbf{X} = \begin{bmatrix} 1 & 1 & 1 & 1 & 1 & 1 \\ 1 & 2 & 3 & 4 & 5 & 6 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \\ 1 & 4 \\ 1 & 5 \\ 1 & 6 \end{bmatrix}
$$

$$
= \begin{bmatrix} 6 & 21 \\ 21 & 91 \end{bmatrix}
$$

> ##### Top-left: n=6. Top-right and bottom-left: sum of x = 21. Bottom-right: sum of x squared = 91.

### Step 3: Compute $\mathbf{X}^\top\mathbf{y}$

$$
\mathbf{X}^\top\mathbf{y} = \begin{bmatrix} 1+3+4+5.5+6+8 \\ 1(1.5)+2(3)+3(4)+4(5.5)+5(6)+6(8) \end{bmatrix} = \begin{bmatrix} 28 \\ 112 \end{bmatrix}
$$

> ##### Top: sum of all y values. Bottom: sum of x times y (the cross-correlation).

### Step 4: Invert $\mathbf{X}^\top\mathbf{X}$

For a 2x2 matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$, the inverse is $\frac{1}{ad-bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.

$$
\det = 6 \times 91 - 21 \times 21 = 546 - 441 = 105
$$

$$
(\mathbf{X}^\top\mathbf{X})^{-1} = \frac{1}{105}\begin{bmatrix} 91 & -21 \\ -21 & 6 \end{bmatrix} = \begin{bmatrix} 0.8667 & -0.2000 \\ -0.2000 & 0.0571 \end{bmatrix}
$$

### Step 5: Compute $\mathbf{w}^*$

$$
\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y} = \begin{bmatrix} 0.8667 & -0.2000 \\ -0.2000 & 0.0571 \end{bmatrix} \begin{bmatrix} 28 \\ 112 \end{bmatrix}
$$

$$
w_0 = 0.8667 \times 28 + (-0.2000) \times 112 = 24.267 - 22.400 = 0.267
$$

$$
w_1 = (-0.2000) \times 28 + 0.0571 \times 112 = -5.600 + 6.400 = 1.200
$$

$$
\boxed{\hat{y} = 0.267 + 1.200x}
$$

> ##### The regression line: base price is 0.267L, and each 100 sq ft adds 1.200L.

### Step 6: Verify Predictions

| House | $x$ | $y$ (actual) | $\hat{y} = 0.267 + 1.2x$ | Error ($y - \hat{y}$) | Error$^2$ |
|-------|-----|-------------|--------------------------|----------------------|----------|
| 1 | 1 | 1.5 | 1.467 | 0.033 | 0.001 |
| 2 | 2 | 3.0 | 2.667 | 0.333 | 0.111 |
| 3 | 3 | 4.0 | 3.867 | 0.133 | 0.018 |
| 4 | 4 | 5.5 | 5.067 | 0.433 | 0.188 |
| 5 | 5 | 6.0 | 6.267 | -0.267 | 0.071 |
| 6 | 6 | 8.0 | 7.467 | 0.533 | 0.284 |

**MSE** = (0.001 + 0.111 + 0.018 + 0.188 + 0.071 + 0.284) / 6 = **0.112**

**Sum of residuals** = 0.033 + 0.333 + 0.133 + 0.433 + (-0.267) + 0.533 = **1.198 ≈ 0** (residuals approximately sum to zero — a property of least squares with an intercept)

---

## Geometric Interpretation

### The Regression Line in 2D

```
  Price (y)
  8 |                          x (6, 8.0)
    |                       /
  7 |                    /
    |                 x─── (5, 6.0)
  6 |              /
    |        x──/ (4, 5.5)
  5 |        /
    |     /
  4 |  x─ (3, 4.0)
    |  /
  3 | x (2, 3.0)
    |/
  2 |
    x (1, 1.5)
  1 |
    └──────────────────────────
      1    2    3    4    5    6   Area (x)
```

The line $\hat{y} = 0.267 + 1.2x$ passes through the cloud of points, minimizing the total vertical squared distance.

### Projection Interpretation

Here's the deep geometric insight. The predicted values $\hat{\mathbf{y}} = \mathbf{X}\mathbf{w}$ live in the **column space** of $\mathbf{X}$ — the subspace spanned by the columns of $\mathbf{X}$. The true target $\mathbf{y}$ generally does not live in this subspace (unless the fit is perfect).

The least-squares solution finds the point in the column space that is **closest** to $\mathbf{y}$. This is the **orthogonal projection** of $\mathbf{y}$ onto the column space of $\mathbf{X}$.

$$
\hat{\mathbf{y}} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y} = \mathbf{H}\mathbf{y}
$$

> ##### The hat matrix H projects the target vector onto the column space of X. That's why predictions wear a "hat."

The matrix $\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$ is called the **hat matrix** because it puts the hat on $\mathbf{y}$ (producing $\hat{\mathbf{y}}$). It satisfies $\mathbf{H}^2 = \mathbf{H}$ (idempotent — projecting twice is the same as projecting once) and $\mathbf{H}^\top = \mathbf{H}$ (symmetric).

The residual vector $\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}} = (\mathbf{I} - \mathbf{H})\mathbf{y}$ is orthogonal to every column of $\mathbf{X}$:

$$
\mathbf{X}^\top\mathbf{e} = \mathbf{X}^\top(\mathbf{y} - \mathbf{X}\mathbf{w}^*) = \mathbf{X}^\top\mathbf{y} - \mathbf{X}^\top\mathbf{X}\mathbf{w}^* = \mathbf{0}
$$

> ##### The residuals are perpendicular to the feature space. The Normal Equation is literally a normality condition.

This is why it's called the *Normal* Equation — "normal" in the geometric sense of perpendicular.

### The Loss Surface

In 2D (one weight + bias), the loss function $\mathcal{L}(w_0, w_1)$ is a paraboloid — a bowl-shaped surface. Gradient descent rolls a ball down this bowl. The normal equation jumps directly to the bottom.

```
Loss
  |  \                     /
  |    \                 /
  |      \             /
  |        \         /
  |          \_____/    <-- minimum at w*
  |
  └────────────────────── w
```

In higher dimensions, the bowl has more axes, but it's still convex — one global minimum, no local traps.

---

## Statistical Interpretation

### Goodness of Fit: R-Squared

The coefficient of determination $R^2$ measures how much variance in $y$ is explained by the model:

$$
R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}} = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}
$$

> ##### R-squared = 1 - (unexplained variance / total variance). R-squared = 1 means perfect fit. R-squared = 0 means the model is no better than predicting the mean.

| Component | Formula | Meaning |
|-----------|---------|---------|
| $\text{SS}_{\text{tot}}$ | $\sum(y_i - \bar{y})^2$ | Total variance in the data |
| $\text{SS}_{\text{res}}$ | $\sum(y_i - \hat{y}_i)^2$ | Variance unexplained by the model |
| $\text{SS}_{\text{reg}}$ | $\sum(\hat{y}_i - \bar{y})^2$ | Variance explained by the model |

They satisfy: $\text{SS}_{\text{tot}} = \text{SS}_{\text{reg}} + \text{SS}_{\text{res}}$.

For our example:
- $\bar{y} = 28/6 = 4.667$
- $\text{SS}_{\text{tot}} = (1.5-4.667)^2 + (3-4.667)^2 + \cdots + (8-4.667)^2 = 25.333$
- $\text{SS}_{\text{res}} = 0.673$ (sum of squared errors from Step 6)
- $R^2 = 1 - 0.673/25.333 = 1 - 0.027 = 0.973$

An $R^2$ of 0.973 means our simple linear model explains 97.3% of the variance in house prices. Excellent.

### Adjusted R-Squared

$R^2$ always increases when you add more features, even if they're irrelevant (random noise). Adjusted $R^2$ penalizes model complexity:

$$
R^2_{\text{adj}} = 1 - \frac{(1 - R^2)(n-1)}{n - d - 1}
$$

> ##### Adjusted R-squared penalizes adding useless features. It can decrease if a new feature doesn't help enough.

### Bias-Variance Tradeoff

**Bias**: The error from wrong assumptions. If the true relationship is quadratic but we fit a line, we have high bias. The model is too simple — it systematically misses the pattern.

**Variance**: The error from sensitivity to training data. If we fit a 100-degree polynomial to 10 data points, the model wiggles wildly through every point. A different sample gives a completely different model.

$$
\text{Expected Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}
$$

> ##### Total error has three parts. We control bias and variance. Noise is the floor we can't go below.

For linear regression:
- **Simple model (few features)**: High bias, low variance → underfitting
- **Complex model (many features, polynomial)**: Low bias, high variance → overfitting
- **Just right**: Balanced — found via cross-validation or regularization

### Confidence Intervals for Coefficients

Under the Gaussian noise assumption, the estimated weights follow a distribution:

$$
\hat{\mathbf{w}} \sim \mathcal{N}\left(\mathbf{w}_{\text{true}}, \;\sigma^2 (\mathbf{X}^\top\mathbf{X})^{-1}\right)
$$

> ##### Weights are normally distributed around the true values. Uncertainty depends on noise level and data geometry.

The 95% confidence interval for weight $w_j$ is:

$$
\hat{w}_j \pm t_{\alpha/2, n-d-1} \cdot \text{SE}(\hat{w}_j)
$$

where $\text{SE}(\hat{w}_j) = \hat{\sigma}\sqrt{[(\mathbf{X}^\top\mathbf{X})^{-1}]_{jj}}$ is the standard error.

If a 95% CI for $w_j$ includes zero, the feature $x_j$ is not statistically significant — you can't confidently say it has any effect.

---

## Algorithm Workflow

```
  Input: Feature matrix X, target vector y
                    |
                    v
        +-----------------------+
        |     Preprocessing     |
        |   - Handle missing    |
        |   - Scale features    |
        |   - Add intercept col |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |   Choose Method       |
        |   Normal Eq or GD?    |
        +-----------+-----------+
                   / \
                  /   \
        n*d small?  n*d large?
              |          |
              v          v
     +------------+  +------------+
     | Normal Eq  |  | Gradient   |
     | w=(XtX)^-1 |  | Descent    |
     | Xty        |  | iterate    |
     +-----+------+  +-----+------+
           |               |
           +-------+-------+
                   |
                   v
        +-----------------------+
        |   Learned Weights w*  |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |   Prediction          |
        |   y_hat = X_new * w*  |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |   Evaluation          |
        |   MSE, R-squared,     |
        |   residual analysis   |
        +-----------------------+
```

### Decision: Normal Equation vs Gradient Descent

| Criterion | Normal Equation | Gradient Descent |
|-----------|----------------|-----------------|
| **When to use** | $n \cdot d < 10^6$ ish | Large $n$ or $d$ |
| **Requires $\eta$ tuning?** | No | Yes (learning rate) |
| **Iteration?** | No (one-shot) | Yes (many steps) |
| **Handles $n < d$?** | No (singular) | Yes (with regularization) |
| **Complexity** | $O(d^3)$ for matrix inverse | $O(n \cdot d)$ per step |

---

## Pseudocode

```
ALGORITHM: Linear Regression (Normal Equation)

INPUT:
    X = [x_1, x_2, ..., x_n]    // n feature vectors, each d-dimensional
    y = [y_1, y_2, ..., y_n]    // n target values

OUTPUT:
    w = [w_0, w_1, ..., w_d]    // learned weight vector

PROCEDURE:

1. PREPROCESSING:
    Add column of 1s to X        // for intercept term
    // X is now n x (d+1)

2. COMPUTE NORMAL EQUATION:
    A = X^T * X                  // (d+1) x (d+1) matrix
    b = X^T * y                  // (d+1) x 1 vector
    w = inverse(A) * b           // solve the linear system

3. PREDICTION (for new data x_new):
    Prepend 1 to x_new           // for intercept
    y_hat = dot(w, x_new)        // scalar prediction

    RETURN y_hat
```

```
ALGORITHM: Linear Regression (Gradient Descent)

INPUT:
    X, y                         // training data
    eta                          // learning rate
    epochs                       // number of iterations

OUTPUT:
    w                            // learned weight vector

PROCEDURE:

1. Initialize w = zeros(d+1)    // or small random values

2. FOR t = 1 TO epochs:
    // Compute predictions
    y_hat = X * w                // n x 1 vector

    // Compute gradient
    error = y - y_hat            // n x 1 residual vector
    gradient = (-2/n) * X^T * error  // (d+1) x 1

    // Update weights
    w = w - eta * gradient

    // Optional: compute and log loss
    loss = (1/n) * sum(error^2)

3. RETURN w
```

---

## Time and Space Complexity

### Normal Equation

| Phase | Complexity | Explanation |
|-------|-----------|-------------|
| **$\mathbf{X}^\top\mathbf{X}$** | $O(n d^2)$ | Multiply $n \times d$ by $d \times n$ |
| **Inverse** | $O(d^3)$ | Invert $(d+1) \times (d+1)$ matrix |
| **$\mathbf{X}^\top\mathbf{y}$** | $O(nd)$ | Matrix-vector product |
| **Total Training** | $O(nd^2 + d^3)$ | Dominated by the larger term |
| **Prediction** | $O(d)$ | One dot product |
| **Memory** | $O(nd + d^2)$ | Store X and $\mathbf{X}^\top\mathbf{X}$ |

**Practical implication**: If $d = 10{,}000$, then $d^3 = 10^{12}$ — a trillion operations for the inverse alone. Use gradient descent instead.

### Gradient Descent

| Phase | Complexity | Explanation |
|-------|-----------|-------------|
| **Per iteration** | $O(nd)$ | Matrix-vector multiply for predictions and gradient |
| **Total Training** | $O(T \cdot n \cdot d)$ | $T$ = number of iterations |
| **Prediction** | $O(d)$ | One dot product |
| **Memory** | $O(nd + d)$ | Store X and weights |

**Practical implication**: GD is preferred when $d$ is large (thousands to millions of features). SGD is preferred when $n$ is also large (millions of samples) — process one sample at a time.

---

## Python Implementation From Scratch

```python
import numpy as np


class LinearRegressionScratch:
    """
    Linear Regression implemented from scratch using NumPy.
    Supports both Normal Equation and Gradient Descent.

    Parameters
    ----------
    method : str
        'normal' for closed-form, 'gd' for gradient descent.
    lr : float
        Learning rate (only for gradient descent).
    epochs : int
        Number of iterations (only for gradient descent).
    """

    def __init__(self, method='normal', lr=0.01, epochs=1000):
        self.method = method
        self.lr = lr
        self.epochs = epochs
        self.weights = None      # will hold [w0, w1, ..., wd]
        self.loss_history = []   # track loss over epochs (GD only)

    def _add_intercept(self, X):
        """Prepend a column of ones to X for the bias term."""
        ones = np.ones((X.shape[0], 1))
        return np.hstack([ones, X])  # n x (d+1)

    def fit(self, X, y):
        """
        Train the model.

        Parameters
        ----------
        X : np.ndarray of shape (n_samples, n_features)
        y : np.ndarray of shape (n_samples,)
        """
        X = np.array(X, dtype=np.float64)
        y = np.array(y, dtype=np.float64).reshape(-1, 1)  # column vector
        X = self._add_intercept(X)  # n x (d+1)
        n, d_plus_1 = X.shape

        if self.method == 'normal':
            # Normal Equation: w = (X^T X)^{-1} X^T y
            XtX = X.T @ X                    # (d+1) x (d+1)
            Xty = X.T @ y                    # (d+1) x 1
            self.weights = np.linalg.solve(XtX, Xty)  # more stable than inv()

        elif self.method == 'gd':
            # Gradient Descent
            self.weights = np.zeros((d_plus_1, 1))  # initialize to zeros
            self.loss_history = []

            for epoch in range(self.epochs):
                # Forward pass: predictions
                y_hat = X @ self.weights       # n x 1

                # Compute residuals
                residuals = y - y_hat          # n x 1

                # Compute gradient: -2/n * X^T * residuals
                gradient = (-2 / n) * (X.T @ residuals)  # (d+1) x 1

                # Update weights
                self.weights = self.weights - self.lr * gradient

                # Track loss
                mse = np.mean(residuals ** 2)
                self.loss_history.append(mse)

        else:
            raise ValueError(f"Unknown method: {self.method}")

        return self

    def predict(self, X):
        """
        Make predictions.

        Parameters
        ----------
        X : np.ndarray of shape (n_samples, n_features)

        Returns
        -------
        np.ndarray of shape (n_samples,) predictions.
        """
        X = np.array(X, dtype=np.float64)
        X = self._add_intercept(X)
        return (X @ self.weights).flatten()

    def score(self, X, y):
        """
        Compute R-squared score.

        Parameters
        ----------
        X : np.ndarray of shape (n_samples, n_features)
        y : np.ndarray of shape (n_samples,)

        Returns
        -------
        float R-squared value.
        """
        y = np.array(y, dtype=np.float64)
        y_hat = self.predict(X)
        ss_res = np.sum((y - y_hat) ** 2)
        ss_tot = np.sum((y - np.mean(y)) ** 2)
        return 1 - (ss_res / ss_tot)

    def get_coefficients(self):
        """Return intercept and feature weights separately."""
        return {
            'intercept': self.weights[0, 0],
            'coefficients': self.weights[1:].flatten()
        }

    @staticmethod
    def mse(y_true, y_pred):
        """Compute Mean Squared Error."""
        return np.mean((np.array(y_true) - np.array(y_pred)) ** 2)

    @staticmethod
    def rmse(y_true, y_pred):
        """Compute Root Mean Squared Error."""
        return np.sqrt(LinearRegressionScratch.mse(y_true, y_pred))

    @staticmethod
    def mae(y_true, y_pred):
        """Compute Mean Absolute Error."""
        return np.mean(np.abs(np.array(y_true) - np.array(y_pred)))


# Demonstration
if __name__ == "__main__":
    # Our house price dataset
    X_train = np.array([[1], [2], [3], [4], [5], [6]])
    y_train = np.array([1.5, 3.0, 4.0, 5.5, 6.0, 8.0])

    # Method 1: Normal Equation
    model_ne = LinearRegressionScratch(method='normal')
    model_ne.fit(X_train, y_train)
    print("Normal Equation:")
    print(f"  Coefficients: {model_ne.get_coefficients()}")
    print(f"  R-squared: {model_ne.score(X_train, y_train):.4f}")
    print(f"  Prediction for area=7: {model_ne.predict([[7]])[0]:.3f}")

    # Method 2: Gradient Descent
    model_gd = LinearRegressionScratch(method='gd', lr=0.01, epochs=5000)
    model_gd.fit(X_train, y_train)
    print("\nGradient Descent:")
    print(f"  Coefficients: {model_gd.get_coefficients()}")
    print(f"  R-squared: {model_gd.score(X_train, y_train):.4f}")
    print(f"  Prediction for area=7: {model_gd.predict([[7]])[0]:.3f}")
    print(f"  Final loss: {model_gd.loss_history[-1]:.6f}")
```

**Key implementation decisions explained**:

`np.linalg.solve(XtX, Xty)` instead of `np.linalg.inv(XtX) @ Xty`: Solving the linear system directly is numerically more stable than explicitly computing the inverse. The inverse magnifies floating-point errors; `solve` uses LU decomposition which is both faster and more accurate.

`self.weights = np.zeros(...)` for GD initialization: Zeros work because the loss landscape is convex — any starting point converges to the same minimum. Random initialization also works but isn't necessary for convex problems.

`gradient = (-2/n) * (X.T @ residuals)`: This is the full-batch gradient. For SGD, you'd replace this with a single-sample or mini-batch gradient.

---

## Python Implementation Using Scikit-Learn

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.pipeline import Pipeline


# DATASET CREATION
X, y = make_regression(
    n_samples=500,          # 500 data points
    n_features=5,           # 5 input features
    n_informative=3,        # only 3 actually affect y
    noise=15,               # Gaussian noise std
    random_state=42
)

# TRAIN-TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# TRAINING
model = LinearRegression(
    fit_intercept=True,     # learn w0 (default True)
    copy_X=True,            # don't modify input data
    n_jobs=None             # parallelism (None = 1 core)
)
model.fit(X_train, y_train)

# PREDICTION
y_pred = model.predict(X_test)

# EVALUATION
print("Linear Regression Results")
print(f"  Intercept: {model.intercept_:.4f}")
print(f"  Coefficients: {model.coef_.round(4)}")
print(f"  R-squared (train): {model.score(X_train, y_train):.4f}")
print(f"  R-squared (test):  {model.score(X_test, y_test):.4f}")
print(f"  MSE:  {mean_squared_error(y_test, y_pred):.4f}")
print(f"  RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")
print(f"  MAE:  {mean_absolute_error(y_test, y_pred):.4f}")

# CROSS-VALIDATION
cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
print(f"\n5-Fold CV R-squared: {cv_scores.mean():.4f} +/- {cv_scores.std():.4f}")


# VISUALIZATION: Actual vs Predicted
plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred, alpha=0.6, edgecolors='black', s=40)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()],
         'r--', linewidth=2, label='Perfect Prediction')
plt.xlabel('Actual Values', fontsize=12)
plt.ylabel('Predicted Values', fontsize=12)
plt.title('Linear Regression: Actual vs Predicted', fontsize=14, fontweight='bold')
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


# VISUALIZATION: Residuals
residuals = y_test - y_pred
plt.figure(figsize=(8, 6))
plt.scatter(y_pred, residuals, alpha=0.6, edgecolors='black', s=40)
plt.axhline(y=0, color='r', linestyle='--', linewidth=2)
plt.xlabel('Predicted Values', fontsize=12)
plt.ylabel('Residuals', fontsize=12)
plt.title('Residual Plot', fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


# VISUALIZATION: Feature Importance
feature_names = [f'Feature {i+1}' for i in range(X.shape[1])]
plt.figure(figsize=(8, 5))
plt.barh(feature_names, np.abs(model.coef_), color='steelblue')
plt.xlabel('Absolute Coefficient Value', fontsize=12)
plt.title('Feature Importance (by coefficient magnitude)', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()


# COMPARISON: Linear vs Ridge vs Lasso
models = {
    'Linear': LinearRegression(),
    'Ridge (alpha=1)': Ridge(alpha=1.0),
    'Lasso (alpha=1)': Lasso(alpha=1.0),
}

for name, m in models.items():
    m.fit(X_train, y_train)
    train_r2 = m.score(X_train, y_train)
    test_r2 = m.score(X_test, y_test)
    n_nonzero = np.sum(np.abs(m.coef_) > 1e-6)
    print(f"{name:25s} | Train R2: {train_r2:.4f} | Test R2: {test_r2:.4f} | Non-zero coefficients: {n_nonzero}")
```

### Scikit-Learn Parameter Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|------------|
| `fit_intercept` | bool | True | Whether to calculate the intercept $w_0$ |
| `copy_X` | bool | True | If False, X may be overwritten during fit |
| `n_jobs` | int | None | Number of CPU cores for parallel computation |
| `positive` | bool | False | Force coefficients to be positive (from v0.24) |

---

## Hyperparameters

Linear regression itself has very few hyperparameters (it's mostly parameter-free). The important tuning happens in its regularized variants:

### Regularization Strength ($\alpha$ / $\lambda$)

| Aspect | Small $\alpha$ (e.g., 0.01) | Large $\alpha$ (e.g., 100) |
|--------|----------------------------|---------------------------|
| **Regularization** | Weak — nearly ordinary LR | Strong — heavy penalty on weights |
| **Bias** | Low | High |
| **Variance** | High | Low |
| **Coefficients** | Large, possibly overfitting | Small, possibly underfitting |
| **When to use** | Clean data, few features | Noisy data, many features, multicollinearity |

### Ridge vs Lasso vs Elastic Net

| Method | Penalty | Loss Function | Effect |
|--------|---------|--------------|--------|
| **Ridge (L2)** | $\alpha\sum w_j^2$ | $\text{MSE} + \alpha\|\mathbf{w}\|_2^2$ | Shrinks all coefficients toward zero; never sets to exactly zero |
| **Lasso (L1)** | $\alpha\sum\lvert w_j\rvert$ | $\text{MSE} + \alpha\|\mathbf{w}\|_1$ | Shrinks some coefficients to exactly zero (feature selection) |
| **Elastic Net** | $\alpha[\rho\|\mathbf{w}\|_1 + \frac{1-\rho}{2}\|\mathbf{w}\|_2^2]$ | MSE + combined penalty | Best of both; handles correlated features better than Lasso |

### Learning Rate ($\eta$) — Gradient Descent Only

| Aspect | Small $\eta$ (e.g., 0.0001) | Large $\eta$ (e.g., 0.1) |
|--------|----------------------------|--------------------------|
| **Convergence** | Slow but stable | Fast but may oscillate or diverge |
| **Risk** | Getting stuck, slow training | Overshooting the minimum |
| **When to use** | Fine-tuning, near convergence | Initial training, coarse search |

### Polynomial Degree — Polynomial Regression

| Degree | Model | Flexibility | Risk |
|--------|-------|------------|------|
| 1 | Linear | Low — straight line | Underfitting |
| 2 | Quadratic | Medium — parabola | Often good |
| 3-5 | Cubic+ | High — wiggly curves | Overfitting risk |
| > 10 | Extreme | Very high | Almost certainly overfitting |

---

## Visualization

### Learning Curve (GD Convergence)

```python
import numpy as np
import matplotlib.pyplot as plt

# Train with GD and plot loss
np.random.seed(42)
n, d = 100, 3
X = np.random.randn(n, d)
y = X @ np.array([3.0, -1.5, 2.0]) + 0.5 + np.random.randn(n) * 0.5

X_aug = np.hstack([np.ones((n, 1)), X])
w = np.zeros(d + 1)
lr = 0.01
losses = []

for epoch in range(200):
    y_hat = X_aug @ w
    residuals = y - y_hat
    gradient = (-2 / n) * X_aug.T @ residuals
    w = w - lr * gradient
    losses.append(np.mean(residuals ** 2))

plt.figure(figsize=(10, 6))
plt.plot(losses, linewidth=2, color='steelblue')
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('MSE Loss', fontsize=12)
plt.title('Gradient Descent Convergence', fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### Effect of Polynomial Degree

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression

np.random.seed(42)
X_1d = np.sort(np.random.uniform(0, 5, 30)).reshape(-1, 1)
y_1d = 0.5 * X_1d.ravel()**2 - 2 * X_1d.ravel() + 3 + np.random.randn(30) * 1.5

X_plot = np.linspace(0, 5, 200).reshape(-1, 1)

fig, axes = plt.subplots(1, 4, figsize=(20, 5))
for ax, degree in zip(axes, [1, 2, 5, 15]):
    pipe = Pipeline([
        ('poly', PolynomialFeatures(degree=degree)),
        ('lr', LinearRegression())
    ])
    pipe.fit(X_1d, y_1d)
    y_plot = pipe.predict(X_plot)

    ax.scatter(X_1d, y_1d, color='black', s=30, zorder=5)
    ax.plot(X_plot, y_plot, color='steelblue', linewidth=2)
    ax.set_title(f'Degree {degree} (R2={pipe.score(X_1d, y_1d):.3f})',
                 fontsize=12, fontweight='bold')
    ax.set_ylim(-5, 20)
    ax.grid(True, alpha=0.3)

plt.suptitle('Polynomial Regression: Underfitting to Overfitting',
             fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
```

---

## Advantages

| Advantage | Explanation |
|-----------|-------------|
| **Closed-form solution** | Normal equation gives the exact answer in one computation — no iterative tuning |
| **Highly interpretable** | Each coefficient directly tells you how much a feature affects the target |
| **Fast training and prediction** | $O(d)$ prediction; milliseconds even with millions of samples |
| **Well-understood theory** | 200+ years of statistical theory; confidence intervals, hypothesis tests, diagnostics |
| **Low variance** | Stable predictions that don't change drastically with small data changes |
| **Baseline model** | Every ML project should start with linear regression. If it works, you're done |
| **Feature importance** | Coefficient magnitudes (after standardization) rank feature importance |
| **Probabilistic interpretation** | MLE under Gaussianity; can produce prediction intervals |
| **No hyperparameters** | Standard linear regression has nothing to tune |
| **Regularized variants** | Ridge, Lasso, Elastic Net handle multicollinearity and feature selection |

---

## Disadvantages

| Disadvantage | Explanation |
|---|---|
| **Assumes linearity** | Misses non-linear relationships entirely; a sine wave will be fit by a flat line |
| **Sensitive to outliers** | Squared loss gives outsized influence to extreme values; one outlier can tilt the entire line |
| **Multicollinearity problems** | Correlated features make coefficients unstable and uninterpretable |
| **No feature interactions** | Unless manually engineered, LR misses that "education AND experience" together matter more than either alone |
| **Underfitting risk** | Real relationships are rarely perfectly linear; LR will underfit complex patterns |
| **Extrapolation is dangerous** | The line extends forever; predictions far outside the training range are unreliable |
| **Sensitive to scale** | Coefficient magnitudes depend on feature scales; must standardize for fair comparison |
| **Doesn't handle categoricals natively** | Requires one-hot encoding or other manual encoding |

### When Linear Regression Fails

**Non-linear data**: If price vs. area follows a curve (diminishing returns at large areas), a straight line will systematically over-predict and under-predict in different regions.

**Heteroscedastic errors**: If prediction errors grow with the target (larger houses have larger price errors), the model's confidence intervals are wrong.

**Outliers**: A single mansion priced at ₹100Cr in a dataset of ₹50L houses will pull the line dramatically, ruining predictions for the majority.

---

## Common Interview Questions

### Beginner (1-10)

**1. What is linear regression?**
A supervised learning algorithm that models the relationship between features and a continuous target by fitting a linear equation. The model is $\hat{y} = \mathbf{w}^\top\mathbf{x} + w_0$, and the weights are learned by minimizing the sum of squared errors.

**2. What are the assumptions of linear regression?**
Linearity, independence of errors, homoscedasticity (constant error variance), normality of errors, and no perfect multicollinearity. Violation of these assumptions degrades the model's statistical guarantees (confidence intervals, p-values) but the least-squares estimates are still computable.

**3. What is the difference between simple and multiple linear regression?**
Simple: one feature ($\hat{y} = w_0 + w_1 x$). Multiple: multiple features ($\hat{y} = w_0 + w_1 x_1 + \cdots + w_d x_d$). The math generalizes seamlessly — the normal equation is the same in both cases.

**4. What does R-squared measure?**
The proportion of variance in the target explained by the model. $R^2 = 1$ means perfect fit. $R^2 = 0$ means the model is no better than predicting the mean. It can be negative if the model is worse than the mean (e.g., a terrible model applied to test data).

**5. Can R-squared be negative?**
Yes, on test data. If the model's predictions are worse than simply predicting the mean of y, $\text{SS}_{\text{res}} > \text{SS}_{\text{tot}}$, and $R^2 < 0$. This typically indicates the model is badly wrong or applied to out-of-distribution data.

**6. What is the cost function of linear regression?**
Mean Squared Error: $\mathcal{L} = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$. This is a convex function with a unique global minimum, making optimization straightforward.

**7. What is the Normal Equation?**
$\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$. It gives the optimal weights in closed form — no iteration needed. Derived by setting the gradient of the loss to zero.

**8. Why do we use squared error instead of absolute error?**
Squared error is differentiable everywhere (absolute error isn't at zero), gives a unique closed-form solution, corresponds to maximum likelihood under Gaussian noise, and penalizes large errors more heavily.

**9. What is the intercept in linear regression?**
The predicted value when all features are zero: $\hat{y} = w_0$ when $\mathbf{x} = \mathbf{0}$. It shifts the regression line up or down to fit the data's center of mass.

**10. Is linear regression a parametric or non-parametric algorithm?**
Parametric. It assumes a fixed functional form ($\hat{y} = \mathbf{w}^\top\mathbf{x} + w_0$) with a fixed number of parameters ($d+1$), regardless of the training set size.

### Intermediate (11-20)

**11. What is multicollinearity? How do you detect and fix it?**
When features are highly correlated, the matrix $\mathbf{X}^\top\mathbf{X}$ becomes nearly singular. Coefficients become unstable — small data changes cause large coefficient changes. Detect with VIF (Variance Inflation Factor) > 5-10, or correlation matrix > 0.8. Fix with Ridge regression, PCA, or dropping redundant features.

**12. What is regularization? Why is it needed?**
Adding a penalty on weight magnitude to the loss function. Ridge: $\alpha\|\mathbf{w}\|_2^2$. Lasso: $\alpha\|\mathbf{w}\|_1$. Needed when: (a) multicollinearity makes coefficients unstable, (b) too many features risk overfitting, (c) you want feature selection (Lasso).

**13. Derive the Normal Equation from scratch.**
Start with $\text{RSS} = (\mathbf{y} - \mathbf{X}\mathbf{w})^\top(\mathbf{y} - \mathbf{X}\mathbf{w})$. Expand. Take the gradient: $\nabla_\mathbf{w}\text{RSS} = -2\mathbf{X}^\top\mathbf{y} + 2\mathbf{X}^\top\mathbf{X}\mathbf{w}$. Set to zero: $\mathbf{X}^\top\mathbf{X}\mathbf{w} = \mathbf{X}^\top\mathbf{y}$. Solve: $\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$.

**14. When would you use Gradient Descent instead of the Normal Equation?**
When $d$ is large (> 10,000 features), making the $d^3$ matrix inverse prohibitive. When data arrives in a stream (online learning). When memory is limited (can't hold $\mathbf{X}^\top\mathbf{X}$ in memory).

**15. What is the difference between Ridge and Lasso?**
Ridge (L2) shrinks all coefficients proportionally — none go to exactly zero. Lasso (L1) can set coefficients to exactly zero, performing automatic feature selection. Lasso is preferred when you suspect many features are irrelevant. Ridge is preferred when most features contribute.

**16. How do you handle categorical variables in linear regression?**
One-hot encoding: convert each category to a binary column. For a feature with $k$ categories, create $k-1$ dummy variables (the $k$-th is implicit to avoid multicollinearity). E.g., `color ∈ {red, blue, green}` becomes two columns: `is_blue` and `is_green`. Red is the reference (both zeros).

**17. What is polynomial regression? Is it still "linear"?**
Yes. It's linear in the parameters, not the features. $\hat{y} = w_0 + w_1 x + w_2 x^2$ is "linear regression" because it's linear in $(w_0, w_1, w_2)$. The feature vector is $[1, x, x^2]$ — we've engineered non-linear features but the model is still a linear combination.

**18. What is heteroscedasticity? Why does it matter?**
Non-constant variance of errors. E.g., prediction errors grow with income level. It doesn't bias the coefficients, but standard errors and confidence intervals become wrong. Detect with residual plots (fan shape). Fix with weighted least squares or log-transforming the target.

**19. How do you evaluate linear regression beyond R-squared?**
Residual analysis (should be random, zero-mean, constant variance), RMSE (same units as target), MAE (robust to outliers), adjusted R-squared (penalizes complexity), AIC/BIC (model selection), cross-validation scores.

**20. What is the bias-variance tradeoff in linear regression?**
Simple LR: high bias (can't capture non-linearity), low variance (stable). Polynomial LR with high degree: low bias (fits training perfectly), high variance (changes drastically with different samples). Regularization reduces variance at the cost of slight bias increase.

### Advanced (21-30+)

**21. Prove that the OLS estimator is the Best Linear Unbiased Estimator (BLUE).**
This is the Gauss-Markov theorem. Under assumptions of linearity, independence, homoscedasticity, and no multicollinearity, OLS has the minimum variance among all unbiased linear estimators. The proof shows that any other linear unbiased estimator $\tilde{\mathbf{w}} = \mathbf{C}\mathbf{y}$ has covariance $\text{Cov}(\tilde{\mathbf{w}}) = \sigma^2(\mathbf{X}^\top\mathbf{X})^{-1} + \sigma^2\mathbf{D}^\top\mathbf{D}$ where $\mathbf{D} = \mathbf{C} - (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$. Since $\sigma^2\mathbf{D}^\top\mathbf{D}$ is PSD, OLS is always at least as efficient.

**22. What is the hat matrix? Why is it important?**
$\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$. It projects $\mathbf{y}$ onto the column space of $\mathbf{X}$. The diagonal elements $h_{ii}$ (leverage values) measure how influential each data point is. Points with high leverage can disproportionately affect the fit. $\text{tr}(\mathbf{H}) = d+1$ (the number of parameters).

**23. Explain the connection between Ridge regression and Bayesian linear regression.**
Ridge regression is equivalent to Bayesian linear regression with a Gaussian prior on the weights: $\mathbf{w} \sim \mathcal{N}(\mathbf{0}, \tau^2\mathbf{I})$. The Ridge solution $\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}$ is the MAP (Maximum A Posteriori) estimate where $\lambda = \sigma^2/\tau^2$.

**24. What happens when $n < d$ (more features than samples)?**
$\mathbf{X}^\top\mathbf{X}$ is rank-deficient (rank $\leq n < d+1$) and non-invertible. Infinitely many $\mathbf{w}$ achieve zero training error. The solution is under-determined. Regularization (Ridge, Lasso) makes the problem well-posed by adding $\lambda\mathbf{I}$ to $\mathbf{X}^\top\mathbf{X}$, ensuring invertibility.

**25. How does linear regression relate to neural networks?**
A neural network with one linear layer and no activation function IS linear regression: $\hat{y} = \mathbf{W}\mathbf{x} + \mathbf{b}$ trained with MSE loss. Adding non-linear activations and multiple layers generalizes this to arbitrary non-linear functions. Linear regression is the simplest possible neural network.

**26. Explain Cook's distance.**
Cook's distance measures the influence of each data point on all fitted values. For point $i$: $D_i = \frac{(\hat{\mathbf{y}} - \hat{\mathbf{y}}_{(i)})^\top(\hat{\mathbf{y}} - \hat{\mathbf{y}}_{(i)})}{(d+1)\hat{\sigma}^2}$ where $\hat{\mathbf{y}}_{(i)}$ is the prediction vector when point $i$ is removed. Points with $D_i > 1$ (or $> 4/n$) are highly influential and should be investigated.

**27. What is Weighted Least Squares (WLS)?**
When errors have non-constant variance (heteroscedasticity), WLS minimizes $\sum w_i(y_i - \hat{y}_i)^2$ where $w_i = 1/\text{Var}(\epsilon_i)$. Points with higher variance get lower weight. The solution: $\mathbf{w}^* = (\mathbf{X}^\top\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{W}\mathbf{y}$ where $\mathbf{W}$ is a diagonal weight matrix.

**28. Can linear regression be used for classification?**
Technically yes, but it's a bad idea. Fitting $\hat{y} = \mathbf{w}^\top\mathbf{x}$ with $y \in \{0, 1\}$ gives predictions outside [0,1], no probabilistic interpretation, and is heavily influenced by outliers. Logistic regression fixes this by wrapping the linear function in a sigmoid.

**29. What is the VIF (Variance Inflation Factor)?**
$\text{VIF}_j = \frac{1}{1 - R_j^2}$ where $R_j^2$ is the R-squared from regressing feature $j$ on all other features. VIF = 1 means no multicollinearity. VIF > 5 is concerning. VIF > 10 is severe. High VIF means the coefficient's standard error is inflated, making it unreliable.

**30. Compare OLS, Ridge, Lasso, and Elastic Net mathematically.**
All minimize $\|\mathbf{y} - \mathbf{X}\mathbf{w}\|_2^2 + \text{penalty}$. OLS: penalty = 0. Ridge: $\lambda\|\mathbf{w}\|_2^2$. Lasso: $\lambda\|\mathbf{w}\|_1$. Elastic Net: $\lambda[\rho\|\mathbf{w}\|_1 + (1-\rho)\|\mathbf{w}\|_2^2]$. Ridge has closed-form: $(\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}$. Lasso requires iterative optimization (no closed form due to L1's non-differentiability at 0).

**31. What is the geometric interpretation of the normal equation?**
The predicted values $\hat{\mathbf{y}} = \mathbf{Hy}$ are the orthogonal projection of $\mathbf{y}$ onto the column space of $\mathbf{X}$. The residual $\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}}$ is perpendicular to this subspace. The normal equation $\mathbf{X}^\top\mathbf{e} = \mathbf{0}$ literally says the residuals are normal (perpendicular) to every column of $\mathbf{X}$.

**32. How would you detect and handle non-linearity in linear regression?**
Detect: residual vs. fitted plots (should be random — a pattern indicates non-linearity), partial regression plots. Handle: add polynomial features, log/sqrt transforms, interaction terms, or switch to a non-linear model (trees, neural nets). Always try feature engineering before abandoning linearity.

---

## Common Mistakes

**1. Not scaling features before comparing coefficients**: If feature A is in meters (0–10) and feature B is in millimeters (0–10,000), their coefficients will differ by 1000× in magnitude. Standardize before interpreting relative importance.

**2. Using R-squared on training data only**: A high R-squared on training data means nothing if you don't check test data. A degree-100 polynomial has R-squared = 1.0 on training data but is useless.

**3. Ignoring multicollinearity**: If `total_rooms` and `total_bedrooms` are 98% correlated, their individual coefficients are meaningless — they can flip signs. Check VIF. Drop one or use Ridge.

**4. Extrapolating beyond training range**: Your model learned from houses sized 500–3000 sq ft. Don't predict the price of a 50,000 sq ft mansion — the linear relationship almost certainly doesn't hold there.

**5. Not checking residuals**: Residuals should be random, zero-mean, and constant-variance. Patterns in residual plots indicate violated assumptions: a curve means non-linearity, a fan shape means heteroscedasticity.

**6. Fitting the scaler on test data**:
```python
# WRONG: leaks test information
scaler.fit(X)
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)

# RIGHT: fit only on training data
scaler.fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)
```

**7. Using linear regression for classification**: The model predicts continuous values, not probabilities. Predictions can be > 1 or < 0, which makes no sense for binary classification. Use logistic regression instead.

**8. Adding too many polynomial features**: $d$ features with degree $p$ creates $\binom{d+p}{p}$ features. With $d=10$ and $p=5$, that's 3,003 features from 10 — massive overfitting risk. Use regularization (Ridge/Lasso) or limit the degree.

**9. Not handling outliers**: One outlier can drag the entire regression line. Check for high-leverage points (hat matrix diagonal) and high-influence points (Cook's distance). Consider robust regression or removing outliers.

**10. Assuming causation from correlation**: Linear regression tells you "Feature A is associated with higher price." It does NOT tell you "Feature A causes higher price." The coefficient reflects correlation in the training data, not causal mechanism.

---

## Real Industry Applications

### Google
**Ad pricing**: Google uses regression models to predict click-through rates and conversion values. The expected revenue per impression is modeled as a function of user features, ad features, and context. While deep models handle the heavy lifting now, linear regression serves as the baseline and the final calibration layer.

### Amazon
**Demand forecasting**: Predicting how many units of each product will sell next week, from price, season, promotions, competitor pricing, and historical sales. Linear regression and its variants form the backbone of Amazon's supply chain planning.

### Netflix
**Content valuation**: Estimating the expected viewership of a new show from genre, cast, director, release timing, marketing spend, and similar-show performance. Linear models provide interpretable baseline predictions that inform multi-million dollar content decisions.

### Meta
**A/B test analysis**: When Facebook runs an A/B test (new feature vs. control), regression analysis isolates the treatment effect while controlling for confounding variables (user demographics, device, time of day). This is the standard statistical framework for experiment analysis.

### Uber
**ETA and pricing**: Predicting trip duration and surge pricing multipliers from distance, time of day, traffic conditions, weather, and demand. Linear models were the first pricing models; they've evolved into more complex systems but the linear baseline persists.

### Banks
**Credit risk modeling**: Predicting the probability of loan default from income, debt-to-income ratio, credit history, and employment length. Regulatory frameworks (Basel accords) require interpretable models, making linear and logistic regression the standards in banking.

### Startups
**Revenue projection**: Early-stage startups with limited data often use linear regression to project revenue from ad spend, user acquisition cost, and market size. Simplicity and interpretability matter when presenting to investors.

---

## Comparison With Similar Algorithms

| Criterion | Linear Regression | Decision Tree Regressor | Random Forest | SVR (Support Vector Regression) | Neural Network |
|-----------|-------------------|------------------------|---------------|--------------------------------|----------------|
| **Type** | Parametric, linear | Non-parametric, non-linear | Ensemble, non-linear | Parametric (kernel) | Non-parametric, non-linear |
| **Training Speed** | Very fast ($O(nd^2)$) | Fast ($O(nd\log n)$) | Moderate | Slow ($O(n^2 d)$) | Slow (depends on arch) |
| **Prediction Speed** | Very fast ($O(d)$) | Very fast ($O(\log n)$) | Fast ($O(T\log n)$) | Moderate ($O(n_{sv}\cdot d)$) | Fast ($O(\text{params})$) |
| **Interpretability** | Excellent (coefficients) | Good (tree rules) | Low (ensemble) | Low (kernel space) | Very low (black box) |
| **Handles Non-Linearity** | No (without feature eng.) | Yes | Yes | Yes (kernel) | Yes |
| **Handles Interactions** | No (without feature eng.) | Yes (naturally) | Yes | Yes | Yes |
| **Overfitting Risk** | Low (simple model) | High (deep trees) | Low (averaged) | Moderate | High (large networks) |
| **Feature Scaling Needed** | Only for coefficient comparison | No | No | Yes | Yes |
| **Missing Values** | Must handle manually | Handles natively | Handles natively | Must handle manually | Must handle manually |
| **Outlier Sensitivity** | High (L2 loss) | Low (splits) | Low (averaged) | Low (margin-based) | Moderate |

### When to Choose Linear Regression

- The relationship is approximately linear
- You need interpretable coefficients (regulatory, medical, legal)
- You have limited data (LR is very data-efficient)
- You need a quick baseline
- Speed is critical (real-time prediction at massive scale)
- You need confidence intervals and hypothesis tests

### When to Choose Something Else

- Strong non-linear patterns (trees, neural nets)
- Many feature interactions (trees, neural nets)
- Image/text/audio data (deep learning)
- Need state-of-the-art accuracy on tabular data (XGBoost, LightGBM)

---

## Advanced Topics

### Regularized Regression: Closed-Form Solutions

**Ridge Regression**:

$$
\mathbf{w}^*_{\text{Ridge}} = (\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}
$$

> ##### Adding lambda times identity to X^T X guarantees invertibility and shrinks coefficients. Always invertible, even when n < d.

**Lasso Regression** (no closed form — requires coordinate descent or ISTA):

$$
\mathbf{w}^*_{\text{Lasso}} = \arg\min_{\mathbf{w}} \; \|\mathbf{y} - \mathbf{X}\mathbf{w}\|_2^2 + \lambda\|\mathbf{w}\|_1
$$

> ##### L1 penalty induces sparsity. Some coefficients go to exactly zero — built-in feature selection.

### Bayesian Linear Regression

Instead of point estimates, Bayesian LR gives a full posterior distribution over weights:

$$
P(\mathbf{w} \mid \mathbf{X}, \mathbf{y}) = \frac{P(\mathbf{y} \mid \mathbf{X}, \mathbf{w}) \cdot P(\mathbf{w})}{P(\mathbf{y} \mid \mathbf{X})}
$$

> ##### Posterior = (likelihood times prior) / evidence. We get uncertainty estimates for free.

With Gaussian prior $\mathbf{w} \sim \mathcal{N}(\mathbf{0}, \tau^2\mathbf{I})$ and Gaussian likelihood, the posterior is also Gaussian:

$$
\mathbf{w} \mid \mathbf{X}, \mathbf{y} \sim \mathcal{N}\left(\mathbf{m}_n, \mathbf{S}_n\right)
$$

where $\mathbf{S}_n = (\sigma^{-2}\mathbf{X}^\top\mathbf{X} + \tau^{-2}\mathbf{I})^{-1}$ and $\mathbf{m}_n = \sigma^{-2}\mathbf{S}_n\mathbf{X}^\top\mathbf{y}$.

The posterior mean is the Ridge solution. But Bayesian LR also gives you uncertainty: wider posterior = less confident prediction. This is invaluable in medicine, finance, and safety-critical applications.

### Quantile Regression

Instead of predicting the mean, predict the $\tau$-th quantile (median, 90th percentile, etc.):

$$
\min_{\mathbf{w}} \sum_{i=1}^{n} \rho_\tau(y_i - \mathbf{w}^\top\mathbf{x}_i)
$$

where $\rho_\tau(u) = u(\tau - \mathbb{1}(u < 0))$ is the check function (tilted absolute value).

Used in finance (Value at Risk), logistics (worst-case delivery time), and any domain where you care about the tails, not just the average.

### Key Research Papers

1. **Gauss (1809)**: *Theoria Motus* — connects least squares to maximum likelihood under Gaussianity.
2. **Galton (1886)**: *Regression Towards Mediocrity* — coins the term "regression."
3. **Hoerl & Kennard (1970)**: *Ridge Regression: Biased Estimation for Nonorthogonal Problems* — introduces Ridge.
4. **Tibshirani (1996)**: *Regression Shrinkage and Selection via the Lasso* — introduces Lasso. One of the most cited stats papers ever.
5. **Zou & Hastie (2005)**: *Regularization and Variable Selection via the Elastic Net* — introduces Elastic Net.

---

## Best Practices

### Data Preparation

**1. Handle missing values**: Impute (mean, median, KNN imputation) or drop. Linear regression cannot handle NaN.

**2. Scale features**: StandardScaler for interpretable coefficients and stable gradient descent. MinMaxScaler if you need bounded features.

**3. Encode categoricals**: One-hot encoding with $k-1$ dummies. Or target encoding for high-cardinality categoricals.

**4. Remove outliers**: Use IQR rule, Z-score thresholding, or Cook's distance. Or use robust regression (Huber loss).

### Feature Engineering

**5. Check linearity**: Plot each feature vs. target. If curved, try log, sqrt, or polynomial transforms.

**6. Create interactions**: If `x1 * x2` might matter, add it as a feature.

**7. Domain knowledge**: A feature like `price_per_sqft = price / area` might be more predictive than raw `price` and `area` separately.

### Hyperparameter Tuning

**8. Use cross-validation for alpha**: GridSearchCV or RidgeCV / LassoCV with built-in cross-validation.

**9. Start simple**: Train ordinary LR first. Only add regularization if overfitting or multicollinearity is detected.

### Production Deployment

**10. Serialize the model**: Save weights as a simple JSON/NumPy file. LR is trivially deployable — it's just a dot product.

**11. Monitor for data drift**: If the feature distribution shifts (e.g., new market conditions), retrain.

**12. Log predictions and actuals**: Compute ongoing RMSE to detect model degradation.

---

## Complete End-to-End Project

### Boston-Style Housing Price Prediction

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.pipeline import Pipeline


# LOAD DATA
data = fetch_california_housing()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = pd.Series(data.target, name='MedHouseVal')

print("Dataset Shape:", X.shape)
print("\nFeature Statistics:")
print(X.describe().round(2))
print(f"\nTarget range: [{y.min():.2f}, {y.max():.2f}]")
print(f"Target mean: {y.mean():.2f}")


# EXPLORATORY DATA ANALYSIS
fig, axes = plt.subplots(2, 4, figsize=(20, 10))
for ax, col in zip(axes.ravel(), X.columns):
    ax.scatter(X[col], y, alpha=0.1, s=5)
    ax.set_xlabel(col, fontsize=10)
    ax.set_ylabel('Price', fontsize=10)
    ax.set_title(f'{col} vs Price', fontsize=11, fontweight='bold')
plt.suptitle('Feature vs Target Scatter Plots', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# Correlation heatmap
plt.figure(figsize=(10, 8))
full_data = X.copy()
full_data['Price'] = y
sns.heatmap(full_data.corr(), annot=True, cmap='coolwarm', fmt='.2f',
            linewidths=0.5, square=True)
plt.title('Feature Correlation Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()


# TRAIN-TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"\nTrain: {X_train.shape[0]}, Test: {X_test.shape[0]}")


# MODEL COMPARISON
models = {
    'Linear Regression': LinearRegression(),
    'Ridge (alpha=1)': Ridge(alpha=1.0),
    'Ridge (alpha=10)': Ridge(alpha=10.0),
    'Lasso (alpha=0.01)': Lasso(alpha=0.01),
    'Lasso (alpha=0.1)': Lasso(alpha=0.1),
    'Elastic Net': ElasticNet(alpha=0.01, l1_ratio=0.5),
}

results = []
for name, model in models.items():
    pipe = Pipeline([
        ('scaler', StandardScaler()),
        ('model', model)
    ])
    pipe.fit(X_train, y_train)
    y_pred = pipe.predict(X_test)

    cv_scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring='r2')

    results.append({
        'Model': name,
        'Train R2': pipe.score(X_train, y_train),
        'Test R2': pipe.score(X_test, y_test),
        'CV R2 (mean)': cv_scores.mean(),
        'RMSE': np.sqrt(mean_squared_error(y_test, y_pred)),
        'MAE': mean_absolute_error(y_test, y_pred),
    })

results_df = pd.DataFrame(results)
print("\n Model Comparison")
print(results_df.to_string(index=False))


# BEST MODEL: Ridge with GridSearchCV
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('ridge', Ridge())
])

param_grid = {'ridge__alpha': np.logspace(-3, 3, 50)}
grid = GridSearchCV(pipe, param_grid, cv=5, scoring='r2', n_jobs=-1)
grid.fit(X_train, y_train)

print(f"\nBest alpha: {grid.best_params_['ridge__alpha']:.4f}")
print(f"Best CV R2: {grid.best_score_:.4f}")
print(f"Test R2: {grid.score(X_test, y_test):.4f}")


# VISUALIZATION: Actual vs Predicted
best_model = grid.best_estimator_
y_pred = best_model.predict(X_test)

plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred, alpha=0.3, s=10, edgecolors='black', linewidth=0.3)
plt.plot([0, 5], [0, 5], 'r--', linewidth=2, label='Perfect')
plt.xlabel('Actual Price ($100K)', fontsize=12)
plt.ylabel('Predicted Price ($100K)', fontsize=12)
plt.title('Ridge Regression: Actual vs Predicted', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


# FEATURE IMPORTANCE
feature_weights = best_model.named_steps['ridge'].coef_
sorted_idx = np.argsort(np.abs(feature_weights))

plt.figure(figsize=(8, 6))
plt.barh(np.array(data.feature_names)[sorted_idx],
         feature_weights[sorted_idx], color='steelblue')
plt.xlabel('Coefficient Value (standardized)', fontsize=12)
plt.title('Feature Importance', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()


# DEPLOYMENT NOTES
print("\n Deployment Considerations")
print(f"Model: Ridge Regression (alpha={grid.best_params_['ridge__alpha']:.4f})")
print(f"Features: {X.shape[1]}")
print(f"Scaler: StandardScaler (must save mean and std)")
print(f"Prediction: y = w0 + w1*x1_scaled + ... + wd*xd_scaled")
print(f"Memory: {(X.shape[1] + 1) * 8 / 1024:.3f} KB (weights only)")
print(f"Latency: ~microseconds per prediction (one dot product)")
```

---

## Cheat Sheet

### Key Formulas

| Formula | Description |
|---------|-------------|
| $\hat{y} = \mathbf{w}^\top\mathbf{x} + w_0$ | Model equation |
| $\mathcal{L} = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$ | MSE loss function |
| $\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$ | Normal Equation |
| $\mathbf{w}_{t+1} = \mathbf{w}_t - \eta\nabla\mathcal{L}$ | Gradient descent update |
| $R^2 = 1 - \text{SS}_\text{res}/\text{SS}_\text{tot}$ | Coefficient of determination |
| $\mathbf{w}^*_\text{Ridge} = (\mathbf{X}^\top\mathbf{X}+\lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}$ | Ridge regression |

### Key Concepts

| Concept | Summary |
|---------|---------|
| **Parametric** | Fixed number of parameters ($d+1$); learns a function |
| **Convex loss** | One global minimum; no local traps |
| **BLUE** | Best Linear Unbiased Estimator (Gauss-Markov) |
| **Hat matrix** | $\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$; projects y onto column space of X |
| **MLE connection** | Least squares = MLE under Gaussian noise |

### Pros and Cons Summary

| Pros | Cons |
|------|------|
| Closed-form solution | Assumes linearity |
| Highly interpretable | Sensitive to outliers |
| Fast training and prediction | Multicollinearity issues |
| No hyperparameters (OLS) | Can't capture interactions natively |
| Well-understood theory | Extrapolation is dangerous |
| Excellent baseline | Underfits complex patterns |

### Quick Interview Points

- Linear regression minimizes MSE via the Normal Equation or Gradient Descent
- The loss surface is convex (quadratic bowl) — one global minimum
- Normal Equation: $O(d^3)$ — use GD when $d$ is large
- R-squared can be negative on test data
- Ridge = L2 penalty (shrinks coefficients), Lasso = L1 (feature selection)
- OLS is BLUE under Gauss-Markov assumptions
- Polynomial regression is still "linear" — linear in parameters, not features
- Always check residual plots for pattern detection
- Multicollinearity detected via VIF > 5-10
- Linear regression is the simplest neural network (one linear layer, no activation)

---

## Revision Notes

### For Placements and ML Interviews

**1. Definition**: Supervised algorithm that fits $\hat{y} = \mathbf{w}^\top\mathbf{x} + w_0$ by minimizing MSE. Parametric, eager learner.

**2. Normal Equation**: $\mathbf{w}^* = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$. Derived by setting gradient of RSS to zero. Requires invertible $\mathbf{X}^\top\mathbf{X}$.

**3. Gradient Descent**: $\mathbf{w}_{t+1} = \mathbf{w}_t - \eta \cdot \frac{-2}{n}\mathbf{X}^\top(\mathbf{y} - \mathbf{X}\mathbf{w}_t)$. Use when $d$ is large.

**4. Assumptions**: Linearity, independence, homoscedasticity, normality, no multicollinearity.

**5. Evaluation**: R-squared (variance explained), RMSE (same units as target), MAE (robust), adjusted R-squared (penalizes complexity).

**6. Regularization**: Ridge ($\lambda\|\mathbf{w}\|_2^2$) — shrinks all. Lasso ($\lambda\|\mathbf{w}\|_1$) — zeroes some. Elastic Net — both.

**7. Gauss-Markov**: Under assumptions, OLS is BLUE (minimum variance among linear unbiased estimators).

**8. MLE connection**: Least squares = maximum likelihood under Gaussian noise.

**9. Bias-variance**: Simple LR = high bias, low variance. High-degree polynomial = low bias, high variance.

**10. Complexity**: Normal Equation $O(nd^2 + d^3)$. GD $O(Tnd)$. Prediction $O(d)$.

### For Data Science Interviews

- Know the **full pipeline**: EDA → feature engineering → scaling → train → residual analysis → iterate
- Be ready to **derive the Normal Equation** from scratch (gradient of RSS = 0)
- Explain **when to use Ridge vs. Lasso** (correlated features → Ridge; feature selection → Lasso)
- Discuss **residual diagnostics**: patterns mean violated assumptions
- Connect LR to **CAPM** (finance), **marketing mix modeling**, **A/B test analysis**
- Know that polynomial regression is linear in parameters
- Explain **Cook's distance** and **leverage** for influential point detection

### For Exams

- Memorize: Normal Equation, MSE formula, R-squared formula, Ridge closed-form
- Derive: Normal Equation from RSS (expand, differentiate, set to zero, solve)
- Work through: a small numerical example by hand (2x2 matrix inverse)
- Compare: OLS vs. Ridge vs. Lasso (table format)
- Explain: bias-variance tradeoff with polynomial degree

---

## Learning Path

### Prerequisites

| Topic | Why |
|-------|-----|
| Basic linear algebra (vectors, matrices, dot product) | Normal equation, matrix operations |
| Calculus (derivatives, gradients) | Optimization, gradient descent |
| Basic probability and statistics | MLE, distributions, hypothesis testing |
| Python + NumPy | Implementation |

### Related Algorithms

| Algorithm | Relationship |
|-----------|-------------|
| Logistic Regression | Same framework but for classification (sigmoid + cross-entropy) |
| Polynomial Regression | Linear regression with engineered polynomial features |
| Ridge / Lasso / Elastic Net | Regularized variants of linear regression |
| Generalized Linear Models (GLMs) | Extend LR to non-Gaussian targets (Poisson, Binomial) |

### Next Algorithms to Learn

| Order | Algorithm | Why Next |
|-------|-----------|----------|
| 1 | Logistic Regression | Classification version of LR; introduces sigmoid and cross-entropy |
| 2 | K-Nearest Neighbors | Non-parametric contrast; no assumptions, instance-based |
| 3 | Decision Trees | Non-linear, handles interactions, foundation for ensembles |
| 4 | Support Vector Machines | Margin-based learning; kernel trick for non-linearity |
| 5 | Neural Networks | Non-linear generalization of LR; deep learning foundation |
| 6 | XGBoost / LightGBM | State-of-the-art for tabular data; ensemble of trees |

### Advanced Concepts Built Upon Linear Regression

| Concept | Description |
|---------|-------------|
| **Generalized Linear Models** | Extend LR to Poisson (counts), Binomial (binary), Gamma (positive continuous) via link functions |
| **Mixed Effects Models** | LR with random intercepts/slopes for grouped data (patients in hospitals, students in schools) |
| **Time Series Regression** | LR with lagged features, seasonality, and autocorrelated errors (ARIMA connection) |
| **Structural Equation Modeling** | Systems of linear regressions with latent variables |
| **Causal Inference** | Instrumental variables, difference-in-differences, regression discontinuity — all built on regression |
| **Neural Networks** | A neural network without activations is literally linear regression. Adding non-linearities generalizes it |
| **Gaussian Processes** | The Bayesian non-parametric extension: infinite-dimensional linear regression in a reproducing kernel Hilbert space |

Linear regression is not just an algorithm. It's a way of thinking. Every model you'll ever build — from logistic regression to transformers — starts with the same question: *What is the best linear approximation?* And then generalizes from there. Master this, and you have the foundation for everything that follows.

