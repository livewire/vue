if (typeof window.livewire === 'undefined') {
    throw 'Livewire Vue Plugin: window.livewire is undefined. Make sure @livewireScripts is placed above this script include'
}

window.livewire.hook('message.received', (message, component) => {
    if (! window.Vue) return

    if (! message.response.effects.html) return

    const div = document.createElement('div')
    div.innerHTML =  message.response.effects.html

    new window.Vue().$mount(div.firstElementChild)

    message.response.effects.html = div.firstElementChild.outerHTML
})

window.livewire.hook('element.initialized', el => {
    if (el.__vue__) el.__livewire_ignore = true
})

window.livewire.hook('interceptWireModelSetValue', (el, value) => {
    // If it's a vue component pass down the value prop.
    if (! el.__vue__) return

    // Also, Vue will throw a warning because we are programmaticallly
    // setting a prop, we need to silence that.
    const originalSilent = window.Vue.config.silent
    window.Vue.config.silent = true

    el.__vue__.$props.value = value

    window.Vue.config.silent = originalSilent
})

window.livewire.hook('interceptWireModelAttachListener', (el, directive, component, debounceIf) => {
    // If it's a vue component pass down the value prop.
    if (! el.__vue__) return

    const hasDebounceModifier = directive.modifiers.includes('debounce')
    const isLazy = directive.modifiers.includes('lazy')

    el.__vue__.$on('input', debounceIf(hasDebounceModifier || ! isLazy, e => {
        const model = directive.value
        const value = e

        component.set(model, value)
    }, directive.durationOr(150)))
})
