---
nav:
  title: 组件
  path: /components
---

## CusModal

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { CusModal } from 'components_amin';
import { useBoolean } from 'ahooks';
import { Button } from 'antd';

const configs = [
  {
    label: '区域',
    field: 'pcode',
    type: 'tree',
    span: 24,
    treeData: [
      {
        label: '浙江省',
        value: 1,
        children: [
          { label: '杭州市', value: 11 },
          { label: '温州市', value: 12 },
        ],
      },
    ],
    placeholder: '请选择区域',
    required: true,
    message: '请选择区域',
  },
  {
    label: '区域名称',
    field: 'name',
    type: 'input',
    placeholder: '请填写区域名称',
    span: 24,
  },
  {
    label: '区域编号',
    field: 'code',
    type: 'input',
    placeholder: '请填写区域编号',
    span: 24,
  },
];

const [state, { toggle, setTrue, setFalse }] = useBoolean(false);

const callback = (values) => {
  console.log(values, 'values');
  setFalse();
};

export default () => (
  <div>
    <Button onClick={setTrue}>显示</Button>
    {state ? (
      <CusModal
        visible={state}
        title={'新增弹窗'}
        callback={callback}
        configs={configs}
        cancel={setFalse}
        key={'modal'}
        okText={'确认'}
        cancelText={'取消'}
      ></CusModal>
    ) : null}
  </div>
);
```

<API src="/index.tsx"></API>
