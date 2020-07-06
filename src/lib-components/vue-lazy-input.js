import { throttle, debounce, identity as sync } from 'lodash'
const _ = { throttle, debounce, sync }
const DELAY = 500
const TYPE = 'debounce'

export default {
  bind(el, binding, vnode) {
    const type = Object.keys(_).includes(binding.arg) ? binding.arg : TYPE
    const d = Number(binding.value) || DELAY
    const { removeListener, addListener, getInputEvents, getHandler } = getHelpers(vnode)
    let inputEvents = vnode.$_originalInputEvents || getInputEvents(vnode)

    if (!inputEvents.length) {
      // eslint-disable-next-line
      console.log('[v-lazy-input] no input events found during bind')
    }
    
    binding.def.unbind(el, binding, vnode)

    addListener('input', _[type](function (val) {
      inputEvents.map(x => { x(val) })
    }, d), false)

    vnode.$_originalInputEvents = inputEvents
  },
  unbind(el, binding, vnode) {
    const { removeListener, getInputEvents, getHandler } = getHelpers(vnode)

    getInputEvents(vnode).map(handler => {
      removeListener('input', getHandler(handler))
    })
  },
  update(el, binding, vnode, oldVnode) {
    vnode.$_originalInputEvents = oldVnode.$_originalInputEvents

    if (binding.oldValue !== binding.value || binding.oldArg !== binding.arg) {
      binding.def.bind(el, binding, vnode)
    }
  }
}

function getHelpers(vnode) {
  const isCmp = !!vnode.componentInstance

  const removeListener = isCmp
    ? vnode.componentInstance.$off.bind(vnode.componentInstance)
    : (type, handler) => {
      vnode.elm.removeEventListener(type, handler)
      delete vnode.data.on[type]
    }

  const addListener = isCmp
    ? vnode.componentInstance.$on.bind(vnode.componentInstance)
    : (type, handler, opt) => {
      vnode.elm.addEventListener(type, handler, opt)
      vnode.data.on[type] = handler
    }

  const getHandler = handler =>
    handler._wrapper || /** v >= 2.6.0 */
    handler._withTask || /** 2.5.2 >= v > 2.6.0 */
    handler /** v < 2.5.2*/

  const getInputEvents = isCmp
    ? () => [...(vnode.componentInstance._events.input || [])]
    : () => [vnode.data.on.input]

  return {
    removeListener,
    addListener,
    getInputEvents,
    getHandler
  }
}
