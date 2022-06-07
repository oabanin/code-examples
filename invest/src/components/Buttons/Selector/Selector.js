import AuthLink from 'src/modules/Auth/components/common/AuthLink/AuthLink';

import cn from 'classnames';
import RadioButtonCheckedIcon from 'public/svg/components/selector/radio-button-checked.svg';
import RadioButtonCheckedUncheckedIcon from 'public/svg/components/selector/radio-button-unchecked.svg';

import s from './Selector.module.scss';

function Selector({ data, activeSelector, setActiveSelector }) {
  return (
    <div className={s.container}>
      {data.map((item, index) => {
        const active = index === activeSelector;
        return (
          <div
            onClick={() => setActiveSelector(index)}
            key={item.title}
            className={cn(s.item, { [s.active]: active })}
          >
            <div className={s.left}>
              {active ? <RadioButtonCheckedIcon /> : <RadioButtonCheckedUncheckedIcon />}
            </div>
            <div className={s.right}>
              <div className={s.leftInner}>
                <h4 className={cn(s.title, { [s.active]: active })}>{item.title}</h4>
                <div className={cn(s.subtitle, { [s.active]: active })}>{item.subtitle}</div>
              </div>
              <div className={s.linkContainer}>
                <AuthLink href={item.path} text={item.linkName} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Selector;
