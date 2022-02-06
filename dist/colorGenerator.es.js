function RfColorHelper() {
  this.colorToObject = function(color) {
    if (typeof color !== "string") {
      return color;
    }
    return this.getValueCollection(color);
  };
  const parseHex = function(hex) {
    return parseInt(hex, 16);
  };
  const toHex = function(number) {
    let hex = number.toString(16);
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    return hex.toUpperCase();
  };
  this.hexToRgb = function(color) {
    this.color = color;
    if (this.color.red !== void 0) {
      return this;
    }
    let hex = this.color.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map(function(letter) {
        return `${letter + letter}`;
      }).join("");
    }
    const red = parseHex(hex.substring(0, 2));
    const green = parseHex(hex.substring(2, 4));
    const blue = parseHex(hex.substring(4, 6));
    this.color = {
      red,
      green,
      blue
    };
    return this;
  };
  this.rgbToHex = function(color) {
    this.color = this.colorToObject(color);
    if (typeof this.color.red !== "undefined") {
      this.color = `#${toHex(this.color.red)}${toHex(this.color.green)}${toHex(this.color.blue)}`;
    } else {
      throw new Error('The rgbToHex method require a "{red: XXX, green: YYY, blue: ZZZ}" object as input value');
    }
    return this;
  };
  this.rgbToHsl = function(color) {
    this.color = this.colorToObject(color);
    const rgbArray = [
      this.color.red / 255,
      this.color.green / 255,
      this.color.blue / 255
    ];
    rgbArray.sort(function(a, b) {
      return a - b;
    });
    const min2 = rgbArray[0];
    const mid = rgbArray[1];
    const max2 = rgbArray[2];
    const light = Math.round((min2 + max2) * 100 / 2);
    if (max2 === min2 && mid === min2) {
      this.color = {
        light,
        saturation: 0,
        hue: 0
      };
      return this;
    }
    let saturation;
    if (light > 50) {
      saturation = (max2 - min2) / (2 - max2 - min2);
    } else {
      saturation = (max2 - min2) / (max2 + min2);
    }
    saturation = Math.round(saturation * 100);
    let hue;
    if (max2 === this.color.red / 255) {
      hue = (this.color.green - this.color.blue) / 255 / (max2 - min2);
    } else if (max2 === this.color.green / 255) {
      hue = 2 + (this.color.blue - this.color.red) / 255 / (max2 - min2);
    } else {
      hue = 4 + (this.color.red - this.color.green) / 255 / (max2 - min2);
    }
    if (hue < 0) {
      hue = Math.round(hue * 60) + 360;
    } else {
      hue = Math.round(hue * 60);
    }
    this.color = {
      light,
      saturation,
      hue
    };
    return this;
  };
  this.hslToRgb = function(color) {
    this.color = this.colorToObject(color);
    const light = this.color.light / 100;
    const sat = this.color.saturation / 100;
    const hue = this.color.hue / 360;
    if (this.color.saturation === 0) {
      const lightTo255 = Math.round(light * 255);
      this.color = {
        red: lightTo255,
        green: lightTo255,
        blue: lightTo255
      };
      return this;
    }
    let tempFormula;
    if (light < 0.5) {
      tempFormula = light * (1 + sat);
    } else {
      tempFormula = light + sat - light * sat;
    }
    const tempFormula2 = 2 * light - tempFormula;
    const hueToRgb = function(tempFormula3, tempFormula22, hue2) {
      if (hue2 < 0) {
        hue2 += 1;
      } else if (hue2 > 1) {
        hue2 -= 1;
      }
      if (hue2 < 1 / 6) {
        return tempFormula3 + (tempFormula22 - tempFormula3) * 6 * hue2;
      } else if (hue2 < 1 / 2) {
        return tempFormula22;
      } else if (hue2 < 2 / 3) {
        return tempFormula3 + (tempFormula22 - tempFormula3) * (2 / 3 - hue2) * 6;
      } else {
        return tempFormula3;
      }
    };
    const red = hueToRgb(tempFormula2, tempFormula, hue + 1 / 3);
    const green = hueToRgb(tempFormula2, tempFormula, hue);
    const blue = hueToRgb(tempFormula2, tempFormula, hue - 1 / 3);
    this.color = {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255)
    };
    return this;
  };
  this.hexToHsl = function(color) {
    color = this.hexToRgb(color).getValueCollection();
    color = this.rgbToHsl(color).getValueCollection();
    this.color = color;
    return this;
  };
  this.hslToHex = function(color) {
    color = this.hslToRgb(color).getValueCollection();
    color = this.rgbToHex(color).getValueCollection();
    this.color = color;
    return this;
  };
  this.getString = function(color) {
    if (color) {
      this.color = color;
    }
    if (typeof this.color === "string") {
      return this.color;
    } else if (this.color.red !== void 0) {
      return `rgb(${this.color.red},${this.color.green},${this.color.blue})`;
    } else if (this.color.hue !== void 0) {
      return `hsl(${this.color.hue},${this.color.saturation}%,${this.color.light}%)`;
    } else if (this.color.hexred !== void 0) {
      return `#${this.color.hexred}${this.color.hexgreen}${this.color.hexblue}`;
    } else {
      throw new Error('The getString method only takes Objects with the following keys : "hue, saturation, light" (with HSL values) - "hexblue, hexgreen, hexred" (with Hexadecimal RGB), "red, green, blue" (with base 256 RGB)');
    }
  };
  this.getValueCollection = function(color) {
    if (typeof color !== "undefined") {
      this.color = color;
    }
    const re = new RegExp(/^#([0-9a-f]{3}){1,2}$/i);
    if (typeof this.color === "object") {
      return this.color;
    } else if (this.color.indexOf("rgb(") > -1) {
      let colorValues = this.color.split("(")[1].split(" ");
      return {
        red: parseInt(colorValues[0]),
        green: parseInt(colorValues[1]),
        blue: parseInt(colorValues[2])
      };
    } else if (this.color.indexOf("hsl(") > -1) {
      const colorValues = this.color.split("(")[1].split(" ");
      return {
        hue: parseInt(colorValues[0]),
        saturation: parseInt(colorValues[1]),
        light: parseInt(colorValues[2])
      };
    } else if (re.test(this.color)) {
      const hex = this.color;
      return {
        hexred: hex.substring(1, 3),
        hexgreen: hex.substring(3, 5),
        hexblue: hex.substring(5, 7)
      };
    }
  };
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var check = function(it) {
  return it && it.Math == Math && it;
};
var global$p = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var objectGetOwnPropertyDescriptor = {};
var fails$9 = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$8 = fails$9;
var descriptors = !fails$8(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var fails$7 = fails$9;
var functionBindNative = !fails$7(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$2 = functionBindNative;
var call$4 = Function.prototype.call;
var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function() {
  return call$4.apply(call$4, arguments);
};
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;
var createPropertyDescriptor$2 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var bind$2 = FunctionPrototype$1.bind;
var call$3 = FunctionPrototype$1.call;
var uncurryThis$e = NATIVE_BIND$1 && bind$2.bind(call$3, call$3);
var functionUncurryThis = NATIVE_BIND$1 ? function(fn) {
  return fn && uncurryThis$e(fn);
} : function(fn) {
  return fn && function() {
    return call$3.apply(fn, arguments);
  };
};
var uncurryThis$d = functionUncurryThis;
var toString$1 = uncurryThis$d({}.toString);
var stringSlice = uncurryThis$d("".slice);
var classofRaw$1 = function(it) {
  return stringSlice(toString$1(it), 8, -1);
};
var global$o = global$p;
var uncurryThis$c = functionUncurryThis;
var fails$6 = fails$9;
var classof$3 = classofRaw$1;
var Object$4 = global$o.Object;
var split = uncurryThis$c("".split);
var indexedObject = fails$6(function() {
  return !Object$4("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$3(it) == "String" ? split(it, "") : Object$4(it);
} : Object$4;
var global$n = global$p;
var TypeError$6 = global$n.TypeError;
var requireObjectCoercible$2 = function(it) {
  if (it == void 0)
    throw TypeError$6("Can't call method on " + it);
  return it;
};
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;
var toIndexedObject$4 = function(it) {
  return IndexedObject$1(requireObjectCoercible$1(it));
};
var isCallable$b = function(argument) {
  return typeof argument == "function";
};
var isCallable$a = isCallable$b;
var isObject$6 = function(it) {
  return typeof it == "object" ? it !== null : isCallable$a(it);
};
var global$m = global$p;
var isCallable$9 = isCallable$b;
var aFunction = function(argument) {
  return isCallable$9(argument) ? argument : void 0;
};
var getBuiltIn$4 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$m[namespace]) : global$m[namespace] && global$m[namespace][method];
};
var uncurryThis$b = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$b({}.isPrototypeOf);
var getBuiltIn$3 = getBuiltIn$4;
var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";
var global$l = global$p;
var userAgent = engineUserAgent;
var process = global$l.process;
var Deno = global$l.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION = engineV8Version;
var fails$5 = fails$9;
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var global$k = global$p;
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$8 = isCallable$b;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var Object$3 = global$k.Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$2("Symbol");
  return isCallable$8($Symbol) && isPrototypeOf($Symbol.prototype, Object$3(it));
};
var global$j = global$p;
var String$2 = global$j.String;
var tryToString$1 = function(argument) {
  try {
    return String$2(argument);
  } catch (error) {
    return "Object";
  }
};
var global$i = global$p;
var isCallable$7 = isCallable$b;
var tryToString = tryToString$1;
var TypeError$5 = global$i.TypeError;
var aCallable$2 = function(argument) {
  if (isCallable$7(argument))
    return argument;
  throw TypeError$5(tryToString(argument) + " is not a function");
};
var aCallable$1 = aCallable$2;
var getMethod$1 = function(V, P) {
  var func = V[P];
  return func == null ? void 0 : aCallable$1(func);
};
var global$h = global$p;
var call$2 = functionCall;
var isCallable$6 = isCallable$b;
var isObject$5 = isObject$6;
var TypeError$4 = global$h.TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$6(fn = input.toString) && !isObject$5(val = call$2(fn, input)))
    return val;
  if (isCallable$6(fn = input.valueOf) && !isObject$5(val = call$2(fn, input)))
    return val;
  if (pref !== "string" && isCallable$6(fn = input.toString) && !isObject$5(val = call$2(fn, input)))
    return val;
  throw TypeError$4("Can't convert object to primitive value");
};
var shared$3 = { exports: {} };
var global$g = global$p;
var defineProperty = Object.defineProperty;
var setGlobal$3 = function(key, value) {
  try {
    defineProperty(global$g, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$g[key] = value;
  }
  return value;
};
var global$f = global$p;
var setGlobal$2 = setGlobal$3;
var SHARED = "__core-js_shared__";
var store$3 = global$f[SHARED] || setGlobal$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$3.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.20.3",
  mode: "global",
  copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var global$e = global$p;
var requireObjectCoercible = requireObjectCoercible$2;
var Object$2 = global$e.Object;
var toObject$2 = function(argument) {
  return Object$2(requireObjectCoercible(argument));
};
var uncurryThis$a = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty = uncurryThis$a({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};
var uncurryThis$9 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString = uncurryThis$9(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
};
var global$d = global$p;
var shared$2 = shared$3.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2("wks");
var Symbol$1 = global$d.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$4 = function(name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var global$c = global$p;
var call$1 = functionCall;
var isObject$4 = isObject$6;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$3 = wellKnownSymbol$4;
var TypeError$3 = global$c.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$3("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$4(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$4(result) || isSymbol$1(result))
      return result;
    throw TypeError$3("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$2 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$b = global$p;
var isObject$3 = isObject$6;
var document = global$b.document;
var EXISTS$1 = isObject$3(document) && isObject$3(document.createElement);
var documentCreateElement = function(it) {
  return EXISTS$1 ? document.createElement(it) : {};
};
var DESCRIPTORS$6 = descriptors;
var fails$4 = fails$9;
var createElement = documentCreateElement;
var ie8DomDefine = !DESCRIPTORS$6 && !fails$4(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$5 = descriptors;
var call = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
    }
  if (hasOwn$5(O, P))
    return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$4 = descriptors;
var fails$3 = fails$9;
var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$3(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var global$a = global$p;
var isObject$2 = isObject$6;
var String$1 = global$a.String;
var TypeError$2 = global$a.TypeError;
var anObject$2 = function(argument) {
  if (isObject$2(argument))
    return argument;
  throw TypeError$2(String$1(argument) + " is not an object");
};
var global$9 = global$p;
var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$1 = anObject$2;
var toPropertyKey = toPropertyKey$2;
var TypeError$1 = global$9.TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty2(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty3(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw TypeError$1("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$2 = descriptors;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$2 ? function(object, key, value) {
  return definePropertyModule$1.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var redefine$1 = { exports: {} };
var uncurryThis$8 = functionUncurryThis;
var isCallable$5 = isCallable$b;
var store$1 = sharedStore;
var functionToString = uncurryThis$8(Function.toString);
if (!isCallable$5(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$3 = store$1.inspectSource;
var global$8 = global$p;
var isCallable$4 = isCallable$b;
var inspectSource$2 = inspectSource$3;
var WeakMap$1 = global$8.WeakMap;
var nativeWeakMap = isCallable$4(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));
var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1("keys");
var sharedKey$1 = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$3 = {};
var NATIVE_WEAK_MAP = nativeWeakMap;
var global$7 = global$p;
var uncurryThis$7 = functionUncurryThis;
var isObject$1 = isObject$6;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$4 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError = global$7.TypeError;
var WeakMap = global$7.WeakMap;
var set, get, has;
var enforce = function(it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$7(store.get);
  var wmhas = uncurryThis$7(store.has);
  var wmset = uncurryThis$7(store.set);
  set = function(it, metadata) {
    if (wmhas(store, it))
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function(it) {
    return wmget(store, it) || {};
  };
  has = function(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey("state");
  hiddenKeys$2[STATE] = true;
  set = function(it, metadata) {
    if (hasOwn$4(it, STATE))
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function(it) {
    return hasOwn$4(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$4(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var DESCRIPTORS$1 = descriptors;
var hasOwn$3 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$3(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || DESCRIPTORS$1 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var global$6 = global$p;
var isCallable$3 = isCallable$b;
var hasOwn$2 = hasOwnProperty_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split("String");
(redefine$1.exports = function(O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== void 0 ? options.name : key;
  var state;
  if (isCallable$3(value)) {
    if (String(name).slice(0, 7) === "Symbol(") {
      name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
    }
    if (!hasOwn$2(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty$1(value, "name", name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == "string" ? name : "");
    }
  }
  if (O === global$6) {
    if (simple)
      O[key] = value;
    else
      setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple)
    O[key] = value;
  else
    createNonEnumerableProperty$1(O, key, value);
})(Function.prototype, "toString", function toString2() {
  return isCallable$3(this) && getInternalState(this).source || inspectSource$1(this);
});
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor = Math.floor;
var toIntegerOrInfinity$2 = function(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};
var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
var max = Math.max;
var min$1 = Math.min;
var toAbsoluteIndex$1 = function(index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};
var toIntegerOrInfinity = toIntegerOrInfinity$2;
var min = Math.min;
var toLength$1 = function(argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
};
var toLength = toLength$1;
var lengthOfArrayLike$2 = function(obj) {
  return toLength(obj.length);
};
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$2;
var createMethod$2 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike$1(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        if (value != value)
          return true;
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  includes: createMethod$2(true),
  indexOf: createMethod$2(false)
};
var uncurryThis$6 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;
var push$2 = uncurryThis$6([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push$2(result, key);
  while (names.length > i)
    if (hasOwn$1(O, key = names[i++])) {
      ~indexOf(result, key) || push$2(result, key);
    }
  return result;
};
var enumBugKeys$2 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$2;
var hiddenKeys = enumBugKeys$1.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$1 = getBuiltIn$4;
var uncurryThis$5 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject = anObject$2;
var concat = uncurryThis$5([].concat);
var ownKeys$1 = getBuiltIn$1("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;
var copyConstructorProperties$1 = function(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn2(target, key) && !(exceptions && hasOwn2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$2 = fails$9;
var isCallable$2 = isCallable$b;
var replacement = /#|\.prototype\./;
var isForced$1 = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$2(detection) ? fails$2(detection) : !!detection;
};
var normalize = isForced$1.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$5 = global$p;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var redefine = redefine$1.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$5;
  } else if (STATIC) {
    target = global$5[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$5[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, "sham", true);
      }
      redefine(target, key, sourceProperty, options);
    }
};
var uncurryThis$4 = functionUncurryThis;
var aCallable = aCallable$2;
var NATIVE_BIND = functionBindNative;
var bind$1 = uncurryThis$4(uncurryThis$4.bind);
var functionBindContext = function(fn, that) {
  aCallable(fn);
  return that === void 0 ? fn : NATIVE_BIND ? bind$1(fn, that) : function() {
    return fn.apply(that, arguments);
  };
};
var classof$2 = classofRaw$1;
var isArray$1 = Array.isArray || function isArray(argument) {
  return classof$2(argument) == "Array";
};
var wellKnownSymbol$2 = wellKnownSymbol$4;
var TO_STRING_TAG$1 = wellKnownSymbol$2("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var global$4 = global$p;
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$1 = isCallable$b;
var classofRaw = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$4;
var TO_STRING_TAG = wellKnownSymbol$1("toStringTag");
var Object$1 = global$4.Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$1(O.callee) ? "Arguments" : result;
};
var uncurryThis$3 = functionUncurryThis;
var fails$1 = fails$9;
var isCallable = isCallable$b;
var classof = classof$1;
var getBuiltIn = getBuiltIn$4;
var inspectSource = inspectSource$3;
var noop = function() {
};
var empty = [];
var construct = getBuiltIn("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis$3(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument))
    return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};
var isConstructorLegacy = function isConstructor2(argument) {
  if (!isCallable(argument))
    return false;
  switch (classof(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};
isConstructorLegacy.sham = true;
var isConstructor$1 = !construct || fails$1(function() {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;
var global$3 = global$p;
var isArray2 = isArray$1;
var isConstructor3 = isConstructor$1;
var isObject = isObject$6;
var wellKnownSymbol = wellKnownSymbol$4;
var SPECIES = wellKnownSymbol("species");
var Array$1 = global$3.Array;
var arraySpeciesConstructor$1 = function(originalArray) {
  var C;
  if (isArray2(originalArray)) {
    C = originalArray.constructor;
    if (isConstructor3(C) && (C === Array$1 || isArray2(C.prototype)))
      C = void 0;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null)
        C = void 0;
    }
  }
  return C === void 0 ? Array$1 : C;
};
var arraySpeciesConstructor = arraySpeciesConstructor$1;
var arraySpeciesCreate$1 = function(originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};
var bind = functionBindContext;
var uncurryThis$2 = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject = toObject$2;
var lengthOfArrayLike = lengthOfArrayLike$2;
var arraySpeciesCreate = arraySpeciesCreate$1;
var push$1 = uncurryThis$2([].push);
var createMethod$1 = function(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self2 = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self2);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : void 0;
    var value, result;
    for (; length > index; index++)
      if (NO_HOLES || index in self2) {
        value = self2[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP)
            target[index] = result;
          else if (result)
            switch (TYPE) {
              case 3:
                return true;
              case 5:
                return value;
              case 6:
                return index;
              case 2:
                push$1(target, value);
            }
          else
            switch (TYPE) {
              case 4:
                return false;
              case 7:
                push$1(target, value);
            }
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};
var arrayIteration = {
  forEach: createMethod$1(0),
  map: createMethod$1(1),
  filter: createMethod$1(2),
  some: createMethod$1(3),
  every: createMethod$1(4),
  find: createMethod$1(5),
  findIndex: createMethod$1(6),
  filterReject: createMethod$1(7)
};
var fails = fails$9;
var arrayMethodIsStrict$1 = function(METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function() {
    method.call(null, argument || function() {
      throw 1;
    }, 1);
  });
};
var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var STRICT_METHOD = arrayMethodIsStrict("forEach");
var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
} : [].forEach;
var $$1 = _export;
var forEach2 = arrayForEach;
$$1({ target: "Array", proto: true, forced: [].forEach != forEach2 }, {
  forEach: forEach2
});
var global$2 = global$p;
var uncurryThis$1 = functionUncurryThis;
var entryUnbind$1 = function(CONSTRUCTOR, METHOD) {
  return uncurryThis$1(global$2[CONSTRUCTOR].prototype[METHOD]);
};
var entryUnbind = entryUnbind$1;
entryUnbind("Array", "forEach");
var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$2;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys(O, enumBugKeys);
};
var DESCRIPTORS = descriptors;
var uncurryThis = functionUncurryThis;
var objectKeys = objectKeys$1;
var toIndexedObject = toIndexedObject$4;
var $propertyIsEnumerable = objectPropertyIsEnumerable.f;
var propertyIsEnumerable2 = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);
var createMethod = function(TO_ENTRIES) {
  return function(it) {
    var O = toIndexedObject(it);
    var keys3 = objectKeys(O);
    var length = keys3.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys3[i++];
      if (!DESCRIPTORS || propertyIsEnumerable2(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};
var objectToArray = {
  entries: createMethod(true),
  values: createMethod(false)
};
var $ = _export;
var $entries = objectToArray.entries;
$({ target: "Object", stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});
var global$1 = global$p;
var path$1 = global$1;
var path = path$1;
path.Object.entries;
const colorUtils = new RfColorHelper();
let curves = {
  linear(x) {
    return x;
  },
  easeIn(x) {
    return 1 - Math.cos(x * 3.1415 / 2);
  },
  easeInHard(x) {
    return x * x;
  },
  easeInHarder(x) {
    return x * x * x;
  },
  easeOut(x) {
    return Math.sin(x * 3.1415 / 2);
  },
  easeOutHard(x) {
    return 1 - (1 - x) * (1 - x);
  },
  easeOutHarder(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  easeInOut(x) {
    return -(Math.cos(3.1415 * x) - 1) / 2;
  },
  easeInOutHard(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  easeInOutHarder(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
};
curves = Object.entries(curves);
const fullIndex = function(array) {
  let fullCombination = [];
  for (let i = 0; i < 10; i++) {
    const offsetIndex = Math.floor(i * array.length / 10);
    fullCombination[i] = array[offsetIndex];
  }
  return fullCombination;
};
function generateColorSet(dominant) {
  this.lightVariation = 0;
  this.satVariation = 10;
  this.hsl = colorUtils.hexToHsl(dominant).getValueCollection();
  this.colorCollection = {
    dominant,
    combinationCollection: []
  };
  const self2 = this;
  const limiter = function(value, min2 = 0, max2 = 100) {
    if (value < min2) {
      return min2;
    }
    if (value > max2) {
      return max2;
    }
    return value;
  };
  const base360 = function(angle) {
    if (angle > 360) {
      return angle - 360;
    } else if (angle < 0) {
      return angle + 360;
    } else {
      return angle;
    }
  };
  const getSubValues = function(baseValue, variation, count = 10, move = 0, curveIndex = 0) {
    let outOfRange = 0;
    const halfRound = Math.round(count / 2);
    for (let i = 1; i <= 5; i++) {
      if (baseValue + (i - 1) * variation > 100) {
        outOfRange += 1;
      } else if (baseValue - i * variation < 0) {
        outOfRange -= 1;
      }
    }
    const offset = outOfRange * variation;
    const newOffset = offset + move;
    let valueCollection = [];
    for (let i = 0; i < count; i++) {
      let value;
      if (i < halfRound) {
        value = baseValue - (count / 2 - i) * variation - newOffset;
      } else {
        value = baseValue + (i - count / 2) * variation - newOffset;
      }
      value = Math.round(curves[curveIndex][1](value / 100) * 100);
      value = Math.max(value, 0);
      value = Math.min(value, 100);
      valueCollection[i] = value;
    }
    return valueCollection;
  };
  const getHueValue = function(hue, count = 10) {
    const variationAmt = self2.hueVariation;
    const curveIndex = self2.hueCurve;
    const halfCount = Math.round(count / 2);
    const hueCollection = [];
    for (let i = 0; i < count; i++) {
      let value;
      const j = curves[curveIndex][1](i / 10) * 10;
      const variation = variationAmt * j;
      if (i < halfCount) {
        value = hue - variationAmt * halfCount + variation;
      } else {
        value = hue + variationAmt * (j - halfCount);
      }
      hueCollection.push(base360(value) + self2.hueMove);
    }
    return hueCollection;
  };
  const addCombination = function(combination) {
    combination.hue = base360(combination.hue);
    const hex = colorUtils.hslToHex(combination).getString();
    const combinationCollection = self2.colorCollection.combinationCollection;
    combinationCollection.push({
      hex,
      hue: combination.hue,
      light: combination.light,
      saturation: combination.saturation
    });
    addSubCombination();
    const latestCombination = combinationCollection[combinationCollection.length - 1];
    latestCombination.textSubCombination = createTextSubCombination(latestCombination.subCombination);
  };
  const createSubCombinationArray = function(combination, gray) {
    const lightCollection = getSubValues(combination.light, self2.lightVariation, self2.count, self2.lightMove, self2.lightCurve);
    const satCollection = getSubValues(combination.saturation, self2.satVariation, self2.count, self2.satMove, self2.satCurve);
    const hueCollection = getHueValue(combination.hue, self2.count);
    let subCombination = [];
    for (let i = 0; i < self2.count; i++) {
      subCombination[i] = {
        hue: hueCollection[i] || combination.hue,
        light: lightCollection[i],
        saturation: gray ? 0 : satCollection[i],
        hex: colorUtils.hslToHex({
          hue: hueCollection[i] || combination.hue,
          light: limiter(lightCollection[i]),
          saturation: gray ? 0 : limiter(satCollection[i])
        }, gray).getString()
      };
    }
    if (self2.full) {
      return fullIndex(subCombination);
    }
    return subCombination;
  };
  const getDiff = function(offset, item, invert, param) {
    let diff = 0;
    let mid = 50;
    if (param === "light") {
      mid = 60;
    }
    if (param === "light" && item.hue >= 200 && item.hue <= 300) {
      mid = 75;
    }
    if (Math.abs(item[param] - invert[param]) > offset) {
      diff = invert[param];
    } else if (item[param] < mid) {
      diff = item[param] + offset > 100 ? 100 : item[param] + offset;
    } else {
      diff = item[param] - offset < 0 ? 0 : item[param] - offset;
    }
    return diff;
  };
  const createTextSubCombination = function(combination) {
    Math.round(combination.length / 2);
    const invert = [...combination].reverse();
    const textSub = [];
    combination.forEach((item, index) => {
      const lightDiff = getDiff(self2.textLight, item, invert[index], "light");
      const satDiff = getDiff(self2.textSaturation, item, invert[index], "saturation");
      const colorParams = { hue: invert[index].hue, saturation: satDiff, light: lightDiff };
      const hex = colorUtils.hslToHex(colorParams).getString();
      colorParams.hex = hex;
      textSub.push(colorParams);
    });
    return textSub;
  };
  const addSubCombination = function() {
    const combinationCollection = self2.colorCollection.combinationCollection;
    const lastEntry = combinationCollection[combinationCollection.length - 1];
    lastEntry.subCombination = createSubCombinationArray(lastEntry);
  };
  this.updateColor = function(newColor) {
    this.colorCollection.dominant = newColor;
    if (newColor.hue !== void 0) {
      this.hsl = newColor;
    } else {
      this.hsl = colorUtils.hexToHsl(newColor).getValueCollection();
    }
    return this;
  };
  this.combination = function() {
    const tonic = this.hsl;
    tonic.hue = this.hsl.hue + 180;
    addCombination(tonic);
    return this.colorCollection;
  };
  this.splitCombination = function() {
    const baseHue = this.hsl.hue;
    const tonic = this.hsl;
    const split2 = 30;
    tonic.hue = this.hsl.hue + (180 + split2);
    addCombination(tonic);
    tonic.hue = baseHue;
    tonic.hue = this.hsl.hue + (180 - split2);
    addCombination(tonic);
    return this.colorCollection;
  };
  this.generate = function(colors = [], {
    count = 10,
    text: { light: textLight = 50, saturation: textSaturation = 0, hue: textHue = 0 } = {},
    hue: { variation: hueVariation = 0, curve: hueCurve = 0, move: hueMove = 0 } = {},
    light: { variation: lightVariation = 5, move: lightMove = 0, curve: lightCurve = 0 } = {},
    saturation: { variation: satVariation = 0, move: satMove = 0, curve: satCurve = 0 } = {},
    full = true
  } = {}) {
    this.count = parseInt(count, 10);
    this.hueVariation = parseInt(hueVariation, 10);
    this.hueCurve = parseInt(hueCurve, 10);
    this.hueMove = parseInt(hueMove, 10);
    this.satVariation = parseInt(satVariation, 10);
    this.satMove = parseInt(satMove, 10);
    this.satCurve = parseInt(satCurve, 10);
    this.lightVariation = parseInt(lightVariation, 10);
    this.lightMove = parseInt(lightMove, 10);
    this.lightCurve = parseInt(lightCurve, 10);
    this.full = full;
    this.textLight = parseInt(textLight, 10);
    this.textSaturation = parseInt(textSaturation, 10);
    this.textHue = parseInt(textHue, 10);
    this.colorCollection.dominantSubCollection = createSubCombinationArray(this.hsl);
    this.colorCollection.dominantTextSubCollection = createTextSubCombination(this.colorCollection.dominantSubCollection);
    this.colorCollection.combinationCollection = [];
    colors.forEach((item) => {
      const saturation = item.saturation !== void 0 ? item.saturation : this.hsl.saturation;
      const light = item.light !== void 0 ? item.light : this.hsl.light;
      const combination = {
        hue: this.hsl.hue + item.hueVariation,
        saturation,
        light
      };
      addCombination(combination);
    });
    this.colorCollection.graySubCollection = createSubCombinationArray({
      hue: this.hsl.hue,
      saturation: 0,
      light: this.hsl.light
    }, true);
    this.colorCollection.grayTextSubCollection = createTextSubCombination(this.colorCollection.graySubCollection);
    const vari = (() => {
      const mult = Math.round(this.hsl.hue / 60);
      const peak = 60 * mult;
      return Math.round((this.hsl.hue - peak) / 2);
    })();
    this.colorCollection.alertSubCollection = createSubCombinationArray({
      hue: 0 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.alertTextSubCollection = createTextSubCombination(this.colorCollection.alertSubCollection);
    this.colorCollection.warningSubCollection = createSubCombinationArray({
      hue: 60 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.warningTextSubCollection = createTextSubCombination(this.colorCollection.warningSubCollection);
    this.colorCollection.successSubCollection = createSubCombinationArray({
      hue: 120 + vari * 2,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.successTextSubCollection = createTextSubCombination(this.colorCollection.successSubCollection);
    this.colorCollection.infoSubCollection = createSubCombinationArray({
      hue: 240 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.infoTextSubCollection = createTextSubCombination(this.colorCollection.infoSubCollection);
    return this.colorCollection;
  };
}
export { generateColorSet };
