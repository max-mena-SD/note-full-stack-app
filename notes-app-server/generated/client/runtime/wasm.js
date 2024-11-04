"use strict";
var _o = Object.create;
var Ot = Object.defineProperty;
var Do = Object.getOwnPropertyDescriptor;
var Fo = Object.getOwnPropertyNames;
var No = Object.getPrototypeOf, Uo = Object.prototype.hasOwnProperty;
var se = (e, t) => () => (e && (t = e(e = 0)), t);
var De = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  kt = (e, t) => {
    for (var r in t) Ot(e, r, { get: t[r], enumerable: !0 });
  },
  Zr = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function") {
      for (let i of Fo(t)) {
        !Uo.call(e, i) && i !== r && Ot(e, i, {
          get: () => t[i],
          enumerable: !(n = Do(t, i)) || n.enumerable,
        });
      }
    }
    return e;
  };
var Fe = (
    e,
    t,
    r,
  ) => (r = e != null ? _o(No(e)) : {},
    Zr(
      t || !e || !e.__esModule
        ? Ot(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )),
  qo = (e) => Zr(Ot({}, "__esModule", { value: !0 }), e);
function fr(e, t) {
  if (t = t.toLowerCase(), t === "utf8" || t === "utf-8") {
    return new y(jo.encode(e));
  }
  if (t === "base64" || t === "base64url") {
    return e = e.replace(/-/g, "+").replace(/_/g, "/"),
      e = e.replace(/[^A-Za-z0-9+/]/g, ""),
      new y([...atob(e)].map((r) => r.charCodeAt(0)));
  }
  if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") {
    return new y([...e].map((r) => r.charCodeAt(0)));
  }
  if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
    let r = new y(e.length * 2), n = new DataView(r.buffer);
    for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), !0);
    return r;
  }
  if (t === "hex") {
    let r = new y(e.length / 2);
    for (let n = 0, i = 0; i < e.length; i += 2, n++) {
      r[n] = parseInt(e.slice(i, i + 2), 16);
    }
    return r;
  }
  tn(`encoding "${t}"`);
}
function Bo(e) {
  let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) =>
      a.startsWith("get") || a.startsWith("set")
    ),
    n = r.map((a) => a.replace("get", "read").replace("set", "write")),
    i = (a, u) =>
      function (g = 0) {
        return B(g, "offset"),
          Y(g, "offset"),
          $(g, "offset", this.length - 1),
          new DataView(this.buffer)[r[a]](g, u);
      },
    o = (a, u) =>
      function (g, T = 0) {
        let C = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), O = $o[C];
        return B(T, "offset"),
          Y(T, "offset"),
          $(T, "offset", this.length - 1),
          Vo(g, "value", O[0], O[1]),
          new DataView(this.buffer)[r[a]](T, g, u),
          T + parseInt(r[a].match(/\d+/)[0]) / 8;
      },
    s = (a) => {
      a.forEach((u) => {
        u.includes("Uint") && (e[u.replace("Uint", "UInt")] = e[u]),
          u.includes("Float64") && (e[u.replace("Float64", "Double")] = e[u]),
          u.includes("Float32") && (e[u.replace("Float32", "Float")] = e[u]);
      });
    };
  n.forEach((a, u) => {
    a.startsWith("read") &&
    (e[a] = i(u, !1), e[a + "LE"] = i(u, !0), e[a + "BE"] = i(u, !1)),
      a.startsWith("write") &&
      (e[a] = o(u, !1), e[a + "LE"] = o(u, !0), e[a + "BE"] = o(u, !1)),
      s([a, a + "LE", a + "BE"]);
  });
}
function tn(e) {
  throw new Error(`Buffer polyfill does not implement "${e}"`);
}
function Mt(e, t) {
  if (!(e instanceof Uint8Array)) {
    throw new TypeError(
      `The "${t}" argument must be an instance of Buffer or Uint8Array`,
    );
  }
}
function $(e, t, r = Go + 1) {
  if (e < 0 || e > r) {
    let n = new RangeError(
      `The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`,
    );
    throw n.code = "ERR_OUT_OF_RANGE", n;
  }
}
function B(e, t) {
  if (typeof e != "number") {
    let r = new TypeError(
      `The "${t}" argument must be of type number. Received type ${typeof e}.`,
    );
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
}
function Y(e, t) {
  if (!Number.isInteger(e) || Number.isNaN(e)) {
    let r = new RangeError(
      `The value of "${t}" is out of range. It must be an integer. Received ${e}`,
    );
    throw r.code = "ERR_OUT_OF_RANGE", r;
  }
}
function Vo(e, t, r, n) {
  if (e < r || e > n) {
    let i = new RangeError(
      `The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`,
    );
    throw i.code = "ERR_OUT_OF_RANGE", i;
  }
}
function en(e, t) {
  if (typeof e != "string") {
    let r = new TypeError(
      `The "${t}" argument must be of type string. Received type ${typeof e}`,
    );
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
}
function Wo(e, t = "utf8") {
  return y.from(e, t);
}
var y,
  $o,
  jo,
  Qo,
  Jo,
  Go,
  b,
  gr,
  c = se(() => {
    "use strict";
    y = class e extends Uint8Array {
      constructor() {
        super(...arguments);
        this._isBuffer = !0;
      }
      get offset() {
        return this.byteOffset;
      }
      static alloc(r, n = 0, i = "utf8") {
        return en(i, "encoding"), e.allocUnsafe(r).fill(n, i);
      }
      static allocUnsafe(r) {
        return e.from(r);
      }
      static allocUnsafeSlow(r) {
        return e.from(r);
      }
      static isBuffer(r) {
        return r && !!r._isBuffer;
      }
      static byteLength(r, n = "utf8") {
        if (typeof r == "string") return fr(r, n).byteLength;
        if (r && r.byteLength) return r.byteLength;
        let i = new TypeError(
          'The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.',
        );
        throw i.code = "ERR_INVALID_ARG_TYPE", i;
      }
      static isEncoding(r) {
        return Jo.includes(r);
      }
      static compare(r, n) {
        Mt(r, "buff1"), Mt(n, "buff2");
        for (let i = 0; i < r.length; i++) {
          if (r[i] < n[i]) return -1;
          if (r[i] > n[i]) return 1;
        }
        return r.length === n.length ? 0 : r.length > n.length ? 1 : -1;
      }
      static from(r, n = "utf8") {
        if (r && typeof r == "object" && r.type === "Buffer") {
          return new e(r.data);
        }
        if (typeof r == "number") return new e(new Uint8Array(r));
        if (typeof r == "string") return fr(r, n);
        if (ArrayBuffer.isView(r)) {
          let { byteOffset: i, byteLength: o, buffer: s } = r;
          return "map" in r && typeof r.map == "function"
            ? new e(r.map((a) => a % 256), i, o)
            : new e(s, i, o);
        }
        if (
          r && typeof r == "object" &&
          ("length" in r || "byteLength" in r || "buffer" in r)
        ) return new e(r);
        throw new TypeError(
          "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.",
        );
      }
      static concat(r, n) {
        if (r.length === 0) return e.alloc(0);
        let i = [].concat(...r.map((s) => [...s])),
          o = e.alloc(n !== void 0 ? n : i.length);
        return o.set(n !== void 0 ? i.slice(0, n) : i), o;
      }
      slice(r = 0, n = this.length) {
        return this.subarray(r, n);
      }
      subarray(r = 0, n = this.length) {
        return Object.setPrototypeOf(super.subarray(r, n), e.prototype);
      }
      reverse() {
        return super.reverse(), this;
      }
      readIntBE(r, n) {
        B(r, "offset"),
          Y(r, "offset"),
          $(r, "offset", this.length - 1),
          B(n, "byteLength"),
          Y(n, "byteLength");
        let i = new DataView(this.buffer, r, n), o = 0;
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
        return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o;
      }
      readIntLE(r, n) {
        B(r, "offset"),
          Y(r, "offset"),
          $(r, "offset", this.length - 1),
          B(n, "byteLength"),
          Y(n, "byteLength");
        let i = new DataView(this.buffer, r, n), o = 0;
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
        return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o;
      }
      readUIntBE(r, n) {
        B(r, "offset"),
          Y(r, "offset"),
          $(r, "offset", this.length - 1),
          B(n, "byteLength"),
          Y(n, "byteLength");
        let i = new DataView(this.buffer, r, n), o = 0;
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
        return o;
      }
      readUintBE(r, n) {
        return this.readUIntBE(r, n);
      }
      readUIntLE(r, n) {
        B(r, "offset"),
          Y(r, "offset"),
          $(r, "offset", this.length - 1),
          B(n, "byteLength"),
          Y(n, "byteLength");
        let i = new DataView(this.buffer, r, n), o = 0;
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
        return o;
      }
      readUintLE(r, n) {
        return this.readUIntLE(r, n);
      }
      writeIntBE(r, n, i) {
        return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntBE(r, n, i);
      }
      writeIntLE(r, n, i) {
        return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntLE(r, n, i);
      }
      writeUIntBE(r, n, i) {
        B(n, "offset"),
          Y(n, "offset"),
          $(n, "offset", this.length - 1),
          B(i, "byteLength"),
          Y(i, "byteLength");
        let o = new DataView(this.buffer, n, i);
        for (let s = i - 1; s >= 0; s--) o.setUint8(s, r & 255), r = r / 256;
        return n + i;
      }
      writeUintBE(r, n, i) {
        return this.writeUIntBE(r, n, i);
      }
      writeUIntLE(r, n, i) {
        B(n, "offset"),
          Y(n, "offset"),
          $(n, "offset", this.length - 1),
          B(i, "byteLength"),
          Y(i, "byteLength");
        let o = new DataView(this.buffer, n, i);
        for (let s = 0; s < i; s++) o.setUint8(s, r & 255), r = r / 256;
        return n + i;
      }
      writeUintLE(r, n, i) {
        return this.writeUIntLE(r, n, i);
      }
      toJSON() {
        return { type: "Buffer", data: Array.from(this) };
      }
      swap16() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 2) {
          r.setUint16(n, r.getUint16(n, !0), !1);
        }
        return this;
      }
      swap32() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 4) {
          r.setUint32(n, r.getUint32(n, !0), !1);
        }
        return this;
      }
      swap64() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 8) {
          r.setBigUint64(n, r.getBigUint64(n, !0), !1);
        }
        return this;
      }
      compare(r, n = 0, i = r.length, o = 0, s = this.length) {
        return Mt(r, "target"),
          B(n, "targetStart"),
          B(i, "targetEnd"),
          B(o, "sourceStart"),
          B(s, "sourceEnd"),
          $(n, "targetStart"),
          $(i, "targetEnd", r.length),
          $(o, "sourceStart"),
          $(s, "sourceEnd", this.length),
          e.compare(this.slice(o, s), r.slice(n, i));
      }
      equals(r) {
        return Mt(r, "otherBuffer"),
          this.length === r.length && this.every((n, i) => n === r[i]);
      }
      copy(r, n = 0, i = 0, o = this.length) {
        $(n, "targetStart"),
          $(i, "sourceStart", this.length),
          $(o, "sourceEnd"),
          n >>>= 0,
          i >>>= 0,
          o >>>= 0;
        let s = 0;
        for (; i < o && !(this[i] === void 0 || r[n] === void 0);) {
          r[n] = this[i], s++, i++, n++;
        }
        return s;
      }
      write(r, n, i, o = "utf8") {
        let s = typeof n == "string" ? 0 : n ?? 0,
          a = typeof i == "string" ? this.length - s : i ?? this.length - s;
        return o = typeof n == "string" ? n : typeof i == "string" ? i : o,
          B(s, "offset"),
          B(a, "length"),
          $(s, "offset", this.length),
          $(a, "length", this.length),
          (o === "ucs2" || o === "ucs-2" || o === "utf16le" ||
            o === "utf-16le") && (a = a - a % 2),
          fr(r, o).copy(this, s, 0, a);
      }
      fill(r = 0, n = 0, i = this.length, o = "utf-8") {
        let s = typeof n == "string" ? 0 : n,
          a = typeof i == "string" ? this.length : i;
        if (
          o = typeof n == "string" ? n : typeof i == "string" ? i : o,
            r = e.from(typeof r == "number" ? [r] : r ?? [], o),
            en(o, "encoding"),
            $(s, "offset", this.length),
            $(a, "end", this.length),
            r.length !== 0
        ) {
          for (let u = s; u < a; u += r.length) {
            super.set(
              r.slice(
                0,
                r.length + u >= this.length ? this.length - u : r.length,
              ),
              u,
            );
          }
        }
        return this;
      }
      includes(r, n = null, i = "utf-8") {
        return this.indexOf(r, n, i) !== -1;
      }
      lastIndexOf(r, n = null, i = "utf-8") {
        return this.indexOf(r, n, i, !0);
      }
      indexOf(r, n = null, i = "utf-8", o = !1) {
        let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
        i = typeof n == "string" ? n : i;
        let a = e.from(typeof r == "number" ? [r] : r, i),
          u = typeof n == "string" ? 0 : n;
        return u = typeof n == "number" ? u : null,
          u = Number.isNaN(u) ? null : u,
          u ??= o ? this.length : 0,
          u = u < 0 ? this.length + u : u,
          a.length === 0 && o === !1
            ? u >= this.length ? this.length : u
            : a.length === 0 && o === !0
            ? (u >= this.length ? this.length : u) || this.length
            : s((g, T) =>
              (o ? T <= u : T >= u) && this[T] === a[0] &&
              a.every((O, A) => this[T + A] === O)
            );
      }
      toString(r = "utf8", n = 0, i = this.length) {
        if (n = n < 0 ? 0 : n, r = r.toString().toLowerCase(), i <= 0) {
          return "";
        }
        if (r === "utf8" || r === "utf-8") return Qo.decode(this.slice(n, i));
        if (r === "base64" || r === "base64url") {
          let o = btoa(this.reduce((s, a) => s + gr(a), ""));
          return r === "base64url"
            ? o.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
            : o;
        }
        if (
          r === "binary" || r === "ascii" || r === "latin1" || r === "latin-1"
        ) {
          return this.slice(n, i).reduce(
            (o, s) => o + gr(s & (r === "ascii" ? 127 : 255)),
            "",
          );
        }
        if (
          r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le"
        ) {
          let o = new DataView(this.buffer.slice(n, i));
          return Array.from(
            { length: o.byteLength / 2 },
            (s, a) =>
              a * 2 + 1 < o.byteLength ? gr(o.getUint16(a * 2, !0)) : "",
          ).join("");
        }
        if (r === "hex") {
          return this.slice(n, i).reduce(
            (o, s) => o + s.toString(16).padStart(2, "0"),
            "",
          );
        }
        tn(`encoding "${r}"`);
      }
      toLocaleString() {
        return this.toString();
      }
      inspect() {
        return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
      }
    };
    $o = {
      int8: [-128, 127],
      int16: [-32768, 32767],
      int32: [-2147483648, 2147483647],
      uint8: [0, 255],
      uint16: [0, 65535],
      uint32: [0, 4294967295],
      float32: [-1 / 0, 1 / 0],
      float64: [-1 / 0, 1 / 0],
      bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn],
      biguint64: [0n, 0xffffffffffffffffn],
    },
      jo = new TextEncoder(),
      Qo = new TextDecoder(),
      Jo = [
        "utf8",
        "utf-8",
        "hex",
        "base64",
        "ascii",
        "binary",
        "base64url",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "latin1",
        "latin-1",
      ],
      Go = 4294967295;
    Bo(y.prototype);
    b = new Proxy(Wo, {
      construct(e, [t, r]) {
        return y.from(t, r);
      },
      get(e, t) {
        return y[t];
      },
    }), gr = String.fromCodePoint;
  });
var h,
  m = se(() => {
    "use strict";
    h = {
      nextTick: (e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      },
      env: {},
      version: "",
      cwd: () => "/",
      stderr: {},
      argv: ["/bin/node"],
    };
  });
var x,
  p = se(() => {
    "use strict";
    x = globalThis.performance ?? (() => {
      let e = Date.now();
      return { now: () => Date.now() - e };
    })();
  });
var E,
  d = se(() => {
    "use strict";
    E = () => {};
    E.prototype = E;
  });
var w,
  f = se(() => {
    "use strict";
    w = class {
      constructor(t) {
        this.value = t;
      }
      deref() {
        return this.value;
      }
    };
  });
