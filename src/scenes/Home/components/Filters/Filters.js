import React from 'react';
import Select from 'react-select';
import s from './Filters.module.scss';
import Icon from '../../../../components/Icons/Icon';
import SmallInput from '../../../../components/InputFromTo/components/SmallInput/SmallInput';

const Filters = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.selectContainer}>
          <Select
            label="Choose Category"
            components={{
              Indicator: <Icon name="like" />,
              IndicatorSeparator: () => null,
            }}
            options={[
              { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
              {
                value: 'chocolate',
                label: 'Chocolate',
                rating: 'good',
              },
              {
                value: 'strawberry',
                label: 'Strawberry',
                rating: 'wild',
              },
              {
                value: 'salted-caramel',
                label: 'Salted Caramel',
                rating: 'crazy',
              },
            ]}
            theme={(theme) => ({
              ...theme,
              background: '#F9FAFB',
              width: 285,
              height: 35,
              border: '1px solid #DEDEE0',
              boxSizing: 'border-box',
              borderRadius: 5,
              indicatorSeparator: {
                display: 'none',
              },
              colors: {
                ...theme.colors,
                primary25: 'hotpink',
                primary: 'black',
              },
            })}
          />
        </div>
        <div className={s.fromTo}>
          <SmallInput
            style={{ marginRight: 7 }}
            placeholder="Price from (USD)"
          />
          <div className={s.iconContainer}>
            <Icon name="line" style={{ marginRight: 7 }} />
          </div>
          <SmallInput
            placeholder="Price to (USD)"
            style={{ marginRight: 7 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
