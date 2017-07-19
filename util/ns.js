var Infologitech
if (!Infologitech) {
    Infologitech = {}
}
var ns = function (s) {
    if (s == null || s.length === 0) {
        return
    }
    var names = s.split('.') || []
    var cur = Infologitech
    for (var i = 1; i < names.length; i++) {
        if (!cur.hasOwnProperty(names[i])) {
            cur[names[i]] = {}
            cur = cur[names[i]]
        }
    }
    console.log(JSON.stringify(Infologitech))
}

if (typeof module.exports !== 'undefined' && module.exports) {
    module.exports = ns
}