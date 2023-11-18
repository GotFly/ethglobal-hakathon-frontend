import { Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import Header from '../../src/components/Header/Header';
import PageMenu from '../../src/components/PageMenu/PageMenu';

export default function Layout({}) {
  return (
    <div className={style.layout}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <Header />
          <h1 className={style.pageTitle}>
            Lend and borrow stablecoins against crypto farming pools
          </h1>
          <PageMenu />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
