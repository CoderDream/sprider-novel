function setCookies(cookieName, cookieValue) {
  const today = new Date()
  const expire = new Date()
  expire.setTime(today.getTime() + 3600000 * 356 * 24)
  document.cookie = cookieName + '=' + escape(cookieValue) + ';expires=' + expire.toGMTString() + '; path=/'
}

function ReadCookies(cookieName) {
  const theCookie = '' + document.cookie
  const ind = theCookie.indexOf(cookieName)
  if (ind === -1 || cookieName === '') return ''
  let ind1 = theCookie.indexOf(';', ind)
  if (ind1 === -1) ind1 = theCookie.length
  return unescape(theCookie.substring(ind + cookieName.length + 1, ind1))
}

export { setCookies, ReadCookies }
