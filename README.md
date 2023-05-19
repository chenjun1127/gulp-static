## gulp-static

gulp集成最新前端开发环境，es6+babel7+gulp4+sass
### 项目运行

```bash
# 如全局有安装gulp-cli (npm i gulp-cli -g)，则
gulp 
# 或（未全局安装gulp-cli），本地安装gulp (npm i gulp)
npx gulp
```

### Tips: @babel/preset-env和@babel/plugin-transform-modules-umd区别，需要同时配置吗？
@babel/preset-env 主要用于根据所声明的运行环境自动添加所需的转换插件，以实现 ES6+ 代码向下兼容。如果你只需要将 ES6+ 代码转换成通用的 ES5 代码，而不希望改变模块格式，那么只需要配置 @babel/preset-env。

@babel/plugin-transform-modules-umd 则是用来将 ES6+ 模块转换为 UMD 格式。UMD 全称为 Universal Module Definition，是一种通用的模块定义方式。UMD 通常用于在浏览器和 Node.js 中使用相同的模块系统。如果你需要将 ES6+ 模块转换为 UMD 格式，那么可以配置 @babel/plugin-transform-modules-umd。
