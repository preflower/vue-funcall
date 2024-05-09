import { type Component, createVNode, render, nextTick, type AppContext } from 'vue'
import { type ComponentProps } from '@preflower/vue-use'
import { isFunction } from 'lodash-es'
import { VueFuncallPlugin } from './plugin'

const DEFAULT_OPTIONS = {
  visible: 'visible',
  onClosed: 'onClosed',
  container: document.body
}

export interface CreateFuncallOptions {
  /**
   * Internal field of Component to control Component display or not
   * If Component are not similiar field, define `undefined`
   * default is `visible`
   */
  visible?: string
  /**
   * Internal field of Component to listen Component closed
   * If Component are not similiar field, define `undefined`
   * default is `onClosed`
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

  const onClosed = props[onClosedEvent]

  const unmount = async () => {
    await nextTick()
    if (vm.el != null) {
      container.removeChild(wrapper)
    }
  }

  const handleClosed = async (...paramters: Parameters<typeof onClosed>) => {
    await unmount()

    if (isFunction(onClosed)) {
      onClosed(...paramters)
    }
  }

  const vm = createVNode(component, {
    ...props,
    [onClosed]: handleClosed
  })

  if (appContext ?? VueFuncallPlugin._context) {
    vm.appContext = appContext ?? VueFuncallPlugin._context
  }

  render(vm, wrapper)
  container.appendChild(wrapper)

  const handleClose = async () => {
    if (vm.component && visible) {
      vm.component.props[visible] = false
    }
    if (onClosedEvent == null) {
      await unmount()
    }
  }

  return {
    close: handleClose
  }
}
