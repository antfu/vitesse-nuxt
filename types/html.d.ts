// for UnoCSS attributify mode compact in Volar
// refer: https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472
declare module '@vue/runtime-dom' {
  type HTMLAttributes = Record<string, unknown>
}
declare module '@vue/runtime-core' {
  type AllowedComponentProps = Record<string, unknown>
}
export {}
