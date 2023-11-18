export function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, customOptions = {}) {
  let options: any = {
    path: '/',
    ...customOptions,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

export const isClientAgreed = 'isAgreed';

export function setAgreed() {
  var expireTime = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
  ).toUTCString();
  setCookie(isClientAgreed, 1, { expires: expireTime });
}

export function deleteAgreed() {
  deleteCookie(isClientAgreed);
}

export function isClientAgreedWithTerm() {
  return getCookie(isClientAgreed) != undefined;
}

export function ym() {
  return;
  // if(window.ym){
  //   window.ym(92158876,'reachGoal','click_wallet')
  // }
}

export function ymWalletClick() {
  // ym(92158876, 'reachGoal', 'click_wallet');
}

export function ymSwapClick() {
  // ym(92158876, 'reachGoal', 'click_swap');
}
