import ConnectWalletButton from '../ConnectWalletButton/ConnectWalletButton';
import style from './Header.module.scss';
import { HeaderProps } from './Header.props';

export default function Header({}: HeaderProps) {
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
        <a className={style.worldIdBtn} href="">
          Sign in with WorldID
          <img src="/link-arrow.svg" alt="" />
        </a>
      </div>
    </div>
  );
}
