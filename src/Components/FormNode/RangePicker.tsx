import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { cloneDeep } from 'lodash';

type Dates = { startTime: any; endTime: any };

type Props = {
  value?: Dates;
  onChange?: (checked: Dates) => void;
};

type DateType = 'startTime' | 'endTime';

const CustomRangePicker = (props: Props) => {
  const { onChange, value = { startTime: null, endTime: null } } = props;

  const [dates, setDates] = useState<Dates>(value);

  const valueChange = (date: Dates, type: DateType) => {
    const data: Dates = cloneDeep(dates);
    data[type] = date;
    console.log(date);

    setDates(data);
  };

  useEffect(() => {
    onChange && onChange(dates);
  }, [dates]);

  return (
    <div>
      <DatePicker
        locale={locale}
        placeholder={'请选择开始时间'}
        onChange={(event: any) => valueChange(event, 'startTime')}
      />
      ~
      <DatePicker
        locale={locale}
        placeholder={'请选择结束时间'}
        onChange={(event: any) => valueChange(event, 'endTime')}
      />
    </div>
  );
};

export default CustomRangePicker;
