# Examples

## Rust

```rust
let mut hnsw_idx = Box::new(hora::index::hnsw_idx::HNSWIndex::<f32, usize>::new(
    dimension,  hora::index::hnsw_params::HNSWParams::<f32>::default(),
));
for i in 0..embs.len() {
    idx.add_node(&core::node::Node::<E, usize>::new_with_idx(
        embs[i].as_slice(),
        i,
    ))
    .unwrap();
}
idx.build(core::metrics::Metric::DotProduct).unwrap();
let result = idx.search(&q, K);
```
