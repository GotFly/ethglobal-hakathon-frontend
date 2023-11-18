import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { WorldCoinButtonProps } from "./WorldCoinButton.props";

export const APP_ID = 'app_GBkZ1KlVUdFTjeMXKlVUdFT';
export const ACTION_NAME = 'vote_1';

export default function WorldCoinButton({ }: WorldCoinButtonProps) {
  const onSuccess = () => {
    console.log('you are authourized');
  }

  const handleVerify = () => {
    //verify logic to do
  }


  return <IDKitWidget
    app_id={APP_ID} // obtained from the Developer Portal
    action={ACTION_NAME} // this is your action name from the Developer Portal
    onSuccess={onSuccess} // callback when the modal is closed
    handleVerify={handleVerify} // optional callback when the proof is received
    credential_types={[CredentialType.Orb, CredentialType.Phone]} // optional, defaults to ['orb']
    enableTelemetry // optional, defaults to false
  >
    {({ open }) => <button onClick={open}>Verify with World ID</button>}
  </IDKitWidget>
}
