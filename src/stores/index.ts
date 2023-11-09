import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(persist)

export default pinia
export * from './modules/user'
export * from './modules/counter'
export * from './modules/bar'
