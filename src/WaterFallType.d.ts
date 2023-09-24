export interface WaterfallFlowResult {
  unResize: Function | null
  appendData: Function
}

export interface Options {
  resize?: boolean
  gap?: number
  autoFill?: boolean
  onload?: Function
}

export interface WaterfallParams {
  el: string
  imgs: Array<string>
  imgWidth: number
  options?: Options
}

export interface WaterfallClassParams {
  el: HTMLElement
  imgs: Array<string>
  imgWidth: number
  options?: Options
}

export interface FlowLayout {

}