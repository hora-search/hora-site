# Introduction

## **Hora Search Everywhere!**

Hora, a **approximate nearest neighbor search algorithm** library. We implement all code in `Rustð¦` for reliability, high level abstraction and high speed comparable to `C++`, these make it really suitable for Artificial Intellingence Computing scene.

Hora, **`ãã»ãã`** in Japanese, sound like `[hÅlÉ]`, means `Wow`, `You see!` or `Look at that!`. he name is inspired by a famous lyrics **`ãã»ã ããªãã«ã¨ã£ã¦å¤§äºãªäººã»ã© ãããã°ã«ããã®ã`** of a famous Japanese song **`å°ããªæã®ãã`**, it means **`You See, the most important people to you is always stay near you`**


# Approximate Nearest Neighbor

As shown in the picture below, we have a large data set. Each piece of data is an `array<float>` (usually a float) representing a store. Now the request is also an `array<float>`. We now hope that we Find k points with the smallest $Distance<query, candidate_i>$ in the data set.

make it in math language:

ND-dim query vectors $\qquad X= x_1,x_2,...,x_i \qquad M<<N$

1D-dim query vector $\qquad q$

Task:Given  $q$ and $x \in X$, find top K $x_i$  which has smallest $Distance(q , x_i) (x \in X)$

for futher more information, I really recommend this speech tutorial `[CVPR20 Tutorial] Billion-scale Approximate Nearest Neighbor Search` present in `CVPR2020`

<iframe width="100%" height="546" src="https://www.youtube.com/embed/SKrHs03i08Q?list=PLKQB14e0EJUWaTnwgQogJ3nSLzEFNn9d8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Key Features

* **Performant** â¡ï¸
  * **SIMD-Accelerated ([packed_simd](https://github.com/rust-lang/packed_simd))**
  * **Stable algorithm implementation**
  * **Multiple threads design**

* **Multiple Languages Support** âï¸
  * `Python`
  * `Javascript`
  * `Java`
  * `Go` (WIP)
  * `Ruby` (WIP)
  * `Swift` (WIP)
  * `R` (WIP)
  * `Julia` (WIP)
  * **also can serve as a service**

* **Multiple Indexes Support** ð
  * `Hierarchical Navigable Small World Graph Index(HNSWIndex)` ([detail](https://arxiv.org/abs/1603.09320))
  * `Satellite System Graph (SSGIndex)` ([detail](https://arxiv.org/abs/1907.06146))
  * `Product Quantization Inverted File(PQIVFIndex)` ([detail](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf))
  * `Random Projection Tree(RPTIndex)` (LSH, WIP)
  * `BruteForce (BruteForceIndex)` (naive implementation with SIMD)

* **Portable** ð¼
  * Support `no_std` (WIP, partial)
  * Support `Windows`, `Linux` and `OS X`
  * Support `IOS` and `Android` (WIP)
  * **No** heavy dependency, such as `BLAS`

* **Reliability** ð
  * `Rust` compiler secure all code
  * Memory managed by `Rust` for all language libs such as `Python lib`
  * Broad testing coverage

* **Multiple Distances Support** ð§®
  * `Dot Product Distance`
    * ![equation](https://latex.codecogs.com/gif.latex?D%28x%2Cy%29%20%3D%20%5Csum%7B%28x*y%29%7D)
  * `Euclidean Distance`
    * ![equation](https://latex.codecogs.com/gif.latex?D%28x%2Cy%29%20%3D%20%5Csqrt%7B%5Csum%7B%28x-y%29%5E2%7D%7D)
  * `Manhattan Distance`
    * ![equation](https://latex.codecogs.com/gif.latex?D%28x%2Cy%29%20%3D%20%5Csum%7B%7C%28x-y%29%7C%7D)
  * `Cosine Similarity`
    * ![equation](https://latex.codecogs.com/gif.latex?D%28x%2Cy%29%20%3D%20%5Cfrac%7Bx%20*y%7D%7B%7C%7Cx%7C%7C*%7C%7Cy%7C%7C%7D)

* **Productive** â­
  * Well documented
  * Elegant and simple API, easy to learn

# Related Projects and Comparison

* [Faiss](https://github.com/facebookresearch/faiss), [Annoy](https://github.com/spotify/annoy), [ScaNN](https://github.com/google-research/google-research/tree/master/scann): 
  * **`Hora`'s implementation is strongly inspired by these lib.**
  * `Faiss` focus more on the GPu scenerio, and `Hora` is lighter than Faiss, such as **no heavy dependency**.
  * `Hora` expects to support more language, and everything related to performance shall be implemented by Rustð¦.
  * `Annoy` only support `LSH(Random Projection)` algorithm.
  * `ScaNN` and `Faiss` are less user-friendly, such as lack of document.
  * Hora is **ALL IN RUST** ð¦.

* [Milvus](https://github.com/milvus-io/milvus), [Vald](https://github.com/vdaas/vald), [Jina AI](https://github.com/jina-ai/jina)
  * `Milvus` and `Vald` also support multiple languages, but serve as a service instead of a lib
  * `Milvus` is built upon some libs such as `Faiss`, while `Hora` is an algorithm lib with all the algo implemented by itself
