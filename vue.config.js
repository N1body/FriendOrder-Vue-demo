const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true,
	publicPath: './',
	css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'sidebar-selected-border-color': '#1989fa',
						'sidebar-active-color': '#1989fa',
						'sidebar-selected-border-height': '30px',
						'sidebar-selected-border-width': '2px',
						'sidebar-selected-text-color': '#1989fa',
						'address-list-edit-icon-size': '18px',
						'cell-line-height': '30px',
						
          },
        },
      },
    },
  },
	chainWebpack: config => {
	    config.resolve.alias.set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
	}
}