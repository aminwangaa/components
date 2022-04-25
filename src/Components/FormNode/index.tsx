import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Space,
  TimePicker,
  TreeSelect,
  Upload,
} from 'antd';
import { cloneDeep, isArray, isEmpty, isNil } from 'lodash';
import moment from 'moment';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Viewer from 'react-viewer';

import FormSwitch from './FormSwitch';
import InputConcatSelect from './InputConcatSelect';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;
const { Group } = Radio;
const { RangePicker } = DatePicker;

export type commonObj = { [key: string]: any };
export type OptionType = {
  label: string;
  value: any;
  [key: string]: any;
};

export type FormNodeProps = {
  /**
   * @description 类型
   */
  type:
    | 'select'
    | 'checkbox'
    | 'tree'
    | 'input'
    | 'switch'
    | 'textarea'
    | 'multipleSelect'
    | 'radio'
    | 'number'
    | 'inputAndSelect'
    | 'img' // 图片上传
    | 'datePicker'
    | 'rangePicker'
    | 'annex' // 附件上传
    | 'text'
    | 'timePicker'; // 时间选择器
  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 占位符
   */
  placeholder?: string;
  /**
   * @description checkbox select的子选项
   */
  options?: Array<OptionType>;
  /**
   * @description 数据化配置选项内容
   * @default []
   */
  treeData?: any[];
  /**
   * @description input输入框的后缀
   */
  suffix?: string | undefined | ReactNode;
  /**
   * @description FormNode的值
   */
  value?: any;
  /**
   * @description 数字输入框的最小值
   */
  min?: number;
  /**
   * @description 数字输入框的最大值
   */
  max?: number;
  /**
   * @description FormNode的宽度
   */
  width?: number | string;
  /**
   * @description inputAndSelect的字段名组合
   */
  keys?: string[];
  /**
   * @description radio选择框的排列方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description 图片的最大数量
   */
  maxImgs?: number;
  /**
   * @description treeSelect是否显示 Checkbox
   */
  treeCheckable?: boolean;
  /**
   * @description 图片，附件的提示文案
   */
  tips?: string;
  /**
   * @description 图片，附件的最大内存
   */
  maxSize?: number;
  /**
   * @description 图片，附件的可用格式
   */
  accept?: string;
  /**
   * @description 文本框的高度
   */
  rows?: number;
  /**
   * @description 搜索框是否显示
   */
  showSearch?: boolean;
  /**
   * @description 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
   */
  filterOption?: boolean;
  /**
   * @description 搜索值变化时回调
   */
  onSearch?: (event: any) => void;
  /**
   * @description 值变化时回调
   */
  onChange?: (event: any) => void;
  /**
   * @description 图标icon
   */
  icon?: any;
  /**
   * @description OSS文件上传实例
   */
  OSS?: any;
};

