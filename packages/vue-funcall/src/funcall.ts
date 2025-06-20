import { type Component, createVNode, render, nextTick, type AppContext, Slots } from 'vue'
import { type ComponentProps } from '@preflower/vue-use'
import { isFunction } from 'es-toolkit'
import { VueFuncallPlugin } from './plugin'

const DEFAULT_OPTIONS = {
  visible: 'modelValue',
  container: document.body
}

export interface CreateFuncallOptions {
  /**
   * Internal field of Component to control Component display or not
   * If Component are not similar field, define `undefined`
   * default is `modelValue`
   */
  visible?: string
  /**
   * Internal field of Component to listen Component closed
   * If Component are not similar field, define `undefined`
   * scenario: wait for modal fade out animation completed
   * default is `undefined`
   */
  onClosed?: string
  /**
   * Define component mount node, default is `document.body`
   */
  container?: HTMLElement
  /**
   * For support multiple vue instance
   */
  appContext?: AppContext
  /**
   * Component slots
   */
  slots?: Slots
}

export function createFuncall<T extends Component> (
  component: T,
  props: ComponentProps<T>,
  options: CreateFuncallOptions = {}
) {
  const wrapper = document.createElement('div')
  const { visible, onClosed: onClosedEvent, container, appContext, slots } = Object.assign({}, DEFAULT_OPTIONS, options)

  const unmount = async () => {
    await nextTick()
    if (vm.el != null) {
      /**
       * Trigger vue renderer unmount logic, such as: `onUnmount` lifecycle.
       */
      render(null, wrapper)
      container.removeChild(wrapper)
    }
  }

  const handleClose = async () => {
    if (vm.component && visible) {
      vm.component.props[visible] = false
    }
    if (onClosedEvent == null) {
      await unmount()
    }
  }

  const extendProps: Record<string, unknown> = {}

  if (onClosedEvent != null) {
    const onClosed = props[onClosedEvent]

    const handleClosed = async (...parameters: Parameters<typeof onClosed>) => {
      await unmount()

      if (isFunction(onClosed)) {
        onClosed(...parameters)
      }
    }

    extendProps[onClosedEvent] = handleClosed
  }

  if (visible != null) {
    /**
     * Mount v-model event to listen component close
     */
    extendProps[`onUpdate:${visible}`] = handleClose
  }

  const vm = createVNode(component, {
    ...props,
    ...extendProps
  }, slots)

  if (appContext ?? VueFuncallPlugin._context) {
    vm.appContext = appContext ?? VueFuncallPlugin._context
  }

  render(vm, wrapper)
  container.appendChild(wrapper)

  return {
    close: handleClose
  }
}
