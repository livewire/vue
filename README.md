# Livewire VueJS Support Plugin

If you are using VueJS AND Livewire on the same page, this plugin is required.

Additionally, it allows you to use Vue components within your Livewire components.

## Livewire Version Support
Livewire Version | Vue Plugin Version
--- | ---
1.x | 0.2.x
2.x | 0.3.x

## Installation
### CDN
Include the CDN asset after `@livewireScripts` or  `<livewire:scripts>` in your app's HTML:

```html
    ...
    @livewireScripts
    <script src="https://cdn.jsdelivr.net/gh/livewire/vue@v0.3.x/dist/livewire-vue.js"></script>
</body>
```

### NPM
Install the package from NPM.
```
npm install livewire-vue --save-dev
```

Import the package in your bundle:
```
import 'livewire-vue'
// Or.
require('livewire-vue')
```
