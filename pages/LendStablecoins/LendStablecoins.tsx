import { PageType } from '../../src/constants/PageType';
import Transfer from '../../src/components/Transfer/Transfer';

export default function LendStablecoins() {


  return (
    <Transfer page={PageType.Lend} />
  );
}
