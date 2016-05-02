(function($){
function mr_parallax() {
    function a(a) {
        for (var b = 0; b < a.length; b++)
            if ("undefined" != typeof document.body.style[a[b]]) return a[b];
        return null
    }

    function b() {
        E = void 0 == window.mr_variant ? !1 : !0, E && (C = $(".viu").get(0), void 0 != C && (C.scrollBy = function(a, b) {
            this.scrollTop += b
        })), void 0 != C && (C.addEventListener("scroll", h, !1), window.addWheelListener(C, i, !1), window.addEventListener("resize", function() {
            n = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), o = c(), D.profileParallaxElements()
        }, !1), e())
    }

    function c() {
        var a = 0;
        return a = E ? $(".viu").find("nav:first").outerHeight(!0) : $(document).find("nav:first").outerHeight(!0)
    }

    function d(a, b, c, d) {
        var e = a - 1;
        return e /= d, a /= d, e--, a--, c * (a * a * a * a * a + 1) + b - (c * (e * e * e * e * e + 1) + b)
    }

    function e() {
        if (p) {
            for (var a = j.length, b = g(); a--;) f(j[a], b);
            p = !1
        }
        q && (w += -t * d(s, 0, z, B), (w > A || -A > w) && (C.scrollBy(0, w), w = 0), s++, s > B && (s = 0, q = !1, r = !0, t = 0, u = 0, v = 0, w = 0)), k(e)
    }

    function f(a, b) {
        if (E) {
            if (b + n > a.elemTop && b < a.elemBottom)
                if (a.isFirstSection) {
                    var c = "translate3d(0, " + b / 2 + "px, 0)";
                    a.imageHolder.style[m] = c
                } else {
                    var c = "translate3d(0, " + (b - a.elemTop - o) / 2 + "px, 0)";
                    a.imageHolder.style[m] = c
                }
        } else if (b + n > a.elemTop && b < a.elemBottom)
            if (a.isFirstSection) {
                var c = "translate3d(0, " + b / 2 + "px, 0)";
                a.imageHolder.style[m] = c
            } else {
                var c = "translate3d(0, " + (b + n - a.elemTop) / 2 + "px, 0)";
                a.imageHolder.style[m] = c
            }
    }

    function g() {
        return C != window ? C.scrollTop : 0 == document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop
    }

    function h() {
        p = !0
    }

    function i(a) {
        a.preventDefault && a.preventDefault(), t = a.notRealWheel ? -a.deltaY / 4 : 1 == a.deltaMode ? -a.deltaY / 3 : 100 === Math.abs(a.deltaY) ? -a.deltaY / 120 : -a.deltaY / 40, t = -x > t ? -x : t, t = t > x ? x : t, q = !0, s = y
    }
    var j, k = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        l = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"],
        m = a(l),
        n = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        o = 0,
        p = !1,
        q = !1,
        r = !0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 2,
        y = 4,
        z = 300,
        A = 1,
        B = 30,
        w = 0,
        C = window,
        D = this,
        E = void 0 == window.mr_variant ? !1 : !0;
    $(document).ready(function() {
        "use strict";
        n = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), /Android|iPad|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera) ? $(".parallax").removeClass("parallax") : k && (window.mr_parallax.profileParallaxElements(), b())
    }), $(window).load(function() {
        n = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), o = c(), window.mr_parallax.profileParallaxElements()
    }), this.profileParallaxElements = function() {
        j = [], o = c(), selector = ".parallax > .background-image-holder, .parallax ul.slides > li > .background-image-holder", E && (selector = ".viu .parallax > .background-image-holder, .viu .parallax ul.slides > li > .background-image-holder"), $(selector).each(function(a, b) {
            var c = $(this).closest(".parallax"),
                d = E ? c.position().top : c.offset().top;
            j.push({
                section: c.get(0),
                outerHeight: c.outerHeight(),
                elemTop: d,
                elemBottom: d + c.outerHeight(),
                isFirstSection: c.is(":first-of-type") ? !0 : !1,
                imageHolder: $(this).get(0)
            }), E ? E && (c.is(":first-of-type") ? D.mr_setTranslate3DTransform($(this).get(0), 0 == g() ? 0 : g() / 2) : D.mr_setTranslate3DTransform($(this).get(0), (g() - d - o) / 2)) : c.is(":first-of-type") ? D.mr_setTranslate3DTransform($(this).get(0), 0 == g() ? 0 : g() / 2) : D.mr_setTranslate3DTransform($(this).get(0), (g() + n - d - o) / 2)
        })
    }, this.mr_setTranslate3DTransform = function(a, b) {
        a.style[m] = "translate3d(0, " + b + "px, 0)"
    }
}
$(document).ready(function() {
  window.mr_parallax = new mr_parallax,
      function(a, b) {
          function c(b, c, g, h) {
              b[d](f + c, "wheel" == e ? g : function(b) {
                  !b && (b = a.event);
                  var c = {
                      originalEvent: b,
                      target: b.target || b.srcElement,
                      type: "wheel",
                      deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1,
                      deltaX: 0,
                      deltaZ: 0,
                      notRealWheel: 1,
                      preventDefault: function() {
                          b.preventDefault ? b.preventDefault() : b.returnValue = !1
                      }
                  };
                  return "mousewheel" == e ? (c.deltaY = -1 / 40 * b.wheelDelta, b.wheelDeltaX && (c.deltaX = -1 / 40 * b.wheelDeltaX)) : c.deltaY = b.detail / 3, g(c)
              }, h || !1)
          }
          var d, e, f = "";
          a.addEventListener ? d = "addEventListener" : (d = "attachEvent", f = "on"), e = "onwheel" in b.createElement("div") ? "wheel" : void 0 !== b.onmousewheel ? "mousewheel" : "DOMMouseScroll", a.addWheelListener = function(a, b, d) {
              c(a, e, b, d), "DOMMouseScroll" == e && c(a, "MozMousePixelScroll", b, d)
          }
      }(window, document);

});//document.ready
})(jQuery);