function sn(e, t) {
  var r, n, i, o, s, a, u, g, T = e.constructor, C = T.precision;
  if (!e.s || !t.s) return t.s || (t = new T(e)), U ? D(t, C) : t;
  if (u = e.d, g = t.d, s = e.e, i = t.e, u = u.slice(), o = s - i, o) {
    for (
      o < 0 ? (n = u, o = -o, a = g.length) : (n = g, i = s, a = u.length),
        s = Math.ceil(C / N),
        a = s > a ? s + 1 : a + 1,
        o > a && (o = a, n.length = 1),
        n.reverse();
      o--;
    ) n.push(0);
    n.reverse();
  }
  for (
    a = u.length,
      o = g.length,
      a - o < 0 && (o = a, n = g, g = u, u = n),
      r = 0;
    o;
  ) r = (u[--o] = u[o] + g[o] + r) / Q | 0, u[o] %= Q;
  for (r && (u.unshift(r), ++i), a = u.length; u[--a] == 0;) u.pop();
  return t.d = u, t.e = i, U ? D(t, C) : t;
}
function le(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(Oe + e);
}
function ae(e) {
  var t, r, n, i = e.length - 1, o = "", s = e[0];
  if (i > 0) {
    for (o += s, t = 1; t < i; t++) {
      n = e[t] + "", r = N - n.length, r && (o += Pe(r)), o += n;
    }
    s = e[t], n = s + "", r = N - n.length, r && (o += Pe(r));
  } else if (s === 0) return "0";
  for (; s % 10 === 0;) s /= 10;
  return o + s;
}
function an(e, t) {
  var r, n, i, o, s, a, u = 0, g = 0, T = e.constructor, C = T.precision;
  if (V(e) > 16) throw Error(yr + V(e));
  if (!e.s) return new T(Z);
  for (
    t == null ? (U = !1, a = C) : a = t, s = new T(.03125);
    e.abs().gte(.1);
  ) e = e.times(s), g += 5;
  for (
    n = Math.log(Se(2, g)) / Math.LN10 * 2 + 5 | 0,
      a += n,
      r = i = o = new T(Z),
      T.precision = a;;
  ) {
    if (
      i = D(i.times(e), a),
        r = r.times(++u),
        s = o.plus(ye(i, r, a)),
        ae(s.d).slice(0, a) === ae(o.d).slice(0, a)
    ) {
      for (; g--;) o = D(o.times(o), a);
      return T.precision = C, t == null ? (U = !0, D(o, C)) : o;
    }
    o = s;
  }
}
function V(e) {
  for (var t = e.e * N, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function hr(e, t, r) {
  if (t > e.LN10.sd()) {
    throw U = !0,
      r && (e.precision = r),
      Error(re + "LN10 precision limit exceeded");
  }
  return D(new e(e.LN10), t);
}
function Pe(e) {
  for (var t = ""; e--;) t += "0";
  return t;
}
function rt(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    u,
    g,
    T,
    C = 1,
    O = 10,
    A = e,
    M = A.d,
    S = A.constructor,
    I = S.precision;
  if (A.s < 1) throw Error(re + (A.s ? "NaN" : "-Infinity"));
  if (A.eq(Z)) return new S(0);
  if (t == null ? (U = !1, g = I) : g = t, A.eq(10)) {
    return t == null && (U = !0), hr(S, g);
  }
  if (
    g += O,
      S.precision = g,
      r = ae(M),
      n = r.charAt(0),
      o = V(A),
      Math.abs(o) < 15e14
  ) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3;) {
      A = A.times(e), r = ae(A.d), n = r.charAt(0), C++;
    }
    o = V(A),
      n > 1 ? (A = new S("0." + r), o++) : A = new S(n + "." + r.slice(1));
  } else {return u = hr(S, g + 2, I).times(o + ""),
      A = rt(new S(n + "." + r.slice(1)), g - O).plus(u),
      S.precision = I,
      t == null ? (U = !0, D(A, I)) : A;}
  for (
    a = s = A = ye(A.minus(Z), A.plus(Z), g), T = D(A.times(A), g), i = 3;;
  ) {
    if (
      s = D(s.times(T), g),
        u = a.plus(ye(s, new S(i), g)),
        ae(u.d).slice(0, g) === ae(a.d).slice(0, g)
    ) {
      return a = a.times(2),
        o !== 0 && (a = a.plus(hr(S, g + 2, I).times(o + ""))),
        a = ye(a, new S(C), g),
        S.precision = I,
        t == null ? (U = !0, D(a, I)) : a;
    }
    a = u, i += 2;
  }
}
function rn(e, t) {
  var r, n, i;
  for (
    (r = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;
  ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48;) --i;
  if (t = t.slice(n, i), t) {
    if (
      i -= n,
        r = r - n - 1,
        e.e = Ue(r / N),
        e.d = [],
        n = (r + 1) % N,
        r < 0 && (n += N),
        n < i
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= N; n < i;) {
        e.d.push(+t.slice(n, n += N));
      }
      t = t.slice(n), n = N - t.length;
    } else n -= i;
    for (; n--;) t += "0";
    if (e.d.push(+t), U && (e.e > It || e.e < -It)) throw Error(yr + r);
  } else e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function D(e, t, r) {
  var n, i, o, s, a, u, g, T, C = e.d;
  for (s = 1, o = C[0]; o >= 10; o /= 10) s++;
  if (n = t - s, n < 0) n += N, i = t, g = C[T = 0];
  else {
    if (T = Math.ceil((n + 1) / N), o = C.length, T >= o) return e;
    for (g = o = C[T], s = 1; o >= 10; o /= 10) s++;
    n %= N, i = n - N + s;
  }
  if (
    r !== void 0 &&
    (o = Se(10, s - i - 1),
      a = g / o % 10 | 0,
      u = t < 0 || C[T + 1] !== void 0 || g % o,
      u = r < 4 ? (a || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : a > 5 ||
        a == 5 &&
          (r == 4 || u ||
            r == 6 &&
              (n > 0 ? i > 0 ? g / Se(10, s - i) : 0 : C[T - 1]) % 10 & 1 ||
            r == (e.s < 0 ? 8 : 7))), t < 1 || !C[0]
  ) {
    return u
      ? (o = V(e),
        C.length = 1,
        t = t - o - 1,
        C[0] = Se(10, (N - t % N) % N),
        e.e = Ue(-t / N) || 0)
      : (C.length = 1, C[0] = e.e = e.s = 0),
      e;
  }
  if (
    n == 0
      ? (C.length = T, o = 1, T--)
      : (C.length = T + 1,
        o = Se(10, N - n),
        C[T] = i > 0 ? (g / Se(10, s - i) % Se(10, i) | 0) * o : 0), u
  ) {
    for (;;) {
      if (T == 0) {
        (C[0] += o) == Q && (C[0] = 1, ++e.e);
        break;
      } else {
        if (C[T] += o, C[T] != Q) break;
        C[T--] = 0, o = 1;
      }
    }
  }
  for (n = C.length; C[--n] === 0;) C.pop();
  if (U && (e.e > It || e.e < -It)) throw Error(yr + V(e));
  return e;
}
function ln(e, t) {
  var r, n, i, o, s, a, u, g, T, C, O = e.constructor, A = O.precision;
  if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new O(e), U ? D(t, A) : t;
  if (u = e.d, C = t.d, n = t.e, g = e.e, u = u.slice(), s = g - n, s) {
    for (
      T = s < 0,
        T ? (r = u, s = -s, a = C.length) : (r = C, n = g, a = u.length),
        i = Math.max(Math.ceil(A / N), a) + 2,
        s > i && (s = i, r.length = 1),
        r.reverse(),
        i = s;
      i--;
    ) r.push(0);
    r.reverse();
  } else {
    for (
      i = u.length, a = C.length, T = i < a, T && (a = i), i = 0;
      i < a;
      i++
    ) {
      if (u[i] != C[i]) {
        T = u[i] < C[i];
        break;
      }
    }
    s = 0;
  }
  for (
    T && (r = u, u = C, C = r, t.s = -t.s), a = u.length, i = C.length - a;
    i > 0;
    --i
  ) u[a++] = 0;
  for (i = C.length; i > s;) {
    if (u[--i] < C[i]) {
      for (o = i; o && u[--o] === 0;) u[o] = Q - 1;
      --u[o], u[i] += Q;
    }
    u[i] -= C[i];
  }
  for (; u[--a] === 0;) u.pop();
  for (; u[0] === 0; u.shift()) --n;
  return u[0] ? (t.d = u, t.e = n, U ? D(t, A) : t) : new O(0);
}
function ke(e, t, r) {
  var n, i = V(e), o = ae(e.d), s = o.length;
  return t
    ? (r && (n = r - s) > 0
      ? o = o.charAt(0) + "." + o.slice(1) + Pe(n)
      : s > 1 && (o = o.charAt(0) + "." + o.slice(1)),
      o = o + (i < 0 ? "e" : "e+") + i)
    : i < 0
    ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n)))
    : i >= s
    ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n)))
    : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)),
      r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))),
    e.s < 0 ? "-" + o : o;
}
function nn(e, t) {
  if (e.length > t) return e.length = t, !0;
}
function un(e) {
  var t, r, n;
  function i(o) {
    var s = this;
    if (!(s instanceof i)) return new i(o);
    if (s.constructor = i, o instanceof i) {
      s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
      return;
    }
    if (typeof o == "number") {
      if (o * 0 !== 0) throw Error(Oe + o);
      if (o > 0) s.s = 1;
      else if (o < 0) o = -o, s.s = -1;
      else {
        s.s = 0, s.e = 0, s.d = [0];
        return;
      }
      if (o === ~~o && o < 1e7) {
        s.e = 0, s.d = [o];
        return;
      }
      return rn(s, o.toString());
    } else if (typeof o != "string") throw Error(Oe + o);
    if (
      o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, Ho.test(o)
    ) rn(s, o);
    else throw Error(Oe + o);
  }
  if (
    i.prototype = R,
      i.ROUND_UP = 0,
      i.ROUND_DOWN = 1,
      i.ROUND_CEIL = 2,
      i.ROUND_FLOOR = 3,
      i.ROUND_HALF_UP = 4,
      i.ROUND_HALF_DOWN = 5,
      i.ROUND_HALF_EVEN = 6,
      i.ROUND_HALF_CEIL = 7,
      i.ROUND_HALF_FLOOR = 8,
      i.clone = un,
      i.config = i.set = zo,
      e === void 0 && (e = {}),
      e
  ) {
    for (
      n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0;
      t < n.length;
    ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  }
  return i.config(e), i;
}
function zo(e) {
  if (!e || typeof e != "object") throw Error(re + "Object expected");
  var t,
    r,
    n,
    i = [
      "precision",
      1,
      Ne,
      "rounding",
      0,
      8,
      "toExpNeg",
      -1 / 0,
      0,
      "toExpPos",
      0,
      1 / 0,
    ];
  for (t = 0; t < i.length; t += 3) {
    if ((n = e[r = i[t]]) !== void 0) {
      if (Ue(n) === n && n >= i[t + 1] && n <= i[t + 2]) {
        this[r] = n;
      } else throw Error(Oe + r + ": " + n);
    }
  }
  if ((n = e[r = "LN10"]) !== void 0) {
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(Oe + r + ": " + n);
  }
  return this;
}
var Ne,
  Ko,
  br,
  U,
  re,
  Oe,
  yr,
  Ue,
  Se,
  Ho,
  Z,
  Q,
  N,
  on,
  It,
  R,
  ye,
  br,
  Lt,
  cn = se(() => {
    "use strict";
    c();
    m();
    p();
    d();
    f();
    l();
    Ne = 1e9,
      Ko = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10:
          "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
      },
      U = !0,
      re = "[DecimalError] ",
      Oe = re + "Invalid argument: ",
      yr = re + "Exponent out of range: ",
      Ue = Math.floor,
      Se = Math.pow,
      Ho = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      Q = 1e7,
      N = 7,
      on = 9007199254740991,
      It = Ue(on / N),
      R = {};
    R.absoluteValue = R.abs = function () {
      var e = new this.constructor(this);
      return e.s && (e.s = 1), e;
    };
    R.comparedTo = R.cmp = function (e) {
      var t, r, n, i, o = this;
      if (e = new o.constructor(e), o.s !== e.s) return o.s || -e.s;
      if (o.e !== e.e) return o.e > e.e ^ o.s < 0 ? 1 : -1;
      for (
        n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i;
        t < r;
        ++t
      ) if (o.d[t] !== e.d[t]) return o.d[t] > e.d[t] ^ o.s < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
    };
    R.decimalPlaces = R.dp = function () {
      var e = this, t = e.d.length - 1, r = (t - e.e) * N;
      if (t = e.d[t], t) { for (; t % 10 == 0; t /= 10) r--; }
      return r < 0 ? 0 : r;
    };
    R.dividedBy = R.div = function (e) {
      return ye(this, new this.constructor(e));
    };
    R.dividedToIntegerBy = R.idiv = function (e) {
      var t = this, r = t.constructor;
      return D(ye(t, new r(e), 0, 1), r.precision);
    };
    R.equals = R.eq = function (e) {
      return !this.cmp(e);
    };
    R.exponent = function () {
      return V(this);
    };
    R.greaterThan = R.gt = function (e) {
      return this.cmp(e) > 0;
    };
    R.greaterThanOrEqualTo = R.gte = function (e) {
      return this.cmp(e) >= 0;
    };
    R.isInteger = R.isint = function () {
      return this.e > this.d.length - 2;
    };
    R.isNegative = R.isneg = function () {
      return this.s < 0;
    };
    R.isPositive = R.ispos = function () {
      return this.s > 0;
    };
    R.isZero = function () {
      return this.s === 0;
    };
    R.lessThan = R.lt = function (e) {
      return this.cmp(e) < 0;
    };
    R.lessThanOrEqualTo = R.lte = function (e) {
      return this.cmp(e) < 1;
    };
    R.logarithm = R.log = function (e) {
      var t, r = this, n = r.constructor, i = n.precision, o = i + 5;
      if (e === void 0) e = new n(10);
      else if (e = new n(e), e.s < 1 || e.eq(Z)) throw Error(re + "NaN");
      if (r.s < 1) throw Error(re + (r.s ? "NaN" : "-Infinity"));
      return r.eq(Z)
        ? new n(0)
        : (U = !1, t = ye(rt(r, o), rt(e, o), o), U = !0, D(t, i));
    };
    R.minus = R.sub = function (e) {
      var t = this;
      return e = new t.constructor(e),
        t.s == e.s ? ln(t, e) : sn(t, (e.s = -e.s, e));
    };
    R.modulo = R.mod = function (e) {
      var t, r = this, n = r.constructor, i = n.precision;
      if (e = new n(e), !e.s) throw Error(re + "NaN");
      return r.s
        ? (U = !1, t = ye(r, e, 0, 1).times(e), U = !0, r.minus(t))
        : D(new n(r), i);
    };
    R.naturalExponential = R.exp = function () {
      return an(this);
    };
    R.naturalLogarithm = R.ln = function () {
      return rt(this);
    };
    R.negated = R.neg = function () {
      var e = new this.constructor(this);
      return e.s = -e.s || 0, e;
    };
    R.plus = R.add = function (e) {
      var t = this;
      return e = new t.constructor(e),
        t.s == e.s ? sn(t, e) : ln(t, (e.s = -e.s, e));
    };
    R.precision = R.sd = function (e) {
      var t, r, n, i = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Oe + e);
      if (t = V(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
        for (; n % 10 == 0; n /= 10) r--;
        for (n = i.d[0]; n >= 10; n /= 10) r++;
      }
      return e && t > r ? t : r;
    };
    R.squareRoot = R.sqrt = function () {
      var e, t, r, n, i, o, s, a = this, u = a.constructor;
      if (a.s < 1) {
        if (!a.s) return new u(0);
        throw Error(re + "NaN");
      }
      for (
        e = V(a),
          U = !1,
          i = Math.sqrt(+a),
          i == 0 || i == 1 / 0
            ? (t = ae(a.d),
              (t.length + e) % 2 == 0 && (t += "0"),
              i = Math.sqrt(t),
              e = Ue((e + 1) / 2) - (e < 0 || e % 2),
              i == 1 / 0
                ? t = "5e" + e
                : (t = i.toExponential(),
                  t = t.slice(0, t.indexOf("e") + 1) + e),
              n = new u(t))
            : n = new u(i.toString()),
          r = u.precision,
          i = s = r + 3;;
      ) {
        if (
          o = n,
            n = o.plus(ye(a, o, s + 2)).times(.5),
            ae(o.d).slice(0, s) === (t = ae(n.d)).slice(0, s)
        ) {
          if (t = t.slice(s - 3, s + 1), i == s && t == "4999") {
            if (D(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (t != "9999") break;
          s += 4;
        }
      }
      return U = !0, D(n, r);
    };
    R.times = R.mul = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a,
        u,
        g,
        T = this,
        C = T.constructor,
        O = T.d,
        A = (e = new C(e)).d;
      if (!T.s || !e.s) return new C(0);
      for (
        e.s *= T.s,
          r = T.e + e.e,
          u = O.length,
          g = A.length,
          u < g && (o = O, O = A, A = o, s = u, u = g, g = s),
          o = [],
          s = u + g,
          n = s;
        n--;
      ) o.push(0);
      for (n = g; --n >= 0;) {
        for (t = 0, i = u + n; i > n;) {
          a = o[i] + A[n] * O[i - n - 1] + t, o[i--] = a % Q | 0, t = a / Q | 0;
        }
        o[i] = (o[i] + t) % Q | 0;
      }
      for (; !o[--s];) o.pop();
      return t ? ++r : o.shift(), e.d = o, e.e = r, U ? D(e, C.precision) : e;
    };
    R.toDecimalPlaces = R.todp = function (e, t) {
      var r = this, n = r.constructor;
      return r = new n(r),
        e === void 0
          ? r
          : (le(e, 0, Ne),
            t === void 0 ? t = n.rounding : le(t, 0, 8),
            D(r, e + V(r) + 1, t));
    };
    R.toExponential = function (e, t) {
      var r, n = this, i = n.constructor;
      return e === void 0
        ? r = ke(n, !0)
        : (le(e, 0, Ne),
          t === void 0 ? t = i.rounding : le(t, 0, 8),
          n = D(new i(n), e + 1, t),
          r = ke(n, !0, e + 1)),
        r;
    };
    R.toFixed = function (e, t) {
      var r, n, i = this, o = i.constructor;
      return e === void 0
        ? ke(i)
        : (le(e, 0, Ne),
          t === void 0 ? t = o.rounding : le(t, 0, 8),
          n = D(new o(i), e + V(i) + 1, t),
          r = ke(n.abs(), !1, e + V(n) + 1),
          i.isneg() && !i.isZero() ? "-" + r : r);
    };
    R.toInteger = R.toint = function () {
      var e = this, t = e.constructor;
      return D(new t(e), V(e) + 1, t.rounding);
    };
    R.toNumber = function () {
      return +this;
    };
    R.toPower = R.pow = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a = this,
        u = a.constructor,
        g = 12,
        T = +(e = new u(e));
      if (!e.s) return new u(Z);
      if (a = new u(a), !a.s) {
        if (e.s < 1) throw Error(re + "Infinity");
        return a;
      }
      if (a.eq(Z)) return a;
      if (n = u.precision, e.eq(Z)) return D(a, n);
      if (t = e.e, r = e.d.length - 1, s = t >= r, o = a.s, s) {
        if ((r = T < 0 ? -T : T) <= on) {
          for (
            i = new u(Z), t = Math.ceil(n / N + 4), U = !1;
            r % 2 && (i = i.times(a), nn(i.d, t)), r = Ue(r / 2), r !== 0;
          ) {
            a = a.times(a), nn(a.d, t);
          }
          return U = !0, e.s < 0 ? new u(Z).div(i) : D(i, n);
        }
      } else if (o < 0) throw Error(re + "NaN");
      return o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1,
        a.s = 1,
        U = !1,
        i = e.times(rt(a, n + g)),
        U = !0,
        i = an(i),
        i.s = o,
        i;
    };
    R.toPrecision = function (e, t) {
      var r, n, i = this, o = i.constructor;
      return e === void 0
        ? (r = V(i), n = ke(i, r <= o.toExpNeg || r >= o.toExpPos))
        : (le(e, 1, Ne),
          t === void 0 ? t = o.rounding : le(t, 0, 8),
          i = D(new o(i), e, t),
          r = V(i),
          n = ke(i, e <= r || r <= o.toExpNeg, e)),
        n;
    };
    R.toSignificantDigits = R.tosd = function (e, t) {
      var r = this, n = r.constructor;
      return e === void 0
        ? (e = n.precision, t = n.rounding)
        : (le(e, 1, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8)),
        D(new n(r), e, t);
    };
    R.toString =
      R.valueOf =
      R.val =
      R.toJSON =
      R[Symbol.for("nodejs.util.inspect.custom")] =
        function () {
          var e = this, t = V(e), r = e.constructor;
          return ke(e, t <= r.toExpNeg || t >= r.toExpPos);
        };
    ye = function () {
      function e(n, i) {
        var o, s = 0, a = n.length;
        for (n = n.slice(); a--;) {
          o = n[a] * i + s, n[a] = o % Q | 0, s = o / Q | 0;
        }
        return s && n.unshift(s), n;
      }
      function t(n, i, o, s) {
        var a, u;
        if (o != s) u = o > s ? 1 : -1;
        else {for (a = u = 0; a < o; a++) {
            if (n[a] != i[a]) {
              u = n[a] > i[a] ? 1 : -1;
              break;
            }
          }}
        return u;
      }
      function r(n, i, o) {
        for (var s = 0; o--;) {
          n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * Q + n[o] - i[o];
        }
        for (; !n[0] && n.length > 1;) n.shift();
      }
      return function (n, i, o, s) {
        var a,
          u,
          g,
          T,
          C,
          O,
          A,
          M,
          S,
          I,
          ne,
          z,
          _e,
          k,
          Ae,
          dr,
          ie,
          At,
          St = n.constructor,
          Lo = n.s == i.s ? 1 : -1,
          oe = n.d,
          q = i.d;
        if (!n.s) return new St(n);
        if (!i.s) throw Error(re + "Division by zero");
        for (
          u = n.e - i.e,
            ie = q.length,
            Ae = oe.length,
            A = new St(Lo),
            M = A.d = [],
            g = 0;
          q[g] == (oe[g] || 0);
        ) ++g;
        if (
          q[g] > (oe[g] || 0) && --u,
            o == null
              ? z = o = St.precision
              : s
              ? z = o + (V(n) - V(i)) + 1
              : z = o,
            z < 0
        ) return new St(0);
        if (z = z / N + 2 | 0, g = 0, ie == 1) {
          for (T = 0, q = q[0], z++; (g < Ae || T) && z--; g++) {
            _e = T * Q + (oe[g] || 0), M[g] = _e / q | 0, T = _e % q | 0;
          }
        } else {
          for (
            T = Q / (q[0] + 1) | 0,
              T > 1 &&
              (q = e(q, T), oe = e(oe, T), ie = q.length, Ae = oe.length),
              k = ie,
              S = oe.slice(0, ie),
              I = S.length;
            I < ie;
          ) S[I++] = 0;
          At = q.slice(), At.unshift(0), dr = q[0], q[1] >= Q / 2 && ++dr;
          do T = 0,
            a = t(q, S, ie, I),
            a < 0
              ? (ne = S[0],
                ie != I && (ne = ne * Q + (S[1] || 0)),
                T = ne / dr | 0,
                T > 1
                  ? (T >= Q && (T = Q - 1),
                    C = e(q, T),
                    O = C.length,
                    I = S.length,
                    a = t(C, S, O, I),
                    a == 1 && (T--, r(C, ie < O ? At : q, O)))
                  : (T == 0 && (a = T = 1), C = q.slice()),
                O = C.length,
                O < I && C.unshift(0),
                r(S, C, I),
                a == -1 &&
                (I = S.length,
                  a = t(q, S, ie, I),
                  a < 1 && (T++, r(S, ie < I ? At : q, I))),
                I = S.length)
              : a === 0 && (T++, S = [0]),
            M[g++] = T,
            a && S[0] ? S[I++] = oe[k] || 0 : (S = [oe[k]], I = 1); while (
            (k++ < Ae || S[0] !== void 0) && z--
          );
        }
        return M[0] || M.shift(), A.e = u, D(A, s ? o + V(A) + 1 : o);
      };
    }();
    br = un(Ko);
    Z = new br(1);
    Lt = br;
  });
var v,
  ue,
  l = se(() => {
    "use strict";
    cn();
    v = class extends Lt {
      static isDecimal(t) {
        return t instanceof Lt;
      }
      static random(t = 20) {
        {
          let n = crypto.getRandomValues(new Uint8Array(t)).reduce(
            (i, o) => i + o,
            "",
          );
          return new Lt(`0.${n.slice(0, t)}`);
        }
      }
    }, ue = v;
  });
function Yo() {
  return !1;
}
var Xo,
  Zo,
  fn,
  gn = se(() => {
    "use strict";
    c();
    m();
    p();
    d();
    f();
    l();
    Xo = {}, Zo = { existsSync: Yo, promises: Xo }, fn = Zo;
  });
function os(...e) {
  return e.join("/");
}
function ss(...e) {
  return e.join("/");
}
var On,
  as,
  ls,
  it,
  kn = se(() => {
    "use strict";
    c();
    m();
    p();
    d();
    f();
    l();
    On = "/",
      as = { sep: On },
      ls = { resolve: os, posix: as, join: ss, sep: On },
      it = ls;
  });
var Nt,
  In = se(() => {
    "use strict";
    c();
    m();
    p();
    d();
    f();
    l();
    Nt = class {
      constructor() {
        this.events = {};
      }
      on(t, r) {
        return this.events[t] || (this.events[t] = []),
          this.events[t].push(r),
          this;
      }
      emit(t, ...r) {
        return this.events[t]
          ? (this.events[t].forEach((n) => {
            n(...r);
          }),
            !0)
          : !1;
      }
    };
  });
var _n = De((jc, Ln) => {
  "use strict";
  c();
  m();
  p();
  d();
  f();
  l();
  Ln.exports = (e, t = 1, r) => {
    if (
      r = { indent: " ", includeEmptyLines: !1, ...r }, typeof e != "string"
    ) {
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
      );
    }
    if (typeof t != "number") {
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
      );
    }
    if (typeof r.indent != "string") {
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r
          .indent}\``,
      );
    }
    if (t === 0) return e;
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return e.replace(n, r.indent.repeat(t));
  };
});
var Nn = De((nm, Fn) => {
  "use strict";
  c();
  m();
  p();
  d();
  f();
  l();
  Fn.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|");
    return new RegExp(t, e ? void 0 : "g");
  };
});
var qn = De((cm, Un) => {
  "use strict";
  c();
  m();
  p();
  d();
  f();
  l();
  var fs = Nn();
  Un.exports = (e) => typeof e == "string" ? e.replace(fs(), "") : e;
});
var Jn = De((eg, ws) => {
  ws.exports = {
    name: "@prisma/engines-version",
    version: "5.21.1-1.bf0e5e8a04cada8225617067eaa03d041e2bba36",
    main: "index.js",
    types: "index.d.ts",
    license: "Apache-2.0",
    author: "Tim Suchanek <suchanek@prisma.io>",
    prisma: { enginesVersion: "bf0e5e8a04cada8225617067eaa03d041e2bba36" },
    repository: {
      type: "git",
      url: "https://github.com/prisma/engines-wrapper.git",
      directory: "packages/engines-version",
    },
    devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" },
    files: ["index.js", "index.d.ts"],
    scripts: { build: "tsc -d" },
  };
});
var Gn = De(() => {
  "use strict";
  c();
  m();
  p();
  d();
  f();
  l();
});
var Qr = De((iR, Ni) => {
  "use strict";
  c();
  m();
  p();
  d();
  f();
  l();
  Ni.exports = function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
    }
    return function (t, r) {
      if (t === r) return 0;
      if (t.length > r.length) {
        var n = t;
        t = r, r = n;
      }
      for (
        var i = t.length, o = r.length;
        i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);
      ) i--, o--;
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s);) s++;
      if (i -= s, o -= s, i === 0 || o < 3) return o;
      var a = 0, u, g, T, C, O, A, M, S, I, ne, z, _e, k = [];
      for (u = 0; u < i; u++) k.push(u + 1), k.push(t.charCodeAt(s + u));
      for (var Ae = k.length - 1; a < o - 3;) {
        for (
          I = r.charCodeAt(s + (g = a)),
            ne = r.charCodeAt(s + (T = a + 1)),
            z = r.charCodeAt(s + (C = a + 2)),
            _e = r.charCodeAt(s + (O = a + 3)),
            A = a += 4,
            u = 0;
          u < Ae;
          u += 2
        ) {
          M = k[u],
            S = k[u + 1],
            g = e(M, g, T, I, S),
            T = e(g, T, C, ne, S),
            C = e(T, C, O, z, S),
            A = e(C, O, A, _e, S),
            k[u] = A,
            O = C,
            C = T,
            T = g,
            g = M;
        }
      }
      for (; a < o;) {
        for (I = r.charCodeAt(s + (g = a)), A = ++a, u = 0; u < Ae; u += 2) {
          M = k[u], k[u] = A = e(M, g, A, I, k[u + 1]), g = M;
        }
      }
      return A;
    };
  }();
});
var ol = {};
kt(ol, {
  Debug: () => vr,
  Decimal: () => ue,
  Extensions: () => wr,
  MetricsClient: () => Ve,
  NotFoundError: () => we,
  PrismaClientInitializationError: () => L,
  PrismaClientKnownRequestError: () => J,
  PrismaClientRustPanicError: () => Ee,
  PrismaClientUnknownRequestError: () => G,
  PrismaClientValidationError: () => j,
  Public: () => Er,
  Sql: () => X,
  defineDmmfProperty: () => $n,
  empty: () => Kn,
  getPrismaClient: () => ko,
  getRuntime: () => Ce,
  join: () => Wn,
  makeStrictEnum: () => Mo,
  makeTypedQueryFactory: () => Qn,
  objectEnumValues: () => Bt,
  raw: () => Dr,
  skip: () => Vt,
  sqltag: () => Fr,
  warnEnvConflicts: () => void 0,
  warnOnce: () => lt,
});
module.exports = qo(ol);
c();
m();
p();
d();
f();
l();
var wr = {};
kt(wr, { defineExtension: () => mn, getExtensionContext: () => pn });
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function mn(e) {
  return typeof e == "function" ? e : (t) => t.$extends(e);
}
c();
m();
p();
d();
f();
l();
function pn(e) {
  return e;
}
var Er = {};
kt(Er, { validator: () => dn });
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function dn(...e) {
  return (t) => t;
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var xr, hn, yn, bn, wn = !0;
typeof h < "u" &&
  ({ FORCE_COLOR: xr, NODE_DISABLE_COLORS: hn, NO_COLOR: yn, TERM: bn } =
    h.env || {},
    wn = h.stdout && h.stdout.isTTY);
var es = {
  enabled: !hn && yn == null && bn !== "dumb" &&
    (xr != null && xr !== "0" || wn),
};
function F(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
  return function (o) {
    return !es.enabled || o == null
      ? o
      : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
  };
}
var cu = F(0, 0),
  _t = F(1, 22),
  Dt = F(2, 22),
  mu = F(3, 23),
  En = F(4, 24),
  pu = F(7, 27),
  du = F(8, 28),
  fu = F(9, 29),
  gu = F(30, 39),
  qe = F(31, 39),
  xn = F(32, 39),
  Pn = F(33, 39),
  vn = F(34, 39),
  hu = F(35, 39),
  Tn = F(36, 39),
  yu = F(37, 39),
  Cn = F(90, 39),
  bu = F(90, 39),
  wu = F(40, 49),
  Eu = F(41, 49),
  xu = F(42, 49),
  Pu = F(43, 49),
  vu = F(44, 49),
  Tu = F(45, 49),
  Cu = F(46, 49),
  Ru = F(47, 49);
c();
m();
p();
d();
f();
l();
var ts = 100,
  Rn = ["green", "yellow", "blue", "magenta", "cyan", "red"],
  Ft = [],
  An = Date.now(),
  rs = 0,
  Pr = typeof h < "u" ? h.env : {};
globalThis.DEBUG ??= Pr.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= Pr.DEBUG_COLORS ? Pr.DEBUG_COLORS === "true" : !0;
var nt = {
  enable(e) {
    typeof e == "string" && (globalThis.DEBUG = e);
  },
  disable() {
    let e = globalThis.DEBUG;
    return globalThis.DEBUG = "", e;
  },
  enabled(e) {
    let t = globalThis.DEBUG.split(",").map((i) =>
        i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      ),
      r = t.some((i) =>
        i === "" || i[0] === "-"
          ? !1
          : e.match(RegExp(i.split("*").join(".*") + "$"))
      ),
      n = t.some((i) =>
        i === "" || i[0] !== "-"
          ? !1
          : e.match(RegExp(i.slice(1).split("*").join(".*") + "$"))
      );
    return r && !n;
  },
  log: (...e) => {
    let [t, r, ...n] = e;
    (console.warn ?? console.log)(`${t} ${r}`, ...n);
  },
  formatters: {},
};
function ns(e) {
  let t = {
      color: Rn[rs++ % Rn.length],
      enabled: nt.enabled(e),
      namespace: e,
      log: nt.log,
      extend: () => {},
    },
    r = (...n) => {
      let { enabled: i, namespace: o, color: s, log: a } = t;
      if (
        n.length !== 0 && Ft.push([o, ...n]),
          Ft.length > ts && Ft.shift(),
          nt.enabled(o) || i
      ) {
        let u = n.map((T) => typeof T == "string" ? T : is(T)),
          g = `+${Date.now() - An}ms`;
        An = Date.now(), a(o, ...u, g);
      }
    };
  return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => t[i] = o });
}
var vr = new Proxy(ns, { get: (e, t) => nt[t], set: (e, t, r) => nt[t] = r });
function is(e, t = 2) {
  let r = new Set();
  return JSON.stringify(e, (n, i) => {
    if (typeof i == "object" && i !== null) {
      if (r.has(i)) return "[Circular *]";
      r.add(i);
    } else if (typeof i == "bigint") return i.toString();
    return i;
  }, t);
}
function Sn() {
  Ft.length = 0;
}
var ee = vr;
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Tr = [
  "darwin",
  "darwin-arm64",
  "debian-openssl-1.0.x",
  "debian-openssl-1.1.x",
  "debian-openssl-3.0.x",
  "rhel-openssl-1.0.x",
  "rhel-openssl-1.1.x",
  "rhel-openssl-3.0.x",
  "linux-arm64-openssl-1.1.x",
  "linux-arm64-openssl-1.0.x",
  "linux-arm64-openssl-3.0.x",
  "linux-arm-openssl-1.1.x",
  "linux-arm-openssl-1.0.x",
  "linux-arm-openssl-3.0.x",
  "linux-musl",
  "linux-musl-openssl-3.0.x",
  "linux-musl-arm64-openssl-1.1.x",
  "linux-musl-arm64-openssl-3.0.x",
  "linux-nixos",
  "linux-static-x64",
  "linux-static-arm64",
  "windows",
  "freebsd11",
  "freebsd12",
  "freebsd13",
  "freebsd14",
  "freebsd15",
  "openbsd",
  "netbsd",
  "arm",
];
c();
m();
p();
d();
f();
l();
var Mn = "library";
function ot(e) {
  let t = us();
  return t ||
    (e?.config.engineType === "library"
      ? "library"
      : e?.config.engineType === "binary"
      ? "binary"
      : Mn);
}
function us() {
  let e = h.env.PRISMA_CLIENT_ENGINE_TYPE;
  return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Me;
((t) => {
  let e;
  ((
    k,
  ) => (k.findUnique = "findUnique",
    k.findUniqueOrThrow = "findUniqueOrThrow",
    k.findFirst = "findFirst",
    k.findFirstOrThrow = "findFirstOrThrow",
    k.findMany = "findMany",
    k.create = "create",
    k.createMany = "createMany",
    k.createManyAndReturn = "createManyAndReturn",
    k.update = "update",
    k.updateMany = "updateMany",
    k.upsert = "upsert",
    k.delete = "delete",
    k.deleteMany = "deleteMany",
    k.groupBy = "groupBy",
    k.count = "count",
    k.aggregate = "aggregate",
    k.findRaw = "findRaw",
    k.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
})(Me ||= {});
var at = {};
kt(at, {
  error: () => ps,
  info: () => ms,
  log: () => cs,
  query: () => ds,
  should: () => Dn,
  tags: () => st,
  warn: () => Cr,
});
c();
m();
p();
d();
f();
l();
var st = {
    error: qe("prisma:error"),
    warn: Pn("prisma:warn"),
    info: Tn("prisma:info"),
    query: vn("prisma:query"),
  },
  Dn = { warn: () => !h.env.PRISMA_DISABLE_WARNINGS };
function cs(...e) {
  console.log(...e);
}
function Cr(e, ...t) {
  Dn.warn() && console.warn(`${st.warn} ${e}`, ...t);
}
function ms(e, ...t) {
  console.info(`${st.info} ${e}`, ...t);
}
function ps(e, ...t) {
  console.error(`${st.error} ${e}`, ...t);
}
function ds(e, ...t) {
  console.log(`${st.query} ${e}`, ...t);
}
c();
m();
p();
d();
f();
l();
function Ut(e, t) {
  if (!e) {
    throw new Error(
      `${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`,
    );
  }
}
c();
m();
p();
d();
f();
l();
function be(e, t) {
  throw new Error(t);
}
c();
m();
p();
d();
f();
l();
function Rr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
c();
m();
p();
d();
f();
l();
var Ar = (e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {});
c();
m();
p();
d();
f();
l();
function Be(e, t) {
  let r = {};
  for (let n of Object.keys(e)) r[n] = t(e[n], n);
  return r;
}
c();
m();
p();
d();
f();
l();
function Sr(e, t) {
  if (e.length === 0) return;
  let r = e[0];
  for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
  return r;
}
c();
m();
p();
d();
f();
l();
function K(e, t) {
  Object.defineProperty(e, "name", { value: t, configurable: !0 });
}
c();
m();
p();
d();
f();
l();
var Bn = new Set(),
  lt = (e, t, ...r) => {
    Bn.has(e) || (Bn.add(e), Cr(t, ...r));
  };
c();
m();
p();
d();
f();
l();
var J = class extends Error {
  constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
    super(t),
      this.name = "PrismaClientKnownRequestError",
      this.code = r,
      this.clientVersion = n,
      this.meta = i,
      Object.defineProperty(this, "batchRequestIdx", {
        value: o,
        enumerable: !1,
        writable: !0,
      });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientKnownRequestError";
  }
};
K(J, "PrismaClientKnownRequestError");
var we = class extends J {
  constructor(t, r) {
    super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
  }
};
K(we, "NotFoundError");
c();
m();
p();
d();
f();
l();
var L = class e extends Error {
  constructor(t, r, n) {
    super(t),
      this.name = "PrismaClientInitializationError",
      this.clientVersion = r,
      this.errorCode = n,
      Error.captureStackTrace(e);
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientInitializationError";
  }
};
K(L, "PrismaClientInitializationError");
c();
m();
p();
d();
f();
l();
var Ee = class extends Error {
  constructor(t, r) {
    super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientRustPanicError";
  }
};
K(Ee, "PrismaClientRustPanicError");
c();
m();
p();
d();
f();
l();
var G = class extends Error {
  constructor(t, { clientVersion: r, batchRequestIdx: n }) {
    super(t),
      this.name = "PrismaClientUnknownRequestError",
      this.clientVersion = r,
      Object.defineProperty(this, "batchRequestIdx", {
        value: n,
        writable: !0,
        enumerable: !1,
      });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientUnknownRequestError";
  }
};
K(G, "PrismaClientUnknownRequestError");
c();
m();
p();
d();
f();
l();
var j = class extends Error {
  constructor(r, { clientVersion: n }) {
    super(r);
    this.name = "PrismaClientValidationError";
    this.clientVersion = n;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientValidationError";
  }
};
K(j, "PrismaClientValidationError");
c();
m();
p();
d();
f();
l();
var Ve = class {
  constructor(t) {
    this._engine = t;
  }
  prometheus(t) {
    return this._engine.metrics({ format: "prometheus", ...t });
  }
  json(t) {
    return this._engine.metrics({ format: "json", ...t });
  }
};
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function ut(e) {
  let t;
  return {
    get() {
      return t || (t = { value: e() }), t.value;
    },
  };
}
function $n(e, t) {
  let r = ut(() => gs(t));
  Object.defineProperty(e, "dmmf", { get: () => r.get() });
}
function gs(e) {
  throw new Error(
    "Prisma.dmmf is not available when running in edge runtimes.",
  );
}
function Or(e) {
  return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
}
c();
m();
p();
d();
f();
l();
var qt = Symbol(),
  kr = new WeakMap(),
  xe = class {
    constructor(t) {
      t === qt ? kr.set(this, `Prisma.${this._getName()}`) : kr.set(
        this,
        `new Prisma.${this._getNamespace()}.${this._getName()}()`,
      );
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return kr.get(this);
    }
  },
  ct = class extends xe {
    _getNamespace() {
      return "NullTypes";
    }
  },
  mt = class extends ct {};
Mr(mt, "DbNull");
var pt = class extends ct {};
Mr(pt, "JsonNull");
var dt = class extends ct {};
Mr(dt, "AnyNull");
var Bt = {
  classes: { DbNull: mt, JsonNull: pt, AnyNull: dt },
  instances: { DbNull: new mt(qt), JsonNull: new pt(qt), AnyNull: new dt(qt) },
};
function Mr(e, t) {
  Object.defineProperty(e, "name", { value: t, configurable: !0 });
}
c();
m();
p();
d();
f();
l();
var jn = Symbol(),
  ft = class {
    constructor(t) {
      if (t !== jn) {
        throw new Error(
          "Skip instance can not be constructed directly",
        );
      }
    }
    ifUndefined(t) {
      return t === void 0 ? Vt : t;
    }
  },
  Vt = new ft(jn);
function ce(e) {
  return e instanceof ft;
}
c();
m();
p();
d();
f();
l();
var Ir = new WeakMap(),
  gt = class {
    constructor(t, r) {
      Ir.set(this, { sql: t, values: r });
    }
    get sql() {
      return Ir.get(this).sql;
    }
    get values() {
      return Ir.get(this).values;
    }
  };
function Qn(e) {
  return (...t) => new gt(e, t);
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function ht(e) {
  return {
    ok: !1,
    error: e,
    map() {
      return ht(e);
    },
    flatMap() {
      return ht(e);
    },
  };
}
var Lr = class {
    constructor() {
      this.registeredErrors = [];
    }
    consumeError(t) {
      return this.registeredErrors[t];
    }
    registerNewError(t) {
      let r = 0;
      for (; this.registeredErrors[r] !== void 0;) r++;
      return this.registeredErrors[r] = { error: t }, r;
    }
  },
  _r = (e) => {
    let t = new Lr(),
      r = me(t, e.transactionContext.bind(e)),
      n = {
        adapterName: e.adapterName,
        errorRegistry: t,
        queryRaw: me(t, e.queryRaw.bind(e)),
        executeRaw: me(t, e.executeRaw.bind(e)),
        provider: e.provider,
        transactionContext: async (...i) =>
          (await r(...i)).map((s) => hs(t, s)),
      };
    return e.getConnectionInfo &&
      (n.getConnectionInfo = bs(t, e.getConnectionInfo.bind(e))),
      n;
  },
  hs = (e, t) => {
    let r = me(e, t.startTransaction.bind(t));
    return {
      adapterName: t.adapterName,
      provider: t.provider,
      queryRaw: me(e, t.queryRaw.bind(t)),
      executeRaw: me(e, t.executeRaw.bind(t)),
      startTransaction: async (...n) => (await r(...n)).map((o) => ys(e, o)),
    };
  },
  ys = (e, t) => ({
    adapterName: t.adapterName,
    provider: t.provider,
    options: t.options,
    queryRaw: me(e, t.queryRaw.bind(t)),
    executeRaw: me(e, t.executeRaw.bind(t)),
    commit: me(e, t.commit.bind(t)),
    rollback: me(e, t.rollback.bind(t)),
  });
function me(e, t) {
  return async (...r) => {
    try {
      return await t(...r);
    } catch (n) {
      let i = e.registerNewError(n);
      return ht({ kind: "GenericJs", id: i });
    }
  };
}
function bs(e, t) {
  return (...r) => {
    try {
      return t(...r);
    } catch (n) {
      let i = e.registerNewError(n);
      return ht({ kind: "GenericJs", id: i });
    }
  };
}
var Oo = Fe(Jn());
var HO = Fe(Gn());
In();
gn();
kn();
c();
m();
p();
d();
f();
l();
var X = class e {
  constructor(t, r) {
    if (t.length - 1 !== r.length) {
      throw t.length === 0
        ? new TypeError("Expected at least 1 string")
        : new TypeError(
          `Expected ${t.length} strings to have ${t.length - 1} values`,
        );
    }
    let n = r.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
    this.values = new Array(n),
      this.strings = new Array(n + 1),
      this.strings[0] = t[0];
    let i = 0, o = 0;
    for (; i < r.length;) {
      let s = r[i++], a = t[i];
      if (s instanceof e) {
        this.strings[o] += s.strings[0];
        let u = 0;
        for (; u < s.values.length;) {
          this.values[o++] = s.values[u++], this.strings[o] = s.strings[u];
        }
        this.strings[o] += a;
      } else this.values[o++] = s, this.strings[o] = a;
    }
  }
  get sql() {
    let t = this.strings.length, r = 1, n = this.strings[0];
    for (; r < t;) n += `?${this.strings[r++]}`;
    return n;
  }
  get statement() {
    let t = this.strings.length, r = 1, n = this.strings[0];
    for (; r < t;) n += `:${r}${this.strings[r++]}`;
    return n;
  }
  get text() {
    let t = this.strings.length, r = 1, n = this.strings[0];
    for (; r < t;) n += `$${r}${this.strings[r++]}`;
    return n;
  }
  inspect() {
    return {
      sql: this.sql,
      statement: this.statement,
      text: this.text,
      values: this.values,
    };
  }
};
function Wn(e, t = ",", r = "", n = "") {
  if (e.length === 0) {
    throw new TypeError(
      "Expected `join([])` to be called with an array of multiple elements, but got an empty array",
    );
  }
  return new X([r, ...Array(e.length - 1).fill(t), n], e);
}
function Dr(e) {
  return new X([e], []);
}
var Kn = Dr("");
function Fr(e, ...t) {
  return new X(e, t);
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function yt(e) {
  return {
    getKeys() {
      return Object.keys(e);
    },
    getPropertyValue(t) {
      return e[t];
    },
  };
}
c();
m();
p();
d();
f();
l();
function H(e, t) {
  return {
    getKeys() {
      return [e];
    },
    getPropertyValue() {
      return t();
    },
  };
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var pe = class {
  constructor() {
    this._map = new Map();
  }
  get(t) {
    return this._map.get(t)?.value;
  }
  set(t, r) {
    this._map.set(t, { value: r });
  }
  getOrCreate(t, r) {
    let n = this._map.get(t);
    if (n) return n.value;
    let i = r();
    return this.set(t, i), i;
  }
};
function Ie(e) {
  let t = new pe();
  return {
    getKeys() {
      return e.getKeys();
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r));
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r);
    },
  };
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var $t = { enumerable: !0, configurable: !0, writable: !0 };
function jt(e) {
  let t = new Set(e);
  return {
    getOwnPropertyDescriptor: () => $t,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  };
}
var Hn = Symbol.for("nodejs.util.inspect.custom");
function de(e, t) {
  let r = Es(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      },
      has(o, s) {
        if (n.has(s)) return !0;
        let a = r.get(s);
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
      },
      ownKeys(o) {
        let s = zn(Reflect.ownKeys(o), r), a = zn(Array.from(r.keys()), r);
        return [...new Set([...s, ...a, ...n])];
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a));
      },
      getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let u = r.get(s);
        return u
          ? u.getPropertyDescriptor
            ? { ...$t, ...u?.getPropertyDescriptor(s) }
            : $t
          : a;
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      },
    });
  return i[Hn] = function () {
    let o = { ...this };
    return delete o[Hn], o;
  },
    i;
}
function Es(e) {
  let t = new Map();
  for (let r of e) {
    let n = r.getKeys();
    for (let i of n) t.set(i, r);
  }
  return t;
}
function zn(e, t) {
  return e.filter((r) => t.get(r)?.has?.(r) ?? !0);
}
c();
m();
p();
d();
f();
l();
function $e(e) {
  return {
    getKeys() {
      return e;
    },
    has() {
      return !1;
    },
    getPropertyValue() {},
  };
}
c();
m();
p();
d();
f();
l();
function Qt(e, t) {
  return {
    batch: e,
    transaction: t?.kind === "batch"
      ? { isolationLevel: t.options.isolationLevel }
      : void 0,
  };
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var je = class {
  constructor(t = 0, r) {
    this.context = r;
    this.lines = [];
    this.currentLine = "";
    this.currentIndent = 0;
    this.currentIndent = t;
  }
  write(t) {
    return typeof t == "string" ? this.currentLine += t : t.write(this), this;
  }
  writeJoined(t, r, n = (i, o) => o.write(i)) {
    let i = r.length - 1;
    for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
    return this;
  }
  writeLine(t) {
    return this.write(t).newLine();
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()),
      this.currentLine = "",
      this.marginSymbol = void 0;
    let t = this.afterNextNewLineCallback;
    return this.afterNextNewLineCallback = void 0, t?.(), this;
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this;
  }
  afterNextNewline(t) {
    return this.afterNextNewLineCallback = t, this;
  }
  indent() {
    return this.currentIndent++, this;
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this;
  }
  addMarginSymbol(t) {
    return this.marginSymbol = t, this;
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`);
  }
  getCurrentLineLength() {
    return this.currentLine.length;
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(
      this.currentLine.length + 2 * this.currentIndent,
    );
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
  }
};
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function Yn(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1);
}
c();
m();
p();
d();
f();
l();
function Qe(e) {
  return e instanceof Date ||
    Object.prototype.toString.call(e) === "[object Date]";
}
function Jt(e) {
  return e.toString() !== "Invalid Date";
}
c();
m();
p();
d();
f();
l();
l();
function Je(e) {
  return v.isDecimal(e)
    ? !0
    : e !== null && typeof e == "object" && typeof e.s == "number" &&
      typeof e.e == "number" && typeof e.toFixed == "function" &&
      Array.isArray(e.d);
}
c();
m();
p();
d();
f();
l();
var bt = class {
  constructor(t, r, n, i, o) {
    this.modelName = t,
      this.name = r,
      this.typeName = n,
      this.isList = i,
      this.isEnum = o;
  }
  _toGraphQLInputType() {
    let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
    return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
  }
};
function Ge(e) {
  return e instanceof bt;
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Gt = class {
  constructor(t) {
    this.value = t;
  }
  write(t) {
    t.write(this.value);
  }
  markAsError() {
    this.value.markAsError();
  }
};
c();
m();
p();
d();
f();
l();
var Wt = (e) => e,
  Kt = { bold: Wt, red: Wt, green: Wt, dim: Wt, enabled: !1 },
  Xn = { bold: _t, red: qe, green: xn, dim: Dt, enabled: !0 },
  We = {
    write(e) {
      e.writeLine(",");
    },
  };
c();
m();
p();
d();
f();
l();
var fe = class {
  constructor(t) {
    this.contents = t;
    this.isUnderlined = !1;
    this.color = (t) => t;
  }
  underline() {
    return this.isUnderlined = !0, this;
  }
  setColor(t) {
    return this.color = t, this;
  }
  write(t) {
    let r = t.getCurrentLineLength();
    t.write(this.color(this.contents)),
      this.isUnderlined && t.afterNextNewline(() => {
        t.write(" ".repeat(r)).writeLine(
          this.color("~".repeat(this.contents.length)),
        );
      });
  }
};
c();
m();
p();
d();
f();
l();
var ve = class {
  constructor() {
    this.hasError = !1;
  }
  markAsError() {
    return this.hasError = !0, this;
  }
};
var Ke = class extends ve {
  constructor() {
    super(...arguments);
    this.items = [];
  }
  addItem(r) {
    return this.items.push(new Gt(r)), this;
  }
  getField(r) {
    return this.items[r];
  }
  getPrintWidth() {
    return this.items.length === 0
      ? 2
      : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
  }
  write(r) {
    if (this.items.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithItems(r);
  }
  writeEmpty(r) {
    let n = new fe("[]");
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithItems(r) {
    let { colors: n } = r.context;
    r.writeLine("[").withIndent(() => r.writeJoined(We, this.items).newLine())
      .write("]"),
      this.hasError && r.afterNextNewline(() => {
        r.writeLine(n.red("~".repeat(this.getPrintWidth())));
      });
  }
  asObject() {}
};
c();
m();
p();
d();
f();
l();
var Zn = ": ",
  Ht = class {
    constructor(t, r) {
      this.name = t;
      this.value = r;
      this.hasError = !1;
    }
    markAsError() {
      this.hasError = !0;
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + Zn.length;
    }
    write(t) {
      let r = new fe(this.name);
      this.hasError && r.underline().setColor(t.context.colors.red),
        t.write(r).write(Zn).write(this.value);
    }
  };
c();
m();
p();
d();
f();
l();
var He = class e extends ve {
  constructor() {
    super(...arguments);
    this.fields = {};
    this.suggestions = [];
  }
  addField(r) {
    this.fields[r.name] = r;
  }
  addSuggestion(r) {
    this.suggestions.push(r);
  }
  getField(r) {
    return this.fields[r];
  }
  getDeepField(r) {
    let [n, ...i] = r, o = this.getField(n);
    if (!o) return;
    let s = o;
    for (let a of i) {
      let u;
      if (
        s.value instanceof e
          ? u = s.value.getField(a)
          : s.value instanceof Ke && (u = s.value.getField(Number(a))), !u
      ) return;
      s = u;
    }
    return s;
  }
  getDeepFieldValue(r) {
    return r.length === 0 ? this : this.getDeepField(r)?.value;
  }
  hasField(r) {
    return !!this.getField(r);
  }
  removeAllFields() {
    this.fields = {};
  }
  removeField(r) {
    delete this.fields[r];
  }
  getFields() {
    return this.fields;
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0;
  }
  getFieldValue(r) {
    return this.getField(r)?.value;
  }
  getDeepSubSelectionValue(r) {
    let n = this;
    for (let i of r) {
      if (!(n instanceof e)) return;
      let o = n.getSubSelectionValue(i);
      if (!o) return;
      n = o;
    }
    return n;
  }
  getDeepSelectionParent(r) {
    let n = this.getSelectionParent();
    if (!n) return;
    let i = n;
    for (let o of r) {
      let s = i.value.getFieldValue(o);
      if (!s || !(s instanceof e)) return;
      let a = s.getSelectionParent();
      if (!a) return;
      i = a;
    }
    return i;
  }
  getSelectionParent() {
    let r = this.getField("select")?.value.asObject();
    if (r) return { kind: "select", value: r };
    let n = this.getField("include")?.value.asObject();
    if (n) return { kind: "include", value: n };
  }
  getSubSelectionValue(r) {
    return this.getSelectionParent()?.value.fields[r].value;
  }
  getPrintWidth() {
    let r = Object.values(this.fields);
    return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
  }
  write(r) {
    let n = Object.values(this.fields);
    if (n.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithContents(r, n);
  }
  asObject() {
    return this;
  }
  writeEmpty(r) {
    let n = new fe("{}");
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithContents(r, n) {
    r.writeLine("{").withIndent(() => {
      r.writeJoined(We, [...n, ...this.suggestions]).newLine();
    }),
      r.write("}"),
      this.hasError && r.afterNextNewline(() => {
        r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
      });
  }
};
c();
m();
p();
d();
f();
l();
var W = class extends ve {
  constructor(r) {
    super();
    this.text = r;
  }
  getPrintWidth() {
    return this.text.length;
  }
  write(r) {
    let n = new fe(this.text);
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
  }
  asObject() {}
};
var Nr = class {
  constructor(t) {
    this.errorMessages = [];
    this.arguments = t;
  }
  write(t) {
    t.write(this.arguments);
  }
  addErrorMessage(t) {
    this.errorMessages.push(t);
  }
  renderAllMessages(t) {
    return this.errorMessages.map((r) => r(t)).join(`
`);
  }
};
function ze(e) {
  return new Nr(ei(e));
}
function ei(e) {
  let t = new He();
  for (let [r, n] of Object.entries(e)) {
    let i = new Ht(r, ti(n));
    t.addField(i);
  }
  return t;
}
function ti(e) {
  if (typeof e == "string") return new W(JSON.stringify(e));
  if (typeof e == "number" || typeof e == "boolean") return new W(String(e));
  if (typeof e == "bigint") return new W(`${e}n`);
  if (e === null) return new W("null");
  if (e === void 0) return new W("undefined");
  if (Je(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`);
  if (e instanceof Uint8Array) {
    return b.isBuffer(e)
      ? new W(`Buffer.alloc(${e.byteLength})`)
      : new W(`new Uint8Array(${e.byteLength})`);
  }
  if (e instanceof Date) {
    let t = Jt(e) ? e.toISOString() : "Invalid Date";
    return new W(`new Date("${t}")`);
  }
  return e instanceof xe
    ? new W(`Prisma.${e._getName()}`)
    : Ge(e)
    ? new W(`prisma.${Yn(e.modelName)}.$fields.${e.name}`)
    : Array.isArray(e)
    ? Ps(e)
    : typeof e == "object"
    ? ei(e)
    : new W(Object.prototype.toString.call(e));
}
function Ps(e) {
  let t = new Ke();
  for (let r of e) t.addItem(ti(r));
  return t;
}
function zt(e, t) {
  let r = t === "pretty" ? Xn : Kt,
    n = e.renderAllMessages(r),
    i = new je(0, { colors: r }).write(e).toString();
  return { message: n, args: i };
}
function ri(e) {
  if (e === void 0) return "";
  let t = ze(e);
  return new je(0, { colors: Kt }).write(t).toString();
}
c();
m();
p();
d();
f();
l();
var vs = "P2037";
function Yt({ error: e, user_facing_error: t }, r, n) {
  return t.error_code
    ? new J(Ts(t, n), {
      code: t.error_code,
      clientVersion: r,
      meta: t.meta,
      batchRequestIdx: t.batch_request_idx,
    })
    : new G(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
}
function Ts(e, t) {
  let r = e.message;
  return (t === "postgresql" || t === "postgres" || t === "mysql") &&
    e.error_code === vs && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`),
    r;
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Ur = class {
  getLocation() {
    return null;
  }
};
function Te(e) {
  return typeof $EnabledCallSite == "function" && e !== "minimal"
    ? new $EnabledCallSite()
    : new Ur();
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var ni = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 };
function Ye(e = {}) {
  let t = Rs(e);
  return Object.entries(t).reduce(
    (
      n,
      [i, o],
    ) => (ni[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n),
    { select: {} },
  );
}
function Rs(e = {}) {
  return typeof e._count == "boolean"
    ? { ...e, _count: { _all: e._count } }
    : e;
}
function Xt(e = {}) {
  return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
}
function ii(e, t) {
  let r = Xt(e);
  return t({ action: "aggregate", unpacker: r, argsMapper: Ye })(e);
}
c();
m();
p();
d();
f();
l();
function As(e = {}) {
  let { select: t, ...r } = e;
  return typeof t == "object"
    ? Ye({ ...r, _count: t })
    : Ye({ ...r, _count: { _all: !0 } });
}
function Ss(e = {}) {
  return typeof e.select == "object"
    ? (t) => Xt(e)(t)._count
    : (t) => Xt(e)(t)._count._all;
}
function oi(e, t) {
  return t({ action: "count", unpacker: Ss(e), argsMapper: As })(e);
}
c();
m();
p();
d();
f();
l();
function Os(e = {}) {
  let t = Ye(e);
  if (Array.isArray(t.by)) {
    for (let r of t.by) typeof r == "string" && (t.select[r] = !0);
  } else typeof t.by == "string" && (t.select[t.by] = !0);
  return t;
}
function ks(e = {}) {
  return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
    r._count = r._count._all;
  }),
    t);
}
function si(e, t) {
  return t({ action: "groupBy", unpacker: ks(e), argsMapper: Os })(e);
}
function ai(e, t, r) {
  if (t === "aggregate") return (n) => ii(n, r);
  if (t === "count") return (n) => oi(n, r);
  if (t === "groupBy") return (n) => si(n, r);
}
c();
m();
p();
d();
f();
l();
function li(e, t) {
  let r = t.fields.filter((i) => !i.relationName), n = Ar(r, (i) => i.name);
  return new Proxy({}, {
    get(i, o) {
      if (o in i || typeof o == "symbol") return i[o];
      let s = n[o];
      if (s) return new bt(e, o, s.type, s.isList, s.kind === "enum");
    },
    ...jt(Object.keys(n)),
  });
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var ui = (e) => Array.isArray(e) ? e : e.split("."),
  qr = (e, t) => ui(t).reduce((r, n) => r && r[n], e),
  ci = (e, t, r) =>
    ui(t).reduceRight(
      (n, i, o, s) => Object.assign({}, qr(e, s.slice(0, o)), { [i]: n }),
      r,
    );
function Ms(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, "select", e];
}
function Is(e, t, r) {
  return t === void 0 ? e ?? {} : ci(t, r, e || !0);
}
function Br(e, t, r, n, i, o) {
  let a = e._runtimeDataModel.models[t].fields.reduce(
    (u, g) => ({ ...u, [g.name]: g }),
    {},
  );
  return (u) => {
    let g = Te(e._errorFormat),
      T = Ms(n, i),
      C = Is(u, o, T),
      O = r({ dataPath: T, callsite: g })(C),
      A = Ls(e, t);
    return new Proxy(O, {
      get(M, S) {
        if (!A.includes(S)) return M[S];
        let ne = [a[S].type, r, S], z = [T, C];
        return Br(e, ...ne, ...z);
      },
      ...jt([...A, ...Object.getOwnPropertyNames(O)]),
    });
  };
}
function Ls(e, t) {
  return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object")
    .map((r) => r.name);
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var _s = Fe(_n());
var Ds = {
    red: qe,
    gray: Cn,
    dim: Dt,
    bold: _t,
    underline: En,
    highlightSource: (e) => e.highlight(),
  },
  Fs = {
    red: (e) => e,
    gray: (e) => e,
    dim: (e) => e,
    bold: (e) => e,
    underline: (e) => e,
    highlightSource: (e) => e,
  };
function Ns({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
  return {
    functionName: `prisma.${t}()`,
    message: e,
    isPanic: r ?? !1,
    callArguments: n,
  };
}
function Us(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s,
) {
  let a = [""], u = t ? " in" : ":";
  if (
    n
      ? (a.push(
        s.red(
          `Oops, an unknown error occurred! This is ${
            s.bold("on us")
          }, you did nothing wrong.`,
        ),
      ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`),
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)),
      t && a.push(s.underline(qs(t))),
      i
  ) {
    a.push("");
    let g = [i.toString()];
    o && (g.push(o), g.push(s.dim(")"))), a.push(g.join("")), o && a.push("");
  } else a.push(""), o && a.push(o), a.push("");
  return a.push(r),
    a.join(`
`);
}
function qs(e) {
  let t = [e.fileName];
  return e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(":");
}
function Xe(e) {
  let t = e.showColors ? Ds : Fs, r;
  return typeof $getTemplateParameters < "u"
    ? r = $getTemplateParameters(e, t)
    : r = Ns(e),
    Us(r, t);
}
function mi(e, t, r, n) {
  return e === Me.ModelAction.findFirstOrThrow ||
      e === Me.ModelAction.findUniqueOrThrow
    ? Bs(t, r, n)
    : n;
}
function Bs(e, t, r) {
  return async (n) => {
    if ("rejectOnNotFound" in n.args) {
      let o = Xe({
        originalMethod: n.clientMethod,
        callsite: n.callsite,
        message: "'rejectOnNotFound' option is not supported",
      });
      throw new j(o, { clientVersion: t });
    }
    return await r(n).catch((o) => {
      throw o instanceof J && o.code === "P2025"
        ? new we(`No ${e} found`, t)
        : o;
    });
  };
}
c();
m();
p();
d();
f();
l();
function ge(e) {
  return e.replace(/^./, (t) => t.toLowerCase());
}
var Vs = [
    "findUnique",
    "findUniqueOrThrow",
    "findFirst",
    "findFirstOrThrow",
    "create",
    "update",
    "upsert",
    "delete",
  ],
  $s = ["aggregate", "count", "groupBy"];