const FormNode = (props: FormNodeProps) => {
  const {
    type = 'input',
    placeholder,
    disabled,
    options = [],
    treeData,
    value,
    onChange,
    suffix,
    min,
    max,
    keys,
    direction = 'horizontal',
    treeCheckable = false,
    maxImgs = 10,
    maxSize = 500,
    tips,
    accept,
    rows = 4,
    showSearch = false,
    filterOption = false,
    onSearch = () => {},
    icon,
    OSS,
    ...other
  } = props;

  const uploadRef = useRef<any>();

  const [nodeValue, setNodeValue] = useState<any>(value);
  const [imgVisible, setImgVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [treeOptions, setTreeOptions] = useState(treeData);

  useEffect(() => {
    setTreeOptions(treeData);
  }, [treeData]);

  useEffect(() => {
    if (['img', 'annex'].includes(type)) {
      !Array.isArray(value) && setNodeValue([]);
      if (isArray(value)) {
        value.forEach((item) => {
          item.name = decodeURI(item.name);
        });
      }
      // 头像上传初始化值为数组类型
      !Array.isArray(value) && setNodeValue([]);
    }
  }, [type, value]);

  const valueChange = (event: any) => {
    let val;

    const flag = [
      'multipleSelect',
      'switch',
      'rangeDate',
      'select',
      'checkbox',
      'tree',
      'number',
      'inputAndSelect',
      'img',
      'annex',
      'datePicker',
      'timePicker',
      'rangePicker',
    ].includes(type);
    if (flag) {
      val = event;
    } else {
      val = event.target.value;
    }
    if (type === 'number') {
      if (!isNil(min) && val < min) {
        val = min;
      }
      if (!isNil(max) && val > max) {
        val = max;
      }
    }

    setNodeValue(val);
    onChange && onChange(val);
  };

  const getBase64 = (img: Blob, callback: (arg0: string | ArrayBuffer | null) => any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload: any = (file: any) => {
    return new Promise((resolve, reject) => {
      const isExceptRule = accept?.includes(file.type);

      const fileIsLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (type === 'img' && !isExceptRule) {
        // message.error('只能上传jpg/png格式文件!');
        message.error('只能上传符合格式要求的文件!');
        return reject(file);
      }

      if (!fileIsLtMaxSize) {
        message.error(`文件不能超过${maxSize}MB!`);
        return reject(file);
      }

      return resolve(true);
    });
  };

  const customRequest = async ({ file }: { file: any }) => {
    const imgs = cloneDeep(nodeValue) || [];
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    const fileContainer = 'wms';

    // case1:
    if (OSS) {
      const res = await OSS.put(
        `/capacity-platform/${fileContainer}/${file.uid}__${file.name}`,
        file,
      );
      if (res) {
        const { url, name } = res;
        imgs.push({ thumbUrl: url, name: name.split('__')[1], url });
        setNodeValue(imgs);
        valueChange && valueChange(imgs);
      }
    }

    // case2:
    if (!OSS) {
      getBase64(file, (imageUrl) => {
        imgs.push({
          thumbUrl: imageUrl,
          name: file.name,
        });
        valueChange && valueChange(imgs);
      });
    }
  };

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const fileRemove = (file: any) => {
    const arrList = cloneDeep(nodeValue) || [];
    if (OSS) {
      OSS.delete(
        file.thumbUrl.replace(/http(s)?:\/\/capacity-platform.oss-cn-hangzhou.aliyuncs.com/, ''),
      );
    }
    const target = arrList.filter((item: any) => item.thumbUrl !== file.thumbUrl);
    setNodeValue(target);
    onChange && onChange(target);
  };

  const onPreview = (file: any) => {
    setImgVisible(true);
    setPreviewImage(file.thumbUrl);
  };

  const onAnnexPreview = async (file: any) => {
    const targetUrl = file.thumbUrl.replace(
      /http(s)?:\/\/capacity-platform.oss-cn-hangzhou.aliyuncs.com/,
      '',
    );
    try {
      const result = await OSS.get(decodeURI(targetUrl));
      const blob = new Blob([result.content as any], {
        type: 'application/octet-stream',
      });
      const download = document.createElement('a');
      download.href = window.URL.createObjectURL(blob);
      download.download = file.name;
      download.click();
      window.URL.revokeObjectURL(download.href);
    } catch (e) {
      console.log(e);
    }
  };

  switch (type) {
    case 'text':
      return <div>{value}</div>;
    case 'datePicker':
      return (
        <DatePicker
          onChange={valueChange}
          value={nodeValue ? moment(nodeValue) : null}
          style={{ width: '100%' }}
          disabled={disabled}
          {...other}
        ></DatePicker>
      );
    case 'timePicker':
      return (
        <TimePicker
          onChange={valueChange}
          value={nodeValue ? moment(nodeValue) : null}
          disabled={disabled}
          {...other}
        ></TimePicker>
      );
    case 'rangePicker':
      return (
        <RangePicker
          onChange={valueChange}
          value={nodeValue}
          disabled={disabled}
          {...other}
        ></RangePicker>
      );
    case 'radio':
      return (
        <Group onChange={valueChange} value={nodeValue} disabled={disabled} {...other}>
          <Space direction={direction}>
            {options &&
              options.length > 0 &&
              options.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              ))}
          </Space>
        </Group>
      );
    case 'input':
      return (
        <Input
          className={'customFormNodeInput'}
          onChange={valueChange}
          value={nodeValue}
          disabled={disabled}
          placeholder={placeholder}
          suffix={suffix}
          {...other}
        />
      );
    case 'select':
    case 'multipleSelect':
      const rest: {
        mode?: 'multiple' | 'tags' | undefined;
        onSearch?: (event: any) => void;
      } = {};
      if (type === 'multipleSelect') {
        rest.mode = 'multiple';
      }
      if (showSearch) {
        rest.onSearch = onSearch;
      }

      return (
        <Select
          {...rest}
          {...other}
          onChange={valueChange}
          value={nodeValue}
          placeholder={placeholder}
          style={{ minWidth: 80, width: other.width || '100%' }}
          disabled={disabled}
          showSearch={showSearch}
          filterOption={filterOption}
        >
          {options &&
            options.length &&
            options.map((i) => (
              <Option value={i.value} key={i.value}>
                {i.label}
              </Option>
            ))}
        </Select>
      );
    case 'checkbox':
      return (
        <CheckboxGroup
          onChange={valueChange}
          value={nodeValue}
          options={options}
          disabled={disabled}
          {...other}
        />
      );
    case 'tree':
      return (
        <TreeSelect
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%', minWidth: 100 }}
          allowClear
          treeData={treeOptions}
          treeCheckable={treeCheckable}
          showCheckedStrategy={SHOW_PARENT}
          placeholder={placeholder}
          disabled={disabled}
          filterTreeNode
          treeNodeFilterProp={'label'}
          {...other}
        />
      );
    case 'textarea':
      return (
        <TextArea
          placeholder={placeholder}
          onChange={valueChange}
          value={nodeValue}
          rows={rows}
          disabled={disabled}
          {...other}
        />
      );
    case 'switch':
      return <FormSwitch onChange={valueChange} value={nodeValue} {...other} />;
    case 'number':
      return (
        <InputNumber
          placeholder={placeholder}
          min={min}
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%' }}
          disabled={disabled}
          max={max}
          {...other}
        ></InputNumber>
      );
    case 'inputAndSelect':
      return (
        <InputConcatSelect
          keys={keys}
          onChange={valueChange}
          value={nodeValue}
          options={options}
          {...other}
        />
      );
    case 'img':
      return (
        <div>
          <Viewer
            visible={imgVisible}
            noFooter={true}
            onMaskClick={() => {
              setImgVisible(false);
            }}
            onClose={() => {
              setImgVisible(false);
            }}
            images={[{ src: previewImage }]}
          />
          <Upload
            ref={uploadRef}
            fileList={nodeValue}
            listType="picture-card"
            accept={accept}
            name="file"
            maxCount={maxImgs}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onRemove={fileRemove}
            disabled={disabled}
            onPreview={onPreview}
            {...other}
          >
            {!disabled && (isEmpty(nodeValue) || nodeValue.length) < maxImgs ? uploadButton : null}
          </Upload>
          {tips ? (
            <div className={'uploadTipsBox'}>
              {icon}
              <span>&nbsp;{tips}</span>
            </div>
          ) : null}
        </div>
      );
    case 'annex': // 附件
      return (
        <div>
          <Upload
            ref={uploadRef}
            fileList={nodeValue}
            accept={accept}
            name="file"
            maxCount={maxImgs}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onRemove={fileRemove}
            disabled={disabled}
            onPreview={onAnnexPreview}
            {...other}
          >
            <Button disabled={disabled} icon={icon}>
              上传文件
            </Button>
          </Upload>

          {tips ? (
            <div className={'uploadTipsBox'}>
              {icon}
              <span>&nbsp;{tips}</span>
            </div>
          ) : null}
        </div>
      );
    default:
      return null;
  }
};

export default FormNode;
