# 微信小程序项目展示

> 展示基于小程序项目模板创建的示例项目

## 技术栈

- React
- TypeScript
- Tailwind CSS
- [Taroify](https://taroify.github.io/taroify.com/introduce/)

## 项目列表

- [电玩城](https://www.zcool.com.cn/work/ZNzE2NzM4NjQ=.html)
- [鸡尾酒项目](https://www.zcool.com.cn/work/ZMzgyMDgyMjA=.html)
- [夏日么么茶](https://mall.fkw.com/model/1/1006-54-8327.html)

## 已知问题

### Dialog组件样式错误

由于使用了按需引入,会自动加载 Dialog 组件的样式; 但是 Dialog 组件依赖于 Popup 和 Backdrop 组件的样式, 所以需要手动引入样式

解决方案: 在使用 Dialog 组件的地方, 手动引入样式

```tsx
import '@taroify/core/dialog/style'
```

### react-query 版本问题

由于小程序无法使用最新版本的 react-query@5.x, 所以需要使用 4.x 版本.
