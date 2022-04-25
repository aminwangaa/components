---
nav:
  title:
  path: /components
---

## FormNode

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
const props = {};
<FormNode {...props} />;
```

Demo:

```tsx
/**
 * title: 文本框
 * desc: From表单中的文本框
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'input',
  placeholder: '请输入密码',
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: 禁用文本框
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

```tsx
/**
 * title: 禁用文本框
 * desc: From表单中禁用的文本框
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'text',
  placeholder: '张三',
  disabled: true,
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: textarea
 * desc: From表单中的textarea
 */

import React from 'react';
import { FormNode } from 'components_amin';

const props = {
  type: 'textarea',
};

export default () => <FormNode {...props} />;
```

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

```tsx
/**
 * title: TreeSelect
 * desc: From表单中的TreeSelect
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

<API src="/index.tsx"></API>
