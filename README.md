# vue3-ts-cms

**注意事项:**
- 测试账号：coderwhy/coderdemo
- 密码：123456/123456
- 禁止随便修改别人账号、密码、权限管理等相关操作
- 目前我这个项目中的接口地址是可以使用的（2023.5.29日仍然可用），有需要的同好可以拿去使用，再次感谢coderwhy老师提供的项目接口文档，再次敬佩老师的开源精神。
- 一些文件夹和文件的名字以及放置位置，我按照自己比较舒服的方式进行了安排，并没有完全按照老师的方式进行安排，有强迫症者慎看。
- 组件中的一些变量名、函数名，我按照自己喜欢的方式进行了重新命名，有强迫症者慎看。
- 组件中的一些代码逻辑，我按照自己易于理解的方式进行了抽取，和老师的方式不太一样，有强迫症者慎看。
- 只完成了系统管理部分，其他部分和系统管理部分没有太大差别，都是使用配置文件快速开发页面。
- 最终代码里面，我将user组件用配置文件进行了重构，如果想看未重构的user组件，可以回退代码。
- 由于我看的课程中，老师是最后介绍的Husky、Commitizen、Commitlint，所以一开始的提交信息都不是很规范，但是我尽量将提交信息写的比较清楚了。
- 老师讲解的项目中，分页器哪里有一些小bug，我尽量修复了哪些bug，可能还会有其他bug，只是我没有发现，希望发现的同好可以告诉我一下。
- 请求roleList数据和departmentList数据时，如果没有传size，默认只会返回10条数据，应该是老师服务器那边进行的设置。为了能拿到全部的数据，我将size=100传了过去。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
