(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /*!
   * Vue.js v2.6.11
   * (c) 2014-2019 Evan You
   * Released under the MIT License.
   */
  /*  */

  var emptyObject = Object.freeze({});

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive.
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array.
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }

    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */



  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "production" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "production" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /*  */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = ({}).watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      })); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  var _Set;
  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };

      return Set;
    }());
  }

  /*  */

  var warn = noop;

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }

  /*  */

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: { configurable: true } };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };

  Object.defineProperties( VNode.prototype, prototypeAccessors );

  var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
  };

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }

  /**
   * Data
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && "production" !== 'production') {
      assertObjectType(key, childVal);
    }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        "Invalid value for option \"" + name + "\": expected an Object, " +
        "but got " + (toRawType(value)) + ".");
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child);
    normalizeInject(child);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    return res
  }

  /*  */



  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        // only cast empty string / same name to boolean if
        // boolean has higher priority
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    return value
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  /*  */

  function handleError (err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while ((cur = cur.$parent)) {
          var hooks = cur.$options.errorCaptured;
          if (hooks) {
            for (var i = 0; i < hooks.length; i++) {
              try {
                var capture = hooks[i].call(cur, err, vm, info) === false;
                if (capture) { return }
              } catch (e) {
                globalHandleError(e, cur, 'errorCaptured hook');
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
        // issue #9511
        // avoid catch triggering multiple times when nested calls
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        // if the user intentionally throws the original error in the handler,
        // do not log it twice
        if (e !== err) {
          logError(e);
        }
      }
    }
    logError(err);
  }

  function logError (err, vm, info) {
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }

  /*  */

  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;

  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      // In problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  /*  */

  var seenObjects = new _Set();

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }

  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    }
  });

  function createFnInvoker (fns, vm) {
    function invoker () {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        // return handler return value for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
      }
    }
    invoker.fns = fns;
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) ; else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
        }
        add(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData (
    data,
    Ctor,
    tag
  ) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) &&
            isDef(c.tag) &&
            isUndef(c.key) &&
            isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }

  /*  */

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // #6574 in case the inject object is observed...
        if (key === '__ob__') { continue }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break
          }
          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault;
          }
        }
      }
      return result
    }
  }

  /*  */



  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }

  /*  */

  function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
  ) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      // fast path 1: child component re-render only, parent did not change
      return slots._normalized
    } else if (
      isStable &&
      prevSlots &&
      prevSlots !== emptyObject &&
      key === prevSlots.$key &&
      !hasNormalSlots &&
      !prevSlots.$hasNormal
    ) {
      // fast path 2: stable scoped slots w/ no normal slots to proxy,
      // only need to normalize once
      return prevSlots
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== '$') {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
      (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
  }

  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === 'object' && !Array.isArray(res)
        ? [res] // single vnode
        : normalizeChildren(res);
      return res && (
        res.length === 0 ||
        (res.length === 1 && res[0].isComment) // #9658
      ) ? undefined
        : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized
  }

  function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        props = extend(extend({}, bindObject), props);
      }
      nodes = scopedSlotFn(props) || fallback;
    } else {
      nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id) || identity
  }

  /*  */

  function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1
    } else {
      return expect !== actual
    }
  }

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInKeyCode,
    eventKeyName,
    builtInKeyName
  ) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName)
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp,
    isSync
  ) {
    if (value) {
      if (!isObject(value)) ; else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function ( key ) {
          if (
            key === 'class' ||
            key === 'style' ||
            isReservedAttribute(key)
          ) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key);
          var hyphenatedKey = hyphenate(key);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on[("update:" + key)] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) loop( key );
      }
    }
    return data
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
      return tree
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
      this._renderProxy,
      null,
      this // for render fns generated for functional component templates
    );
    markStatic(tree, ("__static__" + index), false);
    return tree
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }

  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners (data, value) {
    if (value) {
      if (!isPlainObject(value)) ; else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data
  }

  /*  */

  function resolveScopedSlots (
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
  ) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      (res).$key = contentHashKey;
    }
    return res
  }

  /*  */

  function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === 'string' && key) {
        baseObj[values[i]] = values[i + 1];
      }
    }
    return baseObj
  }

  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
  }

  /*  */

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  /*  */

  function FunctionalRenderContext (
    data,
    props,
    children,
    parent,
    Ctor
  ) {
    var this$1 = this;

    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
      contextVm = Object.create(parent);
      // $flow-disable-line
      contextVm._original = parent;
    } else {
      // the context vm passed in is a functional context as well.
      // in this case we want to make sure we are able to get a hold to the
      // real context instance.
      contextVm = parent;
      // $flow-disable-line
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      if (!this$1.$slots) {
        normalizeScopedSlots(
          data.scopedSlots,
          this$1.$slots = resolveSlots(children, parent)
        );
      }
      return this$1.$slots
    };

    Object.defineProperty(this, 'scopedSlots', ({
      enumerable: true,
      get: function get () {
        return normalizeScopedSlots(data.scopedSlots, this.slots())
      }
    }));

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode
      };
    } else {
      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    contextVm,
    children
  ) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
      if (isDef(data.props)) { mergeProps(props, data.props); }
    }

    var renderContext = new FunctionalRenderContext(
      data,
      props,
      children,
      contextVm,
      Ctor
    );

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
      }
      return res
    }
  }

  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone
  }

  function mergeProps (to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  /*  */

  /*  */

  /*  */

  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },

    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },

    insert: function insert (vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy (vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (isUndef(Ctor)) {
      return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      return
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
      asyncFactory
    );

    return vnode
  }

  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
  }

  function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
      // flow complains about extra args which is why we use any
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (
        Array.isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (isDef(data) && isDef((data).__ob__)) {
      return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(vnode, ns); }
      if (isDef(data)) { registerDeepBindings(data); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }

  function applyNS (vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (
          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings (data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }

  /*  */

  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
    }
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;

      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        // There's no need to maintain a stack because all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      // if the returned array contains only a single node, allow it
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  /*  */

  function ensureCtor (comp, base) {
    if (
      comp.__esModule ||
      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
      comp = comp.default;
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
  }

  function createAsyncPlaceholder (
    factory,
    data,
    context,
    children,
    tag
  ) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node
  }

  function resolveAsyncComponent (
    factory,
    baseCtor
  ) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp
    }

    if (isDef(factory.resolved)) {
      return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      // already pending
      factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null

      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

      var forceRender = function (renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          (owners[i]).$forceUpdate();
        }

        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });

      var reject = once(function (reason) {
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (isPromise(res)) {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function () {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function () {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(
                   null
                );
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
  }

  /*  */

  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }

  /*  */

  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add (event, fn) {
    target.$on(event, fn);
  }

  function remove$1 (event, fn) {
    target.$off(event, fn);
  }

  function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    }
  }

  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
  }

  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm
    };
  }

  /*  */

  var activeInstance = null;

  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }

  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(
      (newScopedSlots && !newScopedSlots.$stable) ||
      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props; // wtf flow?
        props[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  }

  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }

  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    waiting = flushing = false;
  }

  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;

  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;

  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      // if the event timestamp, although evaluated AFTER the Date.now(), is
      // smaller than it, it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listener timestamps as
      // well.
      getNow = function () { return performance.now(); };
    }
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent (vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */



  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression =  '';
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        defineReactive$$1(props, key, value);
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop( key );
    toggleObserving(true);
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (props && hasOwn(props, key)) ; else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    // $flow-disable-line
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    }
  }

  function defineComputed (
    target,
    key,
    userDef
  ) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        try {
          cb.call(vm, watcher.value);
        } catch (error) {
          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  /*  */

  var uid$3 = 0;

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$3++;

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      {
        vm._renderProxy = vm;
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }

  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = latest[key];
      }
    }
    return modified
  }

  function Vue (options) {
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /*  */

  function initUse (Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this
    };
  }

  /*  */

  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this
    };
  }

  /*  */

  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }

  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }

  /*  */



  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }

  function matches (pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }

  function pruneCache (keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;

      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },

    render: function render () {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }
      return vnode || (slot && slot[0])
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext
    }
  });

  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '2.6.11';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

  var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
      ? 'false'
      // allow arbitrary string value for contenteditable
      : key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true'
  };

  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };

  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };

  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };

  /*  */

  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode && parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class)
  }

  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class)
        ? [child.class, parent.class]
        : parent.class
    }
  }

  function renderClass (
    staticClass,
    dynamicClass
  ) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }

  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }

  function stringifyClass (value) {
    if (Array.isArray(value)) {
      return stringifyArray(value)
    }
    if (isObject(value)) {
      return stringifyObject(value)
    }
    if (typeof value === 'string') {
      return value
    }
    /* istanbul ignore next */
    return ''
  }

  function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) { res += ' '; }
        res += stringified;
      }
    }
    return res
  }

  function stringifyObject (value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) { res += ' '; }
        res += key;
      }
    }
    return res
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  /*  */

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }

  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function createComment (text) {
    return document.createComment(text)
  }

  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function tagName (node) {
    return node.tagName
  }

  function setTextContent (node, text) {
    node.textContent = text;
  }

  function setStyleScope (node, scopeId) {
    node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  /*  */

  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode (a, b) {
    return (
      a.key === b.key && (
        (
          a.tag === b.tag &&
          a.isComment === b.isComment &&
          isDef(a.data) === isDef(b.data) &&
          sameInputType(a, b)
        ) || (
          isTrue(a.isAsyncPlaceholder) &&
          a.asyncFactory === b.asyncFactory &&
          isUndef(b.asyncFactory.error)
        )
      )
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }

  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it's used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it's used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {

        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }

    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps.parentNode(ref$$1) === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        nodeOps.setStyleScope(vnode.elm, i);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes (vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key)
            ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function findIdxInOld (node, oldCh, start, end) {
      for (var i = start; i < end; i++) {
        var c = oldCh[i];
        if (isDef(c) && sameVnode(node, c)) { return i }
      }
    }

    function patchVnode (
      oldVnode,
      vnode,
      insertedVnodeQueue,
      ownerArray,
      index,
      removeOnly
    ) {
      if (oldVnode === vnode) {
        return
      }

      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // clone reused vnode
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
      ) {
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }

    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || (data && data.pre);
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {
                return false
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break
                }
                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {
                return false
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
          if (!fullInvoke && data['class']) {
            // ensure collecting deps for deep class bindings for future updates
            traverse(data['class']);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);

          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );

          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var insert = ancestor.data.hook.insert;
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                    insert.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      // $flow-disable-line
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        // $flow-disable-line
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name);
    }
    // $flow-disable-line
    return res
  }

  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }

  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
      }
    }
  }

  var baseModules = [
    ref,
    directives
  ];

  /*  */

  function updateAttrs (oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
          ? 'true'
          : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }

  function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && value !== '' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
      isUndef(data.staticClass) &&
      isUndef(data.class) && (
        isUndef(oldData) || (
          isUndef(oldData.staticClass) &&
          isUndef(oldData.class)
        )
      )
    ) {
      return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  /*  */

  /*  */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    }
  }

  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

  function add$1 (
    name,
    handler,
    capture,
    passive
  ) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function (e) {
        if (
          // no bubbling, should always fire.
          // this is just a safety net in case event.timeStamp is unreliable in
          // certain weird environments...
          e.target === e.currentTarget ||
          // event is fired after handler attachment
          e.timeStamp >= attachedTimestamp ||
          // bail for environments that have buggy event.timeStamp implementations
          // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
          // #9681 QtWebEngine event.timeStamp is negative value
          e.timeStamp <= 0 ||
          // #9448 bail if event is fired in another document in a multi-page
          // electron/nw.js app, since event.timeStamp will be using a different
          // starting reference
          e.target.ownerDocument !== document
        ) {
          return original.apply(this, arguments)
        }
      };
    }
    target$1.addEventListener(
      name,
      handler,
      supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
  }

  function remove$2 (
    name,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }

  function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = undefined;
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  var svgContainer;

  function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (!(key in props)) {
        elm[key] = '';
      }
    }

    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value' && elm.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        // IE doesn't support innerHTML for SVG elements
        svgContainer = svgContainer || document.createElement('div');
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecesarry `checked` update.
        cur !== oldProps[key]
      ) {
        // some property updates can throw
        // e.g. `value` on <progress> w/ non-finite value
        try {
          elm[key] = cur;
        } catch (e) {}
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue (elm, checkVal) {
    return (!elm.composing && (
      elm.tagName === 'OPTION' ||
      isNotInFocusAndDirty(elm, checkVal) ||
      isDirtyWithModifiers(elm, checkVal)
    ))
  }

  function isNotInFocusAndDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try { notInFocus = document.activeElement !== elm; } catch (e) {}
    return notInFocus && elm.value !== checkVal
  }

  function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim()
      }
    }
    return value !== newVal
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (
          childNode && childNode.data &&
          (styleData = normalizeStyleData(childNode.data))
        ) {
          extend(res, styleData);
        }
      }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in emptyStyle)) {
      return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  });

  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
      return
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__)
      ? extend({}, style)
      : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  var whitespaceRE = /\s+/;

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
    ) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
    ) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : /* istanbul ignore next */ function (fn) { return fn(); };

  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass (el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }

  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }

  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  /*  */

  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return
    }

    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;

    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;

    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode, 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb
        ) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave (vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm()
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
      return
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
      return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }

  function _enter (_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var directive = {
    inserted: function inserted (el, binding, vnode, oldVnode) {
      if (vnode.tag === 'select') {
        // #6903
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, 'postpatch', function () {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },

    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple
            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding);
    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding);
      }, 0);
    }
  }

  function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
  }

  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }

  function onCompositionStart (e) {
    e.target.composing = true;
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) { return }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }

  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (!value === !oldValue) { return }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: directive,
    show: show
  };

  /*  */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }

  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }

  function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      })
    }
  }

  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }

  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }

  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

  var isVShowDirective = function (d) { return d.name === 'show'; };

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
      var this$1 = this;

      var children = this.$slots.default;
      if (!children) {
        return
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(isNotTextNode);
      /* istanbul ignore if */
      if (!children.length) {
        return
      }

      var mode = this.mode;

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }

      if (this._leaving) {
        return placeholder(h, rawChild)
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }

      if (
        oldChild &&
        oldChild.data &&
        !isSameChild(child, oldChild) &&
        !isAsyncPlaceholder(oldChild) &&
        // #6687 component root is a comment node
        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
      ) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild
          }
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }

      return rawChild
    }
  };

  /*  */

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    beforeMount: function beforeMount () {
      var this$1 = this;

      var update = this._update;
      this._update = function (vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        // force removing pass
        this$1.__patch__(
          this$1._vnode,
          this$1.kept,
          false, // hydrating
          true // removeOnly (!important, avoids unnecessary moves)
        );
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update.call(this$1, vnode, hydrating);
      };
    },

    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children)
    },

    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      // assign to this to avoid being removed in tree-shaking
      // $flow-disable-line
      this._reflow = document.body.offsetHeight;

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };

  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue);
        }
      }
    }, 0);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (_isNativeReflectConstruct()) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }

    return desc;
  }

  /**
    * vue-class-component v7.2.3
    * (c) 2015-present Evan You
    * @license MIT
    */

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  } // The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
  // which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
  // Without this check consumers will encounter hard to track down runtime errors.


  function reflectionIsSupported() {
    return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
  }

  function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
      forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
      forwardMetadata(to, from, key);
    });
  }

  function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
      var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

      if (propertyKey) {
        Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
      } else {
        Reflect.defineMetadata(metaKey, metadata, to);
      }
    });
  }

  var fakeArray = {
    __proto__: []
  };
  var hasProto$1 = fakeArray instanceof Array;

  function createDecorator(factory) {
    return function (target, key, index) {
      var Ctor = typeof target === 'function' ? target : target.constructor;

      if (!Ctor.__decorators__) {
        Ctor.__decorators__ = [];
      }

      if (typeof index !== 'number') {
        index = undefined;
      }

      Ctor.__decorators__.push(function (options) {
        return factory(options, key, index);
      });
    };
  }

  function mixins() {
    for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
      Ctors[_key] = arguments[_key];
    }

    return Vue.extend({
      mixins: Ctors
    });
  }

  function isPrimitive$1(value) {
    var type = _typeof(value);

    return value == null || type !== 'object' && type !== 'function';
  }

  function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;

    Component.prototype._init = function () {
      var _this = this; // proxy to actual vm


      var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

      if (vm.$options.props) {
        for (var key in vm.$options.props) {
          if (!vm.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
      }

      keys.forEach(function (key) {
        if (key.charAt(0) !== '_') {
          Object.defineProperty(_this, key, {
            get: function get() {
              return vm[key];
            },
            set: function set(value) {
              vm[key] = value;
            },
            configurable: true
          });
        }
      });
    }; // should be acquired class property values


    var data = new Component(); // restore original _init to avoid memory leak (#209)

    Component.prototype._init = originalInit; // create plain data object

    var plainData = {};
    Object.keys(data).forEach(function (key) {
      if (data[key] !== undefined) {
        plainData[key] = data[key];
      }
    });

    return plainData;
  }

  var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
  ];

  function componentFactory(Component) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.name = options.name || Component._componentTag || Component.name; // prototype props.

    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
      if (key === 'constructor') {
        return;
      } // hooks


      if ($internalHooks.indexOf(key) > -1) {
        options[key] = proto[key];
        return;
      }

      var descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (descriptor.value !== void 0) {
        // methods
        if (typeof descriptor.value === 'function') {
          (options.methods || (options.methods = {}))[key] = descriptor.value;
        } else {
          // typescript decorated data
          (options.mixins || (options.mixins = [])).push({
            data: function data() {
              return _defineProperty$1({}, key, descriptor.value);
            }
          });
        }
      } else if (descriptor.get || descriptor.set) {
        // computed properties
        (options.computed || (options.computed = {}))[key] = {
          get: descriptor.get,
          set: descriptor.set
        };
      }
    });
    (options.mixins || (options.mixins = [])).push({
      data: function data() {
        return collectDataFromConstructor(this, Component);
      }
    }); // decorate options

    var decorators = Component.__decorators__;

    if (decorators) {
      decorators.forEach(function (fn) {
        return fn(options);
      });
      delete Component.__decorators__;
    } // find super


    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue ? superProto.constructor : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);

    if (reflectionIsSupported()) {
      copyReflectionMetadata(Extended, Component);
    }

    return Extended;
  }
  var shouldIgnore = {
    prototype: true,
    arguments: true,
    callee: true,
    caller: true
  };

  function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
      // Skip the properties that should not be overwritten
      if (shouldIgnore[key]) {
        return;
      } // Some browsers does not allow reconfigure built-in properties


      var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

      if (extendedDescriptor && !extendedDescriptor.configurable) {
        return;
      }

      var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
      // the sub class properties may be inherited properties from the super class in TypeScript.
      // We need to exclude such properties to prevent to overwrite
      // the component options object which stored on the extended constructor (See #192).
      // If the value is a referenced value (object or function),
      // we can check equality of them and exclude it if they have the same reference.
      // If it is a primitive value, it will be forwarded for safety.

      if (!hasProto$1) {
        // Only `cid` is explicitly exluded from property forwarding
        // because we cannot detect whether it is a inherited property or not
        // on the no `__proto__` environment even though the property is reserved.
        if (key === 'cid') {
          return;
        }

        var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

        if (!isPrimitive$1(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
          return;
        }
      } // Warn if the users manually declare reserved properties

      Object.defineProperty(Extended, key, descriptor);
    });
  }

  function Component(options) {
    if (typeof options === 'function') {
      return componentFactory(options);
    }

    return function (Component) {
      return componentFactory(Component, options);
    };
  }

  Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
  };

  /** vue-property-decorator verson 8.4.1 MIT LICENSE copyright 2019 kaorun343 */
  /** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */

  var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';

  function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
      if (!Array.isArray(options) && typeof options !== 'function' && typeof options.type === 'undefined') {
        var type = Reflect.getMetadata('design:type', target, key);

        if (type !== Object) {
          options.type = type;
        }
      }
    }
  }
  /**
   * decorator of a prop
   * @param  options the options for the prop
   * @return PropertyDecorator | void
   */

  function Prop(options) {
    if (options === void 0) {
      options = {};
    }

    return function (target, key) {
      applyMetadata(options, target, key);
      createDecorator(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
      })(target, key);
    };
  }
  /**
   * decorator of a watch function
   * @param  path the path or the expression to observe
   * @param  WatchOption
   * @return MethodDecorator
   */

  function Watch(path, options) {
    if (options === void 0) {
      options = {};
    }

    var _a = options.deep,
        deep = _a === void 0 ? false : _a,
        _b = options.immediate,
        immediate = _b === void 0 ? false : _b;
    return createDecorator(function (componentOptions, handler) {
      if (typeof componentOptions.watch !== 'object') {
        componentOptions.watch = Object.create(null);
      }

      var watch = componentOptions.watch;

      if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
        watch[path] = [watch[path]];
      } else if (typeof watch[path] === 'undefined') {
        watch[path] = [];
      }

      watch[path].push({
        handler: handler,
        deep: deep,
        immediate: immediate
      });
    });
  } // Code copied from Vue/src/shared/util.js
  /**
   * decorator of a ref prop
   * @param refKey the ref key defined in template
   */

  function Ref(refKey) {
    return createDecorator(function (options, key) {
      options.computed = options.computed || {};
      options.computed[key] = {
        cache: false,
        get: function () {
          return this.$refs[refKey || key];
        }
      };
    });
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var tinycolor = createCommonjsModule(function (module) {
  // TinyColor v1.4.1
  // https://github.com/bgrins/TinyColor
  // Brian Grinstead, MIT License
  (function (Math) {
    var trimLeft = /^\s+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        mathRound = Math.round,
        mathMin = Math.min,
        mathMax = Math.max,
        mathRandom = Math.random;

    function tinycolor(color, opts) {
      color = color ? color : '';
      opts = opts || {}; // If input is already a tinycolor, return itself

      if (color instanceof tinycolor) {
        return color;
      } // If we are called as a function, call using new instead


      if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
      }

      var rgb = inputToRGB(color);
      this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
      // Potentially lose a little bit of precision here, but will fix issues where
      // .5 gets interpreted as half of the total, instead of half of 1
      // If it was supposed to be 128, this was already taken care of by `inputToRgb`

      if (this._r < 1) {
        this._r = mathRound(this._r);
      }

      if (this._g < 1) {
        this._g = mathRound(this._g);
      }

      if (this._b < 1) {
        this._b = mathRound(this._b);
      }

      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
    }

    tinycolor.prototype = {
      isDark: function () {
        return this.getBrightness() < 128;
      },
      isLight: function () {
        return !this.isDark();
      },
      isValid: function () {
        return this._ok;
      },
      getOriginalInput: function () {
        return this._originalInput;
      },
      getFormat: function () {
        return this._format;
      },
      getAlpha: function () {
        return this._a;
      },
      getBrightness: function () {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      },
      getLuminance: function () {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;

        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }

        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }

        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      },
      setAlpha: function (value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100 * this._a) / 100;
        return this;
      },
      toHsv: function () {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return {
          h: hsv.h * 360,
          s: hsv.s,
          v: hsv.v,
          a: this._a
        };
      },
      toHsvString: function () {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360),
            s = mathRound(hsv.s * 100),
            v = mathRound(hsv.v * 100);
        return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
      },
      toHsl: function () {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return {
          h: hsl.h * 360,
          s: hsl.s,
          l: hsl.l,
          a: this._a
        };
      },
      toHslString: function () {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360),
            s = mathRound(hsl.s * 100),
            l = mathRound(hsl.l * 100);
        return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
      },
      toHex: function (allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function (allow3Char) {
        return '#' + this.toHex(allow3Char);
      },
      toHex8: function (allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function (allow4Char) {
        return '#' + this.toHex8(allow4Char);
      },
      toRgb: function () {
        return {
          r: mathRound(this._r),
          g: mathRound(this._g),
          b: mathRound(this._b),
          a: this._a
        };
      },
      toRgbString: function () {
        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function () {
        return {
          r: mathRound(bound01(this._r, 255) * 100) + "%",
          g: mathRound(bound01(this._g, 255) * 100) + "%",
          b: mathRound(bound01(this._b, 255) * 100) + "%",
          a: this._a
        };
      },
      toPercentageRgbString: function () {
        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function () {
        if (this._a === 0) {
          return "transparent";
        }

        if (this._a < 1) {
          return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function (secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
          var s = tinycolor(secondColor);
          secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
      },
      toString: function (format) {
        var formatSet = !!format;
        format = format || this._format;
        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
          // Special case for "transparent", all other non-alpha formats
          // will return rgba when there is transparency.
          if (format === "name" && this._a === 0) {
            return this.toName();
          }

          return this.toRgbString();
        }

        if (format === "rgb") {
          formattedString = this.toRgbString();
        }

        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }

        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }

        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }

        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }

        if (format === "hex8") {
          formattedString = this.toHex8String();
        }

        if (format === "name") {
          formattedString = this.toName();
        }

        if (format === "hsl") {
          formattedString = this.toHslString();
        }

        if (format === "hsv") {
          formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
      },
      clone: function () {
        return tinycolor(this.toString());
      },
      _applyModification: function (fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function () {
        return this._applyModification(lighten, arguments);
      },
      brighten: function () {
        return this._applyModification(brighten, arguments);
      },
      darken: function () {
        return this._applyModification(darken, arguments);
      },
      desaturate: function () {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function () {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function () {
        return this._applyModification(greyscale, arguments);
      },
      spin: function () {
        return this._applyModification(spin, arguments);
      },
      _applyCombination: function (fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function () {
        return this._applyCombination(analogous, arguments);
      },
      complement: function () {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function () {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function () {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function () {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function () {
        return this._applyCombination(tetrad, arguments);
      }
    }; // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1

    tinycolor.fromRatio = function (color, opts) {
      if (typeof color == "object") {
        var newColor = {};

        for (var i in color) {
          if (color.hasOwnProperty(i)) {
            if (i === "a") {
              newColor[i] = color[i];
            } else {
              newColor[i] = convertToPercentage(color[i]);
            }
          }
        }

        color = newColor;
      }

      return tinycolor(color, opts);
    }; // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //


    function inputToRGB(color) {
      var rgb = {
        r: 0,
        g: 0,
        b: 0
      };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;

      if (typeof color == "string") {
        color = stringInputToObject(color);
      }

      if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s = convertToPercentage(color.s);
          v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s, v);
          ok = true;
          format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s = convertToPercentage(color.s);
          l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, s, l);
          ok = true;
          format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
          a = color.a;
        }
      }

      a = boundAlpha(a);
      return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
      };
    } // Conversion Functions
    // --------------------
    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]


    function rgbToRgb(r, g, b) {
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    } // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]


    function rgbToHsl(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b),
          min = mathMin(r, g, b);
      var h,
          s,
          l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return {
        h: h,
        s: s,
        l: l
      };
    } // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]


    function hslToRgb(h, s, l) {
      var r, g, b;
      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);

      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    } // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]


    function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b),
          min = mathMin(r, g, b);
      var h,
          s,
          v = max;
      var d = max - min;
      s = max === 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return {
        h: h,
        s: s,
        v: v
      };
    } // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]


    function hsvToRgb(h, s, v) {
      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math.floor(h),
          f = h - i,
          p = v * (1 - s),
          q = v * (1 - f * s),
          t = v * (1 - (1 - f) * s),
          mod = i % 6,
          r = [v, q, p, p, t, v][mod],
          g = [t, v, v, q, p, p][mod],
          b = [p, p, t, v, v, q][mod];
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    } // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex


    function rgbToHex(r, g, b, allow3Char) {
      var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]; // Return a 3 character hex if possible

      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }

      return hex.join("");
    } // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b are contained in the set [0, 255] and
    // a in [0, 1]. Returns a 4 or 8 character rgba hex


    function rgbaToHex(r, g, b, a, allow4Char) {
      var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }

      return hex.join("");
    } // `rgbaToArgbHex`
    // Converts an RGBA color to an ARGB Hex8 string
    // Rarely used, but required for "toFilter()"


    function rgbaToArgbHex(r, g, b, a) {
      var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
      return hex.join("");
    } // `equals`
    // Can be called with any tinycolor input


    tinycolor.equals = function (color1, color2) {
      if (!color1 || !color2) {
        return false;
      }

      return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };

    tinycolor.random = function () {
      return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    }; // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


    function desaturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
    }

    function saturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
    }

    function greyscale(color) {
      return tinycolor(color).desaturate(100);
    }

    function lighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
    }

    function brighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var rgb = tinycolor(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
      return tinycolor(rgb);
    }

    function darken(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
    } // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.


    function spin(color, amount) {
      var hsl = tinycolor(color).toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor(hsl);
    } // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>


    function complement(color) {
      var hsl = tinycolor(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor(hsl);
    }

    function triad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [tinycolor(color), tinycolor({
        h: (h + 120) % 360,
        s: hsl.s,
        l: hsl.l
      }), tinycolor({
        h: (h + 240) % 360,
        s: hsl.s,
        l: hsl.l
      })];
    }

    function tetrad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [tinycolor(color), tinycolor({
        h: (h + 90) % 360,
        s: hsl.s,
        l: hsl.l
      }), tinycolor({
        h: (h + 180) % 360,
        s: hsl.s,
        l: hsl.l
      }), tinycolor({
        h: (h + 270) % 360,
        s: hsl.s,
        l: hsl.l
      })];
    }

    function splitcomplement(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [tinycolor(color), tinycolor({
        h: (h + 72) % 360,
        s: hsl.s,
        l: hsl.l
      }), tinycolor({
        h: (h + 216) % 360,
        s: hsl.s,
        l: hsl.l
      })];
    }

    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;
      var hsl = tinycolor(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor(color)];

      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
      }

      return ret;
    }

    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor(color).toHsv();
      var h = hsv.h,
          s = hsv.s,
          v = hsv.v;
      var ret = [];
      var modification = 1 / results;

      while (results--) {
        ret.push(tinycolor({
          h: h,
          s: s,
          v: v
        }));
        v = (v + modification) % 1;
      }

      return ret;
    } // Utility Functions
    // ---------------------


    tinycolor.mix = function (color1, color2, amount) {
      amount = amount === 0 ? 0 : amount || 50;
      var rgb1 = tinycolor(color1).toRgb();
      var rgb2 = tinycolor(color2).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return tinycolor(rgba);
    }; // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
    // `contrast`
    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)


    tinycolor.readability = function (color1, color2) {
      var c1 = tinycolor(color1);
      var c2 = tinycolor(color2);
      return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    }; // `isReadable`
    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
    // The third argument is an optional Object.
    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false


    tinycolor.isReadable = function (color1, color2, wcag2) {
      var readability = tinycolor.readability(color1, color2);
      var wcag2Parms, out;
      out = false;
      wcag2Parms = validateWCAG2Parms(wcag2);

      switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
          out = readability >= 4.5;
          break;

        case "AAlarge":
          out = readability >= 3;
          break;

        case "AAAsmall":
          out = readability >= 7;
          break;
      }

      return out;
    }; // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // Optionally returns Black or White if the most readable color is unreadable.
    // *Example*
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"


    tinycolor.mostReadable = function (baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors;
      level = args.level;
      size = args.size;

      for (var i = 0; i < colorList.length; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);

        if (readability > bestScore) {
          bestScore = readability;
          bestColor = tinycolor(colorList[i]);
        }
      }

      if (tinycolor.isReadable(baseColor, bestColor, {
        "level": level,
        "size": size
      }) || !includeFallbackColors) {
        return bestColor;
      } else {
        args.includeFallbackColors = false;
        return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
      }
    }; // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>


    var names = tinycolor.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    }; // Make it easy to access colors via `hexNames[hex]`

    var hexNames = tinycolor.hexNames = flip(names); // Utilities
    // ---------
    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`

    function flip(o) {
      var flipped = {};

      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          flipped[o[i]] = i;
        }
      }

      return flipped;
    } // Return a valid alpha value [0,1] with all invalid values being set to 1


    function boundAlpha(a) {
      a = parseFloat(a);

      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }

      return a;
    } // Take input from [0, n] and return it as [0, 1]


    function bound01(n, max) {
      if (isOnePointZero(n)) {
        n = "100%";
      }

      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n))); // Automatically convert percentage into number

      if (processPercent) {
        n = parseInt(n * max, 10) / 100;
      } // Handle floating point rounding errors


      if (Math.abs(n - max) < 0.000001) {
        return 1;
      } // Convert into [0, 1] range if it isn't already


      return n % max / parseFloat(max);
    } // Force a number between 0 and 1


    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    } // Parse a base-16 hex value into a base-10 integer


    function parseIntFromHex(val) {
      return parseInt(val, 16);
    } // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>


    function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    } // Check to see if string passed in is a percentage


    function isPercentage(n) {
      return typeof n === "string" && n.indexOf('%') != -1;
    } // Force a hex value to have 2 characters


    function pad2(c) {
      return c.length == 1 ? '0' + c : '' + c;
    } // Replace a decimal with it's percentage value


    function convertToPercentage(n) {
      if (n <= 1) {
        n = n * 100 + "%";
      }

      return n;
    } // Converts a decimal to a hex value


    function convertDecimalToHex(d) {
      return Math.round(parseFloat(d) * 255).toString(16);
    } // Converts a hex value to a decimal


    function convertHexToDecimal(h) {
      return parseIntFromHex(h) / 255;
    }

    var matchers = function () {
      // <http://www.w3.org/TR/css3-values/#integers>
      var CSS_INTEGER = "[-\\+]?\\d+%?"; // <http://www.w3.org/TR/css3-values/#number-value>

      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"; // Actual matching.
      // Parentheses and commas are optional, but not required.
      // Whitespace can take the place of commas or opening paren

      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
    }(); // `isValidCSSUnit`
    // Take in a single string / number and check to see if it looks like a CSS unit
    // (see `matchers` above for definition).


    function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
    } // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`


    function stringInputToObject(color) {
      color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
      var named = false;

      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color == 'transparent') {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
          format: "name"
        };
      } // Try to match string input using regular expressions.
      // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
      // Just return an object and let the conversion functions handle that.
      // This way the result will be the same whether the tinycolor is initialized with string or object.


      var match;

      if (match = matchers.rgb.exec(color)) {
        return {
          r: match[1],
          g: match[2],
          b: match[3]
        };
      }

      if (match = matchers.rgba.exec(color)) {
        return {
          r: match[1],
          g: match[2],
          b: match[3],
          a: match[4]
        };
      }

      if (match = matchers.hsl.exec(color)) {
        return {
          h: match[1],
          s: match[2],
          l: match[3]
        };
      }

      if (match = matchers.hsla.exec(color)) {
        return {
          h: match[1],
          s: match[2],
          l: match[3],
          a: match[4]
        };
      }

      if (match = matchers.hsv.exec(color)) {
        return {
          h: match[1],
          s: match[2],
          v: match[3]
        };
      }

      if (match = matchers.hsva.exec(color)) {
        return {
          h: match[1],
          s: match[2],
          v: match[3],
          a: match[4]
        };
      }

      if (match = matchers.hex8.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }

      if (match = matchers.hex6.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }

      if (match = matchers.hex4.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + '' + match[1]),
          g: parseIntFromHex(match[2] + '' + match[2]),
          b: parseIntFromHex(match[3] + '' + match[3]),
          a: convertHexToDecimal(match[4] + '' + match[4]),
          format: named ? "name" : "hex8"
        };
      }

      if (match = matchers.hex3.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + '' + match[1]),
          g: parseIntFromHex(match[2] + '' + match[2]),
          b: parseIntFromHex(match[3] + '' + match[3]),
          format: named ? "name" : "hex"
        };
      }

      return false;
    }

    function validateWCAG2Parms(parms) {
      // return valid WCAG2 parms for isReadable.
      // If input parms are invalid, return {"level":"AA", "size":"small"}
      var level, size;
      parms = parms || {
        "level": "AA",
        "size": "small"
      };
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();

      if (level !== "AA" && level !== "AAA") {
        level = "AA";
      }

      if (size !== "small" && size !== "large") {
        size = "small";
      }

      return {
        "level": level,
        "size": size
      };
    } // Node: Export function


    if ( module.exports) {
      module.exports = tinycolor;
    } // AMD/requirejs: Define the module
    else {
          window.tinycolor = tinycolor;
        }
  })(Math);
  });

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';
  /** Used as references for various `Number` constants. */

  var NAN = 0 / 0;
  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /** Used to match leading and trailing whitespace. */

  var reTrim = /^\s+|\s+$/g;
  /** Used to detect bad signed hexadecimal string values. */

  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  /** Used to detect binary string values. */

  var reIsBinary = /^0b[01]+$/i;
  /** Used to detect octal string values. */

  var reIsOctal = /^0o[0-7]+$/i;
  /** Built-in method references without a dependency on `root`. */

  var freeParseInt = parseInt;
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString = objectProto.toString;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max,
      nativeMin = Math.min;
  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */

  var now = function () {
    return root.Date.now();
  };
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */


  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    wait = toNumber$1(wait) || 0;

    if (isObject$1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber$1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;
      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }

      return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */


  function isObject$1(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */


  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }
  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */


  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol(value)) {
      return NAN;
    }

    if (isObject$1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$1(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var lodash_debounce = debounce;

  var DEFAULT_COLOR = '#000';

  var _class, _temp;

  var supportFormat = ['hex', 'hex8']; // We declare the props separately
  // to make props types inferable.

  var Props = Vue.extend({
    props: {
      value: {
        // default: '#fff',
        // required: true,
        validator: function validator(value) {
          return tinycolor(value).isValid();
        }
      },
      outputFormat: {
        type: String,
        validator: function validator(value) {
          return supportFormat.indexOf(value) >= 0;
        }
      },
      consistent: {
        type: Boolean,
        "default": true
      }
    }
  }); // TODO: 枚举 & fallback

  var formatMethodMap = {
    hex: 'toHexString',
    hex8: 'toHex8String'
  };

  var Color = Component(_class = (_temp = /*#__PURE__*/function (_Props) {
    _inherits(Color, _Props);

    var _super = _createSuper(Color);

    function Color() {
      var _this;

      _classCallCheck(this, Color);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.debounced = lodash_debounce(function (fn) {
        fn();
      }, 100);
      _this._outputFormat = 'hex';
      return _this;
    }

    _createClass(Color, [{
      key: "created",
      value: function created() {
        if (this.value === null) {
          // TODO: warning, if `value` is `null`, outputFormat need to be undefined
          this._outputFormat = this.outputFormat;
        }

        this._outputFormat = new tinycolor(this.value).getFormat();
      }
    }, {
      key: "getOutputFormat",
      value: function getOutputFormat() {
        return this._outputFormat;
      }
    }, {
      key: "setOutputFormat",
      value: function setOutputFormat(
      /*TODO: enum this type */
      format) {
        this._outputFormat = format;
      }
    }, {
      key: "onColorChange",
      value: function onColorChange(value) {
        var _this2 = this;

        var tc = new tinycolor(value); // to support v-model

        this.$emit('input', tc);
        this.$emit('change', tc);
        this.debounced(function () {
          _this2.$emit('change-complete', tc);
        }); // to avoid precision lose, need to separate another method to provide identical output

        var formatMethod = formatMethodMap[this._outputFormat];

        if (formatMethod) {
          var formatted = tc[formatMethod]();
          this.$emit('consistent-change', formatted);
          this.debounced(function () {
            return _this2.$emit('consistent-change-complete', formatted);
          });
        }
      }
    }, {
      key: "equals",
      value: function equals(color) {
        if (this.isInputEmpty) {
          return false;
        }

        return tinycolor.equals(this.tc, color);
      }
    }, {
      key: "isInputEmpty",
      get: function get() {
        return this.value === null;
      } // `tc` stands for tinycolor

    }, {
      key: "tc",
      get: function get() {
        if (this.value === null) {
          return new tinycolor(DEFAULT_COLOR);
        }

        var tc = new tinycolor(this.value);
        return tc;
      }
    }]);

    return Color;
  }(Props), _temp)) || _class;

  var _dec, _class$1, _class2, _descriptor, _temp$1;
  var defaultColors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
  var Compact = (_dec = Prop({
    "default": function _default() {
      return defaultColors;
    }
  }), Component(_class$1 = (_class2 = (_temp$1 = /*#__PURE__*/function (_mixins) {
    _inherits(Compact, _mixins);

    var _super = _createSuper(Compact);

    function Compact() {
      var _this;

      _classCallCheck(this, Compact);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "palette", _descriptor, _assertThisInitialized(_this));

      return _this;
    }

    return Compact;
  }(mixins(Color)), _temp$1), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "palette", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2)) || _class$1);

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  var __vue_script__ = Compact;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-compact",
      attrs: {
        role: "CompactColorPicker"
      }
    }, [_c("ul", {
      staticClass: "vc-compact-colors",
      attrs: {
        role: "option"
      }
    }, _vm._l(_vm.palette, function (c) {
      return _c("li", {
        key: c,
        staticClass: "vc-compact-color-item",
        "class": {
          "vc-compact-color-item--white": c === "#FFFFFF"
        },
        style: {
          background: c
        },
        attrs: {
          "aria-label": "Color:" + c
        },
        on: {
          click: function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }, [_c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.equals(c),
          expression: "equals(c)"
        }],
        staticClass: "vc-compact-dot"
      })]);
    }), 0)]);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-1b607f64_0", {
      source: "\n.vc-compact {\n  padding-top: 5px;\n  padding-left: 5px;\n  width: 240px;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-compact-colors {\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-compact-color-item {\n  list-style: none;\n  width: 15px;\n  height: 15px;\n  float: left;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\n  background: #000;\n}\n.vc-compact-dot {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  left: 5px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Compact.vue"],
        "names": [],
        "mappings": ";AAkDA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;EACA,kBAAA;EACA,iEAAA;EACA,sBAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;EACA,UAAA;EACA,gBAAA;AACA",
        "file": "Compact.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"CompactColorPicker\"\n    class=\"vc-compact\"\n  >\n    <ul\n      role=\"option\"\n      class=\"vc-compact-colors\"\n    >\n      <li\n        v-for=\"c in palette\"\n        :key=\"c\"\n        :aria-label=\"'Color:' + c\"\n        class=\"vc-compact-color-item\"\n        :class=\"{'vc-compact-color-item--white': c === '#FFFFFF' }\"\n        :style=\"{background: c}\"\n        @click=\"onColorChange(c)\"\n      >\n        <div\n          v-show=\"equals(c)\"\n          class=\"vc-compact-dot\"\n        />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst defaultColors = [\n  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',\n  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',\n  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',\n  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',\n  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',\n  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'\n];\n\n@Component\nexport default class Compact extends mixins(Color) {\n  @Prop({default: () => defaultColors})\n  palette !: string[];\n}\n\n</script>\n\n<style>\n.vc-compact {\n  padding-top: 5px;\n  padding-left: 5px;\n  width: 240px;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-compact-colors {\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-compact-color-item {\n  list-style: none;\n  width: 15px;\n  height: 15px;\n  float: left;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.vc-compact-color-item--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-compact-color-item--white .vc-compact-dot {\n  background: #000;\n}\n\n.vc-compact-dot {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  left: 5px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

  var _dec$1, _class$2, _class2$1, _descriptor$1, _temp$2;
  var defaultPalatte = ['#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3', '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959', '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'];
  var Grayscale = (_dec$1 = Prop({
    "default": function _default() {
      return defaultPalatte;
    }
  }), Component(_class$2 = (_class2$1 = (_temp$2 = /*#__PURE__*/function (_mixins) {
    _inherits(Grayscale, _mixins);

    var _super = _createSuper(Grayscale);

    function Grayscale() {
      var _this;

      _classCallCheck(this, Grayscale);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "palette", _descriptor$1, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(Grayscale, [{
      key: "handlerClick",
      value: function handlerClick(value) {
        this.onColorChange(value);
      }
    }, {
      key: "pick",
      get: function get() {
        return this.tc.toHexString();
      }
    }]);

    return Grayscale;
  }(mixins(Color)), _temp$2), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "palette", [_dec$1], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$1)) || _class$2);

  /* script */
  var __vue_script__$1 = Grayscale;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-grayscale",
      attrs: {
        role: "GrayscaleColorPicker"
      }
    }, [_c("ul", {
      staticClass: "vc-grayscale-colors",
      attrs: {
        role: "option"
      }
    }, _vm._l(_vm.palette, function (c) {
      return _c("li", {
        key: c,
        staticClass: "vc-grayscale-color-item",
        "class": {
          "vc-grayscale-color-item--white": c == "#FFFFFF"
        },
        style: {
          background: c
        },
        attrs: {
          "aria-label": "Color:" + c
        },
        on: {
          click: function click($event) {
            return _vm.handlerClick(c);
          }
        }
      }, [_c("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.equals(c),
          expression: "equals(c)"
        }],
        staticClass: "vc-grayscale-dot"
      })]);
    }), 0)]);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-6056046b_0", {
      source: "\n.vc-grayscale {\n  width: 125px;\n  border-radius: 2px;\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-grayscale-colors {\n  border-radius: 2px;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-grayscale-color-item {\n  list-style: none;\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\n  background: #000;\n}\n.vc-grayscale-dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 6px;\n  height: 6px;\n  margin: -3px 0 0 -2px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Grayscale.vue"],
        "names": [],
        "mappings": ";AAuDA;EACA,YAAA;EACA,kBAAA;EACA,kEAAA;EACA,sBAAA;AACA;AACA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,qBAAA;EACA,kBAAA;EACA,UAAA;EACA,gBAAA;AACA",
        "file": "Grayscale.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"GrayscaleColorPicker\"\n    class=\"vc-grayscale\"\n  >\n    <ul\n      role=\"option\"\n      class=\"vc-grayscale-colors\"\n    >\n      <li\n        v-for=\"c in palette\"\n        :key=\"c\"\n        :aria-label=\"'Color:' + c\"\n        class=\"vc-grayscale-color-item\"\n        :class=\"{'vc-grayscale-color-item--white': c == '#FFFFFF'}\"\n        :style=\"{background: c}\"\n        @click=\"handlerClick(c)\"\n      >\n        <div\n          v-show=\"equals(c)\"\n          class=\"vc-grayscale-dot\"\n        />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst defaultPalatte = [\n  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',\n  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',\n  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'\n]\n\n@Component\nexport default class Grayscale extends mixins(Color) {\n  @Prop({default: () => defaultPalatte})\n  readonly palette!: string[][];\n\n  get pick() {\n    return this.tc.toHexString();\n  }\n\n  handlerClick(value: string) {\n    this.onColorChange(value);\n  }\n}\n\n</script>\n\n<style>\n.vc-grayscale {\n  width: 125px;\n  border-radius: 2px;\n  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-grayscale-colors {\n  border-radius: 2px;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n}\n.vc-grayscale-color-item {\n  list-style: none;\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n  cursor: pointer;\n}\n.vc-grayscale-color-item--white .vc-grayscale-dot {\n  background: #000;\n}\n\n.vc-grayscale-dot {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 6px;\n  height: 6px;\n  margin: -3px 0 0 -2px;\n  border-radius: 50%;\n  opacity: 1;\n  background: #fff;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

  var clamp_1 = clamp;

  function clamp(value, min, max) {
    return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
  }

  var _dec$2, _dec2, _dec3, _dec4, _dec5, _class$3, _class2$2, _descriptor$2, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp$3;
  var clamps = {
    r: function r(v) {
      return clamp_1(v, 255, 0);
    },
    g: function g(v) {
      return clamp_1(v, 255, 0);
    },
    b: function b(v) {
      return clamp_1(v, 255, 0);
    },
    a: function a(v) {
      return clamp_1(v, 1, 0);
    },
    h: function h(v) {
      return clamp_1(v, 360, 0);
    },
    s: function s(v) {
      return clamp_1(v, 100, 0);
    },
    l: function l(v) {
      return clamp_1(v, 100, 0);
    },
    v: function v(_v) {
      return clamp_1(_v, 100, 0);
    }
  };
  var EditableInput = (_dec$2 = Prop(), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
    "default": 1
  }), _dec5 = Ref(), Component(_class$3 = (_class2$2 = (_temp$3 = /*#__PURE__*/function (_Vue) {
    _inherits(EditableInput, _Vue);

    var _super = _createSuper(EditableInput);

    function EditableInput() {
      var _this;

      _classCallCheck(this, EditableInput);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "value", _descriptor$2, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "label", _descriptor2, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "desc", _descriptor3, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "step", _descriptor4, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "input", _descriptor5, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(EditableInput, [{
      key: "handleChange",
      value: function handleChange(value) {
        var label = this.label;
        var v = value;
        var numberedValue = +value;

        if (!isNaN(numberedValue)) {
          if (label === 'r' || label === 'g' || label === 'b' || label === 'a' || label === 'h' || label === 's' || label === 'l' || label === 'v') {
            var _clamp = clamps[label];
            v = _clamp(numberedValue);
          }
        }

        this.$emit('change', v);
        this.$emit('input', v);
        var $input = this.$refs.input;
        $input.value = v.toString();
      }
    }, {
      key: "handleInput",
      value: function handleInput(e) {
        var target = e.target;
        e.target && this.handleChange(target.value);
      }
    }, {
      key: "handleKeyDown",
      value: function handleKeyDown(e) {
        var target = e.target;
        var val = target.value;
        var number = Number(val);

        if (!isNaN(number)) {
          var amount = this.step || 1; // Up

          if (e.keyCode === 38) {
            // TODO: 精度问题
            this.handleChange(number + amount);
            e.preventDefault();
          } // Down


          if (e.keyCode === 40) {
            // TODO: 精度问题
            this.handleChange(number - amount);
            e.preventDefault();
          }
        }
      }
    }]);

    return EditableInput;
  }(Vue), _temp$3), (_descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "value", [_dec$2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2$2.prototype, "label", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2$2.prototype, "desc", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2$2.prototype, "step", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2$2.prototype, "input", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$2)) || _class$3);

  /* script */
  var __vue_script__$2 = EditableInput;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-editable-input"
    }, [_c("input", {
      ref: "input",
      staticClass: "vc-input__input",
      attrs: {
        "aria-label": _vm.desc ? _vm.label + "(" + _vm.desc + ")" : _vm.label
      },
      domProps: {
        value: _vm.value
      },
      on: {
        keydown: _vm.handleKeyDown,
        input: _vm.handleInput
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "vc-input__label",
      attrs: {
        "for": _vm.label
      }
    }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c("span", {
      staticClass: "vc-input__desc"
    }, [_vm._v(_vm._s(_vm.desc))])]);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-47f63629_0", {
      source: "\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/EditableInput.vue"],
        "names": [],
        "mappings": ";AAkGA;EACA,kBAAA;AACA;AACA;EACA,UAAA;EACA,SAAA;EACA,aAAA;AACA;AACA;EACA,0BAAA;AACA",
        "file": "EditableInput.vue",
        "sourcesContent": ["<template>\n  <div class=\"vc-editable-input\">\n    <input\n      ref=\"input\"\n      :value=\"value\"\n      :aria-label=\"desc ? label + '(' + desc + ')' : label\"\n      class=\"vc-input__input\"\n      @keydown=\"handleKeyDown\"\n      @input=\"handleInput\"\n    >\n    <span\n      :for=\"label\"\n      class=\"vc-input__label\"\n    >{{ label }}</span>\n    <span class=\"vc-input__desc\">{{ desc }}</span>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport clamp from 'clamp';\nimport { Vue, Component, Prop, Ref } from 'vue-property-decorator';\n\nconst clamps = {\n  r: (v: number) => clamp(v, 255, 0),\n  g: (v: number) => clamp(v, 255, 0),\n  b: (v: number) => clamp(v, 255, 0),\n  a: (v: number) => clamp(v, 1, 0),\n  h: (v: number) => clamp(v, 360, 0),\n  s: (v: number) => clamp(v, 100, 0),\n  l: (v: number) => clamp(v, 100, 0),\n  v: (v: number) => clamp(v, 100, 0),\n}\n\ntype LabelsWithClamp = 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l' | 'v';\n\n@Component\nexport default class EditableInput extends Vue {\n  @Prop()\n  value !: string | number;\n  @Prop()\n  label?: LabelsWithClamp | string;\n  @Prop()\n  desc ?: string;\n  @Prop({ default: 1 })\n  step?: number;\n\n  @Ref()\n  readonly input!: HTMLInputElement;\n\n  handleChange (value: string | number) {\n    const { label } = this;\n    let v = value;\n    let numberedValue = +value;\n    if (!isNaN(numberedValue)) {\n      if (label === 'r' ||  label === 'g' ||  label === 'b' ||  label === 'a' ||  label === 'h' ||  label === 's' ||  label === 'l' ||  label === 'v') {\n        const clamp = clamps[label];\n        v = clamp(numberedValue);\n      }\n    }\n    this.$emit('change', v);\n    this.$emit('input', v);\n    const $input = this.$refs.input as HTMLInputElement;\n    $input.value = v.toString();\n  }\n\n  handleInput(e: Event) {\n    const target = e.target as HTMLInputElement;\n    e.target && this.handleChange(target.value);\n  }\n\n  handleKeyDown(e: KeyboardEvent) {\n    const target = e.target as HTMLInputElement;\n    let val = target.value;\n\n    let number = Number(val)\n\n    if (!isNaN(number)) {\n      let amount = this.step || 1;\n\n      // Up\n      if (e.keyCode === 38) {\n        // TODO: 精度问题\n        this.handleChange(number + amount)\n        e.preventDefault()\n      }\n\n      // Down\n      if (e.keyCode === 40) {\n        // TODO: 精度问题\n        this.handleChange(number - amount)\n        e.preventDefault()\n      }\n    }\n  }\n}\n</script>\n\n<style>\n.vc-editable-input {\n  position: relative;\n}\n.vc-input__input {\n  padding: 0;\n  border: 0;\n  outline: none;\n}\n.vc-input__label {\n  text-transform: capitalize;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$2 = normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

  function isValidHex(hex) {
    return tinycolor(hex).isValid();
  }
  function isTransparent(color) {
    return tinycolor(color).getAlpha() === 0;
  }
  function hasAlpha(color) {
    return tinycolor(color).getAlpha() < 1;
  }

  var _dec$3, _class$4;
  var Material = (_dec$3 = Component({
    components: {
      EditableInput: __vue_component__$2
    }
  }), _dec$3(_class$4 = /*#__PURE__*/function (_mixins) {
    _inherits(Material, _mixins);

    var _super = _createSuper(Material);

    function Material() {
      _classCallCheck(this, Material);

      return _super.apply(this, arguments);
    }

    _createClass(Material, [{
      key: "onChangeHex",
      value: function onChangeHex(hex) {
        if (isValidHex(hex) && hex.length === 7) {
          this.onColorChange(hex);
        }
      }
    }, {
      key: "onChange",
      value: function onChange(label, data) {
        if (this.rgba === null) {
          return;
        }

        this.onColorChange(_objectSpread2({}, this.rgba, {}, _defineProperty({}, label, data)));
      }
    }, {
      key: "hex",
      get: function get() {
        if (this.isInputEmpty) {
          return null;
        }

        return this.tc.toHexString();
      }
    }, {
      key: "rgba",
      get: function get() {
        if (this.isInputEmpty) {
          return null;
        }

        return this.tc.toRgb();
      }
    }]);

    return Material;
  }(mixins(Color))) || _class$4);

  /* script */
  var __vue_script__$3 = Material;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-material",
      attrs: {
        role: "MaterialColorPicker"
      }
    }, [_c("EditableInput", {
      staticClass: "vc-material-hex",
      style: {
        borderColor: _vm.hex
      },
      attrs: {
        label: "hex",
        value: _vm.hex
      },
      on: {
        change: _vm.onChangeHex
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-material-split"
    }, [_c("div", {
      staticClass: "vc-material-third"
    }, [_c("EditableInput", {
      attrs: {
        label: "r",
        value: _vm.rgba && _vm.rgba.r
      },
      on: {
        change: function change($event) {
          return _vm.onChange("r", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-material-third"
    }, [_c("EditableInput", {
      attrs: {
        label: "g",
        value: _vm.rgba && _vm.rgba.g
      },
      on: {
        change: function change($event) {
          return _vm.onChange("g", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-material-third"
    }, [_c("EditableInput", {
      attrs: {
        label: "b",
        value: _vm.rgba && _vm.rgba.b
      },
      on: {
        change: function change($event) {
          return _vm.onChange("b", $event);
        }
      }
    })], 1)])], 1);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-49921d68_0", {
      source: "\n.vc-material {\n  width: 98px;\n  height: 98px;\n  padding: 16px;\n  font-family: \"Roboto\";\n  position: relative;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n.vc-material .vc-input__input {\n  width: 100%;\n  margin-top: 12px;\n  font-size: 15px;\n  color: #333;\n  height: 30px;\n}\n.vc-material .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 11px;\n  color: #999;\n  text-transform: capitalize;\n}\n.vc-material-hex {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.vc-material-split {\n  display: flex;\n  margin-right: -10px;\n  padding-top: 11px;\n}\n.vc-material-third {\n  flex: 1;\n  padding-right: 10px;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Material.vue"],
        "names": [],
        "mappings": ";AA6EA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,qBAAA;EACA,kBAAA;EACA,kBAAA;EACA,iEAAA;EACA,sBAAA;AACA;AAEA;EACA,WAAA;EACA,gBAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,eAAA;EACA,WAAA;EACA,0BAAA;AACA;AAEA;EACA,wBAAA;EACA,0BAAA;AACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;AACA;AACA;EACA,OAAA;EACA,mBAAA;AACA",
        "file": "Material.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"MaterialColorPicker\"\n    class=\"vc-material\"\n  >\n    <EditableInput\n      class=\"vc-material-hex\"\n      label=\"hex\"\n      :style=\"{ borderColor: hex }\"\n      :value=\"hex\"\n      @change=\"onChangeHex\"\n    />\n\n    <div class=\"vc-material-split\">\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"r\"\n          :value=\"rgba && rgba.r\"\n          @change=\"onChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"g\"\n          :value=\"rgba && rgba.g\"\n          @change=\"onChange('g', $event)\"\n        />\n      </div>\n      <div class=\"vc-material-third\">\n        <EditableInput\n          label=\"b\"\n          :value=\"rgba && rgba.b\"\n          @change=\"onChange('b', $event)\"\n        />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport EditableInput from './common/EditableInput.vue';\nimport { mixins } from 'vue-class-component';\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport Color from '../common/ColorMixin';\nimport { isValidHex } from '../utils';\n\n@Component({\n  components: { EditableInput }\n})\nexport default class Material extends mixins(Color) {\n  get hex() {\n    if (this.isInputEmpty) {\n      return null;\n    }\n    return this.tc.toHexString();\n  }\n  get rgba() {\n    if (this.isInputEmpty) {\n      return null;\n    }\n    return this.tc.toRgb();\n  }\n  onChangeHex(hex: string) {\n    if (isValidHex(hex) && hex.length === 7) {\n      this.onColorChange(hex);\n    }\n  }\n  onChange(label: 'r' | 'g' | 'b', data: number) {\n    if (this.rgba === null) {\n      return\n    }\n    this.onColorChange({...this.rgba, ...{[label]: data }});\n  }\n}\n</script>\n\n<style>\n.vc-material {\n  width: 98px;\n  height: 98px;\n  padding: 16px;\n  font-family: \"Roboto\";\n  position: relative;\n  border-radius: 2px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n  background-color: #fff;\n}\n\n.vc-material .vc-input__input {\n  width: 100%;\n  margin-top: 12px;\n  font-size: 15px;\n  color: #333;\n  height: 30px;\n}\n\n.vc-material .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 11px;\n  color: #999;\n  text-transform: capitalize;\n}\n\n.vc-material-hex {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.vc-material-split {\n  display: flex;\n  margin-right: -10px;\n  padding-top: 11px;\n}\n.vc-material-third {\n  flex: 1;\n  padding-right: 10px;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$3 = normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

  var _dec$4, _dec2$1, _dec3$1, _class$5, _class2$3, _descriptor$3, _descriptor2$1, _temp$4;
  var Hue = (_dec$4 = Prop({
    "default": 'horizontal'
  }), _dec2$1 = Ref('container'), _dec3$1 = Watch('hsl'), Component(_class$5 = (_class2$3 = (_temp$4 = /*#__PURE__*/function (_mixins) {
    _inherits(Hue, _mixins);

    var _super = _createSuper(Hue);

    function Hue() {
      var _this;

      _classCallCheck(this, Hue);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "direction", _descriptor$3, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "container", _descriptor2$1, _assertThisInitialized(_this));

      _this.oldHue = 0;
      _this.pullDirection = '';
      _this.containerWidth = 0;
      _this.containerHeight = 0;
      _this.xOffset = 0;
      _this.yOffset = 0;
      return _this;
    }

    _createClass(Hue, [{
      key: "onHSLChanged",
      value: function onHSLChanged(val) {
        var h = val.h;
        if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
        if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';
        this.oldHue = h;
      }
    }, {
      key: "mounted",
      value: function mounted() {
        var $container = this.container;
        this.containerWidth = $container.clientWidth;
        this.containerHeight = $container.clientHeight;
        this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
        this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset;
      }
    }, {
      key: "handleChange",
      value: function handleChange(pageX, pageY) {
        var h;
        var percent;
        var containerWidth = this.containerWidth,
            containerHeight = this.containerHeight,
            xOffset = this.xOffset,
            yOffset = this.yOffset;
        var left = pageX - xOffset;
        var top = pageY - yOffset;

        if (this.direction === 'vertical') {
          if (top < 0) {
            h = 360;
          } else if (top > containerHeight) {
            h = 0;
          } else {
            percent = -(top * 100 / containerHeight) + 100;
            h = 360 * percent / 100;
          }
        } else {
          if (left < 0) {
            h = 0;
          } else if (left > containerWidth) {
            h = 360;
          } else {
            percent = left * 100 / containerWidth;
            h = 360 * percent / 100;
          }
        }

        if (this.hsl.h !== h) {
          this.onColorChange(_objectSpread2({}, this.hsl, {}, {
            h: h
          }));
        }
      }
    }, {
      key: "handleTouchEvnet",
      value: function handleTouchEvnet(e) {
        e.preventDefault();
        this.handleChange(e.touches ? e.touches[0].pageX : 0, e.touches ? e.touches[0].pageY : 0);
      }
    }, {
      key: "handleMouseDown",
      value: function handleMouseDown(e) {
        this.handleChange(e.pageX, e.pageY);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "handleMouseMove",
      value: function handleMouseMove(e) {
        this.handleChange(e.pageX, e.pageY);
      }
    }, {
      key: "handleMouseUp",
      value: function handleMouseUp()
      /*e*/
      {
        this.unbindEventListeners();
      }
    }, {
      key: "unbindEventListeners",
      value: function unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "hsl",
      get: function get() {
        return this.tc.toHsl();
      }
    }, {
      key: "directionClass",
      get: function get() {
        return {
          'vc-hue--horizontal': this.direction === 'horizontal',
          'vc-hue--vertical': this.direction === 'vertical'
        };
      }
    }, {
      key: "pointerTop",
      get: function get() {
        var top = 0;

        if (this.direction === 'vertical') {
          if (this.hsl.h === 0 && this.pullDirection === 'right') {
            top = 0;
          } else {
            top = -(this.hsl.h * 100 / 360) + 100;
          }
        }

        return "".concat(top, "%");
      }
    }, {
      key: "pointerLeft",
      get: function get() {
        var left = 0;

        if (this.direction === 'horizontal') {
          if (this.hsl.h === 0 && this.pullDirection === 'right') {
            left = 100;
          } else {
            left = this.hsl.h * 100 / 360;
          }
        }

        return "".concat(left, "%");
      }
    }]);

    return Hue;
  }(mixins(Color)), _temp$4), (_descriptor$3 = _applyDecoratedDescriptor(_class2$3.prototype, "direction", [_dec$4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$3.prototype, "container", [_dec2$1], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2$3.prototype, "onHSLChanged", [_dec3$1], Object.getOwnPropertyDescriptor(_class2$3.prototype, "onHSLChanged"), _class2$3.prototype)), _class2$3)) || _class$5);

  /* script */
  var __vue_script__$4 = Hue;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      "class": ["vc-hue", _vm.directionClass],
      attrs: {
        role: "HuePanel"
      }
    }, [_c("div", {
      ref: "container",
      staticClass: "vc-hue-container",
      on: {
        mousedown: _vm.handleMouseDown,
        touchmove: _vm.handleTouchEvnet,
        touchstart: _vm.handleTouchEvnet
      }
    }, [_c("div", {
      staticClass: "vc-hue-pointer",
      style: {
        top: _vm.pointerTop,
        left: _vm.pointerLeft
      },
      attrs: {
        role: "CurrentHuePointer"
      }
    }, [_c("div", {
      staticClass: "vc-hue-picker"
    })])])]);
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-e7898c56_0", {
      source: "\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px);\n}\n.vc-hue--vertical .vc-hue-picker {\n  transform: translateX(-2px) translateY(-50%);\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Hue.vue"],
        "names": [],
        "mappings": ";AAyJA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,kBAAA;AACA;AACA;EACA,2GAAA;AACA;AACA;EACA,yGAAA;AACA;AACA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,2BAAA;AACA;AACA;EACA,4CAAA;AACA",
        "file": "Hue.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"HuePanel\"\n    :class=\"['vc-hue', directionClass]\"\n  >\n    <div\n      ref=\"container\"\n      class=\"vc-hue-container\"\n      @mousedown=\"handleMouseDown\"\n      @touchmove=\"handleTouchEvnet\"\n      @touchstart=\"handleTouchEvnet\"\n    >\n      <div\n        role=\"CurrentHuePointer\"\n        class=\"vc-hue-pointer\"\n        :style=\"{top: pointerTop, left: pointerLeft}\"\n      >\n        <div class=\"vc-hue-picker\" />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\n\n@Component\nexport default class Hue extends mixins(Color) {\n\n  @Prop({ default: 'horizontal' }) readonly direction!: 'horizontal' | 'vertical'\n\n  @Ref('container') readonly container!: HTMLDivElement\n\n  oldHue = 0;\n  pullDirection = '';\n  containerWidth = 0;\n  containerHeight = 0;\n  xOffset = 0;\n  yOffset = 0;\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get directionClass() {\n    return {\n      'vc-hue--horizontal': this.direction === 'horizontal',\n      'vc-hue--vertical': this.direction === 'vertical'\n    }\n  }\n\n  get pointerTop() {\n    let top = 0;\n    if (this.direction === 'vertical') {\n      if (this.hsl.h === 0 && this.pullDirection === 'right') {\n        top = 0\n      } else {\n        top = -((this.hsl.h * 100) / 360) + 100\n      }\n    }\n    return `${top}%`;\n  }\n\n  get pointerLeft() {\n    let left = 0;\n    if (this.direction === 'horizontal') {\n      if (this.hsl.h === 0 && this.pullDirection === 'right') {\n        left = 100\n      } else {\n        left = (this.hsl.h * 100) / 360\n      }\n    }\n    return `${left}%`;\n  }\n\n  @Watch('hsl')\n  onHSLChanged(val: tinycolor.ColorFormats.HSLA) {\n    const h = val.h\n    if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'\n    if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'\n    this.oldHue = h\n  }\n\n  mounted() {\n    const $container = this.container;\n    this.containerWidth = $container.clientWidth\n    this.containerHeight = $container.clientHeight\n\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset\n  }\n\n  handleChange(pageX: number, pageY: number) {\n    let h\n    let percent\n    const { containerWidth, containerHeight, xOffset, yOffset } = this;\n    const left = pageX - xOffset\n    const top = pageY - yOffset\n\n    if (this.direction === 'vertical') {\n      if (top < 0) {\n        h = 360\n      } else if (top > containerHeight) {\n        h = 0\n      } else {\n        percent = -(top * 100 / containerHeight) + 100\n        h = (360 * percent / 100)\n      }\n    } else {\n      if (left < 0) {\n        h = 0\n      } else if (left > containerWidth) {\n        h = 360\n      } else {\n        percent = left * 100 / containerWidth\n        h = (360 * percent / 100)\n      }\n    }\n\n    if (this.hsl.h !== h) {\n      this.onColorChange({...this.hsl, ...{ h }});\n    }\n  }\n\n  handleTouchEvnet(e: TouchEvent) {\n    e.preventDefault();\n    this.handleChange(e.touches ? e.touches[0].pageX : 0, e.touches ? e.touches[0].pageY : 0);\n  }\n\n  handleMouseDown(e: MouseEvent) {\n    this.handleChange(e.pageX, e.pageY);\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n\n  handleMouseMove(e: MouseEvent) {\n    this.handleChange(e.pageX, e.pageY);\n  }\n\n  handleMouseUp (/*e*/) {\n    this.unbindEventListeners()\n  }\n\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n}\n</script>\n\n<style>\n.vc-hue {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\n  cursor: pointer;\n  margin: 0 2px;\n  position: relative;\n  height: 100%;\n}\n.vc-hue-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-hue-picker {\n  cursor: pointer;\n  margin-top: 1px;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  transform: translateX(-2px);\n}\n.vc-hue--vertical .vc-hue-picker {\n  transform: translateX(-2px) translateY(-50%);\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$4 = normalizeComponent({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

  var _dec$5, _dec2$2, _class$6, _class2$4, _descriptor$4, _temp$5;
  var Slider = (_dec$5 = Component({
    components: {
      Hue: __vue_component__$4
    }
  }), _dec2$2 = Prop({
    "default": function _default() {
      return ['.80', '.65', '.50', '.35', '.20'];
    }
  }), _dec$5(_class$6 = (_class2$4 = (_temp$5 = /*#__PURE__*/function (_mixins) {
    _inherits(Slider, _mixins);

    var _super = _createSuper(Slider);

    function Slider() {
      var _this;

      _classCallCheck(this, Slider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "swatches", _descriptor$4, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(Slider, [{
      key: "handleSwClick",
      value: function handleSwClick(offset) {
        this.onColorChange(_objectSpread2({}, this.hsl, {
          s: 0.5,
          l: offset
        }));
      }
    }, {
      key: "hsl",
      get: function get() {
        return this.tc.toHsl();
      }
    }, {
      key: "activeOffset",
      get: function get() {
        var hasBlack = this.swatches.includes('0');
        var hasWhite = this.swatches.includes('1');
        var hsl = this.hsl;

        if (Math.round(hsl.s * 100) / 100 === 0.50) {
          return Math.round(hsl.l * 100) / 100;
        } else if (hasBlack && hsl.l === 0) {
          return 0;
        } else if (hasWhite && hsl.l === 1) {
          return 1;
        }

        return -1;
      }
    }]);

    return Slider;
  }(mixins(Color)), _temp$5), (_descriptor$4 = _applyDecoratedDescriptor(_class2$4.prototype, "swatches", [_dec2$2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$4)) || _class$6);

  /* script */
  var __vue_script__$5 = Slider;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-slider",
      attrs: {
        role: "SliderColorPicker"
      }
    }, [_c("div", {
      staticClass: "vc-slider-hue-warp"
    }, [_c("Hue", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-slider-swatches",
      attrs: {
        role: "group"
      }
    }, _vm._l(_vm.swatches, function (offset, index) {
      return _c("div", {
        key: index,
        staticClass: "vc-slider-swatch",
        attrs: {
          "data-index": index
        },
        on: {
          click: function click($event) {
            return _vm.handleSwClick(offset);
          }
        }
      }, [_c("div", {
        staticClass: "vc-slider-swatch-picker",
        "class": {
          "vc-slider-swatch-picker--active": offset == _vm.activeOffset,
          "vc-slider-swatch-picker--white": offset === "1"
        },
        style: {
          background: "hsl(" + _vm.hsl.h + ", 50%, " + offset * 100 + "%)"
        },
        attrs: {
          "aria-label": "color:" + "hsl(" + _vm.hsl.h + ", 50%, " + offset * 100 + "%)"
        }
      })]);
    }), 0)]);
  };

  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;
  /* style */

  var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-ae3a2f14_0", {
      source: "\n.vc-slider {\n  position: relative;\n  width: 410px;\n}\n.vc-slider-hue-warp {\n  height: 12px;\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\n  width: 14px;\n  height: 14px;\n  border-radius: 6px;\n  transform: translate(-7px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\n  display: flex;\n  margin-top: 20px;\n}\n.vc-slider-swatch {\n  margin-right: 1px;\n  flex: 1;\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\n  cursor: pointer;\n  height: 12px;\n}\n.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {\n  transform: scaleY(1.8);\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Slider.vue"],
        "names": [],
        "mappings": ";AA6EA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,oCAAA;EACA,2CAAA;AACA;AACA;EACA,aAAA;EACA,gBAAA;AACA;AACA;EACA,iBAAA;EACA,OAAA;EACA,UAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,eAAA;EACA,YAAA;AACA;AACA;EACA,sBAAA;EACA,wBAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,kCAAA;AACA",
        "file": "Slider.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"SliderColorPicker\"\n    class=\"vc-slider\"\n  >\n    <div class=\"vc-slider-hue-warp\">\n      <Hue\n        :value=\"tc\"\n        @change=\"onColorChange\"\n      />\n    </div>\n    <div\n      role=\"group\"\n      class=\"vc-slider-swatches\"\n    >\n      <div\n        v-for=\"(offset, index) in swatches\"\n        :key=\"index\"\n        :data-index=\"index\"\n        class=\"vc-slider-swatch\"\n        @click=\"handleSwClick(offset)\"\n      >\n        <div\n          class=\"vc-slider-swatch-picker\"\n          :aria-label=\"'color:' + 'hsl(' + hsl.h + ', 50%, ' + (offset * 100) + '%)'\"\n          :class=\"{'vc-slider-swatch-picker--active': offset == activeOffset, 'vc-slider-swatch-picker--white': offset === '1'}\"\n          :style=\"{background: 'hsl(' + hsl.h + ', 50%, ' + (offset * 100) + '%)'}\"\n        />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nimport Hue from './common/Hue.vue'\n\n@Component({\n  components: { Hue }\n})\nexport default class Slider extends mixins(Color) {\n  @Prop({default: () => ['.80', '.65', '.50', '.35', '.20']})\n  swatches!: string[];\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get activeOffset() {\n    const hasBlack = this.swatches.includes('0');\n    const hasWhite = this.swatches.includes('1');\n    const hsl = this.hsl;\n\n    if (Math.round(hsl.s * 100) / 100 === 0.50) {\n      return Math.round(hsl.l * 100) / 100;\n    } else if (hasBlack && hsl.l === 0) {\n      return 0;\n    } else if (hasWhite && hsl.l === 1) {\n      return 1;\n    }\n    return -1;\n  }\n\n  handleSwClick(offset) {\n    this.onColorChange({\n      ...this.hsl,\n      s: 0.5,\n      l: offset\n    })\n  }\n}\n</script>\n\n<style>\n.vc-slider {\n  position: relative;\n  width: 410px;\n}\n.vc-slider-hue-warp {\n  height: 12px;\n  position: relative;\n}\n.vc-slider-hue-warp .vc-hue-picker {\n  width: 14px;\n  height: 14px;\n  border-radius: 6px;\n  transform: translate(-7px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-slider-swatches {\n  display: flex;\n  margin-top: 20px;\n}\n.vc-slider-swatch {\n  margin-right: 1px;\n  flex: 1;\n  width: 20%;\n}\n.vc-slider-swatch:first-child {\n  margin-right: 1px;\n}\n.vc-slider-swatch:first-child .vc-slider-swatch-picker {\n  border-radius: 2px 0px 0px 2px;\n}\n.vc-slider-swatch:last-child {\n  margin-right: 0;\n}\n.vc-slider-swatch:last-child .vc-slider-swatch-picker {\n  border-radius: 0px 2px 2px 0px;\n}\n.vc-slider-swatch-picker {\n  cursor: pointer;\n  height: 12px;\n}\n.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {\n  transform: scaleY(1.8);\n  border-radius: 3.6px/2px;\n}\n.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 1px #ddd;\n}\n.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {\n  box-shadow: inset 0 0 0 0.6px #ddd;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$5 = normalizeComponent({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

  var red = {
    "50": "#ffebee",
    "100": "#ffcdd2",
    "200": "#ef9a9a",
    "300": "#e57373",
    "400": "#ef5350",
    "500": "#f44336",
    "600": "#e53935",
    "700": "#d32f2f",
    "800": "#c62828",
    "900": "#b71c1c",
    "a100": "#ff8a80",
    "a200": "#ff5252",
    "a400": "#ff1744",
    "a700": "#d50000"
  };
  var pink = {
    "50": "#fce4ec",
    "100": "#f8bbd0",
    "200": "#f48fb1",
    "300": "#f06292",
    "400": "#ec407a",
    "500": "#e91e63",
    "600": "#d81b60",
    "700": "#c2185b",
    "800": "#ad1457",
    "900": "#880e4f",
    "a100": "#ff80ab",
    "a200": "#ff4081",
    "a400": "#f50057",
    "a700": "#c51162"
  };
  var purple = {
    "50": "#f3e5f5",
    "100": "#e1bee7",
    "200": "#ce93d8",
    "300": "#ba68c8",
    "400": "#ab47bc",
    "500": "#9c27b0",
    "600": "#8e24aa",
    "700": "#7b1fa2",
    "800": "#6a1b9a",
    "900": "#4a148c",
    "a100": "#ea80fc",
    "a200": "#e040fb",
    "a400": "#d500f9",
    "a700": "#aa00ff"
  };
  var deepPurple = {
    "50": "#ede7f6",
    "100": "#d1c4e9",
    "200": "#b39ddb",
    "300": "#9575cd",
    "400": "#7e57c2",
    "500": "#673ab7",
    "600": "#5e35b1",
    "700": "#512da8",
    "800": "#4527a0",
    "900": "#311b92",
    "a100": "#b388ff",
    "a200": "#7c4dff",
    "a400": "#651fff",
    "a700": "#6200ea"
  };
  var indigo = {
    "50": "#e8eaf6",
    "100": "#c5cae9",
    "200": "#9fa8da",
    "300": "#7986cb",
    "400": "#5c6bc0",
    "500": "#3f51b5",
    "600": "#3949ab",
    "700": "#303f9f",
    "800": "#283593",
    "900": "#1a237e",
    "a100": "#8c9eff",
    "a200": "#536dfe",
    "a400": "#3d5afe",
    "a700": "#304ffe"
  };
  var blue = {
    "50": "#e3f2fd",
    "100": "#bbdefb",
    "200": "#90caf9",
    "300": "#64b5f6",
    "400": "#42a5f5",
    "500": "#2196f3",
    "600": "#1e88e5",
    "700": "#1976d2",
    "800": "#1565c0",
    "900": "#0d47a1",
    "a100": "#82b1ff",
    "a200": "#448aff",
    "a400": "#2979ff",
    "a700": "#2962ff"
  };
  var lightBlue = {
    "50": "#e1f5fe",
    "100": "#b3e5fc",
    "200": "#81d4fa",
    "300": "#4fc3f7",
    "400": "#29b6f6",
    "500": "#03a9f4",
    "600": "#039be5",
    "700": "#0288d1",
    "800": "#0277bd",
    "900": "#01579b",
    "a100": "#80d8ff",
    "a200": "#40c4ff",
    "a400": "#00b0ff",
    "a700": "#0091ea"
  };
  var cyan = {
    "50": "#e0f7fa",
    "100": "#b2ebf2",
    "200": "#80deea",
    "300": "#4dd0e1",
    "400": "#26c6da",
    "500": "#00bcd4",
    "600": "#00acc1",
    "700": "#0097a7",
    "800": "#00838f",
    "900": "#006064",
    "a100": "#84ffff",
    "a200": "#18ffff",
    "a400": "#00e5ff",
    "a700": "#00b8d4"
  };
  var teal = {
    "50": "#e0f2f1",
    "100": "#b2dfdb",
    "200": "#80cbc4",
    "300": "#4db6ac",
    "400": "#26a69a",
    "500": "#009688",
    "600": "#00897b",
    "700": "#00796b",
    "800": "#00695c",
    "900": "#004d40",
    "a100": "#a7ffeb",
    "a200": "#64ffda",
    "a400": "#1de9b6",
    "a700": "#00bfa5"
  };
  var green = {
    "50": "#e8f5e9",
    "100": "#c8e6c9",
    "200": "#a5d6a7",
    "300": "#81c784",
    "400": "#66bb6a",
    "500": "#4caf50",
    "600": "#43a047",
    "700": "#388e3c",
    "800": "#2e7d32",
    "900": "#1b5e20",
    "a100": "#b9f6ca",
    "a200": "#69f0ae",
    "a400": "#00e676",
    "a700": "#00c853"
  };
  var lightGreen = {
    "50": "#f1f8e9",
    "100": "#dcedc8",
    "200": "#c5e1a5",
    "300": "#aed581",
    "400": "#9ccc65",
    "500": "#8bc34a",
    "600": "#7cb342",
    "700": "#689f38",
    "800": "#558b2f",
    "900": "#33691e",
    "a100": "#ccff90",
    "a200": "#b2ff59",
    "a400": "#76ff03",
    "a700": "#64dd17"
  };
  var lime = {
    "50": "#f9fbe7",
    "100": "#f0f4c3",
    "200": "#e6ee9c",
    "300": "#dce775",
    "400": "#d4e157",
    "500": "#cddc39",
    "600": "#c0ca33",
    "700": "#afb42b",
    "800": "#9e9d24",
    "900": "#827717",
    "a100": "#f4ff81",
    "a200": "#eeff41",
    "a400": "#c6ff00",
    "a700": "#aeea00"
  };
  var yellow = {
    "50": "#fffde7",
    "100": "#fff9c4",
    "200": "#fff59d",
    "300": "#fff176",
    "400": "#ffee58",
    "500": "#ffeb3b",
    "600": "#fdd835",
    "700": "#fbc02d",
    "800": "#f9a825",
    "900": "#f57f17",
    "a100": "#ffff8d",
    "a200": "#ffff00",
    "a400": "#ffea00",
    "a700": "#ffd600"
  };
  var amber = {
    "50": "#fff8e1",
    "100": "#ffecb3",
    "200": "#ffe082",
    "300": "#ffd54f",
    "400": "#ffca28",
    "500": "#ffc107",
    "600": "#ffb300",
    "700": "#ffa000",
    "800": "#ff8f00",
    "900": "#ff6f00",
    "a100": "#ffe57f",
    "a200": "#ffd740",
    "a400": "#ffc400",
    "a700": "#ffab00"
  };
  var orange = {
    "50": "#fff3e0",
    "100": "#ffe0b2",
    "200": "#ffcc80",
    "300": "#ffb74d",
    "400": "#ffa726",
    "500": "#ff9800",
    "600": "#fb8c00",
    "700": "#f57c00",
    "800": "#ef6c00",
    "900": "#e65100",
    "a100": "#ffd180",
    "a200": "#ffab40",
    "a400": "#ff9100",
    "a700": "#ff6d00"
  };
  var deepOrange = {
    "50": "#fbe9e7",
    "100": "#ffccbc",
    "200": "#ffab91",
    "300": "#ff8a65",
    "400": "#ff7043",
    "500": "#ff5722",
    "600": "#f4511e",
    "700": "#e64a19",
    "800": "#d84315",
    "900": "#bf360c",
    "a100": "#ff9e80",
    "a200": "#ff6e40",
    "a400": "#ff3d00",
    "a700": "#dd2c00"
  };
  var brown = {
    "50": "#efebe9",
    "100": "#d7ccc8",
    "200": "#bcaaa4",
    "300": "#a1887f",
    "400": "#8d6e63",
    "500": "#795548",
    "600": "#6d4c41",
    "700": "#5d4037",
    "800": "#4e342e",
    "900": "#3e2723"
  };
  var grey = {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#eeeeee",
    "300": "#e0e0e0",
    "400": "#bdbdbd",
    "500": "#9e9e9e",
    "600": "#757575",
    "700": "#616161",
    "800": "#424242",
    "900": "#212121"
  };
  var blueGrey = {
    "50": "#eceff1",
    "100": "#cfd8dc",
    "200": "#b0bec5",
    "300": "#90a4ae",
    "400": "#78909c",
    "500": "#607d8b",
    "600": "#546e7a",
    "700": "#455a64",
    "800": "#37474f",
    "900": "#263238"
  };
  var darkText = {
    "primary": "rgba(0, 0, 0, 0.87)",
    "secondary": "rgba(0, 0, 0, 0.54)",
    "disabled": "rgba(0, 0, 0, 0.38)",
    "dividers": "rgba(0, 0, 0, 0.12)"
  };
  var lightText = {
    "primary": "rgba(255, 255, 255, 1)",
    "secondary": "rgba(255, 255, 255, 0.7)",
    "disabled": "rgba(255, 255, 255, 0.5)",
    "dividers": "rgba(255, 255, 255, 0.12)"
  };
  var darkIcons = {
    "active": "rgba(0, 0, 0, 0.54)",
    "inactive": "rgba(0, 0, 0, 0.38)"
  };
  var lightIcons = {
    "active": "rgba(255, 255, 255, 1)",
    "inactive": "rgba(255, 255, 255, 0.5)"
  };
  var white = "#ffffff";
  var black = "#000000";
  var material = {
    red: red,
    pink: pink,
    purple: purple,
    deepPurple: deepPurple,
    indigo: indigo,
    blue: blue,
    lightBlue: lightBlue,
    cyan: cyan,
    teal: teal,
    green: green,
    lightGreen: lightGreen,
    lime: lime,
    yellow: yellow,
    amber: amber,
    orange: orange,
    deepOrange: deepOrange,
    brown: brown,
    grey: grey,
    blueGrey: blueGrey,
    darkText: darkText,
    lightText: lightText,
    darkIcons: darkIcons,
    lightIcons: lightIcons,
    white: white,
    black: black
  };

  var _dec$6, _class$7, _class2$5, _descriptor$5, _temp$6;
  var colorMap = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey', 'black'];
  var colorLevel = ['900', '700', '500', '300', '100'];

  var defaultPalatte$1 = function defaultPalatte() {
    var colors = [];
    colorMap.forEach(function (color) {
      var typeColor = [];

      if (color.toLowerCase() === 'black' || color.toLowerCase() === 'white') {
        typeColor = typeColor.concat(['#000000', '#FFFFFF']);
      } else {
        colorLevel.forEach(function (level) {
          var c = material[color][level];
          typeColor.push(c.toUpperCase());
        });
      }

      colors.push(typeColor);
    });
    return colors;
  };

  var Swatches = (_dec$6 = Prop({
    "default": defaultPalatte$1
  }), Component(_class$7 = (_class2$5 = (_temp$6 = /*#__PURE__*/function (_mixins) {
    _inherits(Swatches, _mixins);

    var _super = _createSuper(Swatches);

    function Swatches() {
      var _this;

      _classCallCheck(this, Swatches);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "palette", _descriptor$5, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(Swatches, [{
      key: "handlerClick",
      value: function handlerClick(value) {
        this.onColorChange(value);
      }
    }, {
      key: "pick",
      get: function get() {
        if (this.tc === null) {
          return '';
        }

        return this.tc.toHexString();
      }
    }]);

    return Swatches;
  }(mixins(Color)), _temp$6), (_descriptor$5 = _applyDecoratedDescriptor(_class2$5.prototype, "palette", [_dec$6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$5)) || _class$7);

  /* script */
  var __vue_script__$6 = Swatches;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-swatches",
      attrs: {
        role: "SwatchesColorPicker",
        "data-pick": _vm.pick
      }
    }, [_c("div", {
      staticClass: "vc-swatches-box",
      attrs: {
        role: "group"
      }
    }, _vm._l(_vm.palette, function (group, $idx) {
      return _c("div", {
        key: $idx,
        staticClass: "vc-swatches-color-group"
      }, _vm._l(group, function (c) {
        return _c("div", {
          key: c,
          "class": ["vc-swatches-color-it", {
            "vc-swatches-color--white": c === "#FFFFFF"
          }],
          style: {
            background: c
          },
          attrs: {
            "aria-label": "Color:" + c,
            "data-color": c
          },
          on: {
            click: function click($event) {
              return _vm.handlerClick(c);
            }
          }
        }, [_c("div", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: _vm.equals(c),
            expression: "equals(c)"
          }],
          staticClass: "vc-swatches-pick"
        }, [_c("svg", {
          staticStyle: {
            width: "24px",
            height: "24px"
          },
          attrs: {
            viewBox: "0 0 24 24"
          }
        }, [_c("path", {
          attrs: {
            d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
          }
        })])])]);
      }), 0);
    }), 0)]);
  };

  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;
  /* style */

  var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-1de4e1e7_0", {
      source: "\n.vc-swatches {\n  width: 320px;\n  height: 240px;\n  overflow-y: scroll;\n  background-color: #fff;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\n  padding: 16px 0 6px 16px;\n  overflow: hidden;\n}\n.vc-swatches-color-group {\n  padding-bottom: 10px;\n  width: 40px;\n  float: left;\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\n  box-sizing: border-box;\n  width: 40px;\n  height: 24px;\n  cursor: pointer;\n  background: #880e4f;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -ms-border-radius: 2px 2px 0 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -o-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\n  fill: rgb(255, 255, 255);\n  margin-left: 8px;\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\n  fill: rgb(51, 51, 51);\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Swatches.vue"],
        "names": [],
        "mappings": ";AA2FA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,sBAAA;EACA,iEAAA;AACA;AACA;EACA,wBAAA;EACA,gBAAA;AACA;AACA;EACA,oBAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;AACA;AACA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,8BAAA;EACA,+BAAA;EACA,6BAAA;EACA,kCAAA;EACA,0BAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,wBAAA;EACA,gBAAA;EACA,cAAA;AACA;AACA;EACA,qBAAA;AACA",
        "file": "Swatches.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"SwatchesColorPicker\"\n    class=\"vc-swatches\"\n    :data-pick=\"pick\"\n  >\n    <div\n      role=\"group\"\n      class=\"vc-swatches-box\"\n    >\n      <div\n        v-for=\"(group, $idx) in palette\"\n        :key=\"$idx\"\n        class=\"vc-swatches-color-group\"\n      >\n        <div\n          v-for=\"c in group\"\n          :key=\"c\"\n          :aria-label=\"'Color:' + c\"\n          :class=\"['vc-swatches-color-it', {'vc-swatches-color--white': c === '#FFFFFF' }]\"\n          :data-color=\"c\"\n          :style=\"{background: c}\"\n          @click=\"handlerClick(c)\"\n        >\n          <div\n            v-show=\"equals(c)\"\n            class=\"vc-swatches-pick\"\n          >\n            <svg\n              style=\"width: 24px; height:24px;\"\n              viewBox=\"0 0 24 24\"\n            >\n              <path d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\" />\n            </svg>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport material from 'material-colors';\nimport { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\n\nconst colorMap = [\n  'red', 'pink', 'purple', 'deepPurple',\n  'indigo', 'blue', 'lightBlue', 'cyan',\n  'teal', 'green', 'lightGreen', 'lime',\n  'yellow', 'amber', 'orange', 'deepOrange',\n  'brown', 'blueGrey', 'black'\n];\nconst colorLevel = ['900', '700', '500', '300', '100'];\nconst defaultPalatte = () => {\n  const colors: string[][] = [];\n  colorMap.forEach((color) => {\n    let typeColor: string[] = [];\n    if (color.toLowerCase() === 'black' || color.toLowerCase() === 'white') {\n      typeColor = typeColor.concat(['#000000', '#FFFFFF'])\n    } else {\n      colorLevel.forEach((level) => {\n        const c = material[color][level]\n        typeColor.push(c.toUpperCase())\n      })\n    }\n    colors.push(typeColor)\n  })\n  return colors\n}\n\n@Component\nexport default class Swatches extends mixins(Color) {\n  @Prop({default: defaultPalatte})\n  readonly palette!: string[][];\n\n  get pick() {\n    if (this.tc === null) {\n      return '';\n    }\n    return this.tc.toHexString();\n  }\n\n  handlerClick(value: string) {\n    this.onColorChange(value);\n  }\n}\n</script>\n\n<style>\n.vc-swatches {\n  width: 320px;\n  height: 240px;\n  overflow-y: scroll;\n  background-color: #fff;\n  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);\n}\n.vc-swatches-box {\n  padding: 16px 0 6px 16px;\n  overflow: hidden;\n}\n.vc-swatches-color-group {\n  padding-bottom: 10px;\n  width: 40px;\n  float: left;\n  margin-right: 10px;\n}\n.vc-swatches-color-it {\n  box-sizing: border-box;\n  width: 40px;\n  height: 24px;\n  cursor: pointer;\n  background: #880e4f;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -ms-border-radius: 2px 2px 0 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -o-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n}\n.vc-swatches-color--white {\n  border: 1px solid #DDD;\n}\n.vc-swatches-pick {\n  fill: rgb(255, 255, 255);\n  margin-left: 8px;\n  display: block;\n}\n.vc-swatches-color--white .vc-swatches-pick {\n  fill: rgb(51, 51, 51);\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$6 = normalizeComponent({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';
  /** Used as references for various `Number` constants. */

  var NAN$1 = 0 / 0;
  /** `Object#toString` result references. */

  var symbolTag$1 = '[object Symbol]';
  /** Used to match leading and trailing whitespace. */

  var reTrim$1 = /^\s+|\s+$/g;
  /** Used to detect bad signed hexadecimal string values. */

  var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;
  /** Used to detect binary string values. */

  var reIsBinary$1 = /^0b[01]+$/i;
  /** Used to detect octal string values. */

  var reIsOctal$1 = /^0o[0-7]+$/i;
  /** Built-in method references without a dependency on `root`. */

  var freeParseInt$1 = parseInt;
  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();
  /** Used for built-in method references. */

  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString$1 = objectProto$1.toString;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax$1 = Math.max,
      nativeMin$1 = Math.min;
  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */

  var now$1 = function () {
    return root$1.Date.now();
  };
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */


  function debounce$1(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }

    wait = toNumber$1$1(wait) || 0;

    if (isObject$1$1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax$1(toNumber$1$1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;
      return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now$1();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now$1());
    }

    function debounced() {
      var time = now$1(),
          isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }

      return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */


  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }

    if (isObject$1$1(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce$1(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */


  function isObject$1$1(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike$1(value) {
    return !!value && typeof value == 'object';
  }
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */


  function isSymbol$1(value) {
    return typeof value == 'symbol' || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1;
  }
  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */


  function toNumber$1$1(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol$1(value)) {
      return NAN$1;
    }

    if (isObject$1$1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$1$1(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim$1, '');
    var isBinary = reIsBinary$1.test(value);
    return isBinary || reIsOctal$1.test(value) ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8) : reIsBadHex$1.test(value) ? NAN$1 : +value;
  }

  var lodash_throttle = throttle;

  var _dec$7, _class$8, _class2$6, _descriptor$6, _temp$7;
  var Saturation = (_dec$7 = Ref('container'), Component(_class$8 = (_class2$6 = (_temp$7 = /*#__PURE__*/function (_mixins) {
    _inherits(Saturation, _mixins);

    var _super = _createSuper(Saturation);

    function Saturation() {
      var _this;

      _classCallCheck(this, Saturation);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.containerWidth = 0;
      _this.containerHeight = 0;
      _this.xOffset = 0;
      _this.yOffset = 0;
      _this.lastMouseEvent = '';
      _this.throttle = lodash_throttle(function (fn, data) {
        fn(data);
      }, 20, {
        'leading': true,
        'trailing': false
      });

      _initializerDefineProperty(_this, "container", _descriptor$6, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(Saturation, [{
      key: "mounted",
      value: function mounted() {
        var $container = this.$refs.container;
        this.containerWidth = $container.clientWidth;
        this.containerHeight = $container.clientHeight;
        this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
        this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset;
      }
    }, {
      key: "handleChange",
      value: function handleChange(pageX, pageY) {
        // !skip && e.preventDefault()
        var containerWidth = this.containerWidth,
            containerHeight = this.containerHeight,
            xOffset = this.xOffset,
            yOffset = this.yOffset;
        var left = clamp_1(pageX - xOffset, 0, containerWidth);
        var top = clamp_1(pageY - yOffset, 0, containerHeight);
        var saturation = left / containerWidth;
        var bright = clamp_1(-(top / containerHeight) + 1, 0, 1);
        this.throttle(this.onColorChange, _objectSpread2({}, this.hsv, {}, {
          s: saturation,
          v: bright
        }));
      }
    }, {
      key: "handleMouseDown",
      value: function handleMouseDown()
      /* e: MouseEvent */
      {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "handleMouseMove",
      value: function handleMouseMove(e) {
        this.lastMouseEvent = e.type;
        this.handleChange(e.pageX, e.pageY);
      }
    }, {
      key: "handleMouseUp",
      value: function handleMouseUp(e) {
        if (this.lastMouseEvent !== 'mousemove') {
          this.handleChange(e.pageX, e.pageY);
        }

        this.lastMouseEvent = '';
        this.unbindEventListeners();
      }
    }, {
      key: "unbindEventListeners",
      value: function unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "handleTouchEvents",
      value: function handleTouchEvents(e) {
        console.log(e.type);
        var pageX = e.touches ? e.touches[0].pageX : 0;
        var pageY = e.touches ? e.touches[0].pageY : 0;
        this.handleChange(pageX, pageY);
      }
    }, {
      key: "hsv",
      get: function get() {
        return this.tc.toHsv();
      }
    }, {
      key: "bgColor",
      get: function get() {
        return "hsl(".concat(this.hsv.h, ", 100%, 50%)");
      }
    }, {
      key: "pointerTop",
      get: function get() {
        return -(this.hsv.v * 100) + 1 + 100 + '%';
      }
    }, {
      key: "pointerLeft",
      get: function get() {
        return this.hsv.s * 100 + '%';
      }
    }]);

    return Saturation;
  }(mixins(Color)), _temp$7), (_descriptor$6 = _applyDecoratedDescriptor(_class2$6.prototype, "container", [_dec$7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$6)) || _class$8);

  /* script */
  var __vue_script__$7 = Saturation;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      ref: "container",
      staticClass: "vc-saturation",
      style: {
        background: _vm.bgColor
      },
      attrs: {
        role: "SaturationPanel"
      },
      on: {
        mousedown: _vm.handleMouseDown,
        touchmove: _vm.handleTouchEvents,
        touchstart: _vm.handleTouchEvents
      }
    }, [_c("div", {
      staticClass: "vc-saturation--white"
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-saturation--black"
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-saturation-pointer",
      style: {
        top: _vm.pointerTop,
        left: _vm.pointerLeft
      },
      attrs: {
        role: "CurrentSaturationPointer"
      }
    }, [_c("div", {
      staticClass: "vc-saturation-circle"
    })])]);
  };

  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;
  /* style */

  var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-530d886b_0", {
      source: "\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Saturation.vue"],
        "names": [],
        "mappings": ";AAkHA;;;EAGA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,wCAAA,EAAA,+BAAA;AACA;AAEA;EACA,gEAAA;AACA;AACA;EACA,wDAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;EACA,UAAA;EACA,WAAA;EACA,0FAAA;EACA,kBAAA;EACA,gCAAA;AACA",
        "file": "Saturation.vue",
        "sourcesContent": ["<template>\n  <div\n    ref=\"container\"\n    role=\"SaturationPanel\"\n    class=\"vc-saturation\"\n    :style=\"{background: bgColor}\"\n    @mousedown=\"handleMouseDown\"\n    @touchmove=\"handleTouchEvents\"\n    @touchstart=\"handleTouchEvents\"\n  >\n    <div class=\"vc-saturation--white\" />\n    <div class=\"vc-saturation--black\" />\n    <div\n      role=\"CurrentSaturationPointer\"\n      class=\"vc-saturation-pointer\"\n      :style=\"{top: pointerTop, left: pointerLeft}\"\n    >\n      <div class=\"vc-saturation-circle\" />\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Ref } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\nimport clamp from 'clamp';\nimport throttle from 'lodash.throttle';\n\n@Component\nexport default class Saturation extends mixins(Color) {\n  containerWidth = 0;\n  containerHeight = 0;\n  xOffset = 0;\n  yOffset = 0;\n\n  lastMouseEvent = '';\n\n  throttle = throttle((fn, data) => {\n    fn(data)\n  }, 20,\n  {\n    'leading': true,\n    'trailing': false\n  })\n\n  @Ref('container')\n  readonly container!: HTMLDivElement\n\n  get hsv() {\n    return this.tc.toHsv();\n  }\n  get bgColor() {\n    return `hsl(${this.hsv.h}, 100%, 50%)`\n  }\n  get pointerTop () {\n    return (-(this.hsv.v * 100) + 1) + 100 + '%'\n  }\n  get pointerLeft () {\n    return this.hsv.s * 100 + '%'\n  }\n  mounted() {\n    const $container = this.$refs.container as HTMLDivElement;\n    this.containerWidth = $container.clientWidth\n    this.containerHeight = $container.clientHeight\n\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset\n  }\n  handleChange (pageX: number, pageY: number) {\n    // !skip && e.preventDefault()\n    const { containerWidth, containerHeight, xOffset, yOffset } = this;\n    const left = clamp(pageX - xOffset, 0, containerWidth)\n    const top = clamp(pageY - yOffset, 0, containerHeight)\n    const saturation = left / containerWidth\n    const bright = clamp(-(top / containerHeight) + 1, 0, 1)\n\n    this.throttle(this.onColorChange, {\n      ...this.hsv,\n      ... {\n        s: saturation,\n        v: bright,\n      }\n    })\n  }\n  handleMouseDown (/* e: MouseEvent */) {\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n  handleMouseMove(e: MouseEvent) {\n    this.lastMouseEvent = e.type;\n    this.handleChange(e.pageX, e.pageY);\n  }\n  handleMouseUp (e: MouseEvent) {\n    if (this.lastMouseEvent !== 'mousemove') {\n      this.handleChange(e.pageX, e.pageY);\n    }\n    this.lastMouseEvent = '';\n    this.unbindEventListeners()\n  }\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n  handleTouchEvents(e: TouchEvent) {\n    console.log(e.type);\n    const pageX = e.touches ? e.touches[0].pageX : 0;\n    const pageY = e.touches ? e.touches[0].pageY : 0;\n    this.handleChange(pageX, pageY);\n  }\n}\n</script>\n\n<style>\n.vc-saturation,\n.vc-saturation--white,\n.vc-saturation--black {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n\n.vc-saturation--white {\n  background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n}\n.vc-saturation--black {\n  background: linear-gradient(to top, #000, rgba(0,0,0,0));\n}\n.vc-saturation-pointer {\n  cursor: pointer;\n  position: absolute;\n}\n.vc-saturation-circle {\n  cursor: head;\n  width: 4px;\n  height: 4px;\n  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);\n  border-radius: 50%;\n  transform: translate(-2px, -2px);\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$7 = normalizeComponent({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

  var _dec$8, _dec2$3, _dec3$2, _dec4$1, _dec5$1, _dec6, _dec7, _class$9, _class2$7, _descriptor$7, _descriptor2$2, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6, _temp$8;
  var Photoshop = (_dec$8 = Component({
    components: {
      Saturation: __vue_component__$7,
      Hue: __vue_component__$4,
      EditableInput: __vue_component__$2
    }
  }), _dec2$3 = Prop({
    "default": 'Color Picker'
  }), _dec3$2 = Prop({
    "default": false
  }), _dec4$1 = Prop({
    "default": false
  }), _dec5$1 = Prop({
    "default": 'OK'
  }), _dec6 = Prop({
    "default": 'Cancel'
  }), _dec7 = Prop({
    "default": 'Reset'
  }), _dec$8(_class$9 = (_class2$7 = (_temp$8 = /*#__PURE__*/function (_mixins) {
    _inherits(Photoshop, _mixins);

    var _super = _createSuper(Photoshop);

    function Photoshop() {
      var _this;

      _classCallCheck(this, Photoshop);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "head", _descriptor$7, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "disableFields", _descriptor2$2, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "hasResetButton", _descriptor3$1, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "acceptLabel", _descriptor4$1, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "cancelLabel", _descriptor5$1, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "resetLabel", _descriptor6, _assertThisInitialized(_this));

      _this.currentColor = null;
      return _this;
    }

    _createClass(Photoshop, [{
      key: "mounted",
      value: function mounted() {
        this.currentColor = this.tc.toHexString();
      }
    }, {
      key: "inputChange",
      value: function inputChange(label, color) {
        if (label === 'hex' && isValidHex(color)) {
          this.onColorChange(color);
          return;
        }

        if (label === 'r' || label === 'g' || label === 'b') {
          this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, color)));
          return;
        }

        if (label === 'h' || label === 's' || label === 'v') {
          this.onColorChange(_objectSpread2({}, this.tc.toHsv(), _defineProperty({}, label, color)));
          return;
        }
      }
    }, {
      key: "clickCurrentColor",
      value: function clickCurrentColor() {
        if (this.currentColor) {
          this.onColorChange(this.currentColor);
        }
      }
    }, {
      key: "handleAccept",
      value: function handleAccept() {
        this.$emit('ok');
      }
    }, {
      key: "handleCancel",
      value: function handleCancel() {
        this.$emit('cancel');
      }
    }, {
      key: "handleReset",
      value: function handleReset() {
        this.$emit('reset');
      }
    }, {
      key: "hex",
      get: function get() {
        return this.tc.toHexString();
      }
    }, {
      key: "rgba",
      get: function get() {
        return this.tc.toRgb();
      }
    }, {
      key: "hsv",
      get: function get() {
        var hsv = this.tc.toHsv();
        return {
          h: hsv.h.toFixed(),
          s: (hsv.s * 100).toFixed(),
          v: (hsv.v * 100).toFixed()
        };
      }
    }]);

    return Photoshop;
  }(mixins(Color)), _temp$8), (_descriptor$7 = _applyDecoratedDescriptor(_class2$7.prototype, "head", [_dec2$3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$2 = _applyDecoratedDescriptor(_class2$7.prototype, "disableFields", [_dec3$2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3$1 = _applyDecoratedDescriptor(_class2$7.prototype, "hasResetButton", [_dec4$1], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4$1 = _applyDecoratedDescriptor(_class2$7.prototype, "acceptLabel", [_dec5$1], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5$1 = _applyDecoratedDescriptor(_class2$7.prototype, "cancelLabel", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2$7.prototype, "resetLabel", [_dec7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$7)) || _class$9);

  /* script */
  var __vue_script__$8 = Photoshop;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      "class": ["vc-photoshop", _vm.disableFields ? "vc-photoshop__disable-fields" : ""],
      attrs: {
        role: "PhotoShopColorPicker"
      }
    }, [_c("div", {
      staticClass: "vc-ps-head"
    }, [_vm._v(_vm._s(_vm.head))]), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-body"
    }, [_c("div", {
      staticClass: "vc-ps-saturation-wrap"
    }, [_c("Saturation", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-hue-wrap"
    }, [_c("hue", {
      attrs: {
        value: _vm.tc,
        direction: "vertical"
      },
      on: {
        change: _vm.onColorChange
      }
    }, [_c("div", {
      staticClass: "vc-ps-hue-pointer"
    }, [_c("i", {
      staticClass: "vc-ps-hue-pointer--left"
    }), _vm._v(" "), _c("i", {
      staticClass: "vc-ps-hue-pointer--right"
    })])])], 1), _vm._v(" "), _c("div", {
      "class": ["vc-ps-controls", _vm.disableFields ? "vc-ps-controls__disable-fields" : ""]
    }, [_c("div", {
      staticClass: "vc-ps-previews"
    }, [_c("div", {
      staticClass: "vc-ps-previews__label"
    }, [_vm._v("new")]), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-previews__swatches"
    }, [_c("div", {
      staticClass: "vc-ps-previews__pr-color",
      style: {
        background: _vm.hex
      },
      attrs: {
        "aria-label": "NewColor:" + _vm.hex
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-previews__pr-color",
      style: {
        background: _vm.currentColor
      },
      attrs: {
        "aria-label": "CurrentColor:" + _vm.currentColor
      },
      on: {
        click: _vm.clickCurrentColor
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-previews__label"
    }, [_vm._v("current")])]), _vm._v(" "), !_vm.disableFields ? _c("div", {
      staticClass: "vc-ps-actions"
    }, [_c("div", {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        role: "button",
        "aria-label": "Confirm"
      },
      on: {
        click: _vm.handleAccept
      }
    }, [_vm._v("\n          " + _vm._s(_vm.acceptLabel) + "\n        ")]), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        role: "button",
        "aria-label": "Cancel"
      },
      on: {
        click: _vm.handleCancel
      }
    }, [_vm._v("\n          " + _vm._s(_vm.cancelLabel) + "\n        ")]), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-fields"
    }, [_c("EditableInput", {
      attrs: {
        label: "h",
        desc: "°",
        value: _vm.hsv.h
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("h", $event);
        }
      }
    }), _vm._v(" "), _c("EditableInput", {
      attrs: {
        label: "s",
        desc: "%",
        value: _vm.hsv.s,
        max: 100
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("s", $event);
        }
      }
    }), _vm._v(" "), _c("EditableInput", {
      attrs: {
        label: "v",
        desc: "%",
        value: _vm.hsv.v,
        max: 100
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("v", $event);
        }
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-fields__divider"
    }), _vm._v(" "), _c("EditableInput", {
      attrs: {
        label: "r",
        value: _vm.rgba.r
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("r", $event);
        }
      }
    }), _vm._v(" "), _c("EditableInput", {
      attrs: {
        label: "g",
        value: _vm.rgba.g
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("g", $event);
        }
      }
    }), _vm._v(" "), _c("EditableInput", {
      attrs: {
        label: "b",
        value: _vm.rgba.b
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("b", $event);
        }
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "vc-ps-fields__divider"
    }), _vm._v(" "), _c("EditableInput", {
      staticClass: "vc-ps-fields__hex",
      attrs: {
        label: "#",
        value: _vm.tc.toHex()
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("hex", $event);
        }
      }
    })], 1), _vm._v(" "), _vm.hasResetButton ? _c("div", {
      staticClass: "vc-ps-ac-btn",
      attrs: {
        "aria-label": "reset"
      },
      on: {
        click: _vm.handleReset
      }
    }, [_vm._v("\n          " + _vm._s(_vm.resetLabel) + "\n        ")]) : _vm._e()]) : _vm._e()])])]);
  };

  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;
  /* style */

  var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-3f1005e3_0", {
      source: "\n.vc-photoshop {\n  background: #DCDCDC;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\n  box-sizing: initial;\n  width: 513px;\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\n  width: 390px;\n}\n.vc-ps-head {\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\n  border-bottom: 1px solid #B1B1B1;\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\n  height: 23px;\n  line-height: 24px;\n  border-radius: 4px 4px 0 0;\n  font-size: 13px;\n  color: #4D4D4D;\n  text-align: center;\n}\n.vc-ps-body {\n  padding: 15px;\n  display: flex;\n}\n.vc-ps-saturation-wrap {\n  width: 256px;\n  height: 256px;\n  position: relative;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-ps-hue-wrap {\n  position: relative;\n  height: 256px;\n  width: 19px;\n  margin-left: 10px;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\n.vc-ps-hue-pointer--right {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 0 5px 8px;\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\n.vc-ps-hue-pointer--right:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 4px 0 4px 6px;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\n  transform: translate(20px, -4px) rotate(180deg);\n}\n.vc-ps-controls {\n  width: 180px;\n  margin-left: 10px;\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\n  width: auto;\n}\n.vc-ps-actions {\n  margin-left: 20px;\n  flex: 1;\n}\n.vc-ps-ac-btn {\n  cursor: pointer;\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\n  border: 1px solid #878787;\n  border-radius: 2px;\n  height: 20px;\n  box-shadow: 0 1px 0 0 #EAEAEA;\n  font-size: 14px;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\n  width: 60px;\n}\n.vc-ps-previews__swatches {\n  border: 1px solid #B3B3B3;\n  border-bottom: 1px solid #F0F0F0;\n  margin-bottom: 2px;\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\n  height: 34px;\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\n  font-size: 14px;\n  color: #000;\n  text-align: center;\n}\n.vc-ps-fields {\n  padding-top: 5px;\n  padding-bottom: 9px;\n  width: 80px;\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\n  margin-left: 40%;\n  width: 40%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 5px;\n  font-size: 13px;\n  padding-left: 3px;\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\n  top: 0;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\n  left: 0;\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\n  right: 0;\n  width: 0;\n}\n.vc-ps-fields__divider {\n  height: 5px;\n}\n.vc-ps-fields__hex .vc-input__input {\n  margin-left: 20%;\n  width: 80%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 6px;\n  font-size: 13px;\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 14px;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Photoshop.vue"],
        "names": [],
        "mappings": ";AA2NA;EACA,mBAAA;EACA,kBAAA;EACA,iEAAA;EACA,mBAAA;EACA,YAAA;EACA,mBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,oEAAA;EACA,gCAAA;EACA,kFAAA;EACA,YAAA;EACA,iBAAA;EACA,0BAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;AACA;AACA;EACA,aAAA;EACA,aAAA;AACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,yBAAA;EACA,gCAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,aAAA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;EACA,gCAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;;EAEA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,2BAAA;EACA,sDAAA;AACA;AACA;;EAEA,WAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,2BAAA;EACA,sDAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,+CAAA;AACA;AAEA;EACA,YAAA;EACA,iBAAA;EACA,aAAA;AACA;AACA;EACA,WAAA;AACA;AAEA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,eAAA;EACA,oEAAA;EACA,yBAAA;EACA,kBAAA;EACA,YAAA;EACA,6BAAA;EACA,eAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,yBAAA;EACA,gCAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,YAAA;EACA,uEAAA;AACA;AACA;EACA,eAAA;EACA,WAAA;EACA,kBAAA;AACA;AAEA;EACA,gBAAA;EACA,mBAAA;EACA,WAAA;EACA,kBAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,6DAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,MAAA;EACA,yBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,OAAA;EACA,WAAA;AACA;AACA;EACA,QAAA;EACA,QAAA;AACA;AAEA;EACA,WAAA;AACA;AAEA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,6DAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,yBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;AACA",
        "file": "Photoshop.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"PhotoShopColorPicker\"\n    :class=\"['vc-photoshop', disableFields ? 'vc-photoshop__disable-fields' : '']\"\n  >\n    <div class=\"vc-ps-head\">{{ head }}</div>\n    <div class=\"vc-ps-body\">\n      <div class=\"vc-ps-saturation-wrap\">\n        <Saturation\n          :value=\"tc\"\n          @change=\"onColorChange\"\n        />\n      </div>\n      <div class=\"vc-ps-hue-wrap\">\n        <hue\n          :value=\"tc\"\n          direction=\"vertical\"\n          @change=\"onColorChange\"\n        >\n          <div class=\"vc-ps-hue-pointer\">\n            <i class=\"vc-ps-hue-pointer--left\" />\n            <i class=\"vc-ps-hue-pointer--right\" />\n          </div>\n        </hue>\n      </div>\n      <div :class=\"['vc-ps-controls', disableFields ? 'vc-ps-controls__disable-fields' : '']\">\n        <div class=\"vc-ps-previews\">\n          <div class=\"vc-ps-previews__label\">new</div>\n          <div class=\"vc-ps-previews__swatches\">\n            <div\n              class=\"vc-ps-previews__pr-color\"\n              :aria-label=\"'NewColor:' + hex\"\n              :style=\"{background: hex}\"\n            />\n            <div\n              class=\"vc-ps-previews__pr-color\"\n              :aria-label=\"'CurrentColor:' + currentColor\"\n              :style=\"{background: currentColor}\"\n              @click=\"clickCurrentColor\"\n            />\n          </div>\n          <div class=\"vc-ps-previews__label\">current</div>\n        </div>\n        <div\n          v-if=\"!disableFields\"\n          class=\"vc-ps-actions\"\n        >\n          <div\n            class=\"vc-ps-ac-btn\"\n            role=\"button\"\n            aria-label=\"Confirm\"\n            @click=\"handleAccept\"\n          >\n            {{ acceptLabel }}\n          </div>\n          <div\n            class=\"vc-ps-ac-btn\"\n            role=\"button\"\n            aria-label=\"Cancel\"\n            @click=\"handleCancel\"\n          >\n            {{ cancelLabel }}\n          </div>\n\n          <div class=\"vc-ps-fields\">\n            <!-- hsla -->\n            <EditableInput\n              label=\"h\"\n              desc=\"°\"\n              :value=\"hsv.h\"\n              @change=\"inputChange('h', $event)\"\n            />\n            <EditableInput\n              label=\"s\"\n              desc=\"%\"\n              :value=\"hsv.s\"\n              :max=\"100\"\n              @change=\"inputChange('s', $event)\"\n            />\n            <EditableInput\n              label=\"v\"\n              desc=\"%\"\n              :value=\"hsv.v\"\n              :max=\"100\"\n              @change=\"inputChange('v', $event)\"\n            />\n            <div class=\"vc-ps-fields__divider\" />\n            <!-- rgba -->\n            <EditableInput\n              label=\"r\"\n              :value=\"rgba.r\"\n              @change=\"inputChange('r', $event)\"\n            />\n            <EditableInput\n              label=\"g\"\n              :value=\"rgba.g\"\n              @change=\"inputChange('g', $event)\"\n            />\n            <EditableInput\n              label=\"b\"\n              :value=\"rgba.b\"\n              @change=\"inputChange('b', $event)\"\n            />\n            <div class=\"vc-ps-fields__divider\" />\n            <!-- hex -->\n            <EditableInput\n              label=\"#\"\n              class=\"vc-ps-fields__hex\"\n              :value=\"tc.toHex()\"\n              @change=\"inputChange('hex', $event)\"\n            />\n          </div>\n\n          <div\n            v-if=\"hasResetButton\"\n            class=\"vc-ps-ac-btn\"\n            aria-label=\"reset\"\n            @click=\"handleReset\"\n          >\n            {{ resetLabel }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { isValidHex } from '../utils';\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\n\n@Component({\n  components: { Saturation, Hue, EditableInput },\n})\nexport default class Photoshop extends mixins(Color) {\n  @Prop({default: 'Color Picker'})\n  head!: string;\n\n  @Prop({default: false})\n  disableFields!: boolean;\n\n  @Prop({default: false})\n  hasResetButton!: boolean;\n\n  @Prop({default: 'OK'})\n  acceptLabel!: string;\n\n  @Prop({default: 'Cancel'})\n  cancelLabel!: string;\n\n  @Prop({default: 'Reset'})\n  resetLabel!: string;\n\n  currentColor: null | string = null;\n\n  get hex() {\n    return this.tc.toHexString();\n  }\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  get hsv () {\n    const hsv = this.tc.toHsv();\n    return {\n      h: hsv.h.toFixed(),\n      s: (hsv.s * 100).toFixed(),\n      v: (hsv.v * 100).toFixed()\n    }\n  }\n\n  mounted() {\n    this.currentColor = this.tc.toHexString();\n  }\n\n  inputChange(label: 'r' | 'g' | 'b' | 'h' | 's' | 'v' | 'hex', color: string) {\n    if (label === 'hex' && isValidHex(color)) {\n      this.onColorChange(color);\n      return;\n    };\n    if (label === 'r' || label === 'g' || label === 'b') {\n      this.onColorChange({\n        ...this.rgba,\n        [label]: color\n      })\n      return;\n    }\n    if (label === 'h' || label === 's' || label === 'v') {\n      this.onColorChange({\n        ...this.tc.toHsv(),\n        [label]: color\n      });\n      return;\n    }\n  }\n  clickCurrentColor () {\n    if (this.currentColor) {\n      this.onColorChange(this.currentColor);\n    }\n  }\n  handleAccept() {\n    this.$emit('ok');\n  }\n  handleCancel() {\n    this.$emit('cancel');\n  }\n  handleReset() {\n    this.$emit('reset');\n  }\n}\n</script>\n\n<style>\n.vc-photoshop {\n  background: #DCDCDC;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15);\n  box-sizing: initial;\n  width: 513px;\n  font-family: Roboto;\n}\n.vc-photoshop__disable-fields {\n  width: 390px;\n}\n.vc-ps-head {\n  background-image: linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%);\n  border-bottom: 1px solid #B1B1B1;\n  box-shadow: inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02);\n  height: 23px;\n  line-height: 24px;\n  border-radius: 4px 4px 0 0;\n  font-size: 13px;\n  color: #4D4D4D;\n  text-align: center;\n}\n.vc-ps-body {\n  padding: 15px;\n  display: flex;\n}\n\n.vc-ps-saturation-wrap {\n  width: 256px;\n  height: 256px;\n  position: relative;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n  overflow: hidden;\n}\n.vc-ps-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n\n.vc-ps-hue-wrap {\n  position: relative;\n  height: 256px;\n  width: 19px;\n  margin-left: 10px;\n  border: 2px solid #B3B3B3;\n  border-bottom: 2px solid #F0F0F0;\n}\n.vc-ps-hue-pointer {\n  position: relative;\n}\n.vc-ps-hue-pointer--left,\n.vc-ps-hue-pointer--right {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 0 5px 8px;\n  border-color: transparent transparent transparent #555;\n}\n.vc-ps-hue-pointer--left:after,\n.vc-ps-hue-pointer--right:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 4px 0 4px 6px;\n  border-color: transparent transparent transparent #fff;\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  transform: translate(-8px, -5px);\n}\n.vc-ps-hue-pointer--left {\n  transform: translate(-13px, -4px);\n}\n.vc-ps-hue-pointer--right {\n  transform: translate(20px, -4px) rotate(180deg);\n}\n\n.vc-ps-controls {\n  width: 180px;\n  margin-left: 10px;\n  display: flex;\n}\n.vc-ps-controls__disable-fields {\n  width: auto;\n}\n\n.vc-ps-actions {\n  margin-left: 20px;\n  flex: 1;\n}\n.vc-ps-ac-btn {\n  cursor: pointer;\n  background-image: linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%);\n  border: 1px solid #878787;\n  border-radius: 2px;\n  height: 20px;\n  box-shadow: 0 1px 0 0 #EAEAEA;\n  font-size: 14px;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.vc-ps-previews {\n  width: 60px;\n}\n.vc-ps-previews__swatches {\n  border: 1px solid #B3B3B3;\n  border-bottom: 1px solid #F0F0F0;\n  margin-bottom: 2px;\n  margin-top: 1px;\n}\n.vc-ps-previews__pr-color {\n  height: 34px;\n  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;\n}\n.vc-ps-previews__label {\n  font-size: 14px;\n  color: #000;\n  text-align: center;\n}\n\n.vc-ps-fields {\n  padding-top: 5px;\n  padding-bottom: 9px;\n  width: 80px;\n  position: relative;\n}\n.vc-ps-fields .vc-input__input {\n  margin-left: 40%;\n  width: 40%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 5px;\n  font-size: 13px;\n  padding-left: 3px;\n  margin-right: 10px;\n}\n.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {\n  top: 0;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n  position: absolute;\n}\n.vc-ps-fields .vc-input__label {\n  left: 0;\n  width: 34px;\n}\n.vc-ps-fields .vc-input__desc {\n  right: 0;\n  width: 0;\n}\n\n.vc-ps-fields__divider {\n  height: 5px;\n}\n\n.vc-ps-fields__hex .vc-input__input {\n  margin-left: 20%;\n  width: 80%;\n  height: 18px;\n  border: 1px solid #888888;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;\n  margin-bottom: 6px;\n  font-size: 13px;\n  padding-left: 3px;\n}\n.vc-ps-fields__hex .vc-input__label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 14px;\n  text-transform: uppercase;\n  font-size: 13px;\n  height: 18px;\n  line-height: 22px;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$8 = normalizeComponent({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);

  var _dec$9, _dec2$4, _dec3$3, _class$a, _class2$8, _descriptor$8, _descriptor2$3, _descriptor3$2, _temp$9;
  var _checkboardCache = {};
  var Checkboard = (_dec$9 = Prop({
    "default": 8
  }), _dec2$4 = Prop({
    "default": '#fff'
  }), _dec3$3 = Prop({
    "default": '#e6e6e6'
  }), Component(_class$a = (_class2$8 = (_temp$9 = /*#__PURE__*/function (_Vue) {
    _inherits(Checkboard, _Vue);

    var _super = _createSuper(Checkboard);

    function Checkboard() {
      var _this;

      _classCallCheck(this, Checkboard);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "size", _descriptor$8, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "white", _descriptor2$3, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "grey", _descriptor3$2, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(Checkboard, [{
      key: "bgStyle",
      get: function get() {
        var checkboard = getCheckboard(this.white, this.grey, this.size);

        if (checkboard === null) {
          return {};
        }

        return {
          'background-image': "url(".concat(checkboard, ")")
        };
      }
    }]);

    return Checkboard;
  }(Vue), _temp$9), (_descriptor$8 = _applyDecoratedDescriptor(_class2$8.prototype, "size", [_dec$9], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$3 = _applyDecoratedDescriptor(_class2$8.prototype, "white", [_dec2$4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3$2 = _applyDecoratedDescriptor(_class2$8.prototype, "grey", [_dec3$3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$8)) || _class$a);
  /**
   * get checkboard base data and cache
   *
   * @param {String} c1 hex color
   * @param {String} c2 hex color
   * @param {Number} size
   */

  function getCheckboard(c1, c2, size) {
    var key = c1 + ',' + c2 + ',' + size;

    if (_checkboardCache[key]) {
      return _checkboardCache[key];
    } else {
      var checkboard = renderCheckboard(c1, c2, size);

      if (checkboard === null) {
        return null;
      }

      _checkboardCache[key] = checkboard;
      return checkboard;
    }
  }
  /**
   * get base 64 data by canvas
   *
   * @param {String} c1 hex color
   * @param {String} c2 hex color
   * @param {Number} size
   */


  function renderCheckboard(c1, c2, size) {
    // Dont Render On Server
    if (typeof document === 'undefined') {
      return null;
    }

    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = size * 2;
    var ctx = canvas.getContext('2d'); // If no context can be found, return early.

    if (!ctx) {
      return null;
    }

    ctx.fillStyle = c1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = c2;
    ctx.fillRect(0, 0, size, size);
    ctx.translate(size, size);
    ctx.fillRect(0, 0, size, size);
    return canvas.toDataURL();
  }

  /* script */
  var __vue_script__$9 = Checkboard;
  /* template */

  var __vue_render__$9 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-checkerboard",
      style: _vm.bgStyle
    });
  };

  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;
  /* style */

  var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-f1467a88_0", {
      source: "\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Checkboard.vue"],
        "names": [],
        "mappings": ";AAwFA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,wBAAA;AACA",
        "file": "Checkboard.vue",
        "sourcesContent": ["<template>\n  <div\n    class=\"vc-checkerboard\"\n    :style=\"bgStyle\"\n  />\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop } from 'vue-property-decorator';\n\nlet _checkboardCache: {[key: string]: string} = {};\n\n@Component\nexport default class Checkboard extends Vue {\n  @Prop({default: 8})\n  readonly size!: number;\n\n  @Prop({default: '#fff'})\n  readonly white!: string;\n\n  @Prop({default: '#e6e6e6'})\n  readonly grey!: string;\n\n  get bgStyle() {\n    const checkboard = getCheckboard(this.white, this.grey, this.size);\n    if (checkboard === null) {\n      return {};\n    }\n    return {\n      'background-image': `url(${checkboard})`\n    }\n  }\n}\n\n/**\n * get checkboard base data and cache\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\nfunction getCheckboard (c1: string, c2: string, size: number) {\n  const key = c1 + ',' + c2 + ',' + size\n\n  if (_checkboardCache[key]) {\n    return _checkboardCache[key]\n  } else {\n    const checkboard = renderCheckboard(c1, c2, size);\n    if (checkboard === null) {\n      return null;\n    }\n    _checkboardCache[key] = checkboard\n    return checkboard\n  }\n}\n\n/**\n * get base 64 data by canvas\n *\n * @param {String} c1 hex color\n * @param {String} c2 hex color\n * @param {Number} size\n */\n\nfunction renderCheckboard (c1: string, c2: string, size: number) {\n  // Dont Render On Server\n  if (typeof document === 'undefined') {\n    return null\n  }\n  var canvas = document.createElement('canvas')\n  canvas.width = canvas.height = size * 2\n  var ctx = canvas.getContext('2d')\n  // If no context can be found, return early.\n  if (!ctx) {\n    return null\n  }\n  ctx.fillStyle = c1\n  ctx.fillRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = c2\n  ctx.fillRect(0, 0, size, size)\n  ctx.translate(size, size)\n  ctx.fillRect(0, 0, size, size)\n  return canvas.toDataURL()\n}\n\n</script>\n\n<style>\n.vc-checkerboard {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  background-size: contain;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$9 = normalizeComponent({
    render: __vue_render__$9,
    staticRenderFns: __vue_staticRenderFns__$9
  }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

  var _dec$a, _dec2$5, _class$b, _class2$9, _descriptor$9, _temp$a;
  var Alpha = (_dec$a = Component({
    components: {
      Checkboard: __vue_component__$9
    }
  }), _dec2$5 = Ref(), _dec$a(_class$b = (_class2$9 = (_temp$a = /*#__PURE__*/function (_mixins) {
    _inherits(Alpha, _mixins);

    var _super = _createSuper(Alpha);

    function Alpha() {
      var _this;

      _classCallCheck(this, Alpha);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "container", _descriptor$9, _assertThisInitialized(_this));

      _this.containerWidth = 0;
      _this.xOffset = 0;
      return _this;
    }

    _createClass(Alpha, [{
      key: "gradientColor",
      value: function gradientColor() {
        var rgba = this.tc.toRgb();
        var rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
        return "linear-gradient(to right, rgba(".concat(rgbStr, ", 0) 0%, rgba(").concat(rgbStr, ", 1) 100%)");
      }
    }, {
      key: "mounted",
      value: function mounted() {
        var $container = this.$refs.container;
        this.containerWidth = $container.clientWidth;
        this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset;
      }
    }, {
      key: "handleChange",
      value: function handleChange(pageX) {
        var containerWidth = this.containerWidth,
            xOffset = this.xOffset;
        var left = pageX - xOffset;
        var a;

        if (left < 0) {
          a = 0;
        } else if (left > containerWidth) {
          a = 1;
        } else {
          a = Math.round(left * 100 / containerWidth) / 100;
        }

        if (this.a !== a) {
          if (this.getOutputFormat() === 'hex') {
            this.setOutputFormat('hex8');
          }

          this.onColorChange(this.tc.setAlpha(a));
        }
      }
    }, {
      key: "handleMouseDown",
      value: function handleMouseDown(e) {
        e.preventDefault();
        this.handleChange(e.pageX);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "handleMouseMove",
      value: function handleMouseMove(e) {
        this.handleChange(e.pageX);
      }
    }, {
      key: "handleMouseUp",
      value: function handleMouseUp() {
        this.unbindEventListeners();
      }
    }, {
      key: "unbindEventListeners",
      value: function unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: "handlTouchEvents",
      value: function handlTouchEvents(e) {
        var pageX = e.touches ? e.touches[0].pageX : 0;
        this.handleChange(pageX);
      }
    }, {
      key: "a",
      get: function get() {
        return this.tc.getAlpha();
      }
    }, {
      key: "pointerLeft",
      get: function get() {
        return "".concat(this.a * 100, "%");
      }
    }]);

    return Alpha;
  }(mixins(Color)), _temp$a), (_descriptor$9 = _applyDecoratedDescriptor(_class2$9.prototype, "container", [_dec2$5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$9)) || _class$b);

  /* script */
  var __vue_script__$a = Alpha;
  /* template */

  var __vue_render__$a = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vc-alpha",
      attrs: {
        role: "HuePanel"
      }
    }, [_c("div", {
      staticClass: "vc-alpha-checkboard-wrap"
    }, [_c("Checkboard")], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-alpha-gradient",
      style: {
        background: _vm.gradientColor
      }
    }), _vm._v(" "), _c("div", {
      ref: "container",
      staticClass: "vc-alpha-container",
      on: {
        mousedown: _vm.handleMouseDown,
        touchmove: _vm.handlTouchEvents,
        touchstart: _vm.handlTouchEvents
      }
    }, [_c("div", {
      staticClass: "vc-alpha-pointer",
      style: {
        left: _vm.pointerLeft
      },
      attrs: {
        role: "CurrentAlphaPointer"
      }
    }, [_c("div", {
      staticClass: "vc-alpha-picker"
    })])])]);
  };

  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;
  /* style */

  var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-10309338_0", {
      source: "\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/common/Alpha.vue"],
        "names": [],
        "mappings": ";AA8GA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,gBAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA,EAAA,+BAAA;AACA;AACA;EACA,UAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;EACA,eAAA;EACA,2BAAA;AACA",
        "file": "Alpha.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"HuePanel\"\n    class=\"vc-alpha\"\n  >\n    <div class=\"vc-alpha-checkboard-wrap\">\n      <Checkboard />\n    </div>\n    <div\n      class=\"vc-alpha-gradient\"\n      :style=\"{background: gradientColor}\"\n    />\n    <div\n      ref=\"container\"\n      class=\"vc-alpha-container\"\n      @mousedown=\"handleMouseDown\"\n      @touchmove=\"handlTouchEvents\"\n      @touchstart=\"handlTouchEvents\"\n    >\n      <div\n        role=\"CurrentAlphaPointer\"\n        class=\"vc-alpha-pointer\"\n        :style=\"{left: pointerLeft}\"\n      >\n        <div class=\"vc-alpha-picker\" />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Checkboard from './Checkboard.vue';\nimport { Component, Ref, Watch } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../../common/ColorMixin';\n\n@Component({\n  components: {\n    Checkboard\n  }\n})\nexport default class Alpha extends mixins(Color) {\n  @Ref()\n  readonly container!: HTMLDivElement;\n\n  containerWidth = 0;\n  xOffset = 0;\n\n  get a() {\n    return this.tc.getAlpha();\n  }\n  get pointerLeft() {\n    return `${this.a * 100}%`;\n  }\n  gradientColor() {\n    const rgba = this.tc.toRgb();\n    const rgbStr = [rgba.r, rgba.g, rgba.b].join(',');\n    return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;\n  }\n  mounted() {\n    const $container = this.$refs.container as HTMLDivElement;\n    this.containerWidth = $container.clientWidth\n    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset\n  }\n  handleChange(pageX: number) {\n\n    const { containerWidth, xOffset } = this;\n    const left = pageX - xOffset;\n\n    let a;\n    if (left < 0) {\n      a = 0;\n    } else if (left > containerWidth) {\n      a = 1;\n    } else {\n      a = Math.round(left * 100 / containerWidth) / 100;\n    }\n\n    if (this.a !== a) {\n      if (this.getOutputFormat() === 'hex') {\n        this.setOutputFormat('hex8')\n      }\n      this.onColorChange(this.tc.setAlpha(a));\n    }\n  }\n  handleMouseDown(e: MouseEvent) {\n    e.preventDefault();\n    this.handleChange(e.pageX);\n    window.addEventListener('mousemove', this.handleMouseMove)\n    window.addEventListener('mouseup', this.handleMouseUp)\n  }\n  handleMouseMove(e: MouseEvent) {\n    this.handleChange(e.pageX);\n  }\n  handleMouseUp () {\n    this.unbindEventListeners()\n  }\n  unbindEventListeners () {\n    window.removeEventListener('mousemove', this.handleMouseMove)\n    window.removeEventListener('mouseup', this.handleMouseUp)\n  }\n  handlTouchEvents (e: TouchEvent) {\n    const pageX = e.touches ? e.touches[0].pageX : 0;\n    this.handleChange(pageX);\n  }\n}\n\n</script>\n\n<style>\n.vc-alpha {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-checkboard-wrap {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  overflow: hidden;\n}\n.vc-alpha-gradient {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n.vc-alpha-container {\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n  height: 100%;\n  margin: 0 3px;\n  -webkit-tap-highlight-color: transparent; /* for removing the highlight */\n}\n.vc-alpha-pointer {\n  z-index: 2;\n  position: absolute;\n}\n.vc-alpha-picker {\n  cursor: pointer;\n  width: 4px;\n  border-radius: 1px;\n  height: 8px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\n  background: #fff;\n  margin-top: 1px;\n  transform: translateX(-2px);\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$a = undefined;
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$a = normalizeComponent({
    render: __vue_render__$a,
    staticRenderFns: __vue_staticRenderFns__$a
  }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

  var _dec$b, _dec2$6, _dec3$4, _dec4$2, _class$c, _class2$a, _descriptor$a, _descriptor2$4, _descriptor3$3, _temp$b;
  var presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF', 'rgba(0,0,0,0)'];
  var Sketch = (_dec$b = Component({
    components: {
      EditableInput: __vue_component__$2,
      Saturation: __vue_component__$7,
      Hue: __vue_component__$4,
      Alpha: __vue_component__$a,
      Checkboard: __vue_component__$9
    }
  }), _dec2$6 = Prop({
    "default": function _default() {
      return presetColors;
    }
  }), _dec3$4 = Prop({
    "default": false
  }), _dec4$2 = Prop({
    "default": false
  }), _dec$b(_class$c = (_class2$a = (_temp$b = /*#__PURE__*/function (_mixins) {
    _inherits(Sketch, _mixins);

    var _super = _createSuper(Sketch);

    function Sketch() {
      var _this;

      _classCallCheck(this, Sketch);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "presetColors", _descriptor$a, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "disableAlpha", _descriptor2$4, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "disableFields", _descriptor3$3, _assertThisInitialized(_this));

      _this.isTransparent = isTransparent;
      return _this;
    }

    _createClass(Sketch, [{
      key: "onAlphaChange",
      value: function onAlphaChange(color) {
        if (hasAlpha(color) && this.getOutputFormat() === 'hex') {
          this.setOutputFormat('hex8');
        }

        this.onColorChange(color);
      }
    }, {
      key: "onInputChange",
      value: function onInputChange(label, value) {
        this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, value)));
      }
    }, {
      key: "hex",
      get: function get() {
        if (hasAlpha(this.tc)) {
          return this.tc.toHex8();
        } else {
          return this.tc.toHex();
        }
      }
    }, {
      key: "rgba",
      get: function get() {
        return this.tc.toRgb();
      }
    }]);

    return Sketch;
  }(mixins(Color)), _temp$b), (_descriptor$a = _applyDecoratedDescriptor(_class2$a.prototype, "presetColors", [_dec2$6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$4 = _applyDecoratedDescriptor(_class2$a.prototype, "disableAlpha", [_dec3$4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3$3 = _applyDecoratedDescriptor(_class2$a.prototype, "disableFields", [_dec4$2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$a)) || _class$c);

  /* script */
  var __vue_script__$b = Sketch;
  /* template */

  var __vue_render__$b = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      "class": ["vc-sketch", _vm.disableAlpha ? "vc-sketch__disable-alpha" : ""],
      attrs: {
        role: "SketchColorPicker"
      }
    }, [_c("div", {
      staticClass: "vc-sketch-saturation-wrap"
    }, [_c("Saturation", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-controls"
    }, [_c("div", {
      staticClass: "vc-sketch-sliders"
    }, [_c("div", {
      staticClass: "vc-sketch-hue-wrap"
    }, [_c("Hue", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
      staticClass: "vc-sketch-alpha-wrap"
    }, [_c("Alpha", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onAlphaChange
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-color-wrap"
    }, [_c("div", {
      staticClass: "vc-sketch-active-color",
      style: {
        background: _vm.tc.toRgbString()
      },
      attrs: {
        "aria-label": "Currentcolor: " + _vm.tc.toRgbString()
      }
    }), _vm._v(" "), _c("Checkboard")], 1)]), _vm._v(" "), !_vm.disableFields ? _c("div", {
      staticClass: "vc-sketch-field"
    }, [_c("div", {
      staticClass: "vc-sketch-field--double"
    }, [_c("EditableInput", {
      attrs: {
        label: "hex",
        value: _vm.hex
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-field--single"
    }, [_c("EditableInput", {
      attrs: {
        label: "r",
        value: _vm.rgba.r
      },
      on: {
        change: function change($event) {
          return _vm.onInputChange("r", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-field--single"
    }, [_c("EditableInput", {
      attrs: {
        label: "g",
        value: _vm.rgba.g
      },
      on: {
        change: function change($event) {
          return _vm.onInputChange("r", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-field--single"
    }, [_c("EditableInput", {
      attrs: {
        label: "b",
        value: _vm.rgba.b
      },
      on: {
        change: function change($event) {
          return _vm.onInputChange("r", $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
      staticClass: "vc-sketch-field--single"
    }, [_c("EditableInput", {
      attrs: {
        label: "a",
        value: _vm.rgba.a,
        step: 0.01
      },
      on: {
        change: function change($event) {
          return _vm.onInputChange("r", $event);
        }
      }
    })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "vc-sketch-presets",
      attrs: {
        role: "group"
      }
    }, [_vm._l(_vm.presetColors, function (c) {
      return [!_vm.isTransparent(c) ? _c("div", {
        key: c,
        staticClass: "vc-sketch-presets-color",
        style: {
          background: c
        },
        attrs: {
          "aria-label": "Color:" + c
        },
        on: {
          click: function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }) : _c("div", {
        key: c,
        staticClass: "vc-sketch-presets-color",
        attrs: {
          "aria-label": "Color:" + c
        },
        on: {
          click: function click($event) {
            return _vm.onColorChange(c);
          }
        }
      }, [_c("checkboard")], 1)];
    })], 2)]);
  };

  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;
  /* style */

  var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-e3367314_0", {
      source: "\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n.vc-sketch-saturation-wrap {\n  width: 100%;\n  padding-bottom: 75%;\n  position: relative;\n  overflow: hidden;\n}\n.vc-sketch-controls {\n  display: flex;\n}\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n.vc-sketch-field--double {\n  flex: 2;\n}\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Sketch.vue"],
        "names": [],
        "mappings": ";AA6KA;EACA,kBAAA;EACA,YAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,uEAAA;AACA;AAEA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,cAAA;EACA,OAAA;AACA;AAEA;;EAEA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,kBAAA;EACA,gFAAA;EACA,UAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,aAAA;EACA,gBAAA;AACA;AAEA;EACA,UAAA;EACA,sBAAA;EACA,YAAA;EACA,gCAAA;EACA,eAAA;AACA;AAEA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;EACA,0BAAA;AACA;AAEA;EACA,OAAA;EACA,iBAAA;AACA;AAEA;EACA,OAAA;AACA;AAEA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;EACA,0BAAA;AACA;AAEA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,8CAAA;AACA;AAEA;EACA,8CAAA;EACA,kBAAA;AACA;AAEA;EACA,YAAA;AACA",
        "file": "Sketch.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"SketchColorPicker\"\n    :class=\"['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']\"\n  >\n    <div class=\"vc-sketch-saturation-wrap\">\n      <Saturation\n        :value=\"tc\"\n        @change=\"onColorChange\"\n      />\n    </div>\n    <div class=\"vc-sketch-controls\">\n      <div class=\"vc-sketch-sliders\">\n        <div class=\"vc-sketch-hue-wrap\">\n          <Hue\n            :value=\"tc\"\n            @change=\"onColorChange\"\n          />\n        </div>\n        <div\n          v-if=\"!disableAlpha\"\n          class=\"vc-sketch-alpha-wrap\"\n        >\n          <Alpha\n            :value=\"tc\"\n            @change=\"onAlphaChange\"\n          />\n        </div>\n      </div>\n      <div class=\"vc-sketch-color-wrap\">\n        <div\n          :aria-label = \"`Currentcolor: ${tc.toRgbString()}`\"\n          class=\"vc-sketch-active-color\"\n          :style=\"{background: tc.toRgbString()}\"\n        />\n        <Checkboard />\n      </div>\n    </div>\n    <div\n      v-if=\"!disableFields\"\n      class=\"vc-sketch-field\"\n    >\n      <!-- rgba -->\n      <div class=\"vc-sketch-field--double\">\n        <EditableInput\n          label=\"hex\"\n          :value=\"hex\"\n          @change=\"onColorChange\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"r\"\n          :value=\"rgba.r\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"g\"\n          :value=\"rgba.g\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div class=\"vc-sketch-field--single\">\n        <EditableInput\n          label=\"b\"\n          :value=\"rgba.b\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n      <div\n        v-if=\"!disableAlpha\"\n        class=\"vc-sketch-field--single\"\n      >\n        <EditableInput\n          label=\"a\"\n          :value=\"rgba.a\"\n          :step=\"0.01\"\n          @change=\"onInputChange('r', $event)\"\n        />\n      </div>\n    </div>\n    <div\n      class=\"vc-sketch-presets\"\n      role=\"group\"\n    >\n      <template v-for=\"c in presetColors\">\n        <div\n          v-if=\"!isTransparent(c)\"\n          :key=\"c\"\n          class=\"vc-sketch-presets-color\"\n          :aria-label=\"'Color:' + c\"\n          :style=\"{background: c}\"\n          @click=\"onColorChange(c)\"\n        />\n        <div\n          v-else\n          :key=\"c\"\n          :aria-label=\"'Color:' + c\"\n          class=\"vc-sketch-presets-color\"\n          @click=\"onColorChange(c)\"\n        >\n          <checkboard />\n        </div>\n      </template>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { hasAlpha, isTransparent } from '../utils';\n\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\nimport Alpha from './common/Alpha.vue'\nimport Checkboard from './common/Checkboard.vue'\n\nconst presetColors = [\n  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',\n  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',\n  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',\n  'rgba(0,0,0,0)'\n];\n\n@Component({\n  components: {EditableInput, Saturation, Hue, Alpha, Checkboard}\n})\nexport default class Sketch extends mixins(Color) {\n  @Prop({default: () => presetColors})\n  presetColors!: string[];\n\n  @Prop({default: false})\n  disableAlpha!: boolean;\n\n  @Prop({default: false})\n  disableFields!: boolean;\n\n  get hex() {\n    if (hasAlpha(this.tc)) {\n      return this.tc.toHex8();\n    } else {\n      return this.tc.toHex();\n    }\n  }\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  isTransparent = isTransparent;\n\n  onAlphaChange(color: string) {\n    if (hasAlpha(color)  && this.getOutputFormat() === 'hex') {\n      this.setOutputFormat('hex8')\n    }\n    this.onColorChange(color);\n  }\n\n  onInputChange(label: 'r' | 'g' | 'b' | 'a', value: string) {\n    this.onColorChange({\n      ...this.rgba,\n      [label]: value\n    })\n  }\n}\n</script>\n\n<style>\n.vc-sketch {\n  position: relative;\n  width: 200px;\n  padding: 10px 10px 0;\n  box-sizing: initial;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);\n}\n\n.vc-sketch-saturation-wrap {\n  width: 100%;\n  padding-bottom: 75%;\n  position: relative;\n  overflow: hidden;\n}\n\n.vc-sketch-controls {\n  display: flex;\n}\n\n.vc-sketch-sliders {\n  padding: 4px 0;\n  flex: 1;\n}\n\n.vc-sketch-sliders .vc-hue,\n.vc-sketch-sliders .vc-alpha-gradient {\n  border-radius: 2px;\n}\n\n.vc-sketch-hue-wrap {\n  position: relative;\n  height: 10px;\n}\n\n.vc-sketch-alpha-wrap {\n  position: relative;\n  height: 10px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n\n.vc-sketch-color-wrap {\n  width: 24px;\n  height: 24px;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border-radius: 3px;\n}\n\n.vc-sketch-active-color {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);\n  z-index: 2;\n}\n\n.vc-sketch-color-wrap .vc-checkerboard {\n  background-size: auto;\n}\n\n.vc-sketch-field {\n  display: flex;\n  padding-top: 4px;\n}\n\n.vc-sketch-field .vc-input__input {\n  width: 90%;\n  padding: 4px 0 3px 10%;\n  border: none;\n  box-shadow: inset 0 0 0 1px #ccc;\n  font-size: 10px;\n}\n\n.vc-sketch-field .vc-input__label {\n  display: block;\n  text-align: center;\n  font-size: 11px;\n  color: #222;\n  padding-top: 3px;\n  padding-bottom: 4px;\n  text-transform: capitalize;\n}\n\n.vc-sketch-field--single {\n  flex: 1;\n  padding-left: 6px;\n}\n\n.vc-sketch-field--double {\n  flex: 2;\n}\n\n.vc-sketch-presets {\n  margin-right: -10px;\n  margin-left: -10px;\n  padding-left: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #eee;\n}\n\n.vc-sketch-presets-color {\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n  margin: 0 10px 10px 0;\n  vertical-align: top;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n}\n\n.vc-sketch-presets-color .vc-checkerboard {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);\n  border-radius: 3px;\n}\n\n.vc-sketch__disable-alpha .vc-sketch-color-wrap {\n  height: 10px;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$b = undefined;
  /* module identifier */

  var __vue_module_identifier__$b = undefined;
  /* functional template */

  var __vue_is_functional_template__$b = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$b = normalizeComponent({
    render: __vue_render__$b,
    staticRenderFns: __vue_staticRenderFns__$b
  }, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

  var _dec$c, _dec2$7, _dec3$5, _class$d, _class2$b, _descriptor$b, _descriptor2$5, _temp$c;
  var Chrome = (_dec$c = Component({
    components: {
      EditableInput: __vue_component__$2,
      Saturation: __vue_component__$7,
      Hue: __vue_component__$4,
      Alpha: __vue_component__$a,
      Checkboard: __vue_component__$9
    }
  }), _dec2$7 = Prop({
    "default": false
  }), _dec3$5 = Prop({
    "default": false
  }), _dec$c(_class$d = (_class2$b = (_temp$c = /*#__PURE__*/function (_mixins) {
    _inherits(Chrome, _mixins);

    var _super = _createSuper(Chrome);

    function Chrome() {
      var _this;

      _classCallCheck(this, Chrome);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_this, "disableAlpha", _descriptor$b, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "disableFields", _descriptor2$5, _assertThisInitialized(_this));

      _this.fieldsIndex = 0;
      _this.highlight = false;
      return _this;
    }

    _createClass(Chrome, [{
      key: "toggleViews",
      value: function toggleViews() {
        if (this.fieldsIndex >= 2) {
          this.fieldsIndex = 0;
          return;
        }

        this.fieldsIndex++;
      } // TODO: use css instead ?

    }, {
      key: "showHighlight",
      value: function showHighlight() {
        this.highlight = true;
      }
    }, {
      key: "hideHighlight",
      value: function hideHighlight() {
        this.highlight = false;
      }
    }, {
      key: "onAlphaChange",
      value: function onAlphaChange(color) {
        if (hasAlpha(color) && this.getOutputFormat() === 'hex') {
          this.setOutputFormat('hex8');
        }

        this.onColorChange(color);
      }
    }, {
      key: "inputChange",
      value: function inputChange(label, value) {
        if (label === 'r' || label === 'g' || label === 'b') {
          this.onColorChange(_objectSpread2({}, this.rgba, _defineProperty({}, label, value)));
        }

        if (label === 'h' || label === 's' || label === 'l') {
          this.onColorChange(_objectSpread2({}, this.hsl, _defineProperty({}, label, value)));
        }

        if (label = 'a') {
          this.onColorChange(this.tc.setAlpha(+value));
        }
      }
    }, {
      key: "rgba",
      get: function get() {
        return this.tc.toRgb();
      }
    }, {
      key: "hsl",
      get: function get() {
        return this.tc.toHsl();
      }
    }, {
      key: "hasAlpha",
      get: function get() {
        return this.tc.getAlpha() < 1;
      }
    }]);

    return Chrome;
  }(mixins(Color)), _temp$c), (_descriptor$b = _applyDecoratedDescriptor(_class2$b.prototype, "disableAlpha", [_dec2$7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2$5 = _applyDecoratedDescriptor(_class2$b.prototype, "disableFields", [_dec3$5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2$b)) || _class$d);

  /* script */
  var __vue_script__$c = Chrome;
  /* template */

  var __vue_render__$c = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      "class": ["vc-chrome", _vm.disableAlpha ? "vc-chrome__disable-alpha" : ""],
      attrs: {
        role: "ChromeColorPicker"
      }
    }, [_c("div", {
      staticClass: "vc-chrome-saturation-wrap"
    }, [_c("Saturation", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-body"
    }, [_c("div", {
      staticClass: "vc-chrome-controls"
    }, [_c("div", {
      staticClass: "vc-chrome-color-wrap"
    }, [_c("div", {
      staticClass: "vc-chrome-active-color",
      style: {
        background: _vm.tc.toRgbString()
      }
    }), _vm._v(" "), !_vm.disableAlpha ? _c("Checkboard") : _vm._e()], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-sliders"
    }, [_c("div", {
      staticClass: "vc-chrome-hue-wrap"
    }, [_c("Hue", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onColorChange
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
      staticClass: "vc-chrome-alpha-wrap"
    }, [_c("Alpha", {
      attrs: {
        value: _vm.tc
      },
      on: {
        change: _vm.onAlphaChange
      }
    })], 1) : _vm._e()])]), _vm._v(" "), !_vm.disableFields ? _c("div", {
      staticClass: "vc-chrome-fields-wrap"
    }, [_c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 0,
        expression: "fieldsIndex === 0"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c("div", {
      staticClass: "vc-chrome-field"
    }, [!_vm.hasAlpha ? _c("EditableInput", {
      attrs: {
        label: "hex",
        value: _vm.tc.toHexString()
      },
      on: {
        change: _vm.onColorChange
      }
    }) : _vm._e(), _vm._v(" "), _vm.hasAlpha ? _c("EditableInput", {
      attrs: {
        label: "hex",
        value: _vm.tc.toHex8String()
      },
      on: {
        change: _vm.onColorChange
      }
    }) : _vm._e()], 1)]), _vm._v(" "), _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 1,
        expression: "fieldsIndex === 1"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "r",
        value: _vm.rgba.r
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("r", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "g",
        value: _vm.rgba.g
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("g", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "b",
        value: _vm.rgba.b
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("b", $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "a",
        value: _vm.rgba.a,
        step: 0.01
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("a", $event);
        }
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.fieldsIndex === 2,
        expression: "fieldsIndex === 2"
      }],
      staticClass: "vc-chrome-fields"
    }, [_c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "h",
        value: _vm.hsl.h
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("h", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "s",
        value: (_vm.hsl.s * 100).toFixed() + "%"
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("s", $event);
        }
      }
    })], 1), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "l",
        value: (_vm.hsl.l * 100).toFixed() + "%"
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("l", $event);
        }
      }
    })], 1), _vm._v(" "), !_vm.disableAlpha ? _c("div", {
      staticClass: "vc-chrome-field"
    }, [_c("EditableInput", {
      attrs: {
        label: "a",
        value: _vm.hsl.a,
        step: 0.01
      },
      on: {
        change: function change($event) {
          return _vm.inputChange("a", $event);
        }
      }
    })], 1) : _vm._e()]), _vm._v(" "), _c("div", {
      staticClass: "vc-chrome-toggle-btn",
      attrs: {
        role: "button",
        "aria-label": "Change another color definition"
      },
      on: {
        click: _vm.toggleViews
      }
    }, [_c("div", {
      staticClass: "vc-chrome-toggle-icon"
    }, [_c("svg", {
      staticStyle: {
        width: "24px",
        height: "24px"
      },
      attrs: {
        viewBox: "0 0 24 24"
      },
      on: {
        mouseover: _vm.showHighlight,
        mouseenter: _vm.showHighlight,
        mouseout: _vm.hideHighlight
      }
    }, [_c("path", {
      attrs: {
        fill: "#333",
        d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
      }
    })])]), _vm._v(" "), _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.highlight,
        expression: "highlight"
      }],
      staticClass: "vc-chrome-toggle-icon-highlight"
    })])]) : _vm._e()])]);
  };

  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;
  /* style */

  var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-6b37dafd_0", {
      source: "\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/linx4200/Documents/MYFILE/code/vue-color/src/components/Chrome.vue"],
        "names": [],
        "mappings": ";AAmPA;EACA,gBAAA;EACA,kBAAA;EACA,4DAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,qBAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gCAAA;EACA,oCAAA;EACA,2CAAA;AACA;AACA;EACA,uBAAA;EACA,sBAAA;AACA;AACA;EACA,WAAA;EACA,mBAAA;EACA,kBAAA;EACA,0BAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;EACA,mCAAA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,yBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,cAAA;EACA,gBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,eAAA;EACA,kBAAA;AACA",
        "file": "Chrome.vue",
        "sourcesContent": ["<template>\n  <div\n    role=\"ChromeColorPicker\"\n    :class=\"['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']\"\n  >\n    <div class=\"vc-chrome-saturation-wrap\">\n      <Saturation :value=\"tc\" @change=\"onColorChange\" />\n    </div>\n    <div class=\"vc-chrome-body\">\n      <div class=\"vc-chrome-controls\">\n        <div class=\"vc-chrome-color-wrap\">\n          <div\n            class=\"vc-chrome-active-color\"\n            :style=\"{background: tc.toRgbString()}\"\n          />\n          <Checkboard v-if=\"!disableAlpha\" />\n        </div>\n\n        <div class=\"vc-chrome-sliders\">\n          <div class=\"vc-chrome-hue-wrap\">\n            <Hue :value=\"tc\" @change=\"onColorChange\" />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-alpha-wrap\"\n          >\n            <Alpha :value=\"tc\" @change=\"onAlphaChange\" />\n          </div>\n        </div>\n      </div>\n\n      <div\n        v-if=\"!disableFields\"\n        class=\"vc-chrome-fields-wrap\"\n      >\n        <div\n          v-show=\"fieldsIndex === 0\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- hex -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              v-if=\"!hasAlpha\"\n              label=\"hex\"\n              :value=\"tc.toHexString()\"\n              @change=\"onColorChange\"\n            />\n            <EditableInput\n              v-if=\"hasAlpha\"\n              label=\"hex\"\n              :value=\"tc.toHex8String()\"\n              @change=\"onColorChange\"\n            />\n          </div>\n        </div>\n        <div\n          v-show=\"fieldsIndex === 1\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- rgba -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"r\"\n              :value=\"rgba.r\"\n              @change=\"inputChange('r', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"g\"\n              :value=\"rgba.g\"\n              @change=\"inputChange('g', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"b\"\n              :value=\"rgba.b\"\n              @change=\"inputChange('b', $event)\"\n            />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-field\"\n          >\n            <EditableInput\n              label=\"a\"\n              :value=\"rgba.a\"\n              :step=\"0.01\"\n              @change=\"inputChange('a', $event)\"\n            />\n          </div>\n        </div>\n        <div\n          v-show=\"fieldsIndex === 2\"\n          class=\"vc-chrome-fields\"\n        >\n          <!-- hsla -->\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"h\"\n              :value=\"hsl.h\"\n              @change=\"inputChange('h', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"s\"\n              :value=\"`${(hsl.s * 100).toFixed()}%`\"\n              @change=\"inputChange('s', $event)\"\n            />\n          </div>\n          <div class=\"vc-chrome-field\">\n            <EditableInput\n              label=\"l\"\n              :value=\"`${(hsl.l * 100).toFixed()}%`\"\n              @change=\"inputChange('l', $event)\"\n            />\n          </div>\n          <div\n            v-if=\"!disableAlpha\"\n            class=\"vc-chrome-field\"\n          >\n            <EditableInput\n              label=\"a\"\n              :value=\"hsl.a\"\n              :step=\"0.01\"\n              @change=\"inputChange('a', $event)\"\n            />\n          </div>\n        </div>\n        <!-- btn -->\n        <div\n          class=\"vc-chrome-toggle-btn\"\n          role=\"button\"\n          aria-label=\"Change another color definition\"\n          @click=\"toggleViews\"\n        >\n          <div class=\"vc-chrome-toggle-icon\">\n            <svg\n              style=\"width:24px; height:24px\"\n              viewBox=\"0 0 24 24\"\n              @mouseover=\"showHighlight\"\n              @mouseenter=\"showHighlight\"\n              @mouseout=\"hideHighlight\"\n            >\n              <path\n                fill=\"#333\"\n                d=\"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z\"\n              />\n            </svg>\n          </div>\n          <div\n            v-show=\"highlight\"\n            class=\"vc-chrome-toggle-icon-highlight\"\n          />\n        </div>\n        <!-- btn -->\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { Vue, Component, Prop } from 'vue-property-decorator';\nimport { mixins } from 'vue-class-component';\nimport Color from '../common/ColorMixin';\nimport { hasAlpha } from '../utils';\n\nimport EditableInput from './common/EditableInput.vue'\nimport Saturation from './common/Saturation.vue'\nimport Hue from './common/Hue.vue'\nimport Alpha from './common/Alpha.vue'\nimport Checkboard from './common/Checkboard.vue'\n\n@Component({\n  components: { EditableInput, Saturation, Hue, Alpha, Checkboard }\n})\nexport default class Chrome extends mixins(Color) {\n  @Prop({default: false})\n  disableAlpha !: boolean;\n\n  @Prop({default: false})\n  disableFields !: boolean;\n\n  fieldsIndex = 0;\n  highlight = false;\n\n  get rgba() {\n    return this.tc.toRgb();\n  }\n\n  get hsl() {\n    return this.tc.toHsl();\n  }\n\n  get hasAlpha() {\n    return this.tc.getAlpha() < 1;\n  }\n\n  toggleViews () {\n    if (this.fieldsIndex >= 2) {\n      this.fieldsIndex = 0;\n      return;\n    }\n    this.fieldsIndex ++;\n  }\n  // TODO: use css instead ?\n  showHighlight () {\n    this.highlight = true;\n  }\n  hideHighlight () {\n    this.highlight = false;\n  }\n\n  onAlphaChange(color: string) {\n    if (hasAlpha(color)  && this.getOutputFormat() === 'hex') {\n      this.setOutputFormat('hex8')\n    }\n    this.onColorChange(color);\n  }\n\n  inputChange(label: 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l', value: string | number) {\n    if (label === 'r' || label === 'g' || label === 'b') {\n      this.onColorChange({\n        ...this.rgba,\n        [label]: value\n      })\n    }\n    if (label === 'h' || label === 's' || label === 'l') {\n      this.onColorChange({\n        ...this.hsl,\n        [label]: value\n      })\n    }\n    if (label = 'a') {\n      this.onColorChange(this.tc.setAlpha(+value));\n    }\n  }\n}\n</script>\n\n<style>\n.vc-chrome {\n  background: #fff;\n  border-radius: 2px;\n  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);\n  box-sizing: initial;\n  width: 225px;\n  font-family: Menlo;\n  background-color: #fff;\n}\n.vc-chrome-controls {\n  display: flex;\n}\n.vc-chrome-color-wrap {\n  position: relative;\n  width: 36px;\n}\n.vc-chrome-active-color {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  overflow: hidden;\n  z-index: 1;\n}\n.vc-chrome-color-wrap .vc-checkerboard {\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-size: auto;\n}\n.vc-chrome-sliders {\n  flex: 1;\n}\n.vc-chrome-fields-wrap {\n  display: flex;\n  padding-top: 16px;\n}\n.vc-chrome-fields {\n  display: flex;\n  margin-left: -6px;\n  flex: 1;\n}\n.vc-chrome-field {\n  padding-left: 6px;\n  width: 100%;\n}\n.vc-chrome-toggle-btn {\n  width: 32px;\n  text-align: right;\n  position: relative;\n}\n.vc-chrome-toggle-icon {\n  margin-right: -4px;\n  margin-top: 12px;\n  cursor: pointer;\n  position: relative;\n  z-index: 2;\n}\n.vc-chrome-toggle-icon-highlight {\n  position: absolute;\n  width: 24px;\n  height: 28px;\n  background: #eee;\n  border-radius: 4px;\n  top: 10px;\n  left: 12px;\n}\n.vc-chrome-hue-wrap {\n  position: relative;\n  height: 10px;\n  margin-bottom: 8px;\n}\n.vc-chrome-alpha-wrap {\n  position: relative;\n  height: 10px;\n}\n.vc-chrome-hue-wrap .vc-hue {\n  border-radius: 2px;\n}\n.vc-chrome-alpha-wrap .vc-alpha-gradient {\n  border-radius: 2px;\n}\n.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  transform: translate(-6px, -2px);\n  background-color: rgb(248, 248, 248);\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n}\n.vc-chrome-body {\n  padding: 16px 16px 12px;\n  background-color: #fff;\n}\n.vc-chrome-saturation-wrap {\n  width: 100%;\n  padding-bottom: 55%;\n  position: relative;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n}\n.vc-chrome-saturation-wrap .vc-saturation-circle {\n  width: 12px;\n  height: 12px;\n}\n\n.vc-chrome-fields .vc-input__input {\n  font-size: 11px;\n  color: #333;\n  width: 100%;\n  border-radius: 2px;\n  border: none;\n  box-shadow: inset 0 0 0 1px #dadada;\n  height: 21px;\n  text-align: center;\n}\n.vc-chrome-fields .vc-input__label {\n  text-transform: uppercase;\n  font-size: 11px;\n  line-height: 11px;\n  color: #969696;\n  text-align: center;\n  display: block;\n  margin-top: 12px;\n}\n\n.vc-chrome__disable-alpha .vc-chrome-active-color {\n  width: 18px;\n  height: 18px;\n}\n.vc-chrome__disable-alpha .vc-chrome-color-wrap {\n  width: 30px;\n}\n.vc-chrome__disable-alpha .vc-chrome-hue-wrap {\n  margin-top: 4px;\n  margin-bottom: 4px;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$c = undefined;
  /* module identifier */

  var __vue_module_identifier__$c = undefined;
  /* functional template */

  var __vue_is_functional_template__$c = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$c = normalizeComponent({
    render: __vue_render__$c,
    staticRenderFns: __vue_staticRenderFns__$c
  }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

  //
  var script = {
    components: {
      Photoshop: __vue_component__$8,
      Chrome: __vue_component__$c,
      Sketch: __vue_component__$b,
      Slider: __vue_component__$5,
      Swatches: __vue_component__$6,
      Grayscale: __vue_component__$1,
      Compact: __vue_component__,
      Material: __vue_component__$3
    },
    data: function data() {
      return {
        color: '#194d33'
      };
    },
    computed: {
      bgc: function bgc() {
        return typeof this.color === 'string' ? this.color : this.color.toHexString();
      }
    },
    methods: {
      onOk: function onOk() {
        /* eslint-disable*/
        console.log('ok');
      },
      onCancel: function onCancel() {
        console.log('cancel');
        /* eslint-enable*/
      }
    }
  };

  function normalizeComponent$1(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE$1 = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector$1(context) {
      return (id, style) => addStyle$1(id, style);
  }
  let HEAD$1;
  const styles$1 = {};
  function addStyle$1(id, css) {
      const group = isOldIE$1 ? css.media || 'default' : id;
      const style = styles$1[group] || (styles$1[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD$1 === undefined) {
                  HEAD$1 = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD$1.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  var __vue_script__$d = script;
  /* template */

  var __vue_render__$d = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_c('a', {
      staticClass: "github-fork-ribbon",
      attrs: {
        "href": "https://github.com/xiaokaike/vue-color",
        "title": "Fork me on GitHub"
      }
    }, [_vm._v("\n    Fork me on GitHub\n  ")]), _vm._v(" "), _c('div', {
      staticClass: "header-container"
    }, [_c('div', {
      staticClass: "header-bg",
      style: {
        'background-color': _vm.bgc
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "header"
    }, [_vm._m(0), _vm._v(" "), _c('div', {
      staticClass: "demo-item"
    }, [_c('Chrome', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Chrome")])], 1)])]), _vm._v(" "), _c('div', {
      staticClass: "demo-container"
    }, [_c('div', {
      staticClass: "demo-list"
    }, [_c('div', {
      staticClass: "demo-item"
    }, [_c('Sketch', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Sketch")])], 1), _vm._v(" "), _c('div', {
      staticClass: "demo-item"
    }, [_c('Photoshop', {
      on: {
        "ok": _vm.onOk,
        "cancel": _vm.onCancel
      },
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Photoshop")])], 1)]), _vm._v(" "), _c('div', {
      staticClass: "demo-list"
    }, [_c('div', {
      staticClass: "demo-item"
    }, [_c('Material', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Material")])], 1), _vm._v(" "), _c('div', {
      staticClass: "demo-item"
    }, [_c('Slider', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Slider")])], 1)]), _vm._v(" "), _c('div', {
      staticClass: "demo-list"
    }, [_c('div', {
      staticClass: "demo-item"
    }, [_c('Compact', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Compact")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('Grayscale', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Grayscale")])], 1), _vm._v(" "), _c('div', {
      staticClass: "demo-item"
    }, [_c('Swatches', {
      model: {
        value: _vm.color,
        callback: function callback($$v) {
          _vm.color = $$v;
        },
        expression: "color"
      }
    }), _vm._v(" "), _c('h2', [_vm._v("Swatches")])], 1)])])]);
  };

  var __vue_staticRenderFns__$d = [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "intro-wrap"
    }, [_c('div', {
      staticClass: "intro"
    }, [_c('h1', [_vm._v("Vue-color")]), _vm._v(" "), _c('p', {
      attrs: {
        "role": "presentation"
      }
    }, [_vm._v("A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more")])])]);
  }];
  /* style */

  var __vue_inject_styles__$d = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-6d05c6d5_0", {
      source: "*{margin:0;padding:0}html{font-family:'Source Sans Pro','Helvetica Neue',Arial,sans-serif}.header-container{position:relative}.header-bg{position:absolute;top:0;left:0;right:0;min-height:580px;background-color:#333;opacity:.5;z-index:0}.header{display:flex;max-width:780px;margin:0 auto;padding:20px 0}.intro-wrap{flex:1;margin-right:100px}.intro{width:300px;color:rgba(0,0,0,.65098)}.intro>h1{font-size:40px;font-weight:400;line-height:60px}.intro>p{font-size:16px;font-weight:400;line-height:22px}.demo-container{max-width:780px;min-height:800px;margin:0 auto;position:relative;z-index:2}.demo-list{display:flex;margin-bottom:20px}.demo-item{position:relative;margin-bottom:10px;margin:0 10px 0 10px;z-index:2}.demo-item h2{margin:0;padding:5px 0;color:#666;font-size:16px;font-weight:400}",
      map: undefined,
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$d = undefined;
  /* module identifier */

  var __vue_module_identifier__$d = undefined;
  /* functional template */

  var __vue_is_functional_template__$d = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$d = normalizeComponent$1({
    render: __vue_render__$d,
    staticRenderFns: __vue_staticRenderFns__$d
  }, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector$1, undefined, undefined);

  /* eslint-disable */

  console.log('vue version: ', Vue.version);
  Vue.config.productionTip = false;
  Vue.config.devtools = true;
  new Vue({
    el: '#app-wrap',
    render: function render(h) {
      return h(__vue_component__$d);
    }
  });

})));
