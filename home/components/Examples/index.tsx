import React, { useEffect, useMemo, useState } from "react";
import hljs from "highlight.js";
import classnames from "classnames";

import SectionTitle from "../SectionTitle";
import c from "./style.module.scss";

const pythonDemo = `import numpy as np
from horapy import HNSWIndex

dimension = 50
n = 1000

# init index instance
index = HNSWIndex(dimension, "usize")

samples = np.float32(np.random.rand(n, dimension))
for i in range(0, len(samples)):
    # add node
    index.add(np.float32(samples[i]), i)

index.build("euclidean")  # build index

target = np.random.randint(0, n)
# 410 in Hora ANNIndex <HNSWIndexUsize> (dimension: 50, dtype: usize, max_item: 1000000, n_neigh: 32, n_neigh0: 64, ef_build: 20, ef_search: 500, has_deletion: False)
# has neighbors: [410, 736, 65, 36, 631, 83, 111, 254, 990, 161]
print("{} in {} \nhas neighbors: {}".format(
    target, index, index.search(samples[target], 10)))  # search`;

const javascriptDemo = `import * as horajs from "horajs";

const demo = () => {
    const dimension = 50;
    var bf_idx = horajs.BruteForceIndexUsize.new(dimension);
    // var hnsw_idx = horajs.HNSWIndexUsize.new(dimension, 1000000, 32, 64, 20, 500, 16, false);
    for (var i = 0; i < 1000; i++) {
        var feature = [];
        for (var j = 0; j < dimension; j++) {
            feature.push(Math.random());
        }
        bf_idx.add(feature, i); // add point 
    }
    bf_idx.build("euclidean"); // build index
    var feature = [];
    for (var j = 0; j < dimension; j++) {
        feature.push(Math.random());
    }
    console.log("bf result", bf_idx.search(feature, 10)); //bf result Uint32Array(10) [704, 113, 358, 835, 408, 379, 117, 414, 808, 826]
}

(async () => {
    await horajs.default();
    await horajs.init_env();
    demo();
})();
`;

const javaDemo = `public void demo() {
  final int dimension = 2;
  final float variance = 2.0f;
  Random fRandom = new Random();

  BruteForceIndex bruteforce_idx = new BruteForceIndex(dimension); // init index instance

  List<float[]> tmp = new ArrayList<>();
  for (int i = 0; i < 5; i++) {
      for (int p = 0; p < 10; p++) {
          float[] features = new float[dimension];
          for (int j = 0; j < dimension; j++) {
              features[j] = getGaussian(fRandom, (float) (i * 10), variance);
          }
          bruteforce_idx.add("bf", features, i * 10 + p); // add point
          tmp.add(features);
        }
  }
  bruteforce_idx.build("bf", "euclidean"); // build index

  int search_index = fRandom.nextInt(tmp.size());
  // nearest neighbor search
  int[] result = bruteforce_idx.search("bf", 10, tmp.get(search_index));
  // [main] INFO com.hora.app.ANNIndexTest  - demo bruteforce_idx[7, 8, 0, 5, 3, 9, 1, 6, 4, 2]
  log.info("demo bruteforce_idx" + Arrays.toString(result));
}

private static float getGaussian(Random fRandom, float aMean, float variance) {
  float r = (float) fRandom.nextGaussian();
  return aMean + r * variance;
}`;

const rustDemo = `use hora::core::ann_index::ANNIndex;
use rand::{thread_rng, Rng};
use rand_distr::{Distribution, Normal};

pub fn demo() {
    let n = 1000;
    let dimension = 64;

    // make sample points
    let mut samples = Vec::with_capacity(n);
    let normal = Normal::new(0.0, 10.0).unwrap();
    for _i in 0..n {
        let mut sample = Vec::with_capacity(dimension);
        for _j in 0..dimension {
            sample.push(normal.sample(&mut rand::thread_rng()));
        }
        samples.push(sample);
    }

    // init index
    let mut index = hora::index::hnsw_idx::HNSWIndex::<f32, usize>::new(
        dimension,
        &hora::index::hnsw_params::HNSWParams::<f32>::default(),
    );
    for (i, sample) in samples.iter().enumerate().take(n) {
        // add point
        index.add(sample, i).unwrap();
    }
    index.build(hora::core::metrics::Metric::Euclidean).unwrap();

    let mut rng = thread_rng();
    let target: usize = rng.gen_range(0..n);
    // 523 has neighbors: [523, 762, 364, 268, 561, 231, 380, 817, 331, 246]
    println!(
        "{:?} has neighbors: {:?}",
        target,
        index.search(&samples[target], 10) // search for k nearest neighbors
    );
}
`;

const languageExamples: { title: string; lang: string; lines: string[] }[] = [
  {
    title: "Python",
    lang: "python",
    lines: pythonDemo.split("\n"),
  },
  {
    title: "Rust",
    lang: "rust",
    lines: rustDemo.split("\n"),
  },
  {
    title: "Javascript",
    lang: "javascript",
    lines: javascriptDemo.split("\n"),
  },
  {
    title: "Java(WIP)",
    lang: "java",
    lines: javaDemo.split("\n"),
  },
];

const Example = (): JSX.Element => {
  const [activeLang, setActiveLang] = useState(languageExamples[0]!.lang);

  const curExample = useMemo(
    () => languageExamples.find((example) => example.lang === activeLang),
    [activeLang]
  );

  useEffect(() => {
    hljs.highlightAll();
  }, [curExample]);

  return (
    <div className={c.wrapper}>
      <SectionTitle>Examples</SectionTitle>
      <div className={c.content}>
        <div className={c.languageSwitcher}>
          {languageExamples.map(({ title, lang }) => {
            const isActive = activeLang === lang;
            return (
              <label
                key={lang}
                className={classnames(c.switcherItem, {
                  [c.activeLanguage]: isActive,
                })}
              >
                <input
                  checked={isActive}
                  onChange={() => setActiveLang(lang)}
                  type="radio"
                />
                {title}
              </label>
            );
          })}
        </div>
        <div className={c.codeShowcase}>
          <pre className={c.codeBlock}>
            {curExample.lines.map((line, index) => (
              <code
                key={index}
                className={classnames(
                  c.codeLine,
                  `language-${curExample.lang}`
                )}
              >
                {line}
              </code>
            ))}
          </pre>
          <button
            className={c.copyBtn}
            onClick={() =>
              navigator.clipboard.writeText(curExample.lines.join("\n"))
            }
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Example);