function Vr(e, t) {
  let r = e._extensions.getAllModelExtensions(t) ?? {},
    n = [
      js(e, t),
      Js(e, t),
      yt(r),
      H("name", () => t),
      H("$name", () => t),
      H("$parent", () => e._appliedParent),
    ];
  return de({}, n);
}
function js(e, t) {
  let r = ge(t), n = Object.keys(Me.ModelAction).concat("count");
  return {
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = i, s = (u) => e._request(u);
      s = mi(o, t, e._clientVersion, s);
      let a = (u) => (g) => {
        let T = Te(e._errorFormat);
        return e._createPrismaPromise((C) => {
          let O = {
            args: g,
            dataPath: [],
            action: o,
            model: t,
            clientMethod: `${r}.${i}`,
            jsModelName: r,
            transaction: C,
            callsite: T,
          };
          return s({ ...O, ...u });
        });
      };
      return Vs.includes(o) ? Br(e, t, a) : Qs(i) ? ai(e, i, a) : a({});
    },
  };
}
function Qs(e) {
  return $s.includes(e);
}
function Js(e, t) {
  return Ie(H("fields", () => {
    let r = e._runtimeDataModel.models[t];
    return li(t, r);
  }));
}
c();
m();
p();
d();
f();
l();
function pi(e) {
  return e.replace(/^./, (t) => t.toUpperCase());
}
var $r = Symbol();
function wt(e) {
  let t = [Gs(e), H($r, () => e), H("$parent", () => e._appliedParent)],
    r = e._extensions.getAllClientExtensions();
  return r && t.push(yt(r)), de(e, t);
}
function Gs(e) {
  let t = Object.keys(e._runtimeDataModel.models),
    r = t.map(ge),
    n = [...new Set(t.concat(r))];
  return Ie({
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = pi(i);
      if (e._runtimeDataModel.models[o] !== void 0) return Vr(e, o);
      if (e._runtimeDataModel.models[i] !== void 0) return Vr(e, i);
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 };
    },
  });
}
function di(e) {
  return e[$r] ? e[$r] : e;
}
function fi(e) {
  if (typeof e == "function") return e(this);
  if (e.client?.__AccelerateEngine) {
    let r = e.client.__AccelerateEngine;
    this._originalClient._engine = new r(
      this._originalClient._accelerateEngineConfig,
    );
  }
  let t = Object.create(this._originalClient, {
    _extensions: { value: this._extensions.append(e) },
    _appliedParent: { value: this, configurable: !0 },
    $use: { value: void 0 },
    $on: { value: void 0 },
  });
  return wt(t);
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function gi({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
  let o = i.getAllComputedFields(t);
  if (!o) return e;
  let s = [], a = [];
  for (let u of Object.values(o)) {
    if (n) {
      if (n[u.name]) continue;
      let g = u.needs.filter((T) => n[T]);
      g.length > 0 && a.push($e(g));
    } else if (r) {
      if (!r[u.name]) continue;
      let g = u.needs.filter((T) => !r[T]);
      g.length > 0 && a.push($e(g));
    }
    Ws(e, u.needs) && s.push(Ks(u, de(e, s)));
  }
  return s.length > 0 || a.length > 0 ? de(e, [...s, ...a]) : e;
}
function Ws(e, t) {
  return t.every((r) => Rr(e, r));
}
function Ks(e, t) {
  return Ie(H(e.name, () => e.compute(t)));
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function Zt(
  { visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i },
) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++) {
      t[s] = Zt({
        result: t[s],
        args: r,
        modelName: i,
        runtimeDataModel: n,
        visitor: e,
      });
    }
    return t;
  }
  let o = e(t, i, r) ?? t;
  return r.include &&
    hi({
      includeOrSelect: r.include,
      result: o,
      parentModelName: i,
      runtimeDataModel: n,
      visitor: e,
    }),
    r.select &&
    hi({
      includeOrSelect: r.select,
      result: o,
      parentModelName: i,
      runtimeDataModel: n,
      visitor: e,
    }),
    o;
}
function hi(
  {
    includeOrSelect: e,
    result: t,
    parentModelName: r,
    runtimeDataModel: n,
    visitor: i,
  },
) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null || ce(s)) continue;
    let u = n.models[r].fields.find((T) => T.name === o);
    if (!u || u.kind !== "object" || !u.relationName) continue;
    let g = typeof s == "object" ? s : {};
    t[o] = Zt({
      visitor: i,
      result: t[o],
      args: g,
      modelName: u.type,
      runtimeDataModel: n,
    });
  }
}
function yi(
  {
    result: e,
    modelName: t,
    args: r,
    extensions: n,
    runtimeDataModel: i,
    globalOmit: o,
  },
) {
  return n.isEmpty() || e == null || typeof e != "object" || !i.models[t]
    ? e
    : Zt({
      result: e,
      args: r ?? {},
      modelName: t,
      runtimeDataModel: i,
      visitor: (a, u, g) => {
        let T = ge(u);
        return gi({
          result: a,
          modelName: T,
          select: g.select,
          omit: g.select ? void 0 : { ...o?.[T], ...g.omit },
          extensions: n,
        });
      },
    });
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
l();
function bi(e) {
  if (e instanceof X) return Hs(e);
  if (Array.isArray(e)) {
    let r = [e[0]];
    for (let n = 1; n < e.length; n++) r[n] = Et(e[n]);
    return r;
  }
  let t = {};
  for (let r in e) t[r] = Et(e[r]);
  return t;
}
function Hs(e) {
  return new X(e.strings, e.values);
}
function Et(e) {
  if (typeof e != "object" || e == null || e instanceof xe || Ge(e)) return e;
  if (Je(e)) return new ue(e.toFixed());
  if (Qe(e)) return new Date(+e);
  if (ArrayBuffer.isView(e)) return e.slice(0);
  if (Array.isArray(e)) {
    let t = e.length, r;
    for (r = Array(t); t--;) r[t] = Et(e[t]);
    return r;
  }
  if (typeof e == "object") {
    let t = {};
    for (let r in e) {
      r === "__proto__"
        ? Object.defineProperty(t, r, {
          value: Et(e[r]),
          configurable: !0,
          enumerable: !0,
          writable: !0,
        })
        : t[r] = Et(e[r]);
    }
    return t;
  }
  be(e, "Unknown value");
}
function Ei(e, t, r, n = 0) {
  return e._createPrismaPromise((i) => {
    let o = t.customDataProxyFetch;
    return "transaction" in t && i !== void 0 &&
      (t.transaction?.kind === "batch" && t.transaction.lock.then(),
        t.transaction = i),
      n === r.length ? e._executeRequest(t) : r[n]({
        model: t.model,
        operation: t.model ? t.action : t.clientMethod,
        args: bi(t.args ?? {}),
        __internalParams: t,
        query: (s, a = t) => {
          let u = a.customDataProxyFetch;
          return a.customDataProxyFetch = Ti(o, u),
            a.args = s,
            Ei(e, a, r, n + 1);
        },
      });
  });
}
function xi(e, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
  if (e._extensions.isEmpty()) return e._executeRequest(t);
  let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
  return Ei(e, t, s);
}
function Pi(e) {
  return (t) => {
    let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
    return n.length ? vi(r, n, 0, e) : e(r);
  };
}
function vi(e, t, r, n) {
  if (r === t.length) return n(e);
  let i = e.customDataProxyFetch, o = e.requests[0].transaction;
  return t[r]({
    args: {
      queries: e.requests.map((s) => ({
        model: s.modelName,
        operation: s.action,
        args: s.args,
      })),
      transaction: o
        ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 }
        : void 0,
    },
    __internalParams: e,
    query(s, a = e) {
      let u = a.customDataProxyFetch;
      return a.customDataProxyFetch = Ti(i, u), vi(a, t, r + 1, n);
    },
  });
}
var wi = (e) => e;
function Ti(e = wi, t = wi) {
  return (r) => e(t(r));
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function Ri(e, t, r) {
  let n = ge(r);
  return !t.result || !(t.result.$allModels || t.result[n]) ? e : zs({
    ...e,
    ...Ci(t.name, e, t.result.$allModels),
    ...Ci(t.name, e, t.result[n]),
  });
}
function zs(e) {
  let t = new pe(),
    r = (n, i) =>
      t.getOrCreate(
        n,
        () =>
          i.has(n)
            ? [n]
            : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]),
      );
  return Be(e, (n) => ({ ...n, needs: r(n.name, new Set()) }));
}
function Ci(e, t, r) {
  return r
    ? Be(
      r,
      ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter((s) => n[s]) : [],
        compute: Ys(t, o, i),
      }),
    )
    : {};
}
function Ys(e, t, r) {
  let n = e?.[t]?.compute;
  return n ? (i) => r({ ...i, [t]: n(i) }) : r;
}
function Ai(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t)) {
    if (e[n.name]) { for (let i of n.needs) r[i] = !0; }
  }
  return r;
}
function Si(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t)) {
    if (!e[n.name]) { for (let i of n.needs) delete r[i]; }
  }
  return r;
}
var er = class {
    constructor(t, r) {
      this.extension = t;
      this.previous = r;
      this.computedFieldsCache = new pe();
      this.modelExtensionsCache = new pe();
      this.queryCallbacksCache = new pe();
      this.clientExtensions = ut(() =>
        this.extension.client
          ? {
            ...this.previous?.getAllClientExtensions(),
            ...this.extension.client,
          }
          : this.previous?.getAllClientExtensions()
      );
      this.batchCallbacks = ut(() => {
        let t = this.previous?.getAllBatchQueryCallbacks() ?? [],
          r = this.extension.query?.$__internalBatch;
        return r ? t.concat(r) : t;
      });
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(
        t,
        () => Ri(this.previous?.getAllComputedFields(t), this.extension, t),
      );
    }
    getAllClientExtensions() {
      return this.clientExtensions.get();
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        let r = ge(t);
        return !this.extension.model ||
            !(this.extension.model[r] || this.extension.model.$allModels)
          ? this.previous?.getAllModelExtensions(t)
          : {
            ...this.previous?.getAllModelExtensions(t),
            ...this.extension.model.$allModels,
            ...this.extension.model[r],
          };
      });
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
          i = [],
          o = this.extension.query;
        return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations)
          ? n
          : (o[t] !== void 0 &&
            (o[t][r] !== void 0 && i.push(o[t][r]),
              o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)),
            t !== "$none" && o.$allModels !== void 0 &&
            (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
              o.$allModels.$allOperations !== void 0 &&
              i.push(o.$allModels.$allOperations)),
            o[r] !== void 0 && i.push(o[r]),
            o.$allOperations !== void 0 && i.push(o.$allOperations),
            n.concat(i));
      });
    }
    getAllBatchQueryCallbacks() {
      return this.batchCallbacks.get();
    }
  },
  tr = class e {
    constructor(t) {
      this.head = t;
    }
    static empty() {
      return new e();
    }
    static single(t) {
      return new e(new er(t));
    }
    isEmpty() {
      return this.head === void 0;
    }
    append(t) {
      return new e(new er(t, this.head));
    }
    getAllComputedFields(t) {
      return this.head?.getAllComputedFields(t);
    }
    getAllClientExtensions() {
      return this.head?.getAllClientExtensions();
    }
    getAllModelExtensions(t) {
      return this.head?.getAllModelExtensions(t);
    }
    getAllQueryCallbacks(t, r) {
      return this.head?.getAllQueryCallbacks(t, r) ?? [];
    }
    getAllBatchQueryCallbacks() {
      return this.head?.getAllBatchQueryCallbacks() ?? [];
    }
  };
