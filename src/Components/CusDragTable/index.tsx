import { FunnelPlotOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Switch, Table } from 'antd';
import classNames from 'classnames';
import { cloneDeep, debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { getUId } from '../../utils/tool';
import DragSortingTable from '../DragTable';

import styles from './index.module.less';

const { Option } = Select;

type Column = Partial<{
  label: string;
  value: string | number;
  width: string | number;
  title: any;
  draggable: boolean;
  align: string;
  show: boolean;
  dataIndex: string;
  [key: string]: any;
}>;

type CusTableProps = {
  /**
   * @description 表格列的配置描述 具体参考antd Table
   */
  columns: Column[];
  /**
   * @description 列的最小宽度 默认最小设置了80
   */
  minWidth?: number;
  /**
   * @description 缓存识别字段
   */
  storageField?: string;
  [key: string]: any;
};

/**
 *
 * @param props
 * @field container: 表格外层容器
 * @field minWidth: 表格列最小宽度
 * @field columns: show 控制表头是否显示 默认true
 * @field columns: draggable 控制表头是否可拖拽
 * @field columns: fixed 有固定属性的表头不会出现在自定义表头中
 * @returns
 */
const CusDragTable = (props: CusTableProps) => {
  const {
    columns,
    minWidth = 80,
    // container,
    cusBarLeft,
    storageField,
    ...rest
  } = props;

  const [initColumns, setInitColumns] = useState<any[]>([]);

  useEffect(() => {
    // 初始化 label value show draggable字段
    const storageColumns = storageField
      ? JSON.parse(localStorage.getItem(storageField) as string) || []
      : [];

    const init = storageColumns.length
      ? storageColumns.map((column: Column) => {
          const target: Column = columns.find((i) => i.dataIndex === column.value) || {};
          const keys = Reflect.ownKeys(target);
          const storageKeys = Reflect.ownKeys(column);

          target.label = target.title;
          target.value = target.dataIndex;
          target.width = column.width;

          if (storageKeys.includes('fixed')) {
            target.fixed = column.fixed;
          } else if (!keys.includes('fixed')) {
            target.fixed = null;
          }
          if (storageKeys.includes('show')) {
            target.show = column.show;
          } else if (!keys.includes('show')) {
            target.show = true;
          }
          if (storageKeys.includes('draggable')) {
            target.draggable = column.draggable;
          } else if (!keys.includes('draggable')) {
            target.draggable = true;
          }
          return target;
        })
      : columns.map((item) => {
          const keys = Reflect.ownKeys(item);
          item.label = item.title;
          item.value = item.dataIndex;
          if (!keys.includes('show')) {
            item.show = true;
          }
          if (!keys.includes('draggable')) {
            item.draggable = true;
          }
          if (!keys.includes('fixed')) {
            item.fixed = null;
          }

          return item;
        });
    setInitColumns(init);
  }, []);

  const tableRef = useRef<any>();
  const moveRef = useRef<Record<string, any>>({
    columns: initColumns,
  });

  const [cusColumns, setCusColumns] = useState<any[]>([]);
  const [attrFlag, setAttrFlag] = useState<boolean>(false);
  const [attributeData, setAttributeData] = useState<any[]>([]);

  useEffect(() => {
    // 处理可拖拽的title
    const res = dealColumns(initColumns);
    moveRef.current.columns = cloneDeep(res);
    setCusColumns(cloneDeep(res));
  }, [initColumns]);

  const dealColumns = (data: Column[]) => {
    return [...data].map((item: Column, index: number) => {
      if (item.draggable) {
        item.title = (
          <div className={styles.tableTitle} key={item.label}>
            {item['label']}
            <div
              key={item.dataIndex}
              className={classNames(
                'dragIcon',
                styles.tableTitleResizeRight,
                index === data.length - 1 ? styles.tableTitleResizeRightLast : '',
              )}
              onMouseDown={(event) => mouseDown(event, item)}
            ></div>
          </div>
        );
      }
      return item;
    });
  };

  const mouseDown = (event: any, target: Column) => {
    const index = moveRef.current.columns.findIndex((item: any) => item.value === target.value);
    // 获取点击列的真实列宽
    const parentNodeWidth = event.target.parentNode.parentNode.clientWidth;
    // 获取鼠标点击时的开始位置
    moveRef.current.startX = event.pageX;
    // 获取鼠标点击时的列宽
    moveRef.current.startWidth = moveRef.current['columns'][index]['width'] || parentNodeWidth;
    moveRef.current.index = index;

    setTimeout(() => {
      // 开始拖拽
      moveRef.current.startFlag = true;
    });
  };

  const mouseUp = () => {
    // 结束拖拽
    moveRef.current.startFlag = false;
    const nData = cloneDeep(moveRef.current.columns);

    if (moveRef.current.index > -1 && typeof nData[moveRef.current.index] === 'object') {
      const keys = Reflect.ownKeys(nData[moveRef.current.index]);

      if (keys.includes('sorter')) {
        nData[moveRef.current.index]['sorter'] = true;
      }
    }

    moveRef.current.columns = cloneDeep(nData);
    setCusColumns(cloneDeep(nData));
  };

  const mouseMove = debounce((event: any) => {
    event.preventDefault();
    if (!moveRef.current.startFlag) return;

    const moveX = event.pageX - moveRef.current.startX;

    const nData = cloneDeep(moveRef.current.columns);
    // 列宽处理 列开始宽度 + 移动宽度
    // 列最小宽度设置为 minWidth 默认为80
    const dynamicWidth = moveRef.current.startWidth + moveX;

    const keys = Reflect.ownKeys(nData[moveRef.current.index]);

    if (keys.includes('sorter')) {
      nData[moveRef.current.index]['sorter'] = false;
    }

    nData[moveRef.current.index]['width'] = dynamicWidth < minWidth ? minWidth : dynamicWidth;

    setCusColumns(cloneDeep(nData));
    moveRef.current.columns = cloneDeep(nData);
    storageField && localStorage.setItem(storageField, JSON.stringify(nData));
  }, 8);

  useEffect(() => {
    const target = document.body;
    if (moveRef.current && !attrFlag) {
      target.addEventListener('mouseup', mouseUp);
      target.addEventListener('mousemove', mouseMove);
      target.addEventListener('mouseleave', mouseUp);
    }

    return () => {
      target.removeEventListener('mouseup', mouseUp);
      target.removeEventListener('mousemove', mouseMove);
      target.removeEventListener('mouseleave', mouseUp);
    };
  }, [moveRef.current, attrFlag]);

  useEffect(() => {
    if (Array.isArray(cusColumns) && cusColumns.length && attrFlag) {
      const res = cusColumns.map((item) => {
        const target = {
          name: item.title,
          value: item.value,
          fixed: item.fixed,
          show: item.show,
          id: getUId(),
        };
        return target;
      });
      setAttributeData(res);
    }
  }, [attrFlag, cusColumns]);

  const attributeColumns = [
    {
      title: '列头',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '固定',
      dataIndex: 'fixed',
      align: 'center',
      render: (value: string | null, _: any, index: number) => {
        const leftFlag = index === 0 || !!attributeData[index - 1]['fixed'];
        const rightFlag = attributeData.length - 1 === index || !!attributeData[index + 1]['fixed'];
        return (
          <Select
            value={value}
            style={{ width: 160 }}
            placeholder={'选择列头是否固定'}
            onChange={(val) => attributeValuesChange(val, 'fixed', index)}
          >
            <Option value={null}>不固定</Option>
            {leftFlag && index !== attributeData.length - 1 && index <= 2 && (
              <Option value={'left'}>左侧固定</Option>
            )}
            {rightFlag && index !== 0 && index >= attributeData.length - 3 && (
              <Option value={'right'}>右侧固定</Option>
            )}
          </Select>
        );
      },
    },
    {
      title: '展示',
      dataIndex: 'show',
      align: 'center',
      render: (value: boolean, _: any, index: number) => (
        <Switch
          checked={value}
          checkedChildren={'显示'}
          unCheckedChildren={'隐藏'}
          defaultChecked
          onChange={(val) => attributeValuesChange(val, 'show', index)}
        ></Switch>
      ),
    },
  ];

  const attributeCallback = (data: any[]) => {
    setAttributeData(data);
  };

  const attributeValuesChange = (value: any, type: string, index: number) => {
    const nData = cloneDeep(attributeData);
    nData[index][type] = value;
    setAttributeData(nData);
  };

  const showAttrModal = () => {
    setAttrFlag((f) => !f);
  };

  const attributeOK = () => {
    let newColumns = attributeData.map((item) => {
      const target = cusColumns.find((column) => item.value === column.value);
      target.fixed = item.fixed;
      target.show = item.show;
      return { ...target };
    });
    newColumns = dealColumns(newColumns);
    moveRef.current.columns = cloneDeep(newColumns);
    setCusColumns(cloneDeep(newColumns));
    storageField && localStorage.setItem(storageField, JSON.stringify(newColumns));
    setAttrFlag(false);
  };

  return (
    <div className={styles.cusMoveTableBox}>
      <div className={styles.tableBtnBox}>
        <div className={styles.tableBtnBoxLeft}>{cusBarLeft && cusBarLeft()}</div>
        <div className={styles.tableBtnBoxRight}>
          <Button onClick={showAttrModal} icon={<FunnelPlotOutlined />}>
            自定义表头
          </Button>
        </div>
      </div>
      <Modal
        title={'自定义表头操作'}
        visible={attrFlag}
        onOk={attributeOK}
        className={styles.attributeModal}
        onCancel={showAttrModal}
        okText={'确定'}
        cancelText={'取消'}
      >
        <div className={styles.wordMask}>
          <span>PS: 可使用鼠标按住表格行拖拽调整列头顺序, 拖拽后的列头固定属性将重置</span>
        </div>
        <DragSortingTable
          columns={attributeColumns}
          dataSource={attributeData}
          rowKey={'id'}
          callback={attributeCallback}
          pagination={false}
        ></DragSortingTable>
      </Modal>

      <Table
        size={'small'}
        ref={tableRef}
        columns={cusColumns.filter((item: any) => item && item.show)}
        {...rest}
      ></Table>
    </div>
  );
};

export default CusDragTable;
