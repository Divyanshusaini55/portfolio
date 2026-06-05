---
title: "K-Nearest Neighbors (KNN)"
description: "From First Principles to Production: The Complete Guide to K-Nearest Neighbors"
author: divyanshu saini
authorLink: https://divyanshusaini.me
order: 5
---
#### from the paper, Nearest Neighbor Pattern Classification by: [Thomas M. Cover and Peter E. Hart](https://doi.org/10.1109/TIT.1967.1053964) — IEEE Transactions on Information Theory, 1967

## Introduction

K-Nearest Neighbors is probably the most human algorithm in all of machine learning. It does exactly what you'd do if someone handed you a mystery fruit and asked, "Is this an apple or an orange?" You'd look at the fruits around it. You'd see what it most closely resembles. And you'd say, "Well, the five fruits closest to it are all apples, so... it's probably an apple."

That's KNN. The entire algorithm.

**Definition**: K-Nearest Neighbors (KNN) is a non-parametric, instance-based (lazy) supervised learning algorithm that classifies a new data point (or predicts its value) based on the majority vote (or average) of its $K$ closest neighbors in the feature space.

**Purpose**: KNN exists to solve classification and regression problems without making any assumptions about the underlying data distribution. Unlike most algorithms that learn a model during training, KNN memorizes the entire training dataset and defers all computation to prediction time.

**Why it exists**: Most machine learning algorithms try to find a mathematical function that separates data — a line, a curve, a hyperplane. But what if the boundary between classes is so irregular, so jagged, so organic that no simple function can capture it? KNN sidesteps this problem entirely. It doesn't learn a boundary. It just asks, "What are you closest to?"

**Problem it solves**: Given a dataset of labeled examples, predict the label of a new, unseen data point by finding the $K$ training examples that are most similar to it and using their labels to make a prediction.

### Historical Background

The algorithm has roots in statistical pattern recognition dating back to the early 1950s. Evelyn Fix and Joseph Hodges Jr. published a technical report in 1951 at UC Berkeley titled *"Discriminatory Analysis: Nonparametric Discrimination, Consistency Properties"* — the first formal treatment of nearest-neighbor classification. Their work was largely overlooked at the time.

It wasn't until 1967, when Thomas Cover and Peter Hart published their landmark paper *"Nearest Neighbor Pattern Classification"*, that the theoretical foundations were rigorously established. They proved something remarkable: as the number of training samples approaches infinity, the error rate of the 1-NN classifier is never more than twice the Bayes optimal error rate (the theoretical best any classifier can achieve). This result stunned the community — an algorithm with zero learning, zero parameters, zero assumptions was guaranteed to be within a factor of two of perfection.

In the decades since, KNN has evolved from a theoretical curiosity to a practical workhorse. The rise of approximate nearest neighbor (ANN) algorithms — locality-sensitive hashing, KD-trees, ball trees, HNSW graphs — has made it viable even at massive scale. Today, every time you search for similar images on Google Photos, get a recommendation on Spotify, or have your credit card transaction flagged for fraud, some variant of nearest-neighbor search is involved.

### Real-World Intuition

Imagine you move to a new city. You don't know any restaurants. Your friend says, "Just go to the neighborhood with the best restaurants near your apartment." You open Google Maps, find the five closest restaurants, and look at their ratings. If four out of five are rated 4.5 stars or above, you conclude you're in a good food neighborhood.

You didn't build a statistical model. You didn't fit a regression. You just looked at what was nearby and made a decision. That's KNN.

Or think about real estate. You want to know how much your house is worth. What do you do? You look at comparable sales — houses similar to yours that recently sold. If the three most similar houses sold for ₹80L, ₹85L, and ₹82L, you'd estimate yours at around ₹82.3L (the average). That's KNN regression.

---

## Motivation

### Why Traditional Methods Fail

Consider a dataset where Class A forms a donut shape and Class B sits in the center hole. A linear classifier (like logistic regression) draws a straight line. It will fail catastrophically — no line can separate a donut from its center. A polynomial classifier might work if you guess the right degree, but you're making assumptions about the shape.

KNN doesn't care about shapes. It doesn't draw any boundary at all. When a new point arrives, it just looks at what's nearby. If the nearest neighbors are all Class A, it says Class A. If they're Class B, it says Class B. The boundary emerges naturally, organically, from the data itself.

Traditional parametric methods fail when:
- **The decision boundary is highly non-linear** — no polynomial or kernel trick captures it
- **The data distribution is unknown** — you can't assume Gaussian, Poisson, or any parametric form
- **The relationship between features is complex** — interactions, non-monotonic relationships, local patterns
- **You need a quick baseline** — you don't have time to tune a complex model
- **Interpretability at the instance level matters** — you need to explain *why* a specific prediction was made by pointing to actual examples

### Why KNN Was Developed

KNN emerged from a fundamental question in statistics: *Can we classify without making distributional assumptions?* The answer is yes, and the price you pay is computational — you trade modeling effort for prediction-time computation.

### Practical Business Problems

| Industry | Problem | How KNN Helps |
|---|---|---|
| **E-commerce** | Product recommendation | Find products similar to what a user has bought/viewed based on feature vectors |
| **Finance** | Credit scoring & fraud detection | Flag transactions similar to known fraudulent ones; assign credit scores based on similar borrower profiles |
| **Healthcare** | Disease diagnosis | Classify a patient's condition based on similar patient records; predict drug response |
| **Recommendation Systems** | Collaborative filtering | Find users similar to you; recommend what they liked but you haven't seen |
| **Cybersecurity** | Intrusion detection | Flag network traffic patterns similar to known attacks |
| **Marketing** | Customer segmentation | Group customers by similarity to existing segments for targeted campaigns |

**E-commerce Example**: Amazon's "Customers who bought this also bought..." is conceptually a nearest-neighbor problem. Each product is a vector (price, category, reviews, purchase patterns). For a given product, find the K nearest products in this space. Those are your recommendations.

**Finance Example**: When your credit card company calls to verify a suspicious transaction, they've likely flagged it because it's "close" to known fraudulent transactions in a feature space of (amount, location, time, merchant category, velocity). KNN variants power many real-time fraud detection systems.

**Healthcare Example**: A pathologist analyzing a cell image can use KNN to classify it as benign or malignant by comparing its features (cell size, shape, texture) to a database of previously classified cells. The algorithm says, "Of the 7 most similar cells we've seen before, 6 were malignant." That's a powerful diagnostic signal.

---

## Core Intuition

Let's build intuition without any math.

### The Neighborhood Analogy

You're at a party. You don't know anyone. You want to figure out if the party is for engineers or artists. What do you do? You look at the people standing closest to you. If 4 out of 5 are wearing band t-shirts and talking about oil paintings, you're at an art party. If they're debating Rust vs. Go, it's an engineering party.

You didn't survey the whole room. You didn't build a model of party demographics. You looked at your neighborhood.

### What Does KNN Actually Do?

**Store everything**: During "training," KNN does literally nothing except memorize the entire dataset. No computation. No learning. Just storage.

**Measure distance**: When a new point arrives, KNN measures how "far" it is from every stored point. "Far" means different things depending on the distance metric — Euclidean distance (straight-line), Manhattan distance (grid-walking), or others.

**Find the K closest**: Sort all training points by distance. Pick the K nearest ones.

**Vote (classification)**: The K neighbors vote. The majority class wins. If K=5 and three neighbors are "cat" and two are "dog," the prediction is "cat."

**Average (regression)**: For regression, instead of voting, average the values of the K neighbors. If the 3 nearest houses sold for ₹80L, ₹85L, ₹82L, predict ₹82.3L.

### What Is the Algorithm Trying to Learn?

Nothing. And that's the point.

KNN is a **lazy learner** — it defers all computation to prediction time. It doesn't learn a function, a boundary, or parameters. It assumes that the answer to "What is this?" is best answered by "What is it most similar to?"

The underlying assumption is deceptively powerful: **points that are close in feature space are likely to have the same label.** This is called the *smoothness assumption* or *local continuity assumption*. It says that reality is locally consistent — your house price is probably similar to your neighbor's house price. A tumor with similar cell features to a known malignant tumor is probably malignant too.

### Visual Thinking

Imagine a 2D scatter plot with red and blue dots. A new green dot appears. KNN draws a circle around the green dot, expanding until it captures K points. Then it counts: how many red? How many blue? Majority wins.

```
         ·R    ·R
     ·B        ·R
         ·B
    ·B      ·? ← new point
         ·R
     ·B
         ·B     ·R
```

If K=3, the three closest points to `?` might be: B, R, B → predict **Blue**.
If K=5, the five closest might be: B, R, B, R, R → predict **Red**.

The choice of K changes the prediction. This is why K is the most important hyperparameter.

---

## Mathematical Foundation

### Distance Metrics

The heart of KNN is measuring "closeness." Everything depends on how you define distance.

Given two points $\mathbf{x} = (x_1, x_2, \ldots, x_d)$ and $\mathbf{y} = (y_1, y_2, \ldots, y_d)$ in $d$-dimensional space:

#### Euclidean Distance (L2 Norm)

$$
d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^{d} (x_i - y_i)^2}
$$

> ##### Straight-line distance. The most intuitive: it's the length of the line segment connecting two points.

- $x_i, y_i$: the $i$-th feature (coordinate) of points $\mathbf{x}$ and $\mathbf{y}$
- $d$: the number of features (dimensions)
- $(x_i - y_i)^2$: squared difference in the $i$-th dimension — squaring ensures positive values and penalizes large deviations more
- $\sum$: sum across all dimensions — we consider every feature
- $\sqrt{\cdot}$: square root brings the units back to the original scale

This is the most commonly used distance metric. It assumes all features are equally important and measured on the same scale (which is why **feature scaling is critical**).

#### Manhattan Distance (L1 Norm)

$$
d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^{d} |x_i - y_i|
$$

> ##### City-block distance. Walk along grid lines, no diagonals. Like navigating Manhattan streets.

Manhattan distance sums absolute differences rather than squared differences. It's more robust to outliers because it doesn't square large deviations.

#### Minkowski Distance (Generalized)

$$
d(\mathbf{x}, \mathbf{y}) = \left( \sum_{i=1}^{d} |x_i - y_i|^p \right)^{1/p}
$$

> ##### The general form. Set p=1 for Manhattan, p=2 for Euclidean, p→∞ for Chebyshev (max difference).

- $p$: the order parameter
  - $p = 1$: Manhattan distance
  - $p = 2$: Euclidean distance
  - $p \to \infty$: Chebyshev distance $= \max_i |x_i - y_i|$ (maximum difference across any single dimension)