c();
m();
p();
d();
f();
l();
var Oi = ee("prisma:client"),
  ki = { Vercel: "vercel", "Netlify CI": "netlify" };
function Mi({ postinstall: e, ciName: t, clientVersion: r }) {
  if (
    Oi("checkPlatformCaching:postinstall", e),
      Oi("checkPlatformCaching:ciName", t),
      e === !0 && t && t in ki
  ) {
    let n =
      `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ki[t]}-build`;
    throw console.error(n), new L(n, r);
  }
}
c();
m();
p();
d();
f();
l();
function Ii(e, t) {
  return e
    ? e.datasources
      ? e.datasources
      : e.datasourceUrl
      ? { [t[0]]: { url: e.datasourceUrl } }
      : {}
    : {};
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Xs = "Cloudflare-Workers", Zs = "node";
function Li() {
  return typeof Netlify == "object"
    ? "netlify"
    : typeof EdgeRuntime == "string"
    ? "edge-light"
    : globalThis.navigator?.userAgent === Xs
    ? "workerd"
    : globalThis.Deno
    ? "deno"
    : globalThis.__lagon__
    ? "lagon"
    : globalThis.process?.release?.name === Zs
    ? "node"
    : globalThis.Bun
    ? "bun"
    : globalThis.fastly
    ? "fastly"
    : "unknown";
}
var ea = {
  node: "Node.js",
  workerd: "Cloudflare Workers",
  deno: "Deno and Deno Deploy",
  netlify: "Netlify Edge Functions",
  "edge-light":
    "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)",
};
function Ce() {
  let e = Li();
  return {
    id: e,
    prettyName: ea[e] || e,
    isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e),
  };
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function rr(
  { inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n },
) {
  let i, o = Object.keys(e)[0], s = e[o]?.url, a = t[o]?.url;
  if (
    o === void 0
      ? i = void 0
      : a
      ? i = a
      : s?.value
      ? i = s.value
      : s?.fromEnvVar && (i = r[s.fromEnvVar]),
      s?.fromEnvVar !== void 0 && i === void 0
  ) {
    throw Ce().id === "workerd"
      ? new L(
        `error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`,
        n,
      )
      : new L(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
  }
  if (i === void 0) {
    throw new L(
      "error: Missing URL environment variable, value, or override.",
      n,
    );
  }
  return i;
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function _i(e) {
  if (e?.kind === "itx") return e.options.id;
}
c();
m();
p();
d();
f();
l();
var jr,
  Di = {
    async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0) {
        throw new L(
          `The \`adapter\` option for \`PrismaClient\` is required in this context (${Ce().prettyName})`,
          t,
        );
      }
      if (n === void 0) {
        throw new L("WASM engine was unexpectedly `undefined`", t);
      }
      jr === void 0 && (jr = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) {
          throw new L(
            "The loaded wasm module was unexpectedly `undefined` or `null` once loaded",
            t,
          );
        }
        let a = { "./query_engine_bg.js": o },
          u = new WebAssembly.Instance(s, a);
        return o.__wbg_set_wasm(u.exports), o.QueryEngine;
      })());
      let i = await jr;
      return {
        debugPanic() {
          return Promise.reject("{}");
        },
        dmmf() {
          return Promise.resolve("{}");
        },
        version() {
          return { commit: "unknown", version: "unknown" };
        },
        QueryEngine: i,
      };
    },
  };
