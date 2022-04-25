---
nav:
  title: 组件
  path: /components
---

### FormNode

#### 应用场景

FormNode 组件适用于 Antd Form 表单适用，Form 下的 Form.Item 会自动传给组件 value 属性和 onChange 事件

#### 组件目的

简化 Form 表单中的操作 将三元操作抽离出来在 Form 表单中遍历循环生成节点信息的时候可能会这样

```
<FromItem
  key={item.name}
  name={item.name}
  label={item.label}
  rules={[{ required: item.required, message: item.message }]}
  getValueFromEvent={(event: InputEvent) => getValueFromEvent(event, item.type)}
>
  {item.type === 'text' ? (
    <Input placeholder={item.placeholder}></Input>
  ) : item.type === 'switch' ? (
    <FormSwitch></FormSwitch>
  ) : item.type === 'textarea' ? (
    <TextArea placeholder={item.placeholder}></TextArea>
  ) : item.type === 'tree' ? (
    <TreeSelect
      allowClear
      treeData={treeData}
      treeCheckable
      showCheckedStrategy={SHOW_PARENT}
      placeholder={item.placeholder}
    />
  ) : null}
</FromItem>
```

```
<Form
  form={form}
  name="inventoryForm"
  {...layout}
  initialValues={initialValues}
  onValuesChange={onValuesChange}
>
  <Row gutter={16}>
    {fromConfig.map((config, index) => {
      const { span = 6, label, name, required } = config

      const keys = [
        'type',
        'options',
        'placeholder',
        'disabled',
        'rows',
        'showSearch',
        'onSearch',
        'filterOption'
      ]
      const data: any = {}
      keys.forEach(i => {
        if (!isNil(config[i])) {
          data[i] = config[i]
        }
      })

      return (
        <Col span={span} key={index}>
          <Form.Item
            label={label}
            name={name}
            rules={[{ required: required, message: `请填写${label}！` }]}
          >
            <FormNode
              disabled={type === 'check' || type === 'cancel'}
              {...data}
            ></FormNode>
          </Form.Item>
        </Col>
      )
    })}
  </Row>
</Form>
```

#### 使用

```
import React from 'react';
import { FormNode } from 'components_amin';
const props = {
  type: 'input'
};
<FormNode {...props} />;
```

### Demo: 以下例子的所有 value、onChange 都会由 Form 表单自动传入

### 详情展示---文本框

```tsx
/**
 * title: 文本框
 * desc: 常用于详情显示
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'text',
  value: '详情内容展示',
};

export default () => <FormNode {...props} />;
```

### 使用文本框

```tsx
/**
 * title: 文本框
 * desc: From表单中的可编辑文本框 value值可在控制台查看
 */

import React, { useState } from 'react';
import { FormNode } from 'components_amin';

const [value, setValue] = useState('');

const onChange = (val) => {
  console.log(val, 'val!!!');
};

const props = {
  type: 'input',
  placeholder: '请输入文本内容',
};

export default () => <FormNode value={value} onChange={onChange} {...props} />;
```

### 文本框禁用

```tsx
/**
 * title: 禁用FormNode 添加属性disabled
 * desc: From表单中禁用的文本框
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'input',
  placeholder: '张三',
  disabled: true,
};

export default () => <FormNode {...props} />;
```

### 数字输入框

```tsx
/**
 * title: number
 * desc: From表单中的InputNumber
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'number',
  min: 0,
  max: 50,
  placeholder: '请输入数量',
};

export default () => <FormNode {...props} />;
```

### 文本编辑框 Textarea

```tsx
/**
 * title: textarea
 * desc: From表单中的textarea
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  placeholder: '请编辑备注信息',
  type: 'textarea',
  rows: 6,
};

export default () => <FormNode {...props} />;
```

### 单选框 radio

```tsx
/**
 * title: radio
 * desc: From表单中的radio
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'radio',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

### 多选框 checkbox

```tsx
/**
 * title: checkbox
 * desc: From表单中的checkbox
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'checkbox',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

### select 下拉框 单选

```tsx
/**
 * title: select
 * desc: From表单中的select
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'select',
  placeholder: '请选择',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

### select 下拉框 多选

```tsx
/**
 * title: select
 * desc: From表单中的select 多选
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'multipleSelect',
  placeholder: '请选择',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

### TreeSelect 单选

```tsx
/**
 * title: TreeSelect
 * desc: From表单中的TreeSelect 单选
 */

import React from 'react';
import { FormNode } from 'components_amin';