#### Cosine Distance

$$
d(\mathbf{x}, \mathbf{y}) = 1 - \frac{\mathbf{x} \cdot \mathbf{y}}{\|\mathbf{x}\| \cdot \|\mathbf{y}\|}
= 1 - \frac{\sum_{i=1}^{d} x_i y_i}{\sqrt{\sum_{i=1}^{d} x_i^2} \cdot \sqrt{\sum_{i=1}^{d} y_i^2}}
$$

> ##### Measures the angle between vectors, not their magnitude. Two documents with the same word ratios but different lengths have cosine distance ≈ 0.

Cosine distance is essential for text data (TF-IDF vectors, embeddings) where the direction matters more than the magnitude.

#### Hamming Distance

$$
d(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^{d} \mathbb{1}(x_i \neq y_i)
$$

> ##### Count the number of positions where the two vectors differ. Used for categorical or binary data.

### Feature Scaling: Why It Matters

Consider two features: `age` (range: 0–100) and `salary` (range: 0–1,000,000). Without scaling, the Euclidean distance is completely dominated by salary:

$$
d = \sqrt{(25 - 30)^2 + (50000 - 80000)^2} = \sqrt{25 + 900000000} \approx 30000
$$

> ##### The age difference of 5 years is completely invisible compared to the salary difference of 30,000.

The 5-year age difference contributes 25 to the sum. The ₹30,000 salary difference contributes 900,000,000. Age is essentially ignored.

**Solution**: Normalize all features to the same scale.

**Min-Max Scaling**:

$$
x_i' = \frac{x_i - \min(x_i)}{\max(x_i) - \min(x_i)}
$$

> ##### Rescale to [0, 1]. Every feature now has equal range.

**Standardization (Z-score)**:

$$
x_i' = \frac{x_i - \mu_i}{\sigma_i}
$$

> ##### Rescale to mean=0, std=1. Centers the data and equalizes variance.

Both ensure that no single feature dominates the distance calculation simply because of its scale.

---

## Mathematical Formulation

### Classification

Given a training set $\mathcal{D} = \{(\mathbf{x}_1, y_1), (\mathbf{x}_2, y_2), \ldots, (\mathbf{x}_n, y_n)\}$ where $\mathbf{x}_i \in \mathbb{R}^d$ and $y_i \in \{1, 2, \ldots, C\}$ (C classes), and a query point $\mathbf{x}_q$:

**Step 1**: Compute distances from $\mathbf{x}_q$ to all training points:

$$
d_i = d(\mathbf{x}_q, \mathbf{x}_i) \quad \forall \; i \in \{1, \ldots, n\}
$$

> ##### Measure the distance from the query to every single training point.

**Step 2**: Find the set $\mathcal{N}_K(\mathbf{x}_q)$ of K nearest neighbors:

$$
\mathcal{N}_K(\mathbf{x}_q) = \underset{S \subseteq \mathcal{D}, |S|=K}{\arg\min} \sum_{(\mathbf{x}_i, y_i) \in S} d(\mathbf{x}_q, \mathbf{x}_i)
$$

> ##### Select the K training points closest to the query. This is the "neighborhood."

**Step 3**: Predict via majority vote:

$$
\hat{y} = \underset{c \in \{1, \ldots, C\}}{\arg\max} \sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} \mathbb{1}(y_i = c)
$$

> ##### Count how many of the K neighbors belong to each class. The class with the most votes wins.

- $\hat{y}$: the predicted class label
- $\mathbb{1}(y_i = c)$: the indicator function — equals 1 if neighbor $i$ has class $c$, else 0
- $\arg\max$: return the class $c$ that maximizes the count

#### Weighted Voting

In standard KNN, all K neighbors get an equal vote. But shouldn't closer neighbors have more influence? **Weighted KNN** assigns a weight inversely proportional to distance:

$$
w_i = \frac{1}{d(\mathbf{x}_q, \mathbf{x}_i)^2}
$$

> ##### Closer neighbors get exponentially more voting power. A neighbor at distance 1 has 100× the weight of one at distance 10.

The weighted prediction becomes:

$$
\hat{y} = \underset{c}{\arg\max} \sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} w_i \cdot \mathbb{1}(y_i = c)
$$

> ##### Same voting, but now each vote is weighted by closeness. Nearby neighbors dominate the decision.

### Regression

For regression (continuous target), replace voting with averaging:

**Unweighted**:

$$
\hat{y} = \frac{1}{K} \sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} y_i
$$

> ##### Simple average of the K nearest neighbors' target values.

**Weighted**:

$$
\hat{y} = \frac{\sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} w_i \cdot y_i}{\sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} w_i}
$$

> ##### Weighted average. Closer neighbors contribute more to the predicted value.

### Probabilistic Interpretation

KNN can also output class probabilities:

$$
P(y = c \mid \mathbf{x}_q) = \frac{1}{K} \sum_{(\mathbf{x}_i, y_i) \in \mathcal{N}_K(\mathbf{x}_q)} \mathbb{1}(y_i = c)
$$

> ##### The probability of class c is the fraction of K neighbors that belong to class c.

If K=5 and 3 neighbors are Class A, then $P(y = A \mid \mathbf{x}_q) = 3/5 = 0.6$. This gives you a confidence measure, not just a hard prediction.

### The Objective: What KNN Optimizes

KNN doesn't have a traditional loss function that it minimizes during training. But at prediction time, it implicitly estimates the **posterior probability** $P(y \mid \mathbf{x})$ using a local density estimate:

$$
P(y = c \mid \mathbf{x}_q) \approx \frac{K_c}{K}
$$

> ##### The local class density around the query estimates the true posterior probability.

where $K_c$ is the number of neighbors belonging to class $c$. As $n \to \infty$ and $K \to \infty$ while $K/n \to 0$, this estimate converges to the true posterior. This is the theoretical guarantee from Cover and Hart (1967).

---

## Derivation: Theoretical Guarantees

### Cover-Hart Theorem (1967)

The most important theoretical result for KNN. Let $R^*$ be the Bayes optimal error rate (the best any classifier can achieve), and $R_{1\text{-NN}}$ be the error rate of the 1-nearest neighbor classifier as $n \to \infty$.

**Theorem**: For a binary classification problem:

$$
R^* \leq R_{1\text{-NN}} \leq 2R^*(1 - R^*)
$$

> ##### The 1-NN error rate is at most twice the Bayes optimal rate. An algorithm that learns nothing is already halfway to perfection.

**Proof sketch**:

As $n \to \infty$, the nearest neighbor $\mathbf{x}_{nn}$ converges to $\mathbf{x}_q$ (the training points become infinitely dense). So $P(y \mid \mathbf{x}_{nn}) \to P(y \mid \mathbf{x}_q)$.

The 1-NN error at query $\mathbf{x}_q$ is the probability that the nearest neighbor has a different label:

$$
R_{1\text{-NN}}(\mathbf{x}_q) = 1 - \sum_{c=1}^{C} P(y=c \mid \mathbf{x}_q)^2
$$

> ##### Error = probability that two independent draws from the local distribution disagree.

For binary classification with $\eta(\mathbf{x}) = P(y=1 \mid \mathbf{x})$:

$$
R_{1\text{-NN}}(\mathbf{x}) = 2\eta(\mathbf{x})(1 - \eta(\mathbf{x}))
$$

> ##### Error = 2 × (probability of class 1) × (probability of class 0).

The Bayes optimal error is $R^*(\mathbf{x}) = \min(\eta(\mathbf{x}), 1-\eta(\mathbf{x}))$.

Now, using the inequality $2ab \leq 2a$ when $a \leq b$ and $a + b = 1$:

$$
R_{1\text{-NN}} = 2\eta(1-\eta) \leq 2 \cdot \min(\eta, 1-\eta) = 2R^*
$$

And since $R_{1\text{-NN}} = 2\eta(1-\eta) = 2R^*(1 - R^*)$ when $R^* = \min(\eta, 1-\eta)$.

**What this means**: If the best possible classifier has a 5% error rate, the 1-NN classifier will have at most a $2 \times 0.05 \times 0.95 = 9.5\%$ error rate. Not bad for an algorithm that "learns" nothing.

### Generalization to K-NN

As $K \to \infty$ and $K/n \to 0$:

$$
R_{K\text{-NN}} \to R^*
$$

> ##### With enough neighbors (but not too many relative to training size), KNN converges to the Bayes optimal classifier.

This is a **universal consistency** result — KNN can approximate *any* decision boundary given enough data.

---

## Numerical Example

### Dataset

Let's work through a complete example with a tiny dataset. We have 6 training points in 2D, classified as **A** or **B**:

| Point | $x_1$ | $x_2$ | Class |
|-------|--------|--------|-------|
| $P_1$ | 1 | 3 | A |
| $P_2$ | 2 | 4 | A |
| $P_3$ | 3 | 1 | B |
| $P_4$ | 6 | 5 | B |
| $P_5$ | 7 | 8 | A |
| $P_6$ | 5 | 2 | B |

**Query point**: $\mathbf{x}_q = (4, 3)$. Classify it using K=3.

### Step 1: Compute Distances (Euclidean)

$$
d(P_1, \mathbf{x}_q) = \sqrt{(1-4)^2 + (3-3)^2} = \sqrt{9+0} = 3.00
$$

$$
d(P_2, \mathbf{x}_q) = \sqrt{(2-4)^2 + (4-3)^2} = \sqrt{4+1} = 2.24
$$

$$
d(P_3, \mathbf{x}_q) = \sqrt{(3-4)^2 + (1-3)^2} = \sqrt{1+4} = 2.24
$$

$$
d(P_4, \mathbf{x}_q) = \sqrt{(6-4)^2 + (5-3)^2} = \sqrt{4+4} = 2.83
$$

$$
d(P_5, \mathbf{x}_q) = \sqrt{(7-4)^2 + (8-3)^2} = \sqrt{9+25} = 5.83
$$

$$
d(P_6, \mathbf{x}_q) = \sqrt{(5-4)^2 + (2-3)^2} = \sqrt{1+1} = 1.41
$$

### Step 2: Sort by Distance

| Rank | Point | Distance | Class |
|------|-------|----------|-------|
| 1 | $P_6$ | 1.41 | B |
| 2 | $P_2$ | 2.24 | A |
| 3 | $P_3$ | 2.24 | B |
| 4 | $P_4$ | 2.83 | B |
| 5 | $P_1$ | 3.00 | A |
| 6 | $P_5$ | 5.83 | A |

