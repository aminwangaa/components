---
nav:
  title: 组件
  path: /components
---

## CusDragTable

#### 使用

> 1、表格支持自定义配置操作 \
> 2、列头位置通过弹窗拖拽实现交换 \
> 3、列头固定最多支持左三列、右三列, 并且只有左(前一列)或右(后一列)固定的情况下才可选择固定, 固定操作应从第一列或最后一列开始 \
> 4、通过显示开关配置列是否显示 \
> 5、表格若无固定列，则拖拽时表格总宽度不变，其余列会响应宽度变化 \
> 6、表格有固定列，则拖拽时表格总宽度加宽

#### tips: 具体表格使用的属性字段请参考[Antd Table](https://ant-design.gitee.io/components/table-cn/#API)

## 演示

```tsx
import React, { useState } from 'react';
import { CusDragTable } from 'components_amin';

const columns = [
  { title: '项目名称', dataIndex: 'projectName', width: 160, align: 'center' },
  { title: '前端', dataIndex: 'javascript', width: 160, align: 'center' },
  { title: '后端', dataIndex: 'java', width: 160, align: 'center' },
  { title: '产品', dataIndex: 'product', width: 160, align: 'center' },
  { title: 'UI设计师', dataIndex: 'ui', width: 160, align: 'center' },
  { title: '测试', dataIndex: 'test', width: 160, align: 'center' },
  { title: '交互', dataIndex: 'interaction', width: 160, align: 'center' },
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
  <CusDragTable
    storageField={'testTable'}
    columns={columns}
    dataSource={dataSource}
    rowKey={'id'}
    callback={changeDataSource}
    debounceTime={500}
    scroll={{ x: 1000 }}
  />
);
```

## CusDragTable、SearchBar、useAntdTable 组合

> 缺陷: 在组件库展示时，SearchBar 内容更改，输入框会失焦 \
> 但是在项目中使用时没有出现这个问题

