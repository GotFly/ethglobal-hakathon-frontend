import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { WorldCoinButtonProps } from './WorldCoinButton.props';
import { CrmConfig } from '../../constants/CrmConfig';
import style from './WorldCoinButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../../store/store';
import { changeAuthState } from '../../features/auth/authWorldSlice';
import { AUTH_STEP } from '../../constants/AuthStep';

interface ISuccessResult {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  credential_type: string;
  action?: string;
  signal?: string;
}
export default function WorldCoinButton({}: WorldCoinButtonProps) {
  const onSuccess = (data: any) => {
    console.log(data)
  };
  const isAuthtozied = useSelector(
    (state: RootState) => state.authWorldManager.verified,
  );

  let dispatch = useDispatch<AppThunkDispatch>();

  const handleVerify = (input: ISuccessResult) => {
    dispatch(changeAuthState({ step: AUTH_STEP.PROOF_GETED }));
    verifyApi(input);
    //verify logic to do
  };

  const verifyApi = (data: ISuccessResult) => {
    const reqBody = {
      merkle_root: data.merkle_root,
      nullifier_hash: data.nullifier_hash,
      proof: data.proof,
      credential_type: data.credential_type,
      action: CrmConfig.WORLD_COIND_ACTION_NAME, // or get this from environment variables,
      signal: data.signal ?? '', // if we don't have a signal, use the empty string
    };
    fetch(
      `https://developer.worldcoin.org/api/v1/verify/${CrmConfig.WORLD_COIN_APP_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      },
    ).then(verifyRes => {
      verifyRes.json().then(wldResponse => {
        if (verifyRes.status == 200) {
          // this is where you should perform backend actions based on the verified credential
          // i.e. setting a user as "verified" in a database
          onSuccessVerify();
          // res.status(verifyRes.status).send({ code: "success" });
        } else {
          // return the error code and detail from the World ID /verify endpoint to our frontend
          // console.log(wldResponse, 'unverified');
          onErrorVerify(wldResponse.code, wldResponse.detail);
          // res.status(verifyRes.status).send({
          //   code: wldResponse.code,
          //   detail: wldResponse.detail
          // });
        }
      });
    });
  };

  const onSuccessVerify = () => {
    dispatch(changeAuthState({ step: AUTH_STEP.AUTHROZIED }));
  };

  const onErrorVerify = (code: string, detail?: string) => {
    dispatch(changeAuthState({ step: AUTH_STEP.NOT_AUTHROZIED }));
    console.log(code,detail)
  };

  // const onErrorVerify = () => {
  //   dispatch(changeAuthState({ step: AUTH_STEP.NOT_AUTHROZIED }));
  // };

  if (isAuthtozied) {
    return 'You are authorized in WorldID';
  }

  return (
    <IDKitWidget
      app_id={CrmConfig.WORLD_COIN_APP_ID as string} // obtained from the Developer Portal
      action={CrmConfig.WORLD_COIND_ACTION_NAME as string} // this is your action name from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      credential_types={[CredentialType.Orb, CredentialType.Phone]} // optional, defaults to ['orb']
      enableTelemetry // optional, defaults to false
    >
      {({ open }) => (
        <a className={style.worldIdBtn} href="#" onClick={open}>
          Sign in with WorldID
          <img src="/link-arrow.svg" alt="" />
        </a>
      )}
    </IDKitWidget>
  );
}
