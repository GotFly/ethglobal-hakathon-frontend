import ConnectWalletButton from '../ConnectWalletButton/ConnectWalletButton';
import WorldCoinButton from '../WorldCoinButton/WorldCoinButton';
import style from './Header.module.scss';
import { HeaderProps } from './Header.props';
import Notification from '../Notification/Notification';
import { useState } from 'react';

export default function Header({}: HeaderProps) {
  const [isNotificationVisible, setNotificationVisible] =
    useState<boolean>(false);

  return (
    <div className={style.header}>
      <img className={style.logo} src="/logo.svg" alt="" width={111} />
      <nav className={style.menu}>
        <ul className={style.menuList}>
          <li className={style.menuItem}>
            <a className={style.menuLink} href="">
              <img src="/github-icon.svg" alt="" />
              Github
            </a>
          </li>
          <li className={style.menuItem}>
            <a className={style.menuLink} href="">
              <img src="/docs-icon.svg" alt="" />
              Docs
            </a>
          </li>
        </ul>
      </nav>
      <div className={style.cta}>
        <ConnectWalletButton />
        <WorldCoinButton />
        {/* <a className={style.worldIdBtn} href="">
          Sign in with WorldID
          <img src="/link-arrow.svg" alt="" />
        </a> */}
      </div>

      <Notification />
    </div>
  );
}
