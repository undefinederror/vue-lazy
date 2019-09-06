import { throttle, debounce, get } from 'lodash'
const _ = { throttle, debounce, get }

export default {
  bind(el, binding, vnode) {
    const type = ['debounce', 'throttle'].includes(binding.arg)
      ? binding.arg
      : 'debounce'

    const d = Number(binding.value) || 500
    const { removeListener, addListener, getInputEvents } = getHelpers(vnode)
    const inputEvents = getInputEvents(vnode)

    if (!inputEvents.length) {
      // eslint-disable-next-line
      console.log('[v-lazy-input] no input events found during bind')
    }

    inputEvents.map(handler => {
      removeListener('input', handler._wrapper || handler)
    })
    addListener(
      'input',
      _[type](function (val) {
        const oldVal = _.get(vnode.context, binding.expression)
        if (oldVal !== val) {
          inputEvents.map(x => { x(val) })
        }
      }, d),
      false
    )
  },
  unbind(el, binding, vnode) {
    const { removeListener, getInputEvents } = getHelpers(vnode)
    getInputEvents(vnode).map(handler => {
      removeListener('input', handler)
    })
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

  const getInputEvents = isCmp
    ? () => [...(vnode.componentInstance._events.input || [])]
    : () => [vnode.data.on.input]

  return {
    removeListener,
    addListener,
    getInputEvents
  }
}
