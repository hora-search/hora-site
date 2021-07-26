import React, { useState, useEffect, useRef, useMemo } from 'react';

// import { mockWineSearch } from './mocks';
import { debounce } from './utils';
import c from './wine.style.module.scss';

interface WineData {
  id: string;
  country: string;
  designation: string;
  province: string;
  description: string;
  price: number;
  region_1: string;
  region_2: string;
  points: number;
  variety: string;
  winery: string;
}

const WineSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [wineDatas, setWineDatas] = useState<WineData[] | null>(null);

  const refCurReqId = useRef({});
  const fetchData = useMemo(
    () =>
      debounce(async (keyword: string) => {
        const thisReqId = {};
        refCurReqId.current = thisReqId;

        const testIsLatesetReq = () => refCurReqId.current === thisReqId;

        try {
          const resp = await fetch(`/demos/wine_search?description=${encodeURIComponent(keyword)}`);
          // const resp = { json: async () => Promise.resolve(mockWineSearch) };
          if (!testIsLatesetReq()) {
            return;
          }
          const json = await resp.json();
          setWineDatas(json.resp);
        } catch {
          if (!testIsLatesetReq()) {
            return;
          }
        }
      }, 300),
    []
  );

  useEffect(() => {
    if (!keyword) {
      return;
    }
    fetchData(keyword);
  }, [keyword]);

  const result = (() => {
    if (!wineDatas) {
      return <p className={c.dataPlaceholder}>Top 5 most relative results show here.</p>;
    }
    if (wineDatas.length < 1) {
      return <p className={c.noData}>No Data.</p>;
    }
    return wineDatas.map((data) => (
      <div className={c.wineItem} key={data.id}>
        <p className={c.wineDesc}>{data.description}</p>
        <div className={c.wineFooter}>
          <span className={c.wineDesign}>{data.designation}</span>
          <span>{data.country}</span>
          <span>{data.province}</span>
          <span>${data.price}</span>
          <span>{data.region_1}</span>
          <span>🌟{data.points}</span>
          <span>{data.variety}</span>
          <span>{data.winery}</span>
        </div>
      </div>
    ));
  })();

  return (
    <div>
      <input
        className={c.input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Type some words to describe your dream wine."
      />
      <div className={c.showcase}>{result}</div>
    </div>
  );
};

export default WineSearch;