var ta = "P2036", he = ee("prisma:client:libraryEngine");
function ra(e) {
  return e.item_type === "query" && "query" in e;
}
function na(e) {
  return "level" in e ? e.level === "error" && e.message === "PANIC" : !1;
}
var tC = [...Tr, "native"],
  xt = class {
    constructor(t, r) {
      this.name = "LibraryEngine";
      this.libraryLoader = r ?? Di,
        this.config = t,
        this.libraryStarted = !1,
        this.logQueries = t.logQueries ?? !1,
        this.logLevel = t.logLevel ?? "error",
        this.logEmitter = t.logEmitter,
        this.datamodel = t.inlineSchema,
        t.enableDebugLogs && (this.logLevel = "debug");
      let n = Object.keys(t.overrideDatasources)[0],
        i = t.overrideDatasources[n]?.url;
      n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }),
        this.libraryInstantiationPromise = this.instantiateLibrary();
    }
    async applyPendingMigrations() {
      throw new Error(
        "Cannot call this method from this type of engine instance",
      );
    }
    async transaction(t, r, n) {
      await this.start();
      let i = JSON.stringify(r), o;
      if (t === "start") {
        let a = JSON.stringify({
          max_wait: n.maxWait,
          timeout: n.timeout,
          isolation_level: n.isolationLevel,
        });
        o = await this.engine?.startTransaction(a, i);
      } else {t === "commit"
          ? o = await this.engine?.commitTransaction(n.id, i)
          : t === "rollback" &&
            (o = await this.engine?.rollbackTransaction(n.id, i));}
      let s = this.parseEngineResponse(o);
      if (ia(s)) {
        let a = this.getExternalAdapterError(s);
        throw a ? a.error : new J(s.message, {
          code: s.error_code,
          clientVersion: this.config.clientVersion,
          meta: s.meta,
        });
      }
      return s;
    }
    async instantiateLibrary() {
      if (he("internalSetup"), this.libraryInstantiationPromise) {
        return this.libraryInstantiationPromise;
      }
      this.binaryTarget = await this.getCurrentBinaryTarget(),
        await this.loadEngine(),
        this.version();
    }
    async getCurrentBinaryTarget() {}
    parseEngineResponse(t) {
      if (!t) {
        throw new G("Response from the Engine was empty", {
          clientVersion: this.config.clientVersion,
        });
      }
      try {
        return JSON.parse(t);
      } catch {
        throw new G("Unable to JSON.parse response from engine", {
          clientVersion: this.config.clientVersion,
        });
      }
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          (this.library = await this.libraryLoader.loadLibrary(this.config),
            this.QueryEngineConstructor = this.library.QueryEngine);
        try {
          let t = new w(this), { adapter: r } = this.config;
          r && he("Using driver adapter: %O", r),
            this.engine = new this.QueryEngineConstructor({
              datamodel: this.datamodel,
              env: h.env,
              logQueries: this.config.logQueries ?? !1,
              ignoreEnvVarErrors: !0,
              datasourceOverrides: this.datasourceOverrides ?? {},
              logLevel: this.logLevel,
              configDir: this.config.cwd,
              engineProtocol: "json",
            }, (n) => {
              t.deref()?.logger(n);
            }, r);
        } catch (t) {
          let r = t, n = this.parseInitError(r.message);
          throw typeof n == "string"
            ? r
            : new L(n.message, this.config.clientVersion, n.error_code);
        }
      }
    }
    logger(t) {
      let r = this.parseEngineResponse(t);
      if (r) {
        if ("span" in r) {
          this.config.tracingHelper.createEngineSpan(r);
          return;
        }
        r.level = r?.level.toLowerCase() ?? "unknown",
          ra(r)
            ? this.logEmitter.emit("query", {
              timestamp: new Date(),
              query: r.query,
              params: r.params,
              duration: Number(r.duration_ms),
              target: r.module_path,
            })
            : (na(r),
              this.logEmitter.emit(r.level, {
                timestamp: new Date(),
                message: r.message,
                target: r.module_path,
              }));
      }
    }
    parseInitError(t) {
      try {
        return JSON.parse(t);
      } catch {}
      return t;
    }
    parseRequestError(t) {
      try {
        return JSON.parse(t);
      } catch {}
      return t;
    }
    onBeforeExit() {
      throw new Error(
        '"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.',
      );
    }
    async start() {
      if (
        await this.libraryInstantiationPromise,
          await this.libraryStoppingPromise,
          this.libraryStartingPromise
      ) {
        return he(
          `library already starting, this.libraryStarted: ${this.libraryStarted}`,
        ),
          this.libraryStartingPromise;
      }
      if (this.libraryStarted) return;
      let t = async () => {
        he("library starting");
        try {
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.connect(JSON.stringify(r)),
            this.libraryStarted = !0,
            he("library started");
        } catch (r) {
          let n = this.parseInitError(r.message);
          throw typeof n == "string"
            ? r
            : new L(n.message, this.config.clientVersion, n.error_code);
        } finally {
          this.libraryStartingPromise = void 0;
        }
      };
      return this.libraryStartingPromise = this.config.tracingHelper
        .runInChildSpan("connect", t),
        this.libraryStartingPromise;
    }
    async stop() {
      if (
        await this.libraryStartingPromise,
          await this.executingQueryPromise,
          this.libraryStoppingPromise
      ) return he("library is already stopping"), this.libraryStoppingPromise;
      if (!this.libraryStarted) return;
      let t = async () => {
        await new Promise((n) => setTimeout(n, 5)), he("library stopping");
        let r = { traceparent: this.config.tracingHelper.getTraceParent() };
        await this.engine?.disconnect(JSON.stringify(r)),
          this.libraryStarted = !1,
          this.libraryStoppingPromise = void 0,
          he("library stopped");
      };
      return this.libraryStoppingPromise = this.config.tracingHelper
        .runInChildSpan("disconnect", t),
        this.libraryStoppingPromise;
    }
    version() {
      return this.versionInfo = this.library?.version(),
        this.versionInfo?.version ?? "unknown";
    }
    debugPanic(t) {
      return this.library?.debugPanic(t);
    }
    async request(t, { traceparent: r, interactiveTransaction: n }) {
      he(`sending request, this.libraryStarted: ${this.libraryStarted}`);
      let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
      try {
        await this.start(),
          this.executingQueryPromise = this.engine?.query(o, i, n?.id),
          this.lastQuery = o;
        let s = this.parseEngineResponse(await this.executingQueryPromise);
        if (s.errors) {
          throw s.errors.length === 1
            ? this.buildQueryError(s.errors[0])
            : new G(JSON.stringify(s.errors), {
              clientVersion: this.config.clientVersion,
            });
        }
        if (this.loggerRustPanic) throw this.loggerRustPanic;
        return { data: s, elapsed: 0 };
      } catch (s) {
        if (s instanceof L) throw s;
        s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
        let a = this.parseRequestError(s.message);
        throw typeof a == "string" ? s : new G(
          `${a.message}
${a.backtrace}`,
          { clientVersion: this.config.clientVersion },
        );
      }
    }
    async requestBatch(t, { transaction: r, traceparent: n }) {
      he("requestBatch");
      let i = Qt(t, r);
      await this.start(),
        this.lastQuery = JSON.stringify(i),
        this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: n }),
          _i(r),
        );
      let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
      if (s.errors) {
        throw s.errors.length === 1
          ? this.buildQueryError(s.errors[0])
          : new G(JSON.stringify(s.errors), {
            clientVersion: this.config.clientVersion,
          });
      }
      let { batchResult: a, errors: u } = s;
      if (Array.isArray(a)) {
        return a.map((g) =>
          g.errors && g.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(g.errors[0])
            : { data: g, elapsed: 0 }
        );
      }
      throw u && u.length === 1
        ? new Error(u[0].error)
        : new Error(JSON.stringify(s));
    }
    buildQueryError(t) {
      t.user_facing_error.is_panic;
      let r = this.getExternalAdapterError(t.user_facing_error);
      return r
        ? r.error
        : Yt(t, this.config.clientVersion, this.config.activeProvider);
    }
    getExternalAdapterError(t) {
      if (t.error_code === ta && this.config.adapter) {
        let r = t.meta?.id;
        Ut(
          typeof r == "number",
          "Malformed external JS error received from the engine",
        );
        let n = this.config.adapter.errorRegistry.consumeError(r);
        return Ut(n, "External error with reported id was not registered"), n;
      }
    }
    async metrics(t) {
      await this.start();
      let r = await this.engine.metrics(JSON.stringify(t));
      return t.format === "prometheus" ? r : this.parseEngineResponse(r);
    }
  };
