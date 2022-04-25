import { v4 as uuidv4 } from 'uuid';

export const getUId = () => {
  return uuidv4().split('-')[0];
};

/**
 * 将数组类型的数据转成 树数据类型
 * @param data 打平的树数据
 * @returns
 */
export const getTreeData = (data: any[]) => {
  const target = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === 0) {
      target.push(data[i]);
      data.splice(i, 1);
      i--;
    }
  }

  const toTree = (list: any[], tree: any[]) => {
    list.forEach((item) => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].parentId === item.menuId) {
          item.children.push(tree[i]);
          tree.splice(i, 1);
          i--;
        }
      }
      if (item.children && item.children.length) {
        toTree(item.children, tree);
      } else {
        item.children = undefined;
      }
    });
  };
  toTree(target, data);
  return target;
};