### Step 3: Select K=3 Nearest Neighbors

The 3 nearest neighbors are: $P_6$ (B), $P_2$ (A), $P_3$ (B).

### Step 4: Majority Vote

- Class A: 1 vote
- Class B: 2 votes

**Prediction: Class B** ✓

### Step 5: Weighted Vote (for comparison)

Compute weights $w_i = 1/d_i^2$:

$$
w_6 = \frac{1}{1.41^2} = \frac{1}{1.99} = 0.502 \quad (\text{Class B})
$$

$$
w_2 = \frac{1}{2.24^2} = \frac{1}{5.02} = 0.199 \quad (\text{Class A})
$$

$$
w_3 = \frac{1}{2.24^2} = \frac{1}{5.02} = 0.199 \quad (\text{Class B})
$$

Weighted votes:
- Class A: $0.199$
- Class B: $0.502 + 0.199 = 0.701$

**Weighted Prediction: Class B** ✓ (with higher confidence)

### Probability Estimate

$$
P(y = B \mid \mathbf{x}_q) = \frac{2}{3} = 0.667
$$

$$
P(y = A \mid \mathbf{x}_q) = \frac{1}{3} = 0.333
$$

---

## Geometric Interpretation

### What Happens in Feature Space

In a 2D feature space, every training point occupies a position. KNN creates an implicit **Voronoi diagram** — the space is partitioned into regions, one per training point. Each region contains all points closer to that training point than to any other.

```
    ┌──────────────────────────────────┐
    │           .P5(A)                 │
    │         /     \                  │
    │   .P2(A)       \                 │
    │  /    |    .P4(B)\               │
    │ .P1(A) \    /     |              │
    │  \      \ /       |              │
    │   \   .P6(B)      |              │
    │    \    |          |              │
    │     .P3(B)        |              │
    └──────────────────────────────────┘
```

Every region inherits the label of its training point. The boundaries between regions of different classes form the **decision boundary**. This boundary is piecewise linear (made of straight edges) for Euclidean distance.

### Decision Boundaries

For K=1, the decision boundary follows the Voronoi edges exactly — it's jagged and complex. As K increases, the boundary smooths out because more neighbors participate in each vote.

```
K=1 (jagged):          K=7 (smooth):
┌─────────────┐        ┌─────────────┐
│A A B B B B B│        │A A A A B B B│
│A A A B B B B│        │A A A B B B B│
│A A A B B B B│        │A A B B B B B│
│A A B B A B B│        │A A B B B B B│
│A B B B A A B│        │A B B B B B B│
│B B B A A A A│        │B B B B A A A│
│B B B A A A A│        │B B B B A A A│
└─────────────┘        └─────────────┘
```

Small K: complex, jagged boundary → low bias, high variance (overfitting).
Large K: smooth, simple boundary → high bias, low variance (underfitting).

### Distance Metrics in 2D

```
Euclidean (circle):     Manhattan (diamond):    Chebyshev (square):
      * * *                  *                  * * * * *
    *       *              * * *                *       *
   *    ·    *           * * · * *              *   ·   *
    *       *              * * *                *       *
      * * *                  *                  * * * * *
```

The "neighborhood" shape changes with the distance metric. Euclidean draws circles, Manhattan draws diamonds, Chebyshev draws squares. The choice of metric affects which points are considered "nearest."

---

## Statistical Interpretation

### Bias-Variance Tradeoff

KNN provides a textbook illustration of the bias-variance tradeoff:

$$
\text{Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}
$$

> ##### Total error decomposes into three components. We control the first two via K.

**Small K (e.g., K=1)**:
- **Bias**: Low — the prediction is driven by the single nearest point, closely tracking the true distribution
- **Variance**: High — a single outlier or noisy point can completely change the prediction
- **Result**: Overfitting — the model memorizes noise in the training data

**Large K (e.g., K=n)**:
- **Bias**: High — averaging over all points washes out local structure; the prediction approaches the global class majority
- **Variance**: Low — predictions are stable because they average over many points
- **Result**: Underfitting — the model ignores useful local patterns

**Optimal K**: somewhere in between, found via cross-validation.

### Statistical Assumptions

KNN makes very few assumptions, but they exist:

**Local continuity (smoothness)**: Points close in feature space have similar labels/values. If this fails (e.g., checkerboard patterns at microscopic scale), KNN fails.

**Representative training data**: The training set must adequately cover the feature space. Sparse regions yield unreliable predictions because the "nearest" neighbor might be far away.

**Meaningful distance metric**: The chosen distance function must correspond to genuine similarity. If Euclidean distance doesn't capture the relationship between features, KNN is garbage-in-garbage-out.

**Feature relevance**: All features used in the distance calculation should be relevant. Irrelevant features add noise dimensions, diluting the signal (the **curse of dimensionality**).

### The Curse of Dimensionality

This is KNN's greatest enemy. As the number of dimensions $d$ increases, counterintuitive things happen:

In $d$ dimensions, to capture a fraction $f$ of the data within a hypercube, each side must have length $f^{1/d}$:

$$
\text{Side length} = f^{1/d}
$$

> ##### To capture 10% of the data in 100 dimensions, each side must be $0.1^{1/100} = 0.977$. You need 97.7% of each axis's range to cover just 10% of the data.

This means that in high dimensions, the "local neighborhood" must span nearly the entire range of each feature to contain even a few points. The concept of "nearby" becomes meaningless — all points are approximately equidistant.

For two random points in a $d$-dimensional unit cube:

$$
\frac{d_{\max} - d_{\min}}{d_{\min}} \to 0 \quad \text{as } d \to \infty
$$

> ##### The ratio of max-to-min distance shrinks. All distances converge. Everything is equally far.

**Practical consequence**: KNN works well in low-to-moderate dimensions (typically $d < 20$ without dimensionality reduction). Beyond that, you must apply PCA, t-SNE, UMAP, or feature selection to reduce dimensionality before using KNN.

---

## Algorithm Workflow

```
  Input: Training Data + Query Point + K
                    |
                    v
        +-----------------------+
        |     Preprocessing     |
        |   - Scale features    |
        |   - Handle missing    |
        |   - Reduce dims       |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |      Store Data       |
        |    (No Training!)     |
        |   - Build KD-tree     |
        |     or Ball-tree      |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |   Compute Distance    |
        |   query -> all pts    |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |    Find K Nearest     |
        |      Neighbors        |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |      Aggregate        |
        |    Vote / Average     |
        +-----------+-----------+
                    |
                    v
  Output: Predicted Label / Value
```

### Detailed Steps

