import style from './PageMenu.module.scss';
import { PageMenuProps } from './PageMenu.props';
import PageMenuButton from '../PageMenuButton/PageMenuButton';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  {
    image: '/borrow-icon.svg',
    name: 'Borrow liquidity',
    description: 'Elevated risk, higher gains',
    link: '/',
  },
  {
    image: '/lend-icon.svg',
    name: 'Lend stablecoins',
    description: 'Lower risk, consistent returns',
    link: '/lend-stablecoins',
  },
];

export default function PageMenu({}: PageMenuProps) {
  const location = useLocation();

  return (
    <div className={style.pageMenu}>
      {menu.map(item => (
        <Link key={item.name} to={item.link} className={style.link}>
          <PageMenuButton
            image={item.image}
            name={item.name}
            description={item.description}
            isActive={item.link === location.pathname}
          />
        </Link>
      ))}
    </div>
  );
}