const treeData = [
  {
    title: '系统管理',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '用户管理',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '用户查询',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '用户新增',
            value: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '用户修改',
            value: '0-0-0-2',
            key: '0-0-0-2',
          },
          {
            title: '用户删除',
            value: '0-0-0-3',
            key: '0-0-0-3',
          },
        ],
      },
      {
        title: '角色管理',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: '菜单管理',
        value: '0-0-2',
        key: '0-0-2',
      },
      {
        title: '部门管理',
        value: '0-0-3',
        key: '0-0-3',
      },
      {
        title: '岗位管理',
        value: '0-0-4',
        key: '0-0-4',
      },
      {
        title: '字典管理',
        value: '0-0-5',
        key: '0-0-5',
      },
      {
        title: '参数管理',
        value: '0-0-6',
        key: '0-0-6',
      },
    ],
  },
];

const props = {
  type: 'tree',
  placeholder: '请选择',
  treeData: treeData,
};

export default () => <FormNode {...props} />;
```

### TreeSelect 多选

```tsx
/**
 * title: TreeSelect
 * desc: From表单中的TreeSelect multiple true 多选
 */

import React from 'react';
import { FormNode } from 'components_amin';

const treeData = [
  {
    title: '系统管理',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '用户管理',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '用户查询',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '用户新增',
            value: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '用户修改',
            value: '0-0-0-2',
            key: '0-0-0-2',
          },
          {
            title: '用户删除',
            value: '0-0-0-3',
            key: '0-0-0-3',
          },
        ],
      },
      {
        title: '角色管理',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: '菜单管理',
        value: '0-0-2',
        key: '0-0-2',
      },
      {
        title: '部门管理',
        value: '0-0-3',
        key: '0-0-3',
      },
      {
        title: '岗位管理',
        value: '0-0-4',
        key: '0-0-4',
      },
      {
        title: '字典管理',
        value: '0-0-5',
        key: '0-0-5',
      },
      {
        title: '参数管理',
        value: '0-0-6',
        key: '0-0-6',
      },
    ],
  },
];

const props = {
  type: 'tree',
  placeholder: '请选择',
  treeData: treeData,
  multiple: true,
};

export default () => <FormNode {...props} />;
```

### TreeSelect treeCheckable 多选

```tsx
/**
 * title: TreeSelect
 * desc: From表单中的TreeSelect treeCheckable true
 */

import React from 'react';
import { FormNode } from 'components_amin';

const treeData = [
  {
    title: '系统管理',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '用户管理',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '用户查询',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '用户新增',
            value: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '用户修改',
            value: '0-0-0-2',
            key: '0-0-0-2',
          },
          {
            title: '用户删除',
            value: '0-0-0-3',
            key: '0-0-0-3',
          },
        ],
      },
      {
        title: '角色管理',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: '菜单管理',
        value: '0-0-2',
        key: '0-0-2',
      },
      {
        title: '部门管理',
        value: '0-0-3',
        key: '0-0-3',
      },
      {
        title: '岗位管理',
        value: '0-0-4',
        key: '0-0-4',
      },
      {
        title: '字典管理',
        value: '0-0-5',
        key: '0-0-5',
      },
      {
        title: '参数管理',
        value: '0-0-6',
        key: '0-0-6',
      },
    ],
  },
];

const props = {
  type: 'tree',
  placeholder: '请选择',
  treeData: treeData,
  // multiple: true,
  treeCheckable: true,
};

export default () => <FormNode {...props} />;
```

### switch 开关

```tsx
/**
 * title: switch
 * desc: From表单中的switch
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'switch',
};

export default () => <FormNode {...props} />;
```

### TimePicker 时间选择器

```tsx
/**
 * title: timePicker
 * desc:  TimePicker 日期选择器
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'timePicker',
};

export default () => (
  <div style={{ width: 240 }}>
    <FormNode {...props} />
  </div>
);
```

### DatePicker 日期选择器

```tsx
/**
 * title: datePicker
 * desc:  DatePicker 日期选择器
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'datePicker',
};

export default () => (
  <div style={{ width: 240 }}>
    <FormNode {...props} />
  </div>
);
```

### RangePicker 日期范围选择器

```tsx
/**
 * title: rangePicker
 * desc: From表单中的自定义时间范围选择器
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'rangePicker',
};

export default () => <FormNode {...props} />;
```

### InputConcatSelect 文本框、下拉框组合

```tsx
/**
 * title: inputAndSelect
 * desc: From表单中的文本框、下拉框组合
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'inputAndSelect',
  options: [
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '梨', value: 3 },
    { label: '火龙果', value: 4 },
  ],
  keys: ['phone', 'fruit'],
};

export default () => (
  <div style={{ width: 300 }}>
    <FormNode {...props} />
  </div>
);
```

### 图片

```tsx
/**
 * title: img
 * desc: From表单中的文本框、下拉框组合
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'img',
  maxImgs: 5,
  accept: 'image/jpg, image/png, image/jpeg, image/gif',
  tips: '文件类型支持jpg,jpeg,png,gif',
};

export default () => <FormNode {...props} />;
```

### 未显示字段可在 antd 组件库查看，通过 other 解构到相应的组件上

<API src="/index.tsx"></API>