1. **Data Collection**: Gather labeled data $\{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$
2. **Preprocessing**:
   - Handle missing values (imputation or removal)
   - Encode categorical features (one-hot, ordinal)
   - Scale numeric features (standardization or min-max)
   - Optional: dimensionality reduction (PCA)
3. **Storage**: Store the preprocessed data in an efficient data structure (flat array, KD-tree, or Ball-tree)
4. **Query**:
   - Preprocess the query point the same way
   - Compute distance to all (or relevant subset of) training points
   - Select K nearest neighbors
   - Aggregate: majority vote (classification) or mean/weighted mean (regression)
5. **Output**: Return prediction and optionally class probabilities or neighbor details

---

## Pseudocode

```
ALGORITHM: K-Nearest Neighbors Classifier

INPUT:
    D = {(x₁,y₁), (x₂,y₂), ..., (xₙ,yₙ)}   // Training data
    x_q                                          // Query point
    K                                            // Number of neighbors
    dist_func                                    // Distance function

OUTPUT:
    ŷ                                            // Predicted class

PROCEDURE:

1. TRAINING PHASE:
    Store D in memory
    // That's it. Literally nothing else.

2. PREDICTION PHASE:

    // Step 2a: Compute all distances
    distances ← empty list
    FOR i = 1 TO n:
        d_i ← dist_func(x_q, x_i)
        APPEND (d_i, y_i) TO distances

    // Step 2b: Sort by distance
    SORT distances BY d_i IN ASCENDING ORDER

    // Step 2c: Select K nearest
    neighbors ← FIRST K elements of distances

    // Step 2d: Majority vote
    vote_counts ← empty dictionary
    FOR EACH (d_i, y_i) IN neighbors:
        vote_counts[y_i] ← vote_counts[y_i] + 1

    // Step 2e: Return class with most votes
    ŷ ← KEY WITH MAX VALUE IN vote_counts

    RETURN ŷ
```

**Key observations**:
- Training is $O(1)$ — just store the data
- Prediction is $O(n \cdot d)$ for computing distances + $O(n \log n)$ for sorting
- Every prediction requires scanning the entire dataset

---

## Time and Space Complexity

### Training Phase

| Metric | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | $O(1)$ or $O(n \cdot d)$ | Brute force: just store. With KD-tree: $O(n \cdot d \log n)$ to build |
| **Space** | $O(n \cdot d)$ | Must store all $n$ training points, each with $d$ features |

### Prediction Phase (per query)

| Metric | Brute Force | KD-Tree | Ball-Tree |
|--------|------------|---------|-----------|
| **Time** | $O(n \cdot d)$ | $O(d \cdot \log n)$ avg, $O(n \cdot d)$ worst | $O(d \cdot \log n)$ avg |
| **Space** | $O(n \cdot d)$ | $O(n \cdot d)$ | $O(n \cdot d)$ |

- $n$: number of training samples
- $d$: number of features (dimensions)
- KD-tree degrades to $O(n \cdot d)$ in high dimensions ($d > 20$)
- Ball-tree is more robust in moderate dimensions

### Practical Implications

| Dataset Size | Brute Force Feasibility | Recommendation |
|---|---|---|
| $n < 10{,}000$ | Fast, use it | Brute force |
| $10{,}000 < n < 1{,}000{,}000$ | Slow | KD-tree or Ball-tree |
| $n > 1{,}000{,}000$ | Impractical | ANN (FAISS, Annoy, HNSW) |

KNN's greatest weakness is prediction-time cost. Every new prediction requires scanning (or tree-searching) the entire training set. This makes it expensive for real-time, high-throughput applications. In contrast, a logistic regression model makes predictions in $O(d)$ — independent of training size.

---

## Python Implementation From Scratch

### Using Pure Python and NumPy

```python
import numpy as np
from collections import Counter


class KNNClassifier:
    """
    K-Nearest Neighbors classifier implemented from scratch.

    Parameters
    k : int
        Number of neighbors to consider (default=5).
    distance_metric : str
        'euclidean', 'manhattan', or 'cosine' (default='euclidean').
    weighted : bool
        If True, use distance-weighted voting (default=False).
    """

    def __init__(self, k=5, distance_metric='euclidean', weighted=False):
        self.k = k
        self.distance_metric = distance_metric
        self.weighted = weighted
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """
        'Train' the model — simply store the data.

        Parameters
        X : np.ndarray of shape (n_samples, n_features)
            Training feature matrix.
        y : np.ndarray of shape (n_samples,)
            Training labels.
        """
        self.X_train = np.array(X, dtype=np.float64)
        self.y_train = np.array(y)
        return self

    def _compute_distance(self, x_query, X_data):
        """
        Compute distance from a single query point to all training points.

        Parameters
        x_query : np.ndarray of shape (n_features,)
        X_data  : np.ndarray of shape (n_samples, n_features)

        Returns
        np.ndarray of shape (n_samples,) — distances.
        """
        if self.distance_metric == 'euclidean':
            # sqrt(sum((x_query - x_i)^2)) for each training point
            diff = X_data - x_query          # (n, d) — broadcast subtraction
            return np.sqrt(np.sum(diff ** 2, axis=1))  # (n,)

        elif self.distance_metric == 'manhattan':
            # sum(|x_query - x_i|) for each training point
            diff = X_data - x_query
            return np.sum(np.abs(diff), axis=1)

        elif self.distance_metric == 'cosine':
            # 1 - (x_query · x_i) / (||x_query|| * ||x_i||)
            dot_products = X_data @ x_query  # (n,)
            query_norm = np.linalg.norm(x_query)
            data_norms = np.linalg.norm(X_data, axis=1)  # (n,)
            # Avoid division by zero
            similarities = dot_products / (query_norm * data_norms + 1e-10)
            return 1 - similarities

        else:
            raise ValueError(f"Unknown metric: {self.distance_metric}")

    def _predict_single(self, x_query):
        """
        Predict the class for a single query point.

        Parameters
        x_query : np.ndarray of shape (n_features,)

        Returns
        Predicted class label.
        """
        # Step 1: Compute distances to all training points
        distances = self._compute_distance(x_query, self.X_train)

        # Step 2: Find indices of K nearest neighbors
        # argpartition is O(n) on average, faster than full sort
        k_indices = np.argpartition(distances, self.k)[:self.k]
        k_distances = distances[k_indices]
        k_labels = self.y_train[k_indices]

        if self.weighted:
            # Weighted voting: weight = 1 / (distance^2 + epsilon)
            weights = 1.0 / (k_distances ** 2 + 1e-10)
            # Accumulate weighted votes per class
            class_weights = {}
            for label, weight in zip(k_labels, weights):
                class_weights[label] = class_weights.get(label, 0) + weight
            return max(class_weights, key=class_weights.get)
        else:
            # Unweighted majority vote
            counter = Counter(k_labels)
            return counter.most_common(1)[0][0]

    def predict(self, X):
        """
        Predict class labels for multiple query points.

        Parameters
        X : np.ndarray of shape (n_queries, n_features)

        Returns
        np.ndarray of shape (n_queries,) — predicted labels.
        """
        X = np.array(X, dtype=np.float64)
        return np.array([self._predict_single(x) for x in X])

    def predict_proba(self, X):
        """
        Predict class probabilities for multiple query points.

        Parameters
        X : np.ndarray of shape (n_queries, n_features)

        Returns
        dict mapping each query index to {class: probability}.
        """
        X = np.array(X, dtype=np.float64)
        probabilities = []
        classes = np.unique(self.y_train)

        for x_query in X:
            distances = self._compute_distance(x_query, self.X_train)
            k_indices = np.argpartition(distances, self.k)[:self.k]
            k_labels = self.y_train[k_indices]

            counter = Counter(k_labels)
            probs = {c: counter.get(c, 0) / self.k for c in classes}
            probabilities.append(probs)

        return probabilities

    def score(self, X, y):
        """
        Compute classification accuracy.

        Parameters
        X : np.ndarray of shape (n_samples, n_features)
        y : np.ndarray of shape (n_samples,)

        Returns
        float — accuracy (fraction of correct predictions).
        """
        predictions = self.predict(X)
        return np.mean(predictions == np.array(y))


class KNNRegressor:
    """
    K-Nearest Neighbors regressor implemented from scratch.

    Parameters
    k : int
        Number of neighbors (default=5).
    distance_metric : str
        'euclidean' or 'manhattan' (default='euclidean').
    weighted : bool
        If True, use distance-weighted averaging (default=False).
    """

    def __init__(self, k=5, distance_metric='euclidean', weighted=False):
        self.k = k
        self.distance_metric = distance_metric
        self.weighted = weighted
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Store the training data."""
        self.X_train = np.array(X, dtype=np.float64)
        self.y_train = np.array(y, dtype=np.float64)
        return self

    def _compute_distance(self, x_query, X_data):
        """Compute distance from query to all training points."""
        diff = X_data - x_query
        if self.distance_metric == 'euclidean':
            return np.sqrt(np.sum(diff ** 2, axis=1))
        elif self.distance_metric == 'manhattan':
            return np.sum(np.abs(diff), axis=1)
        else:
            raise ValueError(f"Unknown metric: {self.distance_metric}")

    def _predict_single(self, x_query):
        """Predict the value for a single query point."""
        distances = self._compute_distance(x_query, self.X_train)
        k_indices = np.argpartition(distances, self.k)[:self.k]
        k_distances = distances[k_indices]
        k_values = self.y_train[k_indices]

        if self.weighted:
            weights = 1.0 / (k_distances ** 2 + 1e-10)
            return np.sum(weights * k_values) / np.sum(weights)
        else:
            return np.mean(k_values)

    def predict(self, X):
        """Predict values for multiple query points."""
        X = np.array(X, dtype=np.float64)
        return np.array([self._predict_single(x) for x in X])

    def score(self, X, y):
        """
        Compute R² score (coefficient of determination).
        """
        predictions = self.predict(X)
        y = np.array(y, dtype=np.float64)
        ss_res = np.sum((y - predictions) ** 2)
        ss_tot = np.sum((y - np.mean(y)) ** 2)
        return 1 - (ss_res / ss_tot)


#Demonstration
if __name__ == "__main__":
    # Create sample data
    np.random.seed(42)
    X_train = np.array([[1, 3], [2, 4], [3, 1], [6, 5], [7, 8], [5, 2]])
    y_train = np.array(['A', 'A', 'B', 'B', 'A', 'B'])

    # Test point
    X_test = np.array([[4, 3]])

    # Classify
    knn = KNNClassifier(k=3, weighted=False)
    knn.fit(X_train, y_train)
    prediction = knn.predict(X_test)
    print(f"Prediction for (4,3): {prediction[0]}")   # Should be B

    probas = knn.predict_proba(X_test)
    print(f"Probabilities: {probas[0]}")               # A: 0.33, B: 0.67

    accuracy = knn.score(X_train, y_train)
    print(f"Training accuracy: {accuracy:.2f}")
```

**Line-by-line explanation of key methods**:

- `fit()`: Stores `X` and `y`. No computation. This is why KNN is called a lazy learner.
- `_compute_distance()`: Broadcasts `x_query` across all rows of `X_data` to compute distances vectorized. `np.sum(diff ** 2, axis=1)` sums squared differences along the feature axis for each sample.
- `_predict_single()`: Uses `np.argpartition` instead of full sort — this is $O(n)$ on average vs $O(n \log n)$ for sort. It finds the K smallest distances without sorting the entire array.
- `predict_proba()`: Returns the fraction of K neighbors belonging to each class. This gives calibrated-ish probabilities.
- `score()`: Computes accuracy = (correct predictions) / (total predictions).

---

## Python Implementation Using Scikit-Learn

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.datasets import make_classification, make_regression
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (accuracy_score, classification_report,
                             confusion_matrix, ConfusionMatrixDisplay,
                             mean_squared_error, r2_score)
from sklearn.pipeline import Pipeline

#CLASSIFICATION EXAMPLE

# Generate a 2D dataset with 2 classes
X, y = make_classification(
    n_samples=500,          # number of samples
    n_features=2,           # 2 features (for visualization)
    n_redundant=0,          # no redundant features
    n_informative=2,        # both features are informative
    n_clusters_per_class=2, # 2 clusters per class (non-linear boundary)
    random_state=42
)

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Build a pipeline: StandardScaler → KNN
pipeline = Pipeline([
    ('scaler', StandardScaler()),     # ALWAYS scale for KNN
    ('knn', KNeighborsClassifier(
        n_neighbors=5,                # K = 5 (default)
        weights='uniform',            # 'uniform' or 'distance'
        algorithm='auto',             # 'auto', 'ball_tree', 'kd_tree', 'brute'
        metric='euclidean',           # distance metric
        p=2                           # Minkowski p (2 = Euclidean)
    ))
])

# Train
pipeline.fit(X_train, y_train)

# Predict
y_pred = pipeline.predict(X_test)

# Evaluate
print("KNN Classification")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"\nClassification Report:\n{classification_report(y_test, y_pred)}")

# Cross-validation
cv_scores = cross_val_score(pipeline, X, y, cv=5, scoring='accuracy')
print(f"5-Fold CV Accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")


#HYPERPARAMETER TUNING

param_grid = {
    'knn__n_neighbors': [1, 3, 5, 7, 9, 11, 15, 21, 31],
    'knn__weights': ['uniform', 'distance'],
    'knn__metric': ['euclidean', 'manhattan']
}

grid_search = GridSearchCV(
    pipeline, param_grid, cv=5,
    scoring='accuracy', n_jobs=-1, verbose=0
)
grid_search.fit(X_train, y_train)

print(f"\nBest Parameters: {grid_search.best_params_}")
print(f"Best CV Accuracy: {grid_search.best_score_:.4f}")


#DECISION BOUNDARY VISUALIZATION

def plot_decision_boundary(model, X, y, title="KNN Decision Boundary"):
    """Plot the decision boundary of a 2D classifier."""
    h = 0.02  # step size in the mesh
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(
        np.arange(x_min, x_max, h),
        np.arange(y_min, y_max, h)
    )
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)

    plt.figure(figsize=(10, 8))
    plt.contourf(xx, yy, Z, alpha=0.3, cmap='RdYlBu')
    plt.scatter(X[:, 0], X[:, 1], c=y, cmap='RdYlBu',
                edgecolors='black', s=40, alpha=0.8)
    plt.title(title, fontsize=14, fontweight='bold')
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.colorbar(label='Class')
    plt.tight_layout()
    plt.show()


