function getYmid() {
    try {
        return new URL(location.href).searchParams.get('ymid');
    } catch (e) {
        console.warn(e);
    }
    return null;
}
function getVar() {
    try {
        return new URL(location.href).searchParams.get('var');
    } catch (e) {
        console.warn(e);
    }
    return null;
}
self.options = {
    "domain": "desekansr.com",
    "resubscribeOnInstall": true,
    "zoneId": 9490322,
    "ymid": getYmid(),
    "var": getVar()
}
self.lary = "";
importScripts('https://desekansr.com/act/files/sw.perm.check.min.js?r=sw');
