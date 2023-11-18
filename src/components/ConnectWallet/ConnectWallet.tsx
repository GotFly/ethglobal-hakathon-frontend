import { useEffect, useState } from 'react';
import { WalletList } from '../../constants/WalletList';
import Button from '../Button/Button';
import WalletPopup from '../WalletPopup/WalletPopup';
import style from './ConnectWallet.module.scss';
import { ConnectWalletProps } from './ConnectWallet.props';

export default function ConnectWallet({}: ConnectWalletProps) {
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        setIsPopupActive(false);
      }
    });
  }, []);

  return (
    <div className={style.connectWallet}>
      <span>Connect your wallet to view portfolio</span>
      <Button onClick={() => setIsPopupActive(!isPopupActive)}>
        Connect wallet
      </Button>
      <WalletPopup
        items={WalletList}
        isActive={isPopupActive}
        handleActive={() => setIsPopupActive(false)}
      />
    </div>
  );
}