# Plot decision boundaries for different K values
for k in [1, 5, 15, 51]:
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    model = KNeighborsClassifier(n_neighbors=k)
    model.fit(X_scaled, y)
    plot_decision_boundary(model, X_scaled, y,
                           title=f"KNN Decision Boundary (K={k})")


#K SELECTION: ELBOW CURVE

k_range = range(1, 51)
train_errors = []
test_errors = []

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    train_errors.append(1 - knn.score(X_train_scaled, y_train))
    test_errors.append(1 - knn.score(X_test_scaled, y_test))

plt.figure(figsize=(10, 6))
plt.plot(k_range, train_errors, 'b-o', label='Training Error', markersize=3)
plt.plot(k_range, test_errors, 'r-o', label='Test Error', markersize=3)
plt.xlabel('K (Number of Neighbors)', fontsize=12)
plt.ylabel('Error Rate', fontsize=12)
plt.title('KNN: Training vs Test Error', fontsize=14, fontweight='bold')
plt.legend(fontsize=12)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


#REGRESSION EXAMPLE

X_reg, y_reg = make_regression(
    n_samples=200, n_features=1, noise=20, random_state=42
)
X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(
    X_reg, y_reg, test_size=0.2, random_state=42
)

knn_reg = KNeighborsRegressor(n_neighbors=5, weights='distance')
knn_reg.fit(X_train_r, y_train_r)
y_pred_r = knn_reg.predict(X_test_r)

print(f"\nKNN Regression")
print(f"R² Score: {r2_score(y_test_r, y_pred_r):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test_r, y_pred_r)):.4f}")
```

### Scikit-Learn Parameter Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n_neighbors` | int | 5 | Number of neighbors K |
| `weights` | str | 'uniform' | 'uniform' (equal votes) or 'distance' (closer = more weight) |
| `algorithm` | str | 'auto' | 'ball_tree', 'kd_tree', 'brute', or 'auto' |
| `metric` | str | 'minkowski' | Distance metric |
| `p` | int | 2 | Minkowski parameter (1=Manhattan, 2=Euclidean) |
| `leaf_size` | int | 30 | Leaf size for tree algorithms (affects speed/memory) |
| `n_jobs` | int | None | Number of parallel jobs (-1 = all cores) |

---

## Hyperparameters

### K (Number of Neighbors)

The single most important hyperparameter.

| Aspect | Small K (e.g., 1-3) | Large K (e.g., 20-50) |
|--------|---------------------|----------------------|
| **Bias** | Low | High |
| **Variance** | High | Low |
| **Decision boundary** | Complex, jagged | Smooth, simple |
| **Sensitivity to noise** | Very sensitive | Robust |
| **Computation** | Slightly faster (fewer to aggregate) | Slightly slower |
| **Risk** | Overfitting | Underfitting |

**When to increase K**: Noisy data, many outliers, you're overfitting.
**When to decrease K**: Clean data, complex decision boundary, you're underfitting.

**Rule of thumb**: Start with $K = \sqrt{n}$ (where $n$ is the training size). Use an odd K for binary classification to avoid ties. Always select K via cross-validation.

### Weights

| Weight | Behavior | When to Use |
|--------|----------|-------------|
| `uniform` | All K neighbors have equal vote | When data is clean, evenly distributed |
| `distance` | Closer neighbors have more influence ($w = 1/d$) | When boundary is non-uniform, or data has clusters of varying density |

### Distance Metric

| Metric | Best For | Caution |
|--------|----------|---------|
| Euclidean | Continuous features, low-to-moderate dimensions | Sensitive to scale; must normalize |
| Manhattan | Sparse data, high dimensions, many features | Less sensitive to outliers |
| Cosine | Text data, embeddings, when magnitude doesn't matter | Not a true metric (doesn't satisfy triangle inequality without modification) |
| Minkowski | General purpose; tune p | p > 2 emphasizes larger differences |

### Algorithm

| Algorithm | Time Complexity | Best For |
|-----------|----------------|----------|
| `brute` | $O(n \cdot d)$ per query | Small datasets, high dimensions |
| `kd_tree` | $O(d \log n)$ avg | Low dimensions ($d < 20$), large $n$ |
| `ball_tree` | $O(d \log n)$ avg | Moderate dimensions, general metric |
| `auto` | Chooses best | Default; let scikit-learn decide |

---

## Visualization

### Effect of K on Decision Boundaries

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

# Generate moon-shaped dataset
X, y = make_moons(n_samples=300, noise=0.25, random_state=42)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

fig, axes = plt.subplots(2, 3, figsize=(18, 12))
k_values = [1, 3, 5, 11, 25, 51]

for ax, k in zip(axes.ravel(), k_values):
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_scaled, y)

    h = 0.02
    x_min, x_max = X_scaled[:, 0].min() - 0.5, X_scaled[:, 0].max() + 0.5
    y_min, y_max = X_scaled[:, 1].min() - 0.5, X_scaled[:, 1].max() + 0.5
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                          np.arange(y_min, y_max, h))
    Z = knn.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

    ax.contourf(xx, yy, Z, alpha=0.3, cmap='coolwarm')
    ax.scatter(X_scaled[:, 0], X_scaled[:, 1], c=y, cmap='coolwarm',
               edgecolors='k', s=30, alpha=0.7)
    ax.set_title(f'K = {k}', fontsize=14, fontweight='bold')
    ax.set_xlim(x_min, x_max)
    ax.set_ylim(y_min, y_max)

plt.suptitle('Effect of K on Decision Boundary', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()
```

### K Selection: Error vs K Plot

```python
from sklearn.model_selection import cross_val_score

k_range = range(1, 51)
cv_scores = []
for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X_scaled, y, cv=10, scoring='accuracy')
    cv_scores.append(scores.mean())

plt.figure(figsize=(10, 6))
plt.plot(k_range, cv_scores, 'b-o', markersize=4)
plt.xlabel('K', fontsize=12)
plt.ylabel('10-Fold CV Accuracy', fontsize=12)
plt.title('Optimal K Selection', fontsize=14, fontweight='bold')
plt.axvline(x=k_range[np.argmax(cv_scores)], color='r',
            linestyle='--', label=f'Best K = {k_range[np.argmax(cv_scores)]}')
plt.legend(fontsize=12)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## Advantages

| Advantage | Explanation |
|-----------|-------------|
| **No training phase** | Model is the data itself; no expensive gradient computation or iterative optimization |
| **Non-parametric** | Makes no assumptions about data distribution; works for any shape of decision boundary |
| **Naturally handles multi-class** | No modification needed; majority vote generalizes to C classes |
| **Intuitive and interpretable** | "We predict X because the 5 most similar cases were X" — easy to explain to stakeholders |
| **No assumptions about feature relationships** | Captures non-linear, complex interactions naturally |
| **Easy to implement** | Can be coded from scratch in under 50 lines of Python |
| **Adapts to new data** | Adding new training data is trivial — just append it. No retraining needed |
| **Probabilistic output** | Class proportions among K neighbors give natural probability estimates |

---

## Disadvantages

| Disadvantage | Explanation |
|---|---|
| **Slow prediction** | $O(n \cdot d)$ per query — impractical for real-time with large datasets |
| **High memory usage** | Must store entire training set in memory |
| **Curse of dimensionality** | Performance degrades sharply in high dimensions; distances become meaningless |
| **Sensitive to irrelevant features** | Every feature contributes equally to distance; noise dimensions hurt badly |
| **Sensitive to feature scale** | Requires careful normalization; unscaled features dominate distance |
| **No feature importance** | Unlike trees or linear models, KNN doesn't tell you which features matter |
| **Sensitive to imbalanced data** | The majority class dominates the vote if classes are unbalanced |
| **Doesn't learn a model** | No parameters to inspect, no compact representation, no transferable knowledge |
| **Noisy decision boundaries** | Especially with small K; outliers create "islands" of wrong predictions |

### When KNN Fails

1. **Very high dimensions**: With $d > 50$, all points become equidistant. Use PCA or feature selection first.
2. **Large datasets**: With millions of points, brute-force KNN is too slow. Use ANN libraries (FAISS, Annoy).
3. **Imbalanced classes**: If 95% of training data is Class A, KNN always predicts A. Use SMOTE, weighted KNN, or adjust K.
4. **Irrelevant features**: If 8 out of 10 features are noise, the noise dominates the distance calculation. Use feature selection.
5. **Non-uniform density**: If Class A has 10,000 points and Class B has 100, Class A's points are more likely to be "near" any query.

---

## Common Interview Questions

### Beginner (1–10)

**1. What is KNN? Is it supervised or unsupervised?**
KNN is a supervised learning algorithm (it requires labeled training data). It classifies new data points based on the majority class of their K nearest neighbors. It can also be used for regression by averaging neighbor values.

**2. Is KNN a parametric or non-parametric algorithm?**
Non-parametric. It doesn't assume any specific functional form or data distribution. The number of "parameters" grows with the training data (because the model *is* the data).

**3. What is a lazy learner? Why is KNN called lazy?**
A lazy learner defers computation to prediction time. KNN doesn't learn anything during training — it just stores the data. All computation (distance calculation, neighbor search, voting) happens when you ask for a prediction. The opposite is an "eager learner" like logistic regression, which builds a model during training.

**4. What happens when K=1?**
The algorithm assigns the label of the single nearest training point. The decision boundary traces the Voronoi diagram. This has zero training error but high variance (overfitting).

**5. What happens when K=N (number of training samples)?**
Every prediction considers all training points. The majority vote always returns the most common class in the entire dataset. This is equivalent to a "most frequent class" baseline — high bias, zero variance (underfitting).

**6. Should K be odd or even? Why?**
For binary classification, use odd K to avoid ties (e.g., K=5 guarantees one class gets at least 3 votes). For multi-class, ties can still occur with odd K, so implement a tie-breaking strategy (e.g., choose the class of the closest neighbor).

**7. Why is feature scaling important for KNN?**
Because KNN uses distance. Features with larger ranges dominate the distance calculation. If salary (0–1M) and age (0–100) are unscaled, salary completely determines "closeness." Scaling (standardization or min-max) ensures equal contribution.

**8. Can KNN be used for regression?**
Yes. Instead of majority vote, average the K neighbors' target values (or use weighted average). Scikit-learn provides `KNeighborsRegressor`.

**9. What is the time complexity of KNN prediction?**
$O(n \cdot d)$ for brute force (compute distance to all n points, each requiring d operations). With KD-trees: $O(d \log n)$ average case.

