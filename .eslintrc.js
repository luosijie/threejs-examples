// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'func-names': 0, // 使用具名函数
        'arrow-body-style': 0, // 箭头函数要求必须有函数体
        'import/extensions': 0, // 扩展名称
        'import/no-unresolved': 0, // 找不到路径
        'import/no-extraneous-dependencies': 0,
        'no-return-assign': 0, // 返回的结果中使用了等于
        'max-len': 0, // 一行不可过长
        'consistent-return': 0, // if语句的问题
        'jsx-a11y/no-static-element-interactions': 0, // 绑定函数检验
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
        'comma-dangle': ['error', 'never'],
        // warnning
        'no-debugger': 2,


        'indent': ['error', 4, { 'SwitchCase': 1 }], // indent 为4空格
        'quotes': ['error', 'single'], // 双引号
        // 'semi': ['error', 'always'], // 结尾分号
        'vars-on-top': 2, //var必须放在作用域顶部

        // 永久关闭
        'no-await-in-loop': 0, // for循环中可以用await
        'jsx-a11y/anchor-is-valid': 0,
        'no-mixed-operators': 0, // 字符混用的检验要关闭
        'no-restricted-syntax': 0, // 语法检查不要太严格
        'no-unused-vars': 0, // 回调函数中进程有无用参数，所以这个规则不要打开为好
        'no-else-return': 0, // return之后可以接else
        'no-lonely-if': 0, // 一个if也可以使用
        'import/no-dynamic-require': 0, // require不要动态的
        'global-require': 0, // require要在头部
        'radix': 0, // 默认10进制
        'import/prefer-default-export': 0, // 不要限定export几个
        'no-continue': 0, // 允许使用continue
        'linebreak-style': 0,
        'promise/always-return': 0, // promise 必须返回值
        'promise/no-callback-in-promise': 0, // promise中不用调用callback
        'camelcase': 0, // 驼峰模式
        'no-restricted-globals': ['error', 'fdescribe'], // js的全局函数
        'no-underscore-dangle': 0, // 下划线的变量

        // 必须尽快酌情打开
        'handle-callback-err': 0, // 错误未处理

        // 'vue/require-v-for-key': 0,
        // 'no-shadow': 0,
        // 'prefer-arrow-callback': 0,
        // 'promise/catch-or-return': 0,
        // 'promise/no-nesting': 0,
        // 'array-callback-return': 0,
        // 'no-extra-semi': 0,
        // 'no-empty': 0,
        // 'vue/no-parsing-error': 0,
        // 'vue/no-invalid-template-root': 0,
        // 'import/no-duplicates': 0,
        // 'no-var': 0,
        // 'one-var': 0,
        // 'one-var-declaration-per-line': 0,
        // 'no-useless-return': 0,
        // 'no-unused-expressions': 0,
        // 'dot-notation': 0,
        // 'no-tabs': 0,
        // 'no-mixed-spaces-and-tabs': 0,
        // 'vue/no-invalid-v-model': 0,
        // 'vue/no-invalid-v-for': 0,
        // 'no-empty-function': 0,
        // 'no-use-before-define': 0,
        // 'default-case': 0,
        // 'object-curly-spacing': 0,

        // 未来会陆续打开
        'space-before-function-paren': 0, // 函数后要有空格
        'no-useless-escape': 0, // 用不到的字符
        'promise/avoid-new': 0, // 不要使用new Promise
        'class-methods-use-this': 0, // 没用this的方法要改为静态的
        'quote-props': 0, // object的key不用引号
        'import/first': 0, // import要先，逻辑在后
        'spaced-comment': 0, // 注释中要求头尾空格
        'object-shorthand': 0, // class 中的方法不要些function
        'arrow-parens': 0, // 箭头函数的参数括号问题
        'guard-for-in': 0, // for in 要对key类型判断
        'import/newline-after-import': 0, // import 最后一个换行
        'no-plusplus': 0, // 暂时允许++
        'no-return-await': 0, // 暂时允许在async中返回await
        'prefer-template': 0, // 字符串用模版，不要用相加
        'no-param-reassign': 0, // 参数重新赋值
        'prefer-destructuring': 0 // 建议使用结构赋值
    }
}