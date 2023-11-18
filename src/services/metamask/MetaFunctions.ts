import { CrmMessages } from '../../constants/CrmMessages';

export async function signMeta(account: string, injectProvider = null) {
  return true;
  let isSigned = true;
  let provider = injectProvider ? injectProvider : window.ethereum;
  if (!provider) {
    return true;
  }
  try {
    const from = account;
    // const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
    const msg = `0x${hexEncode(CrmMessages.SIGN_TEXT)}`;
    const sign = await (provider as any).request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    });
    isSigned = true;
  } catch (err) {
    isSigned = false;
    console.error(err);
  }
  return isSigned;
}

// export const testEncoding = function(){
//   let testStr = SIGN_TEXT;
//   let data = hexEncode(testStr);
//   const msg = `0x${Buffer.from(testStr, "utf8").toString("hex")}`;
//   // let data = hexEncode('test');
// }

export const hexEncode = function (iString: string) {
  return iString
    .split('')
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const hexDecode = function (iString: string) {
  return iString
    .split(/(\w\w)/g)
    .filter(p => !!p)
    .map(c => String.fromCharCode(parseInt(c, 16)))
    .join('');
};