**10. What distance metrics can be used with KNN?**
Euclidean (most common), Manhattan (robust to outliers), Cosine (for text/embeddings), Hamming (for categorical), Minkowski (generalized). The choice depends on the data type and domain.

### Intermediate (11–20)

**11. Explain the bias-variance tradeoff in KNN with respect to K.**
Small K → low bias (closely follows data), high variance (sensitive to noise) → overfitting. Large K → high bias (over-smoothed), low variance (stable predictions) → underfitting. Optimal K balances these — found via cross-validation.

**12. What is the curse of dimensionality? How does it affect KNN?**
In high dimensions, distances between points converge — all points become approximately equidistant. The concept of "nearest neighbor" loses meaning. A neighborhood that captures a meaningful fraction of data must span nearly the entire feature range. KNN becomes no better than random in very high dimensions.

**13. How do you choose the optimal K?**
Cross-validation. Try a range of K values (1 to $\sqrt{n}$), evaluate performance on validation folds, select K with the best cross-validated metric. Plot the error curve and look for the elbow.

**14. What is weighted KNN? When would you use it?**
Weighted KNN assigns each neighbor a weight inversely proportional to its distance (e.g., $w = 1/d^2$). Closer neighbors have more influence. Use it when the decision boundary is non-uniform or when you want to reduce the impact of distant neighbors in the K-set.

**15. How does KNN handle multi-class classification?**
Naturally. The majority vote extends to C classes. The class with the most neighbors wins. No one-vs-one or one-vs-rest needed.

**16. How do you handle categorical features in KNN?**
Options: (a) One-hot encode categorical features (adds dimensions). (b) Use Hamming distance for purely categorical data. (c) Use Gower distance which handles mixed types. (d) Convert to embeddings.

**17. What is the Cover-Hart theorem?**
As $n \to \infty$, the 1-NN error rate is bounded by $R_{1\text{-NN}} \leq 2R^*(1 - R^*)$ where $R^*$ is the Bayes optimal error rate. This means 1-NN is at most twice as bad as the best possible classifier — a remarkable guarantee for an algorithm that doesn't "learn."

**18. Compare KD-tree and Ball-tree for KNN.**
KD-tree partitions space along axis-aligned planes; efficient in low dimensions ($d < 20$) but degrades to brute-force in high dimensions. Ball-tree partitions space using hyperspheres; more robust in moderate dimensions and supports general metrics. Both achieve $O(d \log n)$ average-case query time.

**19. How do you handle missing values in KNN?**
Options: (a) Impute missing values before applying KNN (e.g., mean/median imputation). (b) Modify the distance function to ignore missing dimensions. (c) Use KNN itself for imputation — find K nearest neighbors using available features and impute the missing value from neighbors.

**20. Can KNN handle imbalanced datasets? How?**
KNN is biased toward the majority class. Solutions: (a) Use weighted voting (distance-weighted). (b) Adjust K to be smaller than the minority class count. (c) Oversample the minority class (SMOTE). (d) Undersample the majority class. (e) Use class-weighted distance.

### Advanced (21–30+)

**21. Explain Locality-Sensitive Hashing (LSH) and how it relates to KNN.**
LSH is an approximate nearest neighbor (ANN) technique. It hashes similar items into the same bucket with high probability. Instead of exact KNN ($O(n \cdot d)$), LSH finds approximate nearest neighbors in $O(d)$ or $O(d \log n)$ time. Used by Spotify, Google, and other companies for billion-scale similarity search.

**22. What is FAISS and how does it accelerate KNN?**
FAISS (Facebook AI Similarity Search) is a library for efficient similarity search. It uses GPU acceleration, product quantization, and inverted file indices to perform nearest-neighbor search on billions of vectors. It's the backbone of many production recommendation systems.

**23. How does KNN relate to kernel density estimation?**
KNN classification can be viewed as kernel density estimation with an adaptive bandwidth. The kernel is uniform (all K neighbors get equal weight) or distance-weighted. The bandwidth adapts to local density: in dense regions, the K-neighborhood is small (tight kernel); in sparse regions, it's large (wide kernel). This is a key difference from fixed-bandwidth KDE.

**24. What is the Voronoi diagram and how does it relate to 1-NN?**
A Voronoi diagram partitions space into cells, one per training point. Each cell contains all points closer to that training point than to any other. The 1-NN decision boundary is exactly the set of Voronoi edges separating training points of different classes.

**25. How would you deploy KNN in production for real-time inference?**
(a) Pre-compute and store the KD-tree/Ball-tree. (b) Use ANN libraries (FAISS, Annoy, HNSW) for sub-linear query time. (c) Reduce dimensionality with PCA or autoencoders. (d) Use model distillation: train a neural network to mimic KNN predictions, then deploy the network. (e) Quantize feature vectors for memory efficiency.

**26. Explain condensed nearest neighbors (CNN).**
CNN reduces the training set by removing redundant points. It keeps only the points near the decision boundary. The idea: if a point's K nearest neighbors all share its class, removing it doesn't change any predictions. This can reduce the training set by 90%+ while maintaining accuracy.

**27. What is edited nearest neighbors (ENN)?**
ENN removes noisy training points. For each training point, classify it using its K nearest neighbors. If the prediction is wrong (neighbors disagree with its true label), remove it. This cleans the training data and smooths the decision boundary.

**28. How does KNN relate to collaborative filtering in recommender systems?**
User-based collaborative filtering is KNN on user vectors. Each user is a vector of ratings. To recommend items to User A, find the K most similar users (nearest neighbors in rating space), then suggest items those users liked but A hasn't seen. Item-based CF does the same but on item vectors.

**29. What is the difference between instance-based learning and model-based learning?**
Instance-based (KNN, RBF networks): stores training instances, generalizes from them at query time. Model-based (linear regression, SVM, neural nets): learns a compact parameterized function during training, discards training data. Instance-based has perfect training recall but high prediction cost; model-based compresses knowledge into parameters.

**30. How would you modify KNN for streaming data?**
(a) Sliding window: keep only the most recent $n$ points, dropping old ones. (b) Weighted by recency: assign higher weights to newer points. (c) Condensed/edited variants: periodically clean the stored set. (d) Use Cover trees or navigable small-world graphs that support incremental insertion.

**31. What is the relationship between KNN and non-parametric Bayesian methods?**
KNN estimates the posterior $P(y \mid \mathbf{x})$ non-parametrically. As $K \to \infty$ and $K/n \to 0$, this estimate converges to the true posterior (universal consistency). This connects KNN to non-parametric Bayesian density estimation, where both avoid parametric assumptions and let the data speak.

**32. Compare KNN with SVM. When would you use one over the other?**
KNN: no training, lazy, non-parametric, $O(n \cdot d)$ prediction. SVM: trained model, eager, parametric (kernel), $O(d \cdot n_{sv})$ prediction. Use KNN for small datasets, interpretability, or when the boundary is highly irregular. Use SVM for large datasets (smaller support vector set), high dimensions (kernel trick), or when you need a trained model.

---

## Common Mistakes

### Beginner Mistakes

**1. Forgetting to scale features**: The #1 mistake. KNN with unscaled features is essentially broken. Always standardize or normalize.

**2. Using K=1 on noisy data**: K=1 memorizes noise. Every outlier creates a pocket of wrong predictions around it. Use cross-validation to find optimal K.

**3. Applying KNN to high-dimensional data without reduction**: With $d > 30$, distances become meaningless. Always apply PCA, feature selection, or embeddings first.

**4. Not using odd K for binary classification**: Even K can produce ties, leading to random or undefined predictions.

**5. Treating KNN as "no preprocessing needed"**: KNN is actually one of the most preprocessing-sensitive algorithms. Feature scaling, handling missing values, and dimensionality reduction are critical.

### Data Leakage Mistakes

**6. Fitting the scaler on the entire dataset (train + test)**: This leaks test statistics into training. Always fit the scaler on training data only, then transform both train and test.

