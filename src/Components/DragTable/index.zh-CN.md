---
nav:
  title: 组件
  path: /components
---

## DragTable

#### 使用

> 1、鼠标移动到目标行，按下左键开始拖拽 \
> 2、拖拽到目标行，松开鼠标，完成数据交换

#### tips: 具体表格使用的属性字段请参考[Antd Table](https://ant-design.gitee.io/components/table-cn/#API)

Demo:

```tsx
import React, { useState } from 'react';
import { DragTable } from 'components_amin';

const columns = [
  { title: '项目名称', dataIndex: 'projectName' },
  { title: '前端', dataIndex: 'javascript' },
  { title: '后端', dataIndex: 'java' },
  { title: '产品', dataIndex: 'product' },
  { title: 'UI设计师', dataIndex: 'ui' },
  { title: '测试', dataIndex: 'test' },
  { title: '交互', dataIndex: 'interaction' },
];

const initDataSource = [
  {
    id: 1,
    projectName: '智慧版房',
    javascript: '3',
    java: '3',
    product: '1',
    ui: '1',
    test: '2',
    interaction: '1',
  },
  {
    id: 2,
    projectName: '产能平台',
    javascript: '2',
    java: '2',
    product: '1',
    ui: '1',
    test: '1',
    interaction: '1',
  },
  {
    id: 3,
    projectName: 'WMS',
    javascript: '5',
    java: '5',
    product: '1',
    ui: '1',
    test: '2',
    interaction: '1',
  },
  {
    id: 4,
    projectName: 'APS',
    javascript: '4',
    java: '4',
    product: '1',
    ui: '1',
    test: '2',
    interaction: '1',
  },
];

const [dataSource, setDataSource] = useState(initDataSource);

const changeDataSource = (data: any[]) => {
  setDataSource(data);
};

export default () => (
  <DragTable columns={columns} dataSource={dataSource} rowKey={'id'} callback={changeDataSource} />
);
```

<API src="/index.tsx"></API>