function ia(e) {
  return typeof e == "object" && e !== null && e.error_code !== void 0;
}
c();
m();
p();
d();
f();
l();
var Pt =
    "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started",
  nr = class {
    constructor(t) {
      this.config = t;
      this.name = "AccelerateEngine";
      this.resolveDatasourceUrl = this.config.accelerateUtils
        ?.resolveDatasourceUrl;
      this.getBatchRequestPayload = this.config.accelerateUtils
        ?.getBatchRequestPayload;
      this.prismaGraphQLToJSError = this.config.accelerateUtils
        ?.prismaGraphQLToJSError;
      this.PrismaClientUnknownRequestError = this.config.accelerateUtils
        ?.PrismaClientUnknownRequestError;
      this.PrismaClientInitializationError = this.config.accelerateUtils
        ?.PrismaClientInitializationError;
      this.PrismaClientKnownRequestError = this.config.accelerateUtils
        ?.PrismaClientKnownRequestError;
      this.debug = this.config.accelerateUtils?.debug;
      this.engineVersion = this.config.accelerateUtils?.engineVersion;
      this.clientVersion = this.config.accelerateUtils?.clientVersion;
    }
    onBeforeExit(t) {}
    async start() {}
    async stop() {}
    version(t) {
      return "unknown";
    }
    transaction(t, r, n) {
      throw new L(Pt, this.config.clientVersion);
    }
    metrics(t) {
      throw new L(Pt, this.config.clientVersion);
    }
    request(t, r) {
      throw new L(Pt, this.config.clientVersion);
    }
    requestBatch(t, r) {
      throw new L(Pt, this.config.clientVersion);
    }
    applyPendingMigrations() {
      throw new L(Pt, this.config.clientVersion);
    }
  };
