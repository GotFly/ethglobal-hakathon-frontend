import { PageType } from '../../src/constants/PageType';
import Transfer from '../../src/components/Transfer/Transfer';

export default function BorrowStablecoins() {
  return (
    <Transfer page={PageType.Borrow} />
  );
}
