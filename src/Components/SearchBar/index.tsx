import { Col, Row } from 'antd';
import { cloneDeep, debounce } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';

import FormNode from '../FormNode';

import styles from './index.module.less';

type Props = {
  params: Record<string, any>;
  callback: (params: Record<string, any>) => void;
  configs: Array<{ label: string; value: any; [key: string]: any }>;
  debounceTime?: number;
};

const SearchBar = (props: Props) => {
  const { params, callback, configs, debounceTime = 200 } = props;

  const paramsRef = useRef(params);

  useEffect(() => {
    paramsRef.current = { ...params };
  }, [params]);

  const valuesChange = debounce((value, field) => {
    const nParams = cloneDeep(paramsRef.current);
    nParams[field] = value;
    const keys = Reflect.ownKeys(nParams);

    for (let i = 0; i < keys.length; i++) {
      if (typeof keys[i] !== 'symbol' && nParams[keys[i] as string]) {
      }
    }

    callback && callback(nParams);
  }, debounceTime);

  const Search = useMemo(() => {
    return configs.map((item: Record<string, any>, idx: number) => {
      item.allowClear = true;
      return (
        <Col
          key={idx}
          className={styles.searchItem}
          span={item.span || 6}
          style={{ minWidth: item.minWidth || 'none' }}
        >
          <span className={styles.searchLabel}>{item.label}</span>
          <div className={styles.searchValue}>
            <FormNode
              {...item}
              type={item.type}
              onChange={(value) => valuesChange(value, item.field)}
              value={paramsRef.current[item.field]}
            ></FormNode>
          </div>
        </Col>
      );
    });
  }, [configs]);

  return <Row>{Search}</Row>;
};

export default SearchBar;
