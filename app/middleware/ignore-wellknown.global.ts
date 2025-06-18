export default defineNuxtRouteMiddleware((to, _from) => {
  console.log('ignore-wellknown.global.ts', to.fullPath)
  if (to.path.startsWith('/.well-known')) {
    // 静的ファイルに任せるため、何もせず return
    return
  }
  // ...他のルートは通常通り
})
