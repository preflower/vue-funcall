import { type Component, createVNode, render, nextTick, type AppContext } from 'vue'
import { type ComponentProps } from '@preflower/vue-use'
import { isFunction } from 'lodash-es'
import { VueFuncallPlugin } from './plugin'

const DEFAULT_OPTIONS = {
  visible: 'modelValue',
  container: document.body
}

export interface CreateFuncallOptions {
  /**
   * Internal field of Component to control Component display or not
   * If Component are not similiar field, define `undefined`
   * default is `modelValue`
   */
  visible?: string
  /**
   * Internal field of Component to listen Component closed
   * If Component are not similiar field, define `undefined`
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
}

export function createFuncall<T extends Component> (
  component: T,
  props: ComponentProps<T>,
  options: CreateFuncallOptions = {}
) {
  const wrapper = document.createElement('div')
  const { visible, onClosed: onClosedEvent, container, appContext } = Object.assign({}, DEFAULT_OPTIONS, options)

  const unmount = async () => {
    await nextTick()
    if (vm.el != null) {
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

  const extendProps: Record<string, any> = {}

  if (onClosedEvent != null) {
    const onClosed = props[onClosedEvent]

    const handleClosed = async (...paramters: Parameters<typeof onClosed>) => {
      await unmount()

      if (isFunction(onClosed)) {
        onClosed(...paramters)
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
  })

  if (appContext ?? VueFuncallPlugin._context) {
    vm.appContext = appContext ?? VueFuncallPlugin._context
  }

  render(vm, wrapper)
  container.appendChild(wrapper)

  return {
    close: handleClose
  }
}
