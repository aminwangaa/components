---
nav:
  title: 组件
  path: /components
---

## SearchBar

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { SearchBar } from 'components_amin';

const configs = [
  {
    label: '设备状态',
    field: 'status',
    type: 'select',
    placeholder: '请选择设备状态',
    options: [
      { label: '开启', value: 1 },
      { label: '关闭', value: 2 },
      { label: '未知', value: 3 },
    ],
    allowClear: true,
    span: 5,
  },
  {
    label: '设备ID',
    field: 'id',
    type: 'input',
    placeholder: '请输入设备ID',
    span: 5,
  },
  {
    label: '设备名称',
    field: 'name',
    type: 'input',
    placeholder: '请输入设备名称',
    span: 5,
  },
  {
    label: '部门',
    field: 'department',
    type: 'tree',
    placeholder: '请选择部门',
    treeCheckable: true,
    treeData: [
      {
        label: '信息部',
        value: 1,
        children: [
          { label: '技术预研部', value: 11 },
          { label: '软件信息部', value: 12 },
        ],
      },
      { label: '运营部', value: 2 },
      { label: '采购部', value: 3 },
    ],
    allowClear: true,
    span: 5,
  },
  {
    label: '父级设备',
    field: 'parentName',
    type: 'input',
    placeholder: '请输入父级设备名称',
    span: 5,
  },
  {
    label: '开始时间',
    field: 'startTime',
    type: 'rangePicker',
    showTime: true,
    placeholder: '请选择开始时间',
    span: 8,
    minWidth: 480,
  },
];

const [params, setParams] = useState<Record<string, any>>({
  pageSize: 20,
  pageNum: 1,
});

const paramsChange = (values) => {
  console.log('🚀 ~ file: index.zh-CN.md ~ line 54 ~ paramsChange ~ values', values);
};

export default () => (
  <SearchBar
    configs={configs}
    params={params}
    callback={paramsChange}
    debounceTime={200}
  ></SearchBar>
);
```

<API src="/index.tsx"></API>
