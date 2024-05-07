import { type Component, createVNode, render, nextTick } from 'vue'
import { type ComponentProps } from '@preflower/vue-use'

export function createFunctionCall<T extends Component> (
  component: T,
  props: ComponentProps<T>,
  container: HTMLElement = document.body
) {
  const wrapper = document.createElement('div')
  const vm = createVNode(component, props)

  const handleClose = async () => {
    await nextTick()
    if (vm.el != null) {
      container.removeChild(wrapper)
    }
  }

  render(vm, wrapper)
  container.appendChild(wrapper)

  return {
    close: handleClose
  }
}
