import { Col, Form, Row } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';

import FormNode from '../FormNode';

const FormItem = Form.Item;

interface Props {
  configs: any[];
  initialValues?: {
    [key: string]: any;
  };
  layout?: {
    labelCol: { span: number; [key: string]: any };
    wrapperCol: { span: number; [key: string]: any };
  };
  onChange?: (values: any) => void;
  [key: string]: any;
}

const initLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const CustomForm = forwardRef((props: Props, ref) => {
  const { configs = [], initialValues = {}, layout = initLayout, onChange } = props;
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      validateFields: form.validateFields,
    };
  });

  const valuesChange = (_: any, allValues: any) => {
    onChange && onChange(allValues);
  };

  return (
    <Form form={form} initialValues={initialValues} onValuesChange={valuesChange}>
      <Row>
        {configs.map((item, idx) => {
          const data: any = {};
          const keys = Reflect.ownKeys(item);
          keys.forEach((i) => {
            if (![null, undefined].includes(item[i])) {
              data[i] = item[i];
            }
          });
          if (!item.field) {
            return (
              <Col key={idx + item.label} span={item.span || 24}>
                <FormItem label={item.label}></FormItem>
              </Col>
            );
          }
          return (
            <Col key={item.field} span={item.span || 24}>
              <FormItem
                name={item.field}
                label={item.label}
                rules={[{ required: item.required, message: item.message }]}
                {...layout}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
});
export default CustomForm;