```tsx
import React, { useState } from 'react';
import { useAntdTable } from 'ahooks';
import { CusDragTable, SearchBar } from 'components_amin';

const configs = [
  {
    label: '项目名称',
    field: 'projectName',
    type: 'input',
    placeholder: '请输入项目名称',
    allowClear: true,
  },
  {
    label: '前端',
    field: 'javascript',
    type: 'input',
    placeholder: '请输入前端名称',
    allowClear: true,
  },
  {
    label: '后端',
    field: 'java',
    type: 'input',
    placeholder: '请输入后端名称',
    allowClear: true,
  },
  {
    label: '产品',
    field: 'product',
    type: 'input',
    placeholder: '请输入产品名称',
    allowClear: true,
  },
  {
    label: 'UI设计师',
    field: 'ui',
    type: 'input',
    placeholder: '请输入UI设计师名称',
    allowClear: true,
  },
  {
    label: '测试',
    field: 'test',
    type: 'input',
    placeholder: '请输入测试名称',
    allowClear: true,
  },
];

const columns = [
  { title: '项目名称', dataIndex: 'projectName', width: 160, align: 'center' },
  { title: '前端', dataIndex: 'javascript', width: 160, align: 'center' },
  { title: '后端', dataIndex: 'java', width: 160, align: 'center' },
  { title: '产品', dataIndex: 'product', width: 160, align: 'center' },
  { title: 'UI设计师', dataIndex: 'ui', width: 160, align: 'center' },
  { title: '测试', dataIndex: 'test', width: 160, align: 'center' },
  { title: '交互', dataIndex: 'interaction', width: 160, align: 'center' },
];

const initDataSource = [
  {
    id: 1,
    projectName: '智慧版房',
    javascript: 'Tony',
    java: 'Candy',
    product: 'Lily',
    ui: 'Lisa',
    test: 'Jone',
    interaction: 'Gaga',
  },
  {
    id: 2,
    projectName: '产能平台',
    javascript: 'Jerry',
    java: 'Antony',
    product: 'Edward',
    ui: 'Dean',
    test: 'Ben',
    interaction: 'Hugh',
  },
  {
    id: 3,
    projectName: 'WMS',
    javascript: 'Karl',
    java: 'Jo',
    product: 'Gelo',
    ui: 'Charles',
    test: 'Hugo',
    interaction: 'Lou',
  },
  {
    id: 4,
    projectName: 'APS',
    javascript: 'Antoine',
    java: 'Hyman',
    product: 'Ricky',
    ui: 'Hubery',
    test: 'Dennis',
    interaction: 'Ansel',
  },
  {
    id: 5,
    projectName: 'OMS',
    javascript: 'Ansel',
    java: 'Jonas',
    product: 'David',
    ui: 'Hart',
    test: 'Lewis',
    interaction: 'Dempsey',
  },
  {
    id: 6,
    projectName: '智慧版房',
    javascript: 'Tony',
    java: 'Candy',
    product: 'Lily',
    ui: 'Lisa',
    test: 'Jone',
    interaction: 'Gaga',
  },
  {
    id: 7,
    projectName: '产能平台',
    javascript: 'Jerry',
    java: 'Antony',
    product: 'Edward',
    ui: 'Dean',
    test: 'Ben',
    interaction: 'Hugh',
  },
  {
    id: 8,
    projectName: 'WMS',
    javascript: 'Karl',
    java: 'Jo',
    product: 'Gelo',
    ui: 'Charles',
    test: 'Hugo',
    interaction: 'Lou',
  },
  {
    id: 9,
    projectName: 'APS',
    javascript: 'Antoine',
    java: 'Hyman',
    product: 'Ricky',
    ui: 'Hubery',
    test: 'Dennis',
    interaction: 'Ansel',
  },
  {
    id: 10,
    projectName: 'OMS',
    javascript: 'Ansel',
    java: 'Jonas',
    product: 'David',
    ui: 'Hart',
    test: 'Lewis',
    interaction: 'Dempsey',
  },
  {
    id: 11,
    projectName: '智慧版房',
    javascript: 'Tony',
    java: 'Candy',
    product: 'Lily',
    ui: 'Lisa',
    test: 'Jone',
    interaction: 'Gaga',
  },
  {
    id: 12,
    projectName: '产能平台',
    javascript: 'Jerry',
    java: 'Antony',
    product: 'Edward',
    ui: 'Dean',
    test: 'Ben',
    interaction: 'Hugh',
  },
  {
    id: 13,
    projectName: 'WMS',
    javascript: 'Karl',
    java: 'Jo',
    product: 'Gelo',
    ui: 'Charles',
    test: 'Hugo',
    interaction: 'Lou',
  },
  {
    id: 14,
    projectName: 'APS',
    javascript: 'Antoine',
    java: 'Hyman',
    product: 'Ricky',
    ui: 'Hubery',
    test: 'Dennis',
    interaction: 'Ansel',
  },
  {
    id: 15,
    projectName: 'OMS',
    javascript: 'Ansel',
    java: 'Jonas',
    product: 'David',
    ui: 'Hart',
    test: 'Lewis',
    interaction: 'Dempsey',
  },
  {
    id: 16,
    projectName: '智慧版房',
    javascript: 'Tony',
    java: 'Candy',
    product: 'Lily',
    ui: 'Lisa',
    test: 'Jone',
    interaction: 'Gaga',
  },
  {
    id: 17,
    projectName: '产能平台',
    javascript: 'Jerry',
    java: 'Antony',
    product: 'Edward',
    ui: 'Dean',
    test: 'Ben',
    interaction: 'Hugh',
  },
  {
    id: 18,
    projectName: 'WMS',
    javascript: 'Karl',
    java: 'Jo',
    product: 'Gelo',
    ui: 'Charles',
    test: 'Hugo',
    interaction: 'Lou',
  },
  {
    id: 19,
    projectName: 'APS',
    javascript: 'Antoine',
    java: 'Hyman',
    product: 'Ricky',
    ui: 'Hubery',
    test: 'Dennis',
    interaction: 'Ansel',
  },
  {
    id: 20,
    projectName: 'OMS',
    javascript: 'Ansel',
    java: 'Jonas',
    product: 'David',
    ui: 'Hart',
    test: 'Lewis',
    interaction: 'Dempsey',
  },
];

// 模拟数据请求
const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = initDataSource.slice(0, ~~(Math.random() * 20));
      resolve({
        list: data,
        total: data.length,
      });
    }, 500);
  });
};

const [params, setParams] = useState<Record<string, any>>({
  pageSize: 5,
  pageNum: 1,
});

const { tableProps } = useAntdTable(() => getData(params), {
  refreshDeps: params,
});

const paramsChange = (values) => {
  console.log('🚀 ~ file: index.zh-CN.md ~ line 54 ~ paramsChange ~ values', values);
  setParams({ ...values });
};

const changeDataSource = (data: any[]) => {
  setDataSource(data);
};

export default () => (
  <div>
    <SearchBar
      configs={configs}
      params={params}
      callback={paramsChange}
      debounceTime={200}
    ></SearchBar>
    <CusDragTable
      storageField={'concatTable'}
      columns={columns}
      rowKey={'id'}
      callback={changeDataSource}
      scroll={{ x: 1000 }}
      {...tableProps}
    />
  </div>
);
```

<API src="/index.tsx"></API>
