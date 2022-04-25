import { Table } from 'antd';
import update from 'immutability-helper';
import React, { useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const type = 'DraggableBodyRow';

type Props = {
  index: number;
  moveRow: (start: number, end: number) => void;
  className: string;
  style: Record<string, any>;
  [key: string]: any;
};

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: Props) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: Record<string, any>) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

interface DragTableProps {
  /**
   * @description 表格列的配置描述 具体参考antd Table
   */
  columns?: any[];
  /**
   * @description 数据数组
   */
  dataSource?: Record<string, any>[];
  /**
   * @description 列表拖拽后的回调
   */
  callback?: (data: any[]) => void;
  [key: string]: any;
}

const DragSortingTable = (props: DragTableProps) => {
  const { columns, dataSource = [], callback, ...rest } = props;

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = dataSource[dragIndex];
    const nData = update(dataSource, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    nData[dragIndex]['fixed'] = null;
    nData[hoverIndex]['fixed'] = null;
    callback && callback(nData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={dataSource}
        components={components}
        onRow={(_record, index) =>
          ({
            index,
            moveRow,
          } as any)
        }
        {...rest}
      />
    </DndProvider>
  );
};

export default DragSortingTable;
