import { type AllowedComponentProps, type Component, type VNodeProps, createVNode, render, nextTick } from 'vue'

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

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