function Fi({ copyEngine: e = !0 }, t) {
  let r;
  try {
    r = rr({
      inlineDatasources: t.inlineDatasources,
      overrideDatasources: t.overrideDatasources,
      env: { ...t.env, ...h.env },
      clientVersion: t.clientVersion,
    });
  } catch {}
  let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
  e && n &&
    lt(
      "recommend--no-engine",
      "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)",
    );
  let i = ot(t.generator),
    o = n || !e,
    s = !!t.adapter,
    a = i === "library",
    u = i === "binary";
  if (o && s || s && !1) {
    let g;
    throw e
      ? r?.startsWith("prisma://")
        ? g = [
          "Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.",
          "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor.",
        ]
        : g = [
          "Prisma Client was configured to use both the `adapter` and Accelerate, please chose one.",
        ]
      : g = [
        "Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.",
        "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter.",
      ],
      new j(
        g.join(`
`),
        { clientVersion: t.clientVersion },
      );
  }
  if (s) return new xt(t);
  if (o) return new nr(t);
  {
    let g = [
      `PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ce().prettyName}).`,
      "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:",
      "- Enable Driver Adapters: https://pris.ly/d/driver-adapters",
      "- Enable Accelerate: https://pris.ly/d/accelerate",
    ];
    throw new j(
      g.join(`
`),
      { clientVersion: t.clientVersion },
    );
  }
  throw new j("Invalid client engine type, please use `library` or `binary`", {
    clientVersion: t.clientVersion,
  });
}
c();
m();
p();
d();
f();
l();
function ir({ generator: e }) {
  return e?.previewFeatures ?? [];
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
function Ze(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1);
}
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var $i = Fe(Qr());
c();
m();
p();
d();
f();
l();
function Bi(e, t, r) {
  let n = Vi(e), i = oa(n), o = aa(i);
  o ? or(o, t, r) : t.addErrorMessage(() => "Unknown error");
}
function Vi(e) {
  return e.errors.flatMap((t) => t.kind === "Union" ? Vi(t) : [t]);
}
function oa(e) {
  let t = new Map(), r = [];
  for (let n of e) {
    if (n.kind !== "InvalidArgumentType") {
      r.push(n);
      continue;
    }
    let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`,
      o = t.get(i);
    o
      ? t.set(i, {
        ...n,
        argument: {
          ...n.argument,
          typeNames: sa(o.argument.typeNames, n.argument.typeNames),
        },
      })
      : t.set(i, n);
  }
  return r.push(...t.values()), r;
}
function sa(e, t) {
  return [...new Set(e.concat(t))];
}
function aa(e) {
  return Sr(e, (t, r) => {
    let n = Ui(t), i = Ui(r);
    return n !== i ? n - i : qi(t) - qi(r);
  });
}
function Ui(e) {
  let t = 0;
  return Array.isArray(e.selectionPath) && (t += e.selectionPath.length),
    Array.isArray(e.argumentPath) && (t += e.argumentPath.length),
    t;
}
function qi(e) {
  switch (e.kind) {
    case "InvalidArgumentValue":
    case "ValueTooLarge":
      return 20;
    case "InvalidArgumentType":
      return 10;
    case "RequiredArgumentMissing":
      return -10;
    default:
      return 0;
  }
}
c();
m();
p();
d();
f();
l();
var te = class {
  constructor(t, r) {
    this.name = t;
    this.value = r;
    this.isRequired = !1;
  }
  makeRequired() {
    return this.isRequired = !0, this;
  }
  write(t) {
    let { colors: { green: r } } = t.context;
    t.addMarginSymbol(r(this.isRequired ? "+" : "?")),
      t.write(r(this.name)),
      this.isRequired || t.write(r("?")),
      t.write(r(": ")),
      typeof this.value == "string"
        ? t.write(r(this.value))
        : t.write(this.value);
  }
};
c();
m();
p();
d();
f();
l();
var vt = class {
  constructor() {
    this.fields = [];
  }
  addField(t, r) {
    return this.fields.push({
      write(n) {
        let { green: i, dim: o } = n.context.colors;
        n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
      },
    }),
      this;
  }
  write(t) {
    let { colors: { green: r } } = t.context;
    t.writeLine(r("{")).withIndent(() => {
      t.writeJoined(We, this.fields).newLine();
    }).write(r("}")).addMarginSymbol(r("+"));
  }
};
function or(e, t, r) {
  switch (e.kind) {
    case "MutuallyExclusiveFields":
      la(e, t);
      break;
    case "IncludeOnScalar":
      ua(e, t);
      break;
    case "EmptySelection":
      ca(e, t, r);
      break;
    case "UnknownSelectionField":
      fa(e, t);
      break;
    case "InvalidSelectionValue":
      ga(e, t);
      break;
    case "UnknownArgument":
      ha(e, t);
      break;
    case "UnknownInputField":
      ya(e, t);
      break;
    case "RequiredArgumentMissing":
      ba(e, t);
      break;
    case "InvalidArgumentType":
      wa(e, t);
      break;
    case "InvalidArgumentValue":
      Ea(e, t);
      break;
    case "ValueTooLarge":
      xa(e, t);
      break;
    case "SomeFieldsMissing":
      Pa(e, t);
      break;
    case "TooManyFieldsGiven":
      va(e, t);
      break;
    case "Union":
      Bi(e, t, r);
      break;
    default:
      throw new Error("not implemented: " + e.kind);
  }
}
function la(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  r &&
  (r.getField(e.firstField)?.markAsError(),
    r.getField(e.secondField)?.markAsError()),
    t.addErrorMessage((n) =>
      `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${
        n.green(`\`${e.secondField}\``)
      }, but ${n.red("not both")} at the same time.`
    );
}
function ua(e, t) {
  let [r, n] = Tt(e.selectionPath),
    i = e.outputType,
    o = t.arguments.getDeepSelectionParent(r)?.value;
  if (o && (o.getField(n)?.markAsError(), i)) {
    for (let s of i.fields) {
      s.isRelation && o.addSuggestion(new te(s.name, "true"));
    }
  }
  t.addErrorMessage((s) => {
    let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${
      s.bold("include")
    } statement`;
    return i ? a += ` on model ${s.bold(i.name)}. ${Ct(s)}` : a += ".",
      a += `
Note that ${s.bold("include")} statements only accept relation fields.`,
      a;
  });
}
function ca(e, t, r) {
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (n) {
    let i = n.getField("omit")?.value.asObject();
    if (i) {
      ma(e, t, i);
      return;
    }
    if (n.hasField("select")) {
      pa(e, t);
      return;
    }
  }
  if (r?.[Ze(e.outputType.name)]) {
    da(e, t);
    return;
  }
  t.addErrorMessage(() =>
    `Unknown field at "${e.selectionPath.join(".")} selection"`
  );
}
function ma(e, t, r) {
  r.removeAllFields();
  for (let n of e.outputType.fields) r.addSuggestion(new te(n.name, "false"));
  t.addErrorMessage((n) =>
    `The ${n.red("omit")} statement includes every field of the model ${
      n.bold(e.outputType.name)
    }. At least one field must be included in the result`
  );
}
function pa(e, t) {
  let r = e.outputType,
    n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
    i = n?.isEmpty() ?? !1;
  n && (n.removeAllFields(), Ji(n, r)),
    t.addErrorMessage((o) =>
      i
        ? `The ${o.red("`select`")} statement for type ${
          o.bold(r.name)
        } must not be empty. ${Ct(o)}`
        : `The ${o.red("`select`")} statement for type ${
          o.bold(r.name)
        } needs ${o.bold("at least one truthy value")}.`
    );
}
function da(e, t) {
  let r = new vt();
  for (let i of e.outputType.fields) {
    i.isRelation || r.addField(i.name, "false");
  }
  let n = new te("omit", r).makeRequired();
  if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
  else {
    let [i, o] = Tt(e.selectionPath),
      a = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
    if (a) {
      let u = a?.value.asObject() ?? new He();
      u.addSuggestion(n), a.value = u;
    }
  }
  t.addErrorMessage((i) =>
    `The global ${
      i.red("omit")
    } configuration excludes every field of the model ${
      i.bold(e.outputType.name)
    }. At least one field must be included in the result`
  );
}
function fa(e, t) {
  let r = Gi(e.selectionPath, t);
  if (r.parentKind !== "unknown") {
    r.field.markAsError();
    let n = r.parent;
    switch (r.parentKind) {
      case "select":
        Ji(n, e.outputType);
        break;
      case "include":
        Ta(n, e.outputType);
        break;
      case "omit":
        Ca(n, e.outputType);
        break;
    }
  }
  t.addErrorMessage((n) => {
    let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
    return r.parentKind !== "unknown" &&
      i.push(`for ${n.bold(r.parentKind)} statement`),
      i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`),
      i.push(Ct(n)),
      i.join(" ");
  });
}
function ga(e, t) {
  let r = Gi(e.selectionPath, t);
  r.parentKind !== "unknown" && r.field.value.markAsError(),
    t.addErrorMessage((n) =>
      `Invalid value for selection field \`${
        n.red(r.fieldName)
      }\`: ${e.underlyingError}`
    );
}
function ha(e, t) {
  let r = e.argumentPath[0],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && (n.getField(r)?.markAsError(), Ra(n, e.arguments)),
    t.addErrorMessage((i) => ji(i, r, e.arguments.map((o) => o.name)));
}
function ya(e, t) {
  let [r, n] = Tt(e.argumentPath),
    i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (i) {
    i.getDeepField(e.argumentPath)?.markAsError();
    let o = i.getDeepFieldValue(r)?.asObject();
    o && Wi(o, e.inputType);
  }
  t.addErrorMessage((o) => ji(o, n, e.inputType.fields.map((s) => s.name)));
}
function ji(e, t, r) {
  let n = [`Unknown argument \`${e.red(t)}\`.`], i = Sa(t, r);
  return i && n.push(`Did you mean \`${e.green(i)}\`?`),
    r.length > 0 && n.push(Ct(e)),
    n.join(" ");
}
function ba(e, t) {
  let r;
  t.addErrorMessage((u) =>
    r?.value instanceof W && r.value.text === "null"
      ? `Argument \`${u.green(o)}\` must not be ${u.red("null")}.`
      : `Argument \`${u.green(o)}\` is missing.`
  );
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (!n) return;
  let [i, o] = Tt(e.argumentPath),
    s = new vt(),
    a = n.getDeepFieldValue(i)?.asObject();
  if (a) {
    if (
      r = a.getField(o),
        r && a.removeField(o),
        e.inputTypes.length === 1 && e.inputTypes[0].kind === "object"
    ) {
      for (let u of e.inputTypes[0].fields) {
        s.addField(u.name, u.typeNames.join(" | "));
      }
      a.addSuggestion(new te(o, s).makeRequired());
    } else {
      let u = e.inputTypes.map(Qi).join(" | ");
      a.addSuggestion(new te(o, u).makeRequired());
    }
  }
}
function Qi(e) {
  return e.kind === "list" ? `${Qi(e.elementType)}[]` : e.name;
}
function wa(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = sr("or", e.argument.typeNames.map((s) => i.green(s)));
      return `Argument \`${
        i.bold(r)
      }\`: Invalid value provided. Expected ${o}, provided ${
        i.red(e.inferredType)
      }.`;
    });
}
function Ea(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = [`Invalid value for argument \`${i.bold(r)}\``];
      if (
        e.underlyingError && o.push(`: ${e.underlyingError}`),
          o.push("."),
          e.argument.typeNames.length > 0
      ) {
        let s = sr("or", e.argument.typeNames.map((a) => i.green(a)));
        o.push(` Expected ${s}.`);
      }
      return o.join("");
    });
}
function xa(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i;
  if (n) {
    let s = n.getDeepField(e.argumentPath)?.value;
    s?.markAsError(), s instanceof W && (i = s.text);
  }
  t.addErrorMessage((o) => {
    let s = ["Unable to fit value"];
    return i && s.push(o.red(i)),
      s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
      s.join(" ");
  });
}
function Pa(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (n) {
    let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
    i && Wi(i, e.inputType);
  }
  t.addErrorMessage((i) => {
    let o = [
      `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
    ];
    return e.constraints.minFieldCount === 1
      ? e.constraints.requiredFields
        ? o.push(
          `${i.green("at least one of")} ${
            sr(
              "or",
              e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``),
            )
          } arguments.`,
        )
        : o.push(`${i.green("at least one")} argument.`)
      : o.push(
        `${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`,
      ),
      o.push(Ct(i)),
      o.join(" ");
  });
}
function va(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i = [];
  if (n) {
    let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
    o && (o.markAsError(), i = Object.keys(o.getFields()));
  }
  t.addErrorMessage((o) => {
    let s = [
      `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
    ];
    return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
      ? s.push(`${o.green("exactly one")} argument,`)
      : e.constraints.maxFieldCount == 1
      ? s.push(`${o.green("at most one")} argument,`)
      : s.push(
        `${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`,
      ),
      s.push(
        `but you provided ${sr("and", i.map((a) => o.red(a)))}. Please choose`,
      ),
      e.constraints.maxFieldCount === 1
        ? s.push("one.")
        : s.push(`${e.constraints.maxFieldCount}.`),
      s.join(" ");
  });
}
function Ji(e, t) {
  for (let r of t.fields) {
    e.hasField(r.name) || e.addSuggestion(new te(r.name, "true"));
  }
}
function Ta(e, t) {
  for (let r of t.fields) {
    r.isRelation && !e.hasField(r.name) &&
      e.addSuggestion(new te(r.name, "true"));
  }
}
function Ca(e, t) {
  for (let r of t.fields) {
    !e.hasField(r.name) && !r.isRelation &&
      e.addSuggestion(new te(r.name, "true"));
  }
}
function Ra(e, t) {
  for (let r of t) {
    e.hasField(r.name) ||
      e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
  }
}
function Gi(e, t) {
  let [r, n] = Tt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
  if (!i) return { parentKind: "unknown", fieldName: n };
  let o = i.getFieldValue("select")?.asObject(),
    s = i.getFieldValue("include")?.asObject(),
    a = i.getFieldValue("omit")?.asObject(),
    u = o?.getField(n);
  return o && u
    ? { parentKind: "select", parent: o, field: u, fieldName: n }
    : (u = s?.getField(n),
      s && u
        ? { parentKind: "include", field: u, parent: s, fieldName: n }
        : (u = a?.getField(n),
          a && u
            ? { parentKind: "omit", field: u, parent: a, fieldName: n }
            : { parentKind: "unknown", fieldName: n }));
}
function Wi(e, t) {
  if (t.kind === "object") {
    for (let r of t.fields) {
      e.hasField(r.name) ||
        e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
  }
}
function Tt(e) {
  let t = [...e], r = t.pop();
  if (!r) throw new Error("unexpected empty path");
  return [t, r];
}
function Ct({ green: e, enabled: t }) {
  return "Available options are " +
    (t ? `listed in ${e("green")}` : "marked with ?") + ".";
}
function sr(e, t) {
  if (t.length === 1) return t[0];
  let r = [...t], n = r.pop();
  return `${r.join(", ")} ${e} ${n}`;
}
var Aa = 3;
function Sa(e, t) {
  let r = 1 / 0, n;
  for (let i of t) {
    let o = (0, $i.default)(e, i);
    o > Aa || o < r && (r = o, n = i);
  }
  return n;
}
function ar(
  {
    args: e,
    errors: t,
    errorFormat: r,
    callsite: n,
    originalMethod: i,
    clientVersion: o,
    globalOmit: s,
  },
) {
  let a = ze(e);
  for (let C of t) or(C, a, s);
  let { message: u, args: g } = zt(a, r),
    T = Xe({
      message: u,
      callsite: n,
      originalMethod: i,
      showColors: r === "pretty",
      callArguments: g,
    });
  throw new j(T, { clientVersion: o });
}
var Oa = {
    findUnique: "findUnique",
    findUniqueOrThrow: "findUniqueOrThrow",
    findFirst: "findFirst",
    findFirstOrThrow: "findFirstOrThrow",
    findMany: "findMany",
    count: "aggregate",
    create: "createOne",
    createMany: "createMany",
    createManyAndReturn: "createManyAndReturn",
    update: "updateOne",
    updateMany: "updateMany",
    upsert: "upsertOne",
    delete: "deleteOne",
    deleteMany: "deleteMany",
    executeRaw: "executeRaw",
    queryRaw: "queryRaw",
    aggregate: "aggregate",
    groupBy: "groupBy",
    runCommandRaw: "runCommandRaw",
    findRaw: "findRaw",
    aggregateRaw: "aggregateRaw",
  },
  Ki = "explicitly `undefined` values are not allowed";
function Hi(
  {
    modelName: e,
    action: t,
    args: r,
    runtimeDataModel: n,
    extensions: i,
    callsite: o,
    clientMethod: s,
    errorFormat: a,
    clientVersion: u,
    previewFeatures: g,
    globalOmit: T,
  },
) {
  let C = new Jr({
    runtimeDataModel: n,
    modelName: e,
    action: t,
    rootArgs: r,
    callsite: o,
    extensions: i,
    selectionPath: [],
    argumentPath: [],
    originalMethod: s,
    errorFormat: a,
    clientVersion: u,
    previewFeatures: g,
    globalOmit: T,
  });
  return { modelName: e, action: Oa[t], query: Rt(r, C) };
}
function Rt({ select: e, include: t, ...r } = {}, n) {
  let i;
  return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit),
    { arguments: Yi(r, n), selection: ka(e, t, i, n) };
}
function ka(e, t, r, n) {
  return e
    ? (t
      ? n.throwValidationError({
        kind: "MutuallyExclusiveFields",
        firstField: "include",
        secondField: "select",
        selectionPath: n.getSelectionPath(),
      })
      : r && n.isPreviewFeatureOn("omitApi") &&
        n.throwValidationError({
          kind: "MutuallyExclusiveFields",
          firstField: "omit",
          secondField: "select",
          selectionPath: n.getSelectionPath(),
        }),
      _a(e, n))
    : Ma(n, t, r);
}
function Ma(e, t, r) {
  let n = {};
  return e.modelOrType && !e.isRawAction() &&
    (n.$composites = !0, n.$scalars = !0),
    t && Ia(n, t, e),
    e.isPreviewFeatureOn("omitApi") && La(n, r, e),
    n;
}
function Ia(e, t, r) {
  for (let [n, i] of Object.entries(t)) {
    if (ce(i)) continue;
    let o = r.nestSelection(n);
    if (Gr(i, o), i === !1 || i === void 0) {
      e[n] = !1;
      continue;
    }
    let s = r.findField(n);
    if (
      s && s.kind !== "object" &&
      r.throwValidationError({
        kind: "IncludeOnScalar",
        selectionPath: r.getSelectionPath().concat(n),
        outputType: r.getOutputTypeDescription(),
      }), s
    ) {
      e[n] = Rt(i === !0 ? {} : i, o);
      continue;
    }
    if (i === !0) {
      e[n] = !0;
      continue;
    }
    e[n] = Rt(i, o);
  }
}
function La(e, t, r) {
  let n = r.getComputedFields(),
    i = { ...r.getGlobalOmit(), ...t },
    o = Si(i, n);
  for (let [s, a] of Object.entries(o)) {
    if (ce(a)) continue;
    Gr(a, r.nestSelection(s));
    let u = r.findField(s);
    n?.[s] && !u || (e[s] = !a);
  }
}
function _a(e, t) {
  let r = {}, n = t.getComputedFields(), i = Ai(e, n);
  for (let [o, s] of Object.entries(i)) {
    if (ce(s)) continue;
    let a = t.nestSelection(o);
    Gr(s, a);
    let u = t.findField(o);
    if (!(n?.[o] && !u)) {
      if (s === !1 || s === void 0 || ce(s)) {
        r[o] = !1;
        continue;
      }
      if (s === !0) {
        u?.kind === "object" ? r[o] = Rt({}, a) : r[o] = !0;
        continue;
      }
      r[o] = Rt(s, a);
    }
  }
  return r;
}
function zi(e, t) {
  if (e === null) return null;
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") {
    return e;
  }
  if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
  if (Qe(e)) {
    if (Jt(e)) return { $type: "DateTime", value: e.toISOString() };
    t.throwValidationError({
      kind: "InvalidArgumentValue",
      selectionPath: t.getSelectionPath(),
      argumentPath: t.getArgumentPath(),
      argument: { name: t.getArgumentName(), typeNames: ["Date"] },
      underlyingError: "Provided Date object is invalid",
    });
  }
  if (Ge(e)) {
    return {
      $type: "FieldRef",
      value: { _ref: e.name, _container: e.modelName },
    };
  }
  if (Array.isArray(e)) return Da(e, t);
  if (ArrayBuffer.isView(e)) {
    return { $type: "Bytes", value: b.from(e).toString("base64") };
  }
  if (Fa(e)) return e.values;
  if (Je(e)) return { $type: "Decimal", value: e.toFixed() };
  if (e instanceof xe) {
    if (e !== Bt.instances[e._getName()]) {
      throw new Error("Invalid ObjectEnumValue");
    }
    return { $type: "Enum", value: e._getName() };
  }
  if (Na(e)) return e.toJSON();
  if (typeof e == "object") return Yi(e, t);
  t.throwValidationError({
    kind: "InvalidArgumentValue",
    selectionPath: t.getSelectionPath(),
    argumentPath: t.getArgumentPath(),
    argument: { name: t.getArgumentName(), typeNames: [] },
    underlyingError: `We could not serialize ${
      Object.prototype.toString.call(e)
    } value. Serialize the object to JSON or implement a ".toJSON()" method on it`,
  });
}
function Yi(e, t) {
  if (e.$type) return { $type: "Raw", value: e };
  let r = {};
  for (let n in e) {
    let i = e[n], o = t.nestArgument(n);
    ce(i) ||
      (i !== void 0
        ? r[n] = zi(i, o)
        : t.isPreviewFeatureOn("strictUndefinedChecks") &&
          t.throwValidationError({
            kind: "InvalidArgumentValue",
            argumentPath: o.getArgumentPath(),
            selectionPath: t.getSelectionPath(),
            argument: { name: t.getArgumentName(), typeNames: [] },
            underlyingError: Ki,
          }));
  }
  return r;
}
function Da(e, t) {
  let r = [];
  for (let n = 0; n < e.length; n++) {
    let i = t.nestArgument(String(n)), o = e[n];
    if (o === void 0 || ce(o)) {
      let s = o === void 0 ? "undefined" : "Prisma.skip";
      t.throwValidationError({
        kind: "InvalidArgumentValue",
        selectionPath: i.getSelectionPath(),
        argumentPath: i.getArgumentPath(),
        argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] },
        underlyingError:
          `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values`,
      });
    }
    r.push(zi(o, i));
  }
  return r;
}
function Fa(e) {
  return typeof e == "object" && e !== null && e.__prismaRawParameters__ === !0;
}
function Na(e) {
  return typeof e == "object" && e !== null && typeof e.toJSON == "function";
}
function Gr(e, t) {
  e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") &&
    t.throwValidationError({
      kind: "InvalidSelectionValue",
      selectionPath: t.getSelectionPath(),
      underlyingError: Ki,
    });
}
var Jr = class e {
  constructor(t) {
    this.params = t;
    this.params.modelName &&
      (this.modelOrType =
        this.params.runtimeDataModel.models[this.params.modelName] ??
          this.params.runtimeDataModel.types[this.params.modelName]);
  }
  throwValidationError(t) {
    ar({
      errors: [t],
      originalMethod: this.params.originalMethod,
      args: this.params.rootArgs ?? {},
      callsite: this.params.callsite,
      errorFormat: this.params.errorFormat,
      clientVersion: this.params.clientVersion,
      globalOmit: this.params.globalOmit,
    });
  }
  getSelectionPath() {
    return this.params.selectionPath;
  }
  getArgumentPath() {
    return this.params.argumentPath;
  }
  getArgumentName() {
    return this.params.argumentPath[this.params.argumentPath.length - 1];
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.modelOrType)) {
      return {
        name: this.params.modelName,
        fields: this.modelOrType.fields.map((t) => ({
          name: t.name,
          typeName: "boolean",
          isRelation: t.kind === "object",
        })),
      };
    }
  }
  isRawAction() {
    return [
      "executeRaw",
      "queryRaw",
      "runCommandRaw",
      "findRaw",
      "aggregateRaw",
    ].includes(this.params.action);
  }
  isPreviewFeatureOn(t) {
    return this.params.previewFeatures.includes(t);
  }
  getComputedFields() {
    if (this.params.modelName) {
      return this.params.extensions.getAllComputedFields(this.params.modelName);
    }
  }
  findField(t) {
    return this.modelOrType?.fields.find((r) => r.name === t);
  }
  nestSelection(t) {
    let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
    return new e({
      ...this.params,
      modelName: n,
      selectionPath: this.params.selectionPath.concat(t),
    });
  }
  getGlobalOmit() {
    return this.params.modelName && this.shouldApplyGlobalOmit()
      ? this.params.globalOmit?.[Ze(this.params.modelName)] ?? {}
      : {};
  }
  shouldApplyGlobalOmit() {
    switch (this.params.action) {
      case "findFirst":
      case "findFirstOrThrow":
      case "findUniqueOrThrow":
      case "findMany":
      case "upsert":
      case "findUnique":
      case "createManyAndReturn":
      case "create":
      case "update":
      case "delete":
        return !0;
      case "executeRaw":
      case "aggregateRaw":
      case "runCommandRaw":
      case "findRaw":
      case "createMany":
      case "deleteMany":
      case "groupBy":
      case "updateMany":
      case "count":
      case "aggregate":
      case "queryRaw":
        return !1;
      default:
        be(this.params.action, "Unknown action");
    }
  }
  nestArgument(t) {
    return new e({
      ...this.params,
      argumentPath: this.params.argumentPath.concat(t),
    });
  }
};
c();
m();
p();
d();
f();
l();
var Xi = (e) => ({ command: e });
c();
m();
p();
d();
f();
l();
c();
m();
p();
d();
f();
l();
var Zi = (e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`);
c();
m();
p();
d();
f();
l();
l();
function et(e) {
  try {
    return eo(e, "fast");
  } catch {
    return eo(e, "slow");
  }
}
function eo(e, t) {
  return JSON.stringify(e.map((r) => ro(r, t)));
}
function ro(e, t) {
  return Array.isArray(e)
    ? e.map((r) => ro(r, t))
    : typeof e == "bigint"
    ? { prisma__type: "bigint", prisma__value: e.toString() }
    : Qe(e)
    ? { prisma__type: "date", prisma__value: e.toJSON() }
    : ue.isDecimal(e)
    ? { prisma__type: "decimal", prisma__value: e.toJSON() }
    : b.isBuffer(e)
    ? { prisma__type: "bytes", prisma__value: e.toString("base64") }
    : Ua(e) || ArrayBuffer.isView(e)
    ? { prisma__type: "bytes", prisma__value: b.from(e).toString("base64") }
    : typeof e == "object" && t === "slow"
    ? no(e)
    : e;
}
function Ua(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == "object" && e !== null
    ? e[Symbol.toStringTag] === "ArrayBuffer" ||
      e[Symbol.toStringTag] === "SharedArrayBuffer"
    : !1;
}
function no(e) {
  if (typeof e != "object" || e === null) return e;
  if (typeof e.toJSON == "function") return e.toJSON();
  if (Array.isArray(e)) return e.map(to);
  let t = {};
  for (let r of Object.keys(e)) t[r] = to(e[r]);
  return t;
}
function to(e) {
  return typeof e == "bigint" ? e.toString() : no(e);
}
c();
m();
p();
d();
f();
l();
var qa = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"],
  io = qa;
var Ba = /^(\s*alter\s)/i, oo = ee("prisma:client");
function Wr(e, t, r, n) {
  if (
    !(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Ba.exec(t)
  ) {
    throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
  }
}
var Kr = ({ clientMethod: e, activeProvider: t }) => (r) => {
    let n = "", i;
    if (r instanceof gt) {
      n = r.sql, i = { values: et(r.values), __prismaRawParameters__: !0 };
    } else if (Array.isArray(r)) {
      let [o, ...s] = r;
      n = o, i = { values: et(s || []), __prismaRawParameters__: !0 };
    } else {switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: et(r.values), __prismaRawParameters__: !0 };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: et(r.values), __prismaRawParameters__: !0 };
          break;
        }
        case "sqlserver": {
          n = Zi(r), i = { values: et(r.values), __prismaRawParameters__: !0 };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }}
    return i?.values
      ? oo(`prisma.${e}(${n}, ${i.values})`)
      : oo(`prisma.${e}(${n})`),
      { query: n, parameters: i };
  },
  so = {
    requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    },
    middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new X(t, r);
    },
  },
  ao = {
    requestArgsToMiddlewareArgs(e) {
      return [e];
    },
    middlewareArgsToRequestArgs(e) {
      return e[0];
    },
  };
c();
m();
p();
d();
f();
l();
function Hr(e) {
  return function (r) {
    let n,
      i = (o = e) => {
        try {
          return o === void 0 || o?.kind === "itx" ? n ??= lo(r(o)) : lo(r(o));
        } catch (s) {
          return Promise.reject(s);
        }
      };
    return {
      then(o, s) {
        return i().then(o, s);
      },
      catch(o) {
        return i().catch(o);
      },
      finally(o) {
        return i().finally(o);
      },
      requestTransaction(o) {
        let s = i(o);
        return s.requestTransaction ? s.requestTransaction(o) : s;
      },
      [Symbol.toStringTag]: "PrismaPromise",
    };
  };
}
function lo(e) {
  return typeof e.then == "function" ? e : Promise.resolve(e);
}
c();
m();
p();
d();
f();
l();
var uo = {
    isEnabled() {
      return !1;
    },
    getTraceParent() {
      return "00-10-10-00";
    },
    async createEngineSpan() {},
    getActiveContext() {},
    runInChildSpan(e, t) {
      return t();
    },
  },
  zr = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t);
    }
    createEngineSpan(t) {
      return this.getGlobalTracingHelper().createEngineSpan(t);
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r);
    }
    getGlobalTracingHelper() {
      return globalThis.PRISMA_INSTRUMENTATION?.helper ?? uo;
    }
  };
function co(e) {
  return e.includes("tracing") ? new zr() : uo;
}
c();
m();
p();
d();
f();
l();
function mo(e, t = () => {}) {
  let r, n = new Promise((i) => r = i);
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n);
    },
  };
}
c();
m();
p();
d();
f();
l();
function po(e) {
  return typeof e == "string" ? e : e.reduce((t, r) => {
    let n = typeof r == "string" ? r : r.level;
    return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
  }, void 0);
}
c();
m();
p();
d();
f();
l();
var lr = class {
  constructor() {
    this._middlewares = [];
  }
  use(t) {
    this._middlewares.push(t);
  }
  get(t) {
    return this._middlewares[t];
  }
  has(t) {
    return !!this._middlewares[t];
  }
  length() {
    return this._middlewares.length;
  }
};
c();
m();
p();
d();
f();
l();
var ho = Fe(qn());
c();
m();
p();
d();
f();
l();
function ur(e) {
  return typeof e.batchRequestIdx == "number";
}
c();
m();
p();
d();
f();
l();
l();
function cr(e) {
  return e === null
    ? e
    : Array.isArray(e)
    ? e.map(cr)
    : typeof e == "object"
    ? Va(e) ? $a(e) : Be(e, cr)
    : e;
}
function Va(e) {
  return e !== null && typeof e == "object" && typeof e.$type == "string";
}
function $a({ $type: e, value: t }) {
  switch (e) {
    case "BigInt":
      return BigInt(t);
    case "Bytes":
      return b.from(t, "base64");
    case "DateTime":
      return new Date(t);
    case "Decimal":
      return new ue(t);
    case "Json":
      return JSON.parse(t);
    default:
      be(t, "Unknown tagged value");
  }
}
c();
m();
p();
d();
f();
l();
function fo(e) {
  if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
  let t = [];
  return e.modelName && t.push(e.modelName),
    e.query.arguments && t.push(Yr(e.query.arguments)),
    t.push(Yr(e.query.selection)),
    t.join("");
}
function Yr(e) {
  return `(${
    Object.keys(e).sort().map((r) => {
      let n = e[r];
      return typeof n == "object" && n !== null ? `(${r} ${Yr(n)})` : r;
    }).join(" ")
  })`;
}
c();
m();
p();
d();
f();
l();
var ja = {
  aggregate: !1,
  aggregateRaw: !1,
  createMany: !0,
  createManyAndReturn: !0,
  createOne: !0,
  deleteMany: !0,
  deleteOne: !0,
  executeRaw: !0,
  findFirst: !1,
  findFirstOrThrow: !1,
  findMany: !1,
  findRaw: !1,
  findUnique: !1,
  findUniqueOrThrow: !1,
  groupBy: !1,
  queryRaw: !1,
  runCommandRaw: !0,
  updateMany: !0,
  updateOne: !0,
  upsertOne: !0,
};
function Xr(e) {
  return ja[e];
}
c();
m();
p();
d();
f();
l();
var mr = class {
  constructor(t) {
    this.options = t;
    this.tickActive = !1;
    this.batches = {};
  }
  request(t) {
    let r = this.options.batchBy(t);
    return r
      ? (this.batches[r] ||
        (this.batches[r] = [],
          this.tickActive || (this.tickActive = !0,
            h.nextTick(() => {
              this.dispatchBatches(), this.tickActive = !1;
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        }))
      : this.options.singleLoader(t);
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t];
      delete this.batches[t],
        r.length === 1
          ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          })
          : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)),
            this.options.batchLoader(r.map((n) => n.request)).then((n) => {
              if (n instanceof Error) {
                for (let i = 0; i < r.length; i++) r[i].reject(n);
              } else {for (let i = 0; i < r.length; i++) {
                  let o = n[i];
                  o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
                }}
            }).catch((n) => {
              for (let i = 0; i < r.length; i++) r[i].reject(n);
            }));
    }
  }
  get [Symbol.toStringTag]() {
    return "DataLoader";
  }
};
c();
m();
p();
d();
f();
l();
l();
function Le(e, t) {
  if (t === null) return t;
  switch (e) {
    case "bigint":
      return BigInt(t);
    case "bytes":
      return b.from(t, "base64");
    case "decimal":
      return new ue(t);
    case "datetime":
    case "date":
      return new Date(t);
    case "time":
      return new Date(`1970-01-01T${t}Z`);
    case "bigint-array":
      return t.map((r) => Le("bigint", r));
    case "bytes-array":
      return t.map((r) => Le("bytes", r));
    case "decimal-array":
      return t.map((r) => Le("decimal", r));
    case "datetime-array":
      return t.map((r) => Le("datetime", r));
    case "date-array":
      return t.map((r) => Le("date", r));
    case "time-array":
      return t.map((r) => Le("time", r));
    default:
      return t;
  }
}
function go(e) {
  let t = [], r = Qa(e);
  for (let n = 0; n < e.rows.length; n++) {
    let i = e.rows[n], o = { ...r };
    for (let s = 0; s < i.length; s++) o[e.columns[s]] = Le(e.types[s], i[s]);
    t.push(o);
  }
  return t;
}
function Qa(e) {
  let t = {};
  for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
  return t;
}
var Ja = ee("prisma:client:request_handler"),
  pr = class {
    constructor(t, r) {
      this.logEmitter = r,
        this.client = t,
        this.dataloader = new mr({
          batchLoader: Pi(async ({ requests: n, customDataProxyFetch: i }) => {
            let { transaction: o, otelParentCtx: s } = n[0],
              a = n.map((C) => C.protocolQuery),
              u = this.client._tracingHelper.getTraceParent(s),
              g = n.some((C) => Xr(C.protocolQuery.action));
            return (await this.client._engine.requestBatch(a, {
              traceparent: u,
              transaction: Ga(o),
              containsWrite: g,
              customDataProxyFetch: i,
            })).map((C, O) => {
              if (C instanceof Error) return C;
              try {
                return this.mapQueryEngineResult(n[O], C);
              } catch (A) {
                return A;
              }
            });
          }),
          singleLoader: async (n) => {
            let i = n.transaction?.kind === "itx" ? yo(n.transaction) : void 0,
              o = await this.client._engine.request(n.protocolQuery, {
                traceparent: this.client._tracingHelper.getTraceParent(),
                interactiveTransaction: i,
                isWrite: Xr(n.protocolQuery.action),
                customDataProxyFetch: n.customDataProxyFetch,
              });
            return this.mapQueryEngineResult(n, o);
          },
          batchBy: (n) =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : fo(n.protocolQuery),
          batchOrder(n, i) {
            return n.transaction?.kind === "batch" &&
                i.transaction?.kind === "batch"
              ? n.transaction.index - i.transaction.index
              : 0;
          },
        });
    }
    async request(t) {
      try {
        return await this.dataloader.request(t);
      } catch (r) {
        let {
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
        } = t;
        this.handleAndLogRequestError({
          error: r,
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
          globalOmit: t.globalOmit,
        });
      }
    }
    mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
      let i = n?.data, o = n?.elapsed, s = this.unpack(i, t, r);
      return h.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t);
      } catch (r) {
        throw this.logEmitter &&
          this.logEmitter.emit("error", {
            message: r.message,
            target: t.clientMethod,
            timestamp: new Date(),
          }),
          r;
      }
    }
    handleRequestError(
      {
        error: t,
        clientMethod: r,
        callsite: n,
        transaction: i,
        args: o,
        modelName: s,
        globalOmit: a,
      },
    ) {
      if (Ja(t), Wa(t, i) || t instanceof we) throw t;
      if (t instanceof J && Ka(t)) {
        let g = bo(t.meta);
        ar({
          args: o,
          errors: [g],
          callsite: n,
          errorFormat: this.client._errorFormat,
          originalMethod: r,
          clientVersion: this.client._clientVersion,
          globalOmit: a,
        });
      }
      let u = t.message;
      if (
        n &&
        (u = Xe({
          callsite: n,
          originalMethod: r,
          isPanic: t.isPanic,
          showColors: this.client._errorFormat === "pretty",
          message: u,
        })),
          u = this.sanitizeMessage(u),
          t.code
      ) {
        let g = s ? { modelName: s, ...t.meta } : t.meta;
        throw new J(u, {
          code: t.code,
          clientVersion: this.client._clientVersion,
          meta: g,
          batchRequestIdx: t.batchRequestIdx,
        });
      } else {
        if (t.isPanic) throw new Ee(u, this.client._clientVersion);
        if (t instanceof G) {
          throw new G(u, {
            clientVersion: this.client._clientVersion,
            batchRequestIdx: t.batchRequestIdx,
          });
        }
        if (t instanceof L) throw new L(u, this.client._clientVersion);
        if (t instanceof Ee) throw new Ee(u, this.client._clientVersion);
      }
      throw t.clientVersion = this.client._clientVersion, t;
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== "pretty"
        ? (0, ho.default)(t)
        : t;
    }
    unpack(t, r, n) {
      if (!t || (t.data && (t = t.data), !t)) return t;
      let i = Object.keys(t)[0],
        o = Object.values(t)[0],
        s = r.filter((g) => g !== "select" && g !== "include"),
        a = qr(o, s),
        u = i === "queryRaw" ? go(a) : cr(a);
      return n ? n(u) : u;
    }
    get [Symbol.toStringTag]() {
      return "RequestHandler";
    }
  };
function Ga(e) {
  if (e) {
    if (e.kind === "batch") {
      return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
    }
    if (e.kind === "itx") return { kind: "itx", options: yo(e) };
    be(e, "Unknown transaction kind");
  }
}
function yo(e) {
  return { id: e.id, payload: e.payload };
}
function Wa(e, t) {
  return ur(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
}
function Ka(e) {
  return e.code === "P2009" || e.code === "P2012";
}
function bo(e) {
  if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(bo) };
  if (Array.isArray(e.selectionPath)) {
    let [, ...t] = e.selectionPath;
    return { ...e, selectionPath: t };
  }
  return e;
}
c();
m();
p();
d();
f();
l();
var wo = "5.21.1";
var Eo = wo;
c();
m();
p();
d();
f();
l();
var Co = Fe(Qr());
c();
m();
p();
d();
f();
l();
var _ = class extends Error {
  constructor(t) {
    super(
      t + `
Read more at https://pris.ly/d/client-constructor`,
    ), this.name = "PrismaClientConstructorValidationError";
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientConstructorValidationError";
  }
};
K(_, "PrismaClientConstructorValidationError");
var xo = [
    "datasources",
    "datasourceUrl",
    "errorFormat",
    "adapter",
    "log",
    "transactionOptions",
    "omit",
    "__internal",
  ],
  Po = ["pretty", "colorless", "minimal"],
  vo = ["info", "query", "warn", "error"],
  za = {
    datasources: (e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) {
          throw new _(
            `Invalid value ${
              JSON.stringify(e)
            } for "datasources" provided to PrismaClient constructor`,
          );
        }
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = tt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new _(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`,
            );
          }
          if (typeof n != "object" || Array.isArray(n)) {
            throw new _(
              `Invalid value ${
                JSON.stringify(e)
              } for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`,
            );
          }
          if (n && typeof n == "object") {
            for (let [i, o] of Object.entries(n)) {
              if (i !== "url") {
                throw new _(
                  `Invalid value ${
                    JSON.stringify(e)
                  } for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`,
                );
              }
              if (typeof o != "string") {
                throw new _(
                  `Invalid value ${
                    JSON.stringify(o)
                  } for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`,
                );
              }
            }
          }
        }
      }
    },
    adapter: (e, t) => {
      if (e === null) return;
      if (e === void 0) {
        throw new _(
          '"adapter" property must not be undefined, use null to conditionally disable driver adapters.',
        );
      }
      if (!ir(t).includes("driverAdapters")) {
        throw new _(
          '"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.',
        );
      }
      if (ot() === "binary") {
        throw new _(
          'Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.',
        );
      }
    },
    datasourceUrl: (e) => {
      if (typeof e < "u" && typeof e != "string") {
        throw new _(
          `Invalid value ${
            JSON.stringify(e)
          } for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`,
        );
      }
    },
    errorFormat: (e) => {
      if (e) {
        if (typeof e != "string") {
          throw new _(
            `Invalid value ${
              JSON.stringify(e)
            } for "errorFormat" provided to PrismaClient constructor.`,
          );
        }
        if (!Po.includes(e)) {
          let t = tt(e, Po);
          throw new _(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`,
          );
        }
      }
    },
    log: (e) => {
      if (!e) return;
      if (!Array.isArray(e)) {
        throw new _(
          `Invalid value ${
            JSON.stringify(e)
          } for "log" provided to PrismaClient constructor.`,
        );
      }
      function t(r) {
        if (typeof r == "string" && !vo.includes(r)) {
          let n = tt(r, vo);
          throw new _(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`,
          );
        }
      }
      for (let r of e) {
        t(r);
        let n = {
          level: t,
          emit: (i) => {
            let o = ["stdout", "event"];
            if (!o.includes(i)) {
              let s = tt(i, o);
              throw new _(
                `Invalid value ${
                  JSON.stringify(i)
                } for "emit" in logLevel provided to PrismaClient constructor.${s}`,
              );
            }
          },
        };
        if (r && typeof r == "object") {
          for (let [i, o] of Object.entries(r)) {
            if (n[i]) n[i](o);
            else {throw new _(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`,
              );}
          }
        }
      }
    },
    transactionOptions: (e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) {
        throw new _(
          `Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`,
        );
      }
      let r = e.timeout;
      if (r != null && r <= 0) {
        throw new _(
          `Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`,
        );
      }
    },
    omit: (e, t) => {
      if (typeof e != "object") {
        throw new _('"omit" option is expected to be an object.');
      }
      if (e === null) throw new _('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = Xa(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let u = o.fields.find((g) => g.name === s);
          if (!u) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (u.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" &&
            r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new _(Za(e, r));
    },
    __internal: (e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") {
        throw new _(
          `Invalid value ${
            JSON.stringify(e)
          } for "__internal" to PrismaClient constructor`,
        );
      }
      for (let [r] of Object.entries(e)) {
        if (!t.includes(r)) {
          let n = tt(r, t);
          throw new _(
            `Invalid property ${
              JSON.stringify(r)
            } for "__internal" provided to PrismaClient constructor.${n}`,
          );
        }
      }
    },
  };
