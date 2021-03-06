function extractDomain(e) {
    if (!e) return !1;
    try {
        const t = new URL(e),
            o = undefined;
        return t.host
    } catch (e) {
        return !1
    }
}

function getCurrentDayTime() {
    const e = {
            day: !1,
            time: !1
        },
        t = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        o = new Date;
    e.day = t[o.getDay()];
    const n = o.getHours(),
        s = o.getMinutes();
    return e.time = 60 * n + s, e
}

function getMinutesFromTime(e) {
    const t = e.split(":"),
        o = undefined,
        n = undefined;
    return 60 * Number(t[0]) + Number(t[1])
}

function checkBlockDomain(e, t) {
    const o = extractDomain(e);
    for (const [e, n] of Object.entries(t)) {
        const n = undefined;
        if (o === extractDomain(e)) return Boolean(t[e].blockAllPages)
    }
}

function checkBlockNecessity(e, t, o, n) {
    const s = o.block,
        r = getCurrentDayTime(),
        c = r.day,
        a = Number(r.time);
    if (t[e]) {
        if (1 === s) return n(!0);
        if (o.blockDays[c]) {
            const e = getMinutesFromTime(o.blockPeriod.startTime),
                t = getMinutesFromTime(o.blockPeriod.endTime);
            return n(a > e && a < t || e > t && (a > e || a < t))
        }
    }
    const i = undefined;
    return n(!!Boolean(checkBlockDomain(e, t)))
}

function blockChecking(e, t) {
    chrome.storage.local.get(["tabs", "pincode", "blockedUrls", "settings"], (o => {
        if (!o || !o.pincode || !o.settings.block) return;
        const n = o.tabs;
        if (!n[e] || !n[e].access) {
            const s = o.blockedUrls,
                r = o.settings;
            checkBlockNecessity(t, s, r, (o => {
                o && (n[e] = {
                    blockedUrl: t,
                    access: !1
                }, chrome.storage.local.set({
                    tabs: n
                }), chrome.tabs.executeScript(e, {
                    allFrames: !1,
                    file: "inject.js",
                    runAt: "document_start"
                }))
            }))
        }
    }))
}
chrome.storage.local.set({
    tabs: {}
}), chrome.runtime.onInstalled.addListener((() => {
    chrome.storage.local.get(["isInstalled"], (e => {
        e.isInstalled || chrome.storage.local.set({
            isInstalled: !0,
            tabs: {},
            blockedUrls: {},
            pincode: !1,
            settings: {
                block: 1,
                blockPeriod: {
                    startTime: "00:00",
                    endTime: "00:00"
                },
                blockDays: {
                    Sunday: !0,
                    Monday: !0,
                    Tuesday: !0,
                    Wednesday: !0,
                    Thursday: !0,
                    Friday: !0,
                    Saturday: !0
                }
            }
        })
    }))
})), chrome.runtime.onMessage.addListener(((e, t) => {
    const o = e.pincode,
        n = t.tab;
    chrome.storage.local.get(["pincode", "tabs"], (e => {
        if (!e || e.pincode !== o) return;
        const t = e.tabs;
        let s;
        t[n.id] && t[n.id].blockedUrl && (s = t[n.id].blockedUrl), s && (t[n.id] = {
            blockedUrl: s,
            access: !0
        }, chrome.storage.local.set({
            tabs: t
        }, (() => {
            chrome.tabs.update(n.id, {
                url: s
            })
        })))
    })), "openTab" === e?.command && chrome.tabs.create({
        url: e.url
    })
})), chrome.tabs.onUpdated.addListener(((e, t, o) => {
    "loading" === t.status && blockChecking(e, o.url)
})), chrome.tabs.onCreated.addListener((e => {
    const t = e.pendingUrl || e.url;
    blockChecking(e.id, t)
}));
let blockedDomains = new Set;
chrome.storage.local.get("blockedUrls", (e => {
    e && e.blockedUrls && (blockedDomains = new Set(Object.keys(e.blockedUrls).map(extractDomain)))
})), chrome.storage.onChanged.addListener((e => {
    "blockedUrls" in e && (blockedUrls = new Set(Object.keys(e.blockedUrls).map(extractDomain)))
}));
const HEADERS_TO_STRIP_LOWERCASE = ["content-security-policy", "x-frame-options"];
chrome.webRequest.onHeadersReceived.addListener((e => {
    const t = undefined,
        o = extractDomain(e.url);
    if (blockedDomains.has(o)) return {
        responseHeaders: e.responseHeaders.filter((e => HEADERS_TO_STRIP_LOWERCASE.indexOf(e.name.toLowerCase()) < 0))
    }
}), {
    urls: ["<all_urls>"]
}, ["blocking", "responseHeaders"]);
