import type {
  WaterfallFlowResult,
  WaterfallParams,
  Options,
} from './WaterFallType'

const waterfallFlowLayout = function ({
  el,
  imgWidth,
  imgs,
  options,
}: WaterfallParams): WaterfallFlowResult {
  if (!el || !imgs || !imgWidth) {
    throw new Error('缺少必要参数， 瀑布流创建失败')
  }
  const flow = new FlowLayout({ el, imgWidth, imgs, options })
  if (options && options.resize) {
    flow.resize()
  }
  return {
    unResize: options && options.resize ? flow.unResize.bind(flow) : null,
    appendData: flow.appendData.bind(flow),
  }
}

class FlowLayout {
  private el: HTMLElement
  private imgWidth: number
  private imgs: Array<string>
  private options: Options | undefined
  private resizeObserver: ResizeObserver | null
  private initWidth: number
  private imgNodes: Array<Node | null>
  private columnHeight: Array<number>
  constructor({ el, imgWidth, imgs, options }: WaterfallParams) {
    this.el = el
    this.imgWidth = imgWidth
    this.imgs = []
    this.options = options || {}
    if (this.options.gap === undefined) this.options.gap = 6
    if (this.options.autoFill === undefined) this.options.autoFill = true
    this.resizeObserver = null
    this.initWidth = 0
    this.imgNodes = []
    this.columnHeight = []
    this.initLayout()
    this.preLoadImg(imgs).finally(() => {
      this.compile(imgs)
    })
  }

  initLayout() {
    let columns: number = parseInt(
      (this.el.clientWidth / this.imgWidth).toString()
    )
    this.el.innerHTML = ''
    this.initWidth = 0
    this.imgNodes = []
    this.imgs = []
    this.columnHeight = []
    this.el.style.display = 'flex'
    this.el.style.alignItems = 'flex-start'
    this.columnHeight = []
    for (let index = 0; index < columns; index++) {
      this.columnHeight.push(0)
      const box = document.createElement('div')
      box.style.flex = '1 1 0%'
      box.style.textAlign = 'center'
      box.style.padding = `0 ${this.options!.gap}px`
      this.el.appendChild(box)
    }
  }

  compile(imgs: Array<string>) {
    for (let i = 0; i < imgs.length; i++) {
      const index = this.imgNodes.length - imgs.length + i
      const node = this.imgNodes[index]
      const minHeight = Math.min(...this.columnHeight)
      const minIndex = this.columnHeight.indexOf(minHeight)
      this.el.querySelectorAll('div')[minIndex].appendChild(node as Node)
      const nowHeight = this.el.querySelectorAll('div')[minIndex].clientHeight
      this.columnHeight[minIndex] = nowHeight
    }
    this.initWidth = this.el.clientWidth
    if (this.options?.onload) this.options.onload()
  }

  preLoadImg(imgs: Array<string>) {
    const _this = this
    const len = this.imgs.length
    this.imgs = this.imgs.concat(imgs)
    return new Promise<void>((resolve) => {
      imgs.map((item, i) => {
        const index = len + i
        _this.imgNodes[index] = null
        let img = new Image()
        img.src = item
        img.style.width = this.options!.autoFill
          ? '100%'
          : this.imgWidth - 12 + 'px'
        img.style.marginBottom = '6px'
        img.onload = function () {
          _this.imgNodes[index] = img
          if (_this.imgNodes.indexOf(null) === -1) {
            resolve()
          }
        }
        img.onerror = function () {
          _this.imgNodes[index] = img
          if (_this.imgNodes.indexOf(null) === -1) {
            resolve()
          }
        }
      })
    })
  }

  appendData(data: Array<string>) {
    this.preLoadImg(data).finally(() => {
      this.compile(data)
    })
  }

  resize() {
    let timer: null | number = null
    this.resizeObserver = new ResizeObserver((entries) => {
      let { width } = entries[0].contentRect
      if (this.initWidth > 0) {
        if (Math.abs(this.initWidth - width) > 10) {
          if (timer !== null) clearTimeout(timer)
          timer = setTimeout(() => {
            let columns: number = parseInt(
              (this.el.clientWidth / this.imgWidth).toString()
            )
            if(columns === this.columnHeight.length) return
            const imgs = this.imgs
            this.initLayout()
            this.preLoadImg(imgs).finally(() => {
              this.compile(imgs)
            })
          }, 500)
        }
      }
    })

    this.resizeObserver.observe(this.el, { box: 'border-box' })
  }

  unResize() {
    this.resizeObserver!.unobserve(this.el)
  }
}

export default waterfallFlowLayout