```python
# WRONG:
scaler.fit(X)  # Leaks test info!
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)

# RIGHT:
scaler.fit(X_train)  # Only training data
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

**7. Using training accuracy to evaluate**: KNN with K=1 has 100% training accuracy always. This is meaningless. Always evaluate on held-out data.

### Parameter Misuse

**8. Using Euclidean distance for text data**: Text vectors (TF-IDF, bag-of-words) vary in magnitude. Cosine distance measures direction (topic similarity) regardless of document length. Euclidean distance would say a short document is "closer" to another short document even if they're about different topics.

**9. Choosing K based on test performance**: This is hyperparameter leakage. Use cross-validation on the training set to select K. The test set is for final evaluation only.

**10. Not handling ties systematically**: When two classes tie in votes, the prediction is undefined. Implement a deterministic tie-breaking strategy (e.g., pick the class of the nearest individual neighbor).

---

## Real Industry Applications

### Google
- **Google Photos**: "Visually similar images" uses nearest-neighbor search on image embeddings (vectors from CNNs). Given a photo, find the K most similar images in the user's library. The core operation is KNN on embedding vectors, accelerated by ANN algorithms.
- **Google Search**: Query suggestion and "did you mean" features use nearest-neighbor matching on query embedding spaces.

### Amazon
- **Product Recommendations**: "Customers who bought this also bought..." uses item-based collaborative filtering, which is essentially KNN on item feature vectors. Each product is embedded in a space where distance correlates with co-purchase probability.
- **Alexa**: Wake word detection uses KNN-like nearest-neighbor matching on audio feature vectors to distinguish "Alexa" from background noise.

### Netflix
- **Collaborative Filtering**: Netflix's recommendation system pioneered user-based and item-based KNN at scale. Each user is a vector of ratings; similar users get similar recommendations. The Netflix Prize competition showed that even simple KNN baselines were competitive.

### Meta (Facebook)
- **FAISS**: Meta developed FAISS, the industry-standard library for billion-scale nearest-neighbor search. It powers similarity search across posts, images, and ads. When Facebook shows you "similar posts" or groups you might like, FAISS is doing KNN on embeddings.

### Uber
- **ETA Prediction**: Uber uses nearest-neighbor methods to predict trip ETAs. Given current traffic conditions (a feature vector), find the K most similar historical traffic states and average their actual trip times.
- **Fraud Detection**: Flag driver/rider accounts similar to known fraudulent accounts using KNN on behavioral feature vectors.

### Banks
- **Credit Scoring**: Compare a new applicant's profile to the K most similar past applicants. If most of them defaulted, the new applicant is high-risk.
- **Anti-Money Laundering**: Flag transactions whose patterns are "near" known money laundering patterns in a multidimensional feature space.

### Startups
- **Semantic Search (Pinecone, Weaviate)**: Vector databases like Pinecone are built entirely around nearest-neighbor search. Users embed documents, images, or products as vectors and retrieve the K most similar items. The entire vector database industry is commercialized KNN.

---

## Comparison With Similar Algorithms

### Detailed Comparison Table

| Criterion | KNN | Logistic Regression | Decision Tree | SVM | Random Forest | Naive Bayes |
|-----------|-----|---------------------|---------------|-----|---------------|-------------|
| **Type** | Instance-based | Parametric | Non-parametric | Parametric (kernel) | Ensemble | Probabilistic |
| **Training** | None ($O(1)$) | Fast ($O(n \cdot d)$) | Fast ($O(n \cdot d \log n)$) | Slow ($O(n^2 \cdot d)$) | Moderate | Very fast ($O(n \cdot d)$) |
| **Prediction** | Slow ($O(n \cdot d)$) | Very fast ($O(d)$) | Very fast ($O(\log n)$) | Fast ($O(d \cdot n_{sv})$) | Moderate ($O(T \cdot \log n)$) | Very fast ($O(d \cdot C)$) |
| **Boundary** | Non-linear, local | Linear (or polynomial) | Axis-aligned, piecewise | Non-linear (kernel) | Complex, averaged | Linear (class-conditional) |
| **Interpretability** | Instance-level | Global (coefficients) | High (tree rules) | Low (kernel space) | Low | Moderate (probabilities) |
| **Handles Non-Linearity** | Naturally | Needs feature engineering | Naturally | With kernels | Naturally | Limited |
| **Dimensionality** | Poor in high-$d$ | Good | Good | Good (kernel) | Good | Good |
| **Imbalanced Data** | Poor | Moderate | Moderate | Good | Good | Good |
| **Outlier Sensitivity** | High (small K) | Low (regularized) | Moderate | Low (margin-based) | Low (averaged) | Moderate |
| **Scalability** | Poor (large $n$) | Excellent | Good | Moderate | Good | Excellent |
| **Memory** | $O(n \cdot d)$ | $O(d)$ | $O(\text{nodes})$ | $O(n_{sv} \cdot d)$ | $O(T \cdot \text{nodes})$ | $O(d \cdot C)$ |

### When to Choose KNN Over Alternatives

- Small dataset ($n < 10K$), low dimensions ($d < 20$)
- Need instance-level explanations ("we classified this as fraud because these 5 similar cases were fraud")
- Non-linear boundary with no clear parametric form
- Quick baseline without hyperparameter tuning
- Online learning / streaming (just add new points)

### When to Choose Alternatives Over KNN

- Large datasets → Random Forest, XGBoost
- High dimensions → SVM with RBF kernel, neural networks
- Real-time prediction → Logistic Regression, Decision Tree
- Need feature importance → Random Forest, XGBoost
- Imbalanced data → SVM, ensemble methods with class weighting

---

## Advanced Topics

### Approximate Nearest Neighbors (ANN)

When exact KNN is too slow ($n > 1M$), use approximate methods that trade accuracy for speed:

| Method | Idea | Library |
|--------|------|---------|
| **Locality-Sensitive Hashing (LSH)** | Hash similar items to the same bucket | `datasketch`, `lshforest` |
| **KD-Trees** | Axis-aligned spatial partitioning | `scikit-learn` |
| **Ball Trees** | Hypersphere-based partitioning | `scikit-learn` |
| **HNSW (Hierarchical NSW)** | Navigable small-world graph | `FAISS`, `hnswlib`, `Annoy` |
| **Product Quantization** | Compress vectors into codes, search in compressed space | `FAISS` |
| **IVF (Inverted File)** | Cluster data, search only nearby clusters | `FAISS` |

HNSW is the current state-of-the-art for billion-scale nearest-neighbor search, powering systems at Meta, Spotify, and major vector databases.

### Variants of KNN

| Variant | Modification |
|---------|-------------|
| **Weighted KNN** | Weight votes by $1/d$ or $1/d^2$ |
| **Condensed NN (CNN)** | Remove redundant training points far from boundary |
| **Edited NN (ENN)** | Remove noisy training points that disagree with neighbors |
| **Reduced NN (RNN)** | Find minimal subset that classifies all training data correctly |
| **Large Margin NN (LMNN)** | Learn a Mahalanobis distance metric that maximizes KNN accuracy |
| **Neighbourhood Components Analysis (NCA)** | Learn a linear transformation that optimizes KNN leave-one-out accuracy |
| **Adaptive KNN** | Use different K for different regions based on local density |

### Metric Learning

Instead of using a fixed distance metric, **learn** the best metric for KNN:

**Mahalanobis Distance**:

$$
d(\mathbf{x}, \mathbf{y}) = \sqrt{(\mathbf{x} - \mathbf{y})^\top \mathbf{M} (\mathbf{x} - \mathbf{y})}
$$

> ##### Learn the matrix M that makes KNN classification optimal. This "stretches" space to separate classes.

When $\mathbf{M} = \mathbf{I}$ (identity), this is Euclidean distance. When $\mathbf{M} = \Sigma^{-1}$ (inverse covariance), it accounts for feature correlations. LMNN and NCA learn $\mathbf{M}$ to maximize classification accuracy.

### Ensemble with KNN

- **Bagged KNN**: Train multiple KNN models on bootstrap samples, average predictions. Reduces variance.
- **Boosted KNN**: Sequentially train KNN models on reweighted data, focusing on misclassified points. Less common but effective.
- **KNN as meta-learner**: Use KNN predictions as features for a higher-level model (stacking).
- **KNN + Feature Engineering**: Apply KNN on different feature subsets and combine predictions.

### Key Research Papers

1. **Fix & Hodges (1951)**: "Discriminatory Analysis" — the original nearest-neighbor paper.
2. **Cover & Hart (1967)**: "Nearest Neighbor Pattern Classification" — proves the fundamental error bound.
3. **Weinberger & Saul (2009)**: "Distance Metric Learning for Large Margin Nearest Neighbor Classification" — LMNN, learning metrics for KNN.
4. **Indyk & Motwani (1998)**: "Approximate Nearest Neighbors: Towards Removing the Curse of Dimensionality" — LSH.
5. **Johnson, Douze, Jégou (2019)**: "Billion-scale similarity search with GPUs" — FAISS paper.
6. **Malkov & Yashunin (2020)**: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs" — HNSW.

---

## Best Practices

### Data Preparation
1. **Always scale features** — StandardScaler or MinMaxScaler. No exceptions.
2. **Handle missing values** — KNN cannot compute distance with NaN. Impute first.
3. **Encode categoricals** — One-hot for nominal, ordinal encoding for ordered.
4. **Remove irrelevant features** — Use correlation analysis, mutual information, or recursive feature elimination.

### Feature Engineering
5. **Reduce dimensionality** — PCA for $d > 20$. t-SNE/UMAP for visualization (not for KNN input).
6. **Create domain-specific distance features** — If you know latitude/longitude, use Haversine distance instead of Euclidean.
7. **Feature interaction** — Sometimes creating $x_1 \times x_2$ features improves KNN by making the distance metric more expressive.

### Hyperparameter Tuning
8. **Use cross-validation to select K** — Never use test data. 5-fold or 10-fold CV.
9. **Try both uniform and distance weighting** — Distance weighting often helps with non-uniform boundaries.
10. **Experiment with metrics** — Euclidean is default, but Manhattan or custom metrics may be better.

### Cross-Validation
11. **Use stratified K-fold for imbalanced data** — Ensures each fold has proportional class representation.
12. **Use pipeline to avoid leakage** — Scikit-learn's `Pipeline` ensures scaling is done within each CV fold.

### Production Deployment
13. **Use ANN for large-scale** — FAISS, Annoy, or ScaNN for $n > 100K$.
14. **Model distillation** — Train a neural network to mimic KNN predictions, deploy the network.
15. **Cache frequent queries** — If the same (or similar) queries repeat, cache predictions.
16. **Monitor data drift** — KNN's predictions depend on the training distribution. If the data shifts, predictions degrade. Retrain (update the stored data) regularly.
17. **Quantize vectors** — Reduce memory by storing 16-bit or 8-bit floats instead of 64-bit.

---

## Complete End-to-End Project

### Heart Disease Prediction Using KNN

**Problem Statement**: Given patient health metrics (age, cholesterol, blood pressure, etc.), predict whether they have heart disease.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_wine         # Using wine as a stand-in dataset
from sklearn.model_selection import (
    train_test_split, cross_val_score,
    GridSearchCV, StratifiedKFold
)
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (
    accuracy_score, classification_report,
    confusion_matrix, ConfusionMatrixDisplay,
    roc_curve, auc
)
from sklearn.pipeline import Pipeline
from sklearn.decomposition import PCA


# LOAD AND EXPLORE DATA

# Using sklearn's wine dataset (3 classes, 13 features)
data = load_wine()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = pd.Series(data.target, name='target')

print("Dataset Shape:", X.shape)
print("\nClass Distribution:")
print(y.value_counts())
print("\nFeature Statistics:")
print(X.describe().round(2))

# EXPLORATORY DATA ANALYSIS

# Correlation heatmap
plt.figure(figsize=(12, 10))
sns.heatmap(X.corr(), annot=True, cmap='coolwarm', fmt='.2f',
            linewidths=0.5, square=True)
plt.title('Feature Correlation Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# Pairplot of top 4 features
top_features = ['alcohol', 'malic_acid', 'flavanoids', 'color_intensity']
plot_df = X[top_features].copy()
plot_df['target'] = y
sns.pairplot(plot_df, hue='target', palette='viridis', diag_kind='kde')
plt.suptitle('Pairwise Feature Distribution', y=1.02,
             fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()


# DATA PREPROCESSING

# Train-test split (80-20, stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTrain size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")
print(f"Train class distribution:\n{y_train.value_counts().sort_index()}")


# MODEL TRAINING & HYPERPARAMETER TUNING

# Build pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('knn', KNeighborsClassifier())
])

# Define hyperparameter grid
param_grid = {
    'knn__n_neighbors': list(range(1, 31)),
    'knn__weights': ['uniform', 'distance'],
    'knn__metric': ['euclidean', 'manhattan', 'minkowski'],
    'knn__p': [1, 2, 3]
}

# Grid search with 5-fold stratified CV
grid_search = GridSearchCV(
    pipeline,
    param_grid,
    cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42),
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X_train, y_train)

print(f"\nBest Parameters: {grid_search.best_params_}")
print(f"Best CV Accuracy: {grid_search.best_score_:.4f}")

# EVALUATION

best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)

print("\n Test Set Evaluation")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"\nClassification Report:\n{classification_report(y_test, y_pred, target_names=data.target_names)}")

# Confusion Matrix
fig, ax = plt.subplots(figsize=(8, 6))
ConfusionMatrixDisplay.from_predictions(
    y_test, y_pred, display_labels=data.target_names,
    cmap='Blues', ax=ax
)
ax.set_title('Confusion Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# K SELECTION CURVE

k_range = range(1, 41)
cv_scores_list = []

for k in k_range:
    pipe = Pipeline([
        ('scaler', StandardScaler()),
        ('knn', KNeighborsClassifier(n_neighbors=k, weights='distance'))
    ])
    scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring='accuracy')
    cv_scores_list.append(scores.mean())

plt.figure(figsize=(10, 6))
plt.plot(k_range, cv_scores_list, 'b-o', markersize=4)
plt.xlabel('K (Number of Neighbors)', fontsize=12)
plt.ylabel('5-Fold CV Accuracy', fontsize=12)
plt.title('Optimal K Selection', fontsize=14, fontweight='bold')
optimal_k = list(k_range)[np.argmax(cv_scores_list)]
plt.axvline(x=optimal_k, color='r', linestyle='--',
            label=f'Best K = {optimal_k}')
plt.legend(fontsize=12)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


#DIMENSIONALITY REDUCTION + VISUALIZATION

# PCA to 2D for visualization
pca = PCA(n_components=2)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_pca = pca.fit_transform(X_scaled)

print(f"\nPCA Explained Variance: {pca.explained_variance_ratio_.round(3)}")
print(f"Total Variance Explained: {pca.explained_variance_ratio_.sum():.3f}")

# Train KNN on PCA data for boundary visualization
knn_pca = KNeighborsClassifier(n_neighbors=optimal_k, weights='distance')
knn_pca.fit(X_pca, y)

h = 0.02
x_min, x_max = X_pca[:, 0].min() - 1, X_pca[:, 0].max() + 1
y_min, y_max = X_pca[:, 1].min() - 1, X_pca[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                      np.arange(y_min, y_max, h))
Z = knn_pca.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

plt.figure(figsize=(10, 8))
plt.contourf(xx, yy, Z, alpha=0.2, cmap='viridis')
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='viridis',
                      edgecolors='black', s=50, alpha=0.8)
plt.colorbar(scatter, label='Class')
plt.xlabel('First Principal Component', fontsize=12)
plt.ylabel('Second Principal Component', fontsize=12)
plt.title(f'KNN Decision Boundary (K={optimal_k}) on PCA-Reduced Data',
          fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()


# DEPLOYMENT CONSIDERATIONS

print("\n Deployment Notes")
print(f"Model: KNN with K={grid_search.best_params_['knn__n_neighbors']}")
print(f"Metric: {grid_search.best_params_['knn__metric']}")
print(f"Weights: {grid_search.best_params_['knn__weights']}")
print(f"Training samples stored: {X_train.shape[0]}")
print(f"Features: {X_train.shape[1]}")
print(f"Memory: ~{X_train.shape[0] * X_train.shape[1] * 8 / 1024:.1f} KB")
print(f"\nFor production with >100K samples, consider:")
print(f"  - FAISS or Annoy for approximate NN")
print(f"  - Model distillation to a neural network")
print(f"  - Feature reduction via PCA (current: {X.shape[1]}D → 2D)")
```

