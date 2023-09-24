# waterfall-flow-js

#### 安装
```
npm i waterfall-flow-js
```

#### 使用说明

```
import waterfall from 'waterfall-flow-js'

// 元素加载时使用

const flow = waterfall(el, imgs, imgWidth, options)
flow.append()
```
##### attr
| 参数      | 类型 | 默认值 | 说明 |
| ----------- | ----------- | ----------- | ----------- |
| el      | HTMLElement       | --       | 该dom元素会作为图片的渲染容器       |
| imgs   | Array<string>        | --        | 一个包含图片url地址的数组， 所有图片将被渲染到容器中并以瀑布流排列        |
| imgWidth   | number       | --        | 图片的宽度，必须要执行，会根据执行宽度去分列，注意，图片的宽度并不一定会等于该值。        |
| options   | Object        | --        | 详细说明请参考（options）        |
##### methods
| 名称      | 参数      | 说明 |
| ----------- | ----------- | ----------- |
| appendData      | 同imgs     | 追加数据       |
| unResize   | --       | 停止对元素的尺度变化监听        |
##### options
| 属性      | 类型 | 说明 | 默认值 |
| ----------- | ----------- | ----------- | ----------- |
| resize      | boolean       | 是否监听元素的尺寸变化，如果监听了可使用 unResize 函数停止监听       | true |
| gap   | number        | 图片之间的间距，会作为padding给到元素        | 6        |
| autoFill   | boolean        | 是否使得图片等同列宽，建议使用true， 可极大提升美观性        | true        |
| onload   | Function        | 该函数会在图片渲染出来后执行        | -- |

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