function Ro(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!xo.includes(r)) {
      let i = tt(r, xo);
      throw new _(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`,
      );
    }
    za[r](n, t);
  }
  if (e.datasourceUrl && e.datasources) {
    throw new _(
      'Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them',
    );
  }
}
function tt(e, t) {
  if (t.length === 0 || typeof e != "string") return "";
  let r = Ya(e, t);
  return r ? ` Did you mean "${r}"?` : "";
}
function Ya(e, t) {
  if (t.length === 0) return null;
  let r = t.map((i) => ({ value: i, distance: (0, Co.default)(e, i) }));
  r.sort((i, o) => i.distance < o.distance ? -1 : 1);
  let n = r[0];
  return n.distance < 3 ? n.value : null;
}
function Xa(e, t) {
  return To(t.models, e) ?? To(t.types, e);
}
function To(e, t) {
  let r = Object.keys(e).find((n) => Ze(n) === t);
  if (r) return e[r];
}
function Za(e, t) {
  let r = ze(e);
  for (let o of t) {
    switch (o.kind) {
      case "UnknownModel":
        r.arguments.getField(o.modelKey)?.markAsError(),
          r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
        break;
      case "UnknownField":
        r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(() =>
            `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`
          );
        break;
      case "RelationInOmit":
        r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(() =>
            'Relations are already excluded by default and can not be specified in "omit".'
          );
        break;
      case "InvalidFieldValue":
        r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(() => "Omit field option value must be a boolean.");
        break;
    }
  }
  let { message: n, args: i } = zt(r, "colorless");
  return `Error validating "omit" option:

${i}

${n}`;
}
c();
m();
p();
d();
f();
l();
function Ao(e) {
  return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
    let n = new Array(e.length),
      i = null,
      o = !1,
      s = 0,
      a = () => {
        o || (s++, s === e.length && (o = !0, i ? r(i) : t(n)));
      },
      u = (g) => {
        o || (o = !0, r(g));
      };
    for (let g = 0; g < e.length; g++) {
      e[g].then((T) => {
        n[g] = T, a();
      }, (T) => {
        if (!ur(T)) {
          u(T);
          return;
        }
        T.batchRequestIdx === g ? u(T) : (i || (i = T), a());
      });
    }
  });
}
var Re = ee("prisma:client");
typeof globalThis == "object" && (globalThis.NODE_CLIENT = !0);
var el = {
    requestArgsToMiddlewareArgs: (e) => e,
    middlewareArgsToRequestArgs: (e) => e,
  },
  tl = Symbol.for("prisma.client.transaction.id"),
  rl = {
    id: 0,
    nextId() {
      return ++this.id;
    },
  };
function ko(e) {
  class t {
    constructor(n) {
      this._originalClient = this;
      this._middlewares = new lr();
      this._createPrismaPromise = Hr();
      this.$extends = fi;
      e = n?.__internal?.configOverride?.(e) ?? e, Mi(e), n && Ro(n, e);
      let i = new Nt().on("error", () => {});
      this._extensions = tr.empty(),
        this._previewFeatures = ir(e),
        this._clientVersion = e.clientVersion ?? Eo,
        this._activeProvider = e.activeProvider,
        this._globalOmit = n?.omit,
        this._tracingHelper = co(this._previewFeatures);
      let o = {
          rootEnvPath: e.relativeEnvPaths.rootEnvPath &&
            it.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath: e.relativeEnvPaths.schemaEnvPath &&
            it.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        s;
      if (n?.adapter) {
        s = _r(n.adapter);
        let u = e.activeProvider === "postgresql"
          ? "postgres"
          : e.activeProvider;
        if (s.provider !== u) {
          throw new L(
            `The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${u}\` specified in the Prisma schema.`,
            this._clientVersion,
          );
        }
        if (n.datasources || n.datasourceUrl !== void 0) {
          throw new L(
            "Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.",
            this._clientVersion,
          );
        }
      }
      let a = e.injectableEdgeEnv?.();
      try {
        let u = n ?? {}, g = u.__internal ?? {}, T = g.debug === !0;
        T && ee.enable("prisma:client");
        let C = it.resolve(e.dirname, e.relativePath);
        fn.existsSync(C) || (C = e.dirname),
          Re("dirname", e.dirname),
          Re("relativePath", e.relativePath),
          Re("cwd", C);
        let O = g.engine || {};
        if (
          u.errorFormat
            ? this._errorFormat = u.errorFormat
            : h.env.NODE_ENV === "production"
            ? this._errorFormat = "minimal"
            : h.env.NO_COLOR
            ? this._errorFormat = "colorless"
            : this._errorFormat = "colorless",
            this._runtimeDataModel = e.runtimeDataModel,
            this._engineConfig = {
              cwd: C,
              dirname: e.dirname,
              enableDebugLogs: T,
              allowTriggerPanic: O.allowTriggerPanic,
              datamodelPath: it.join(e.dirname, e.filename ?? "schema.prisma"),
              prismaPath: O.binaryPath ?? void 0,
              engineEndpoint: O.endpoint,
              generator: e.generator,
              showColors: this._errorFormat === "pretty",
              logLevel: u.log && po(u.log),
              logQueries: u.log && !!(typeof u.log == "string"
                ? u.log === "query"
                : u.log.find((A) =>
                  typeof A == "string" ? A === "query" : A.level === "query"
                )),
              env: a?.parsed ?? {},
              flags: [],
              engineWasm: e.engineWasm,
              clientVersion: e.clientVersion,
              engineVersion: e.engineVersion,
              previewFeatures: this._previewFeatures,
              activeProvider: e.activeProvider,
              inlineSchema: e.inlineSchema,
              overrideDatasources: Ii(u, e.datasourceNames),
              inlineDatasources: e.inlineDatasources,
              inlineSchemaHash: e.inlineSchemaHash,
              tracingHelper: this._tracingHelper,
              transactionOptions: {
                maxWait: u.transactionOptions?.maxWait ?? 2e3,
                timeout: u.transactionOptions?.timeout ?? 5e3,
                isolationLevel: u.transactionOptions?.isolationLevel,
              },
              logEmitter: i,
              isBundled: e.isBundled,
              adapter: s,
            },
            this._accelerateEngineConfig = {
              ...this._engineConfig,
              accelerateUtils: {
                resolveDatasourceUrl: rr,
                getBatchRequestPayload: Qt,
                prismaGraphQLToJSError: Yt,
                PrismaClientUnknownRequestError: G,
                PrismaClientInitializationError: L,
                PrismaClientKnownRequestError: J,
                debug: ee("prisma:client:accelerateEngine"),
                engineVersion: Oo.version,
                clientVersion: e.clientVersion,
              },
            },
            Re("clientVersion", e.clientVersion),
            this._engine = Fi(e, this._engineConfig),
            this._requestHandler = new pr(this, i),
            u.log
        ) {
          for (let A of u.log) {
            let M = typeof A == "string"
              ? A
              : A.emit === "stdout"
              ? A.level
              : null;
            M && this.$on(M, (S) => {
              at.log(`${at.tags[M] ?? ""}`, S.message || S.query);
            });
          }
        }
        this._metrics = new Ve(this._engine);
      } catch (u) {
        throw u.clientVersion = this._clientVersion, u;
      }
      return this._appliedParent = wt(this);
    }
    get [Symbol.toStringTag]() {
      return "PrismaClient";
    }
    $use(n) {
      this._middlewares.use(n);
    }
    $on(n, i) {
      n === "beforeExit"
        ? this._engine.onBeforeExit(i)
        : n && this._engineConfig.logEmitter.on(n, i);
    }
    $connect() {
      try {
        return this._engine.start();
      } catch (n) {
        throw n.clientVersion = this._clientVersion, n;
      }
    }
    async $disconnect() {
      try {
        await this._engine.stop();
      } catch (n) {
        throw n.clientVersion = this._clientVersion, n;
      } finally {
        Sn();
      }
    }
    $executeRawInternal(n, i, o, s) {
      let a = this._activeProvider;
      return this._request({
        action: "executeRaw",
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Kr({ clientMethod: i, activeProvider: a }),
        callsite: Te(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      });
    }
    $executeRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          let [s, a] = So(n, i);
          return Wr(
            this._activeProvider,
            s.text,
            s.values,
            Array.isArray(n)
              ? "prisma.$executeRaw`<SQL>`"
              : "prisma.$executeRaw(sql`<SQL>`)",
          ),
            this.$executeRawInternal(o, "$executeRaw", s, a);
        }
        throw new j(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
          { clientVersion: this._clientVersion },
        );
      });
    }
    $executeRawUnsafe(n, ...i) {
      return this._createPrismaPromise(
        (o) => (Wr(
          this._activeProvider,
          n,
          i,
          "prisma.$executeRawUnsafe(<SQL>, [...values])",
        ),
          this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])),
      );
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== "mongodb") {
        throw new j(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
          { clientVersion: this._clientVersion },
        );
      }
      return this._createPrismaPromise((i) =>
        this._request({
          args: n,
          clientMethod: "$runCommandRaw",
          dataPath: [],
          action: "runCommandRaw",
          argsMapper: Xi,
          callsite: Te(this._errorFormat),
          transaction: i,
        })
      );
    }
    async $queryRawInternal(n, i, o, s) {
      let a = this._activeProvider;
      return this._request({
        action: "queryRaw",
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Kr({ clientMethod: i, activeProvider: a }),
        callsite: Te(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      });
    }
    $queryRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          return this.$queryRawInternal(o, "$queryRaw", ...So(n, i));
        }
        throw new j(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
          { clientVersion: this._clientVersion },
        );
      });
    }
    $queryRawTyped(n) {
      return this._createPrismaPromise((i) => {
        if (!this._hasPreviewFlag("typedSql")) {
          throw new j(
            "`typedSql` preview feature must be enabled in order to access $queryRawTyped API",
            { clientVersion: this._clientVersion },
          );
        }
        return this.$queryRawInternal(i, "$queryRawTyped", n);
      });
    }
    $queryRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o) =>
        this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i])
      );
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = rl.nextId(),
        s = mo(n.length),
        a = n.map((u, g) => {
          if (u?.[Symbol.toStringTag] !== "PrismaPromise") {
            throw new Error(
              "All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.",
            );
          }
          let T = i?.isolationLevel ??
              this._engineConfig.transactionOptions.isolationLevel,
            C = { kind: "batch", id: o, index: g, isolationLevel: T, lock: s };
          return u.requestTransaction?.(C) ?? u;
        });
      return Ao(a);
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: this._tracingHelper.getTraceParent() },
        s = {
          maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait,
          timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout,
          isolationLevel: i?.isolationLevel ??
            this._engineConfig.transactionOptions.isolationLevel,
        },
        a = await this._engine.transaction("start", o, s),
        u;
      try {
        let g = { kind: "itx", ...a };
        u = await n(this._createItxClient(g)),
          await this._engine.transaction("commit", o, a);
      } catch (g) {
        throw await this._engine.transaction("rollback", o, a).catch(() => {}),
          g;
      }
      return u;
    }
    _createItxClient(n) {
      return wt(
        de(di(this), [
          H("_appliedParent", () => this._appliedParent._createItxClient(n)),
          H("_createPrismaPromise", () => Hr(n)),
          H(tl, () => n.id),
          $e(io),
        ]),
      );
    }
    $transaction(n, i) {
      let o;
      typeof n == "function"
        ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1"
          ? o = () => {
            throw new Error(
              "Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.",
            );
          }
          : o = () => this._transactionWithCallback({ callback: n, options: i })
        : o = () => this._transactionWithArray({ promises: n, options: i });
      let s = { name: "transaction", attributes: { method: "$transaction" } };
      return this._tracingHelper.runInChildSpan(s, o);
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext();
      let i = n.middlewareArgsMapper ?? el,
        o = {
          args: i.requestArgsToMiddlewareArgs(n.args),
          dataPath: n.dataPath,
          runInTransaction: !!n.transaction,
          action: n.action,
          model: n.model,
        },
        s = {
          middleware: {
            name: "middleware",
            middleware: !0,
            attributes: { method: "$use" },
            active: !1,
          },
          operation: {
            name: "operation",
            attributes: {
              method: o.action,
              model: o.model,
              name: o.model ? `${o.model}.${o.action}` : o.action,
            },
          },
        },
        a = -1,
        u = async (g) => {
          let T = this._middlewares.get(++a);
          if (T) {
            return this._tracingHelper.runInChildSpan(
              s.middleware,
              (I) => T(g, (ne) => (I?.end(), u(ne))),
            );
          }
          let { runInTransaction: C, args: O, ...A } = g, M = { ...n, ...A };
          O && (M.args = i.middlewareArgsToRequestArgs(O)),
            n.transaction !== void 0 && C === !1 && delete M.transaction;
          let S = await xi(this, M);
          return M.model
            ? yi({
              result: S,
              modelName: M.model,
              args: M.args,
              extensions: this._extensions,
              runtimeDataModel: this._runtimeDataModel,
              globalOmit: this._globalOmit,
            })
            : S;
        };
      return this._tracingHelper.runInChildSpan(s.operation, () => u(o));
    }
    async _executeRequest(
      {
        args: n,
        clientMethod: i,
        dataPath: o,
        callsite: s,
        action: a,
        model: u,
        argsMapper: g,
        transaction: T,
        unpacker: C,
        otelParentCtx: O,
        customDataProxyFetch: A,
      },
    ) {
      try {
        n = g ? g(n) : n;
        let M = { name: "serialize" },
          S = this._tracingHelper.runInChildSpan(M, () =>
            Hi({
              modelName: u,
              runtimeDataModel: this._runtimeDataModel,
              action: a,
              args: n,
              clientMethod: i,
              callsite: s,
              extensions: this._extensions,
              errorFormat: this._errorFormat,
              clientVersion: this._clientVersion,
              previewFeatures: this._previewFeatures,
              globalOmit: this._globalOmit,
            }));
        return ee.enabled("prisma:client") &&
          (Re("Prisma Client call:"),
            Re(`prisma.${i}(${ri(n)})`),
            Re("Generated request:"),
            Re(
              JSON.stringify(S, null, 2) + `
`,
            )),
          T?.kind === "batch" && await T.lock,
          this._requestHandler.request({
            protocolQuery: S,
            modelName: u,
            action: a,
            clientMethod: i,
            dataPath: o,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: T,
            unpacker: C,
            otelParentCtx: O,
            otelChildCtx: this._tracingHelper.getActiveContext(),
            globalOmit: this._globalOmit,
            customDataProxyFetch: A,
          });
      } catch (M) {
        throw M.clientVersion = this._clientVersion, M;
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag("metrics")) {
        throw new j(
          "`metrics` preview feature must be enabled in order to access metrics API",
          { clientVersion: this._clientVersion },
        );
      }
      return this._metrics;
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n);
    }
    $applyPendingMigrations() {
      return this._engine.applyPendingMigrations();
    }
  }
  return t;
}
function So(e, t) {
  return nl(e) ? [new X(e, t), so] : [e, ao];
}
function nl(e) {
  return Array.isArray(e) && Array.isArray(e.raw);
}
c();
m();
p();
d();
f();
l();
var il = new Set([
  "toJSON",
  "$$typeof",
  "asymmetricMatch",
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
]);
function Mo(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r];
      if (!il.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
    },
  });
}
c();
m();
p();
d();
f();
l();
l();
0 && (module.exports = {
  Debug,
  Decimal,
  Extensions,
  MetricsClient,
  NotFoundError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  Public,
  Sql,
  defineDmmfProperty,
  empty,
  getPrismaClient,
  getRuntime,
  join,
  makeStrictEnum,
  makeTypedQueryFactory,
  objectEnumValues,
  raw,
  skip,
  sqltag,
  warnEnvConflicts,
  warnOnce,
});
//# sourceMappingURL=wasm.js.map