---

## Cheat Sheet

### Key Formulas

| Formula | Description |
|---------|-------------|
| $d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum (x_i - y_i)^2}$ | Euclidean distance |
| $d(\mathbf{x}, \mathbf{y}) = \sum |x_i - y_i|$ | Manhattan distance |
| $\hat{y} = \arg\max_c \sum \mathbb{1}(y_i = c)$ | Majority vote (classification) |
| $\hat{y} = \frac{1}{K}\sum y_i$ | Average (regression) |
| $w_i = 1 / d_i^2$ | Distance weighting |
| $R_{1\text{-NN}} \leq 2R^*(1-R^*)$ | Cover-Hart bound |

### Key Concepts

| Concept | Summary |
|---------|---------|
| **Lazy learner** | No training; all computation at prediction time |
| **Non-parametric** | No distributional assumptions |
| **Instance-based** | Model = stored training data |
| **Curse of dimensionality** | High-$d$ → distances become meaningless |
| **Bias-variance** | Small K = overfit, large K = underfit |
| **Feature scaling** | Mandatory — use StandardScaler or MinMaxScaler |

### Hyperparameters at a Glance

| Parameter | Default | Tuning Strategy |
|-----------|---------|----------------|
| K | 5 | Cross-validate over $[1, \sqrt{n}]$; use odd for binary |
| Weights | uniform | Try 'distance' for non-uniform boundaries |
| Metric | euclidean | Manhattan for sparse/high-$d$; cosine for text |
| Algorithm | auto | KD-tree for $d<20$; Ball-tree otherwise; ANN for $n>100K$ |

### Pros & Cons Summary

| Pros | Cons |
|---------|--------|
| Zero training time | Slow predictions ($O(nd)$) |
| No assumptions | Curse of dimensionality |
| Naturally non-linear | Sensitive to irrelevant features |
| Easy to implement | High memory ($O(nd)$) |
| Intuitive explanations | No feature importance |
| Handles multi-class | Sensitive to scale |

### Quick Interview Points

- KNN is **lazy, non-parametric, instance-based**
- Training: $O(1)$, Prediction: $O(n \cdot d)$
- **Always scale features** (mandatory, not optional)
- **K controls bias-variance**: small K = overfit, large K = underfit
- Cover-Hart: 1-NN error $\leq 2 \times$ Bayes optimal error
- KNN estimates the posterior $P(y \mid x)$ locally
- Use **ANN** (FAISS, HNSW) for large-scale deployment
- Decision boundary = Voronoi diagram (for K=1)
- **Curse of dimensionality** is KNN's biggest weakness

---

## Revision Notes

### For Placements & ML Interviews

**1. Definition**: KNN classifies by majority vote of K nearest training points. Non-parametric, lazy, instance-based.

**2.Training**: $O(1)$ — just store data. **Prediction**: $O(n \cdot d)$ — scan all points.

**3. K selection**: Cross-validation. Small K = overfit (low bias, high variance). Large K = underfit (high bias, low variance). Start with $\sqrt{n}$.

**4. Distance**: Euclidean (default), Manhattan (robust to outliers), Cosine (text data). Always scale features.

**5. Curse of dimensionality**: In high-$d$, all distances converge. Use PCA or feature selection to reduce $d$.

**6. Weighted KNN**: $w_i = 1/d_i^2$. Closer neighbors count more.

**7. Cover-Hart Theorem**: 1-NN error $\leq 2R^*(1-R^*)$. Universal consistency as $K \to \infty$, $K/n \to 0$.

**8. Voronoi diagram**: 1-NN boundary. Piecewise linear for Euclidean distance.

**9. Advantages**: No training, no assumptions, intuitive, handles non-linearity, multi-class native.

**10. Disadvantages**: Slow prediction, high memory, curse of dimensionality, scale-sensitive, no feature importance.

**11. Production**: Use FAISS/Annoy/HNSW for large $n$. Distill to a neural network. Reduce dims with PCA.

**12. vs. Others**: Slower than logistic regression at prediction. More flexible than SVM without kernels. Simpler than random forest but less scalable.

### For Data Science Interviews

- Know the **full pipeline**: scale → reduce dims → choose K → choose metric → cross-validate → predict
- Be ready to **implement from scratch** in Python (50 lines)
- Explain **bias-variance tradeoff** with KNN as the textbook example
- Discuss **when NOT to use KNN** (high-$d$, large $n$, real-time inference)
- Relate KNN to **collaborative filtering** in recommendation systems
- Know **ANN algorithms**: LSH, KD-tree, Ball-tree, HNSW, FAISS

### For Exams

- Memorize: Euclidean distance formula, majority vote formula, Cover-Hart bound
- Be able to: work through a numerical example by hand (compute distances, sort, vote)
- Understand: bias-variance tradeoff, curse of dimensionality, Voronoi diagram
- Compare: KNN vs. Logistic Regression vs. Decision Tree vs. SVM (table format)

---

## Learning Path

### Prerequisites (What You Should Know Before KNN)

| Topic | Why |
|-------|-----|
| Basic linear algebra (vectors, norms) | Distance computation |
| Basic probability | Understanding posterior estimation |
| Python + NumPy basics | Implementation |
| Data preprocessing (scaling, encoding) | KNN is useless without preprocessing |

### Related Algorithms (Study Alongside KNN)

| Algorithm | Relationship |
|-----------|-------------|
| Naive Bayes | Another simple classifier; compare decision boundaries |
| Decision Tree | Another non-parametric method; but learns a model |
| Kernel Density Estimation (KDE) | Theoretically linked to KNN (both estimate local density) |
| Radius Neighbors | Variant: fixed radius instead of fixed K |

### Next Algorithms to Learn (After KNN)

| Order | Algorithm | Why Next |
|-------|-----------|----------|
| 1 | Logistic Regression | Simplest parametric classifier; compare with KNN |
| 2 | Decision Trees | Non-parametric but learns a model; key building block |
| 3 | Support Vector Machines | Non-linear classification with kernel trick |
| 4 | Random Forests | Ensemble of trees; scalable, feature importance |
| 5 | Gradient Boosted Trees (XGBoost) | State-of-the-art for tabular data |
| 6 | Neural Networks | Deep learning; learns embeddings for downstream KNN |

### Advanced Concepts Built Upon KNN

| Concept | Description |
|---------|-------------|
| **Metric Learning** (LMNN, NCA) | Learn the optimal distance function for KNN |
| **Approximate Nearest Neighbors** | FAISS, HNSW, LSH for billion-scale KNN |
| **Vector Databases** | Pinecone, Weaviate, Milvus — productionized KNN at scale |
| **Manifold Learning** | t-SNE, UMAP — reduce dimensionality while preserving neighbor structure |
| **Semi-supervised Learning** | Label propagation using KNN graphs |
| **Graph Neural Networks** | KNN graphs as input structure for GNNs |
| **Retrieval-Augmented Generation (RAG)** | LLMs + KNN vector retrieval for grounded generation |

The journey from KNN to modern AI is surprisingly direct: KNN → ANN search → vector databases → embedding spaces → retrieval-augmented LLMs. The simple idea of "find the closest thing" scales all the way from a 6-point toy dataset to trillion-parameter language models retrieving knowledge from billion-document corpora.

