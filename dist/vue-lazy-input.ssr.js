'use strict';Object.defineProperty(exports,'__esModule',{value:true});var lodash=require('lodash');var _ = { throttle: lodash.throttle, debounce: lodash.debounce, get: lodash.get };

var vueLazyInput = {
  bind: function bind(el, binding, vnode) {
    var type = ['debounce', 'throttle'].includes(binding.arg)
      ? binding.arg
      : 'debounce';

    var d = Number(binding.value) || 500;
    var ref = getHelpers(vnode);
    var removeListener = ref.removeListener;
    var addListener = ref.addListener;
    var getInputEvents = ref.getInputEvents;
    var inputEvents = getInputEvents(vnode);

    if (!inputEvents.length) {
      // eslint-disable-next-line
      console.log('[v-lazy-input] no input events found during bind');
    }

    inputEvents.map(function (handler) {
      removeListener('input', handler._wrapper || handler);
    });
    addListener(
      'input',
      _[type](function (val) {
        var oldVal = _.get(vnode.context, binding.expression);
        if (oldVal !== val) {
          inputEvents.map(function (x) { x(val); });
        }
      }, d),
      false
    );
  },
  unbind: function unbind(el, binding, vnode) {
    var ref = getHelpers(vnode);
    var removeListener = ref.removeListener;
    var getInputEvents = ref.getInputEvents;
    getInputEvents(vnode).map(function (handler) {
      removeListener('input', handler);
    });
  }
};

function getHelpers(vnode) {
  var isCmp = !!vnode.componentInstance;

  var removeListener = isCmp
    ? vnode.componentInstance.$off.bind(vnode.componentInstance)
    : function (type, handler) {
      vnode.elm.removeEventListener(type, handler);
      delete vnode.data.on[type];
    };

  var addListener = isCmp
    ? vnode.componentInstance.$on.bind(vnode.componentInstance)
    : function (type, handler, opt) {
      vnode.elm.addEventListener(type, handler, opt);
      vnode.data.on[type] = handler;
    };

  var getInputEvents = isCmp
    ? function () { return [].concat( (vnode.componentInstance._events.input || []) ); }
    : function () { return [vnode.data.on.input]; };

  return {
    removeListener: removeListener,
    addListener: addListener,
    getInputEvents: getInputEvents
  }
}/* eslint-disable import/prefer-default-export */var components = /*#__PURE__*/Object.freeze({lazyInput: vueLazyInput});// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.directive(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}exports.default=plugin;exports.lazyInput=vueLazyInput;