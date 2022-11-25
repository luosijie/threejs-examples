module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/base'
    ],
    overrides: [
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        // parser: '@babel/eslint-parser',
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true
        },
        requireConfigFile: false
    },
    plugins: [
        'vue'
    ],
    rules: {
        'no-console': 'off',
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'vue/no-parsing-error': 'off',
        'vue/html-indent': ['error', 4],
        'vue/no-reserved-keys': ['error'],
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'no-control-regex': 0,
        'comma-spacing': [2, { before: false, after: true }],
        // "vue/no-parsing-error": ["error", {
        //     "invalid-first-character-of-tag-name": false
        // }],
        //  "vue/component-definition-name-casing": ["error", "PascalCase"] // 组件名称
        //  "vue/script-indent": [2, "tab", { baseIndent: 1 }],
        //  "vue/html-indent": [2, "tab", { baseIndent: 1 }],
        //  "no-undef": 2, //不可以有未声明的变量
        //  "no-redeclare": 2, //禁止重复声明变量
        //  semi: [2, "always"], //语句强制分号结尾
        //  "no-func-assign": 2, //禁止重复的函数声明
        //  // "spaced-comment": 2, //注释前要有空格
        //  "arrow-spacing": [2, { before: true, after: true }], //箭头前后括号
        'block-spacing': [2, 'always'], // 块级作用域缩进
        //  "brace-style": [2, "1tbs", { allowSingleLine: true }], // 大括号风格，允许写在一行
        //  "comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾
        //  "eol-last": 2,
        //  eqeqeq: [2, "allow-null"],
        //  "generator-star-spacing": [2, { before: true, after: true }],
        //  indent: [2, 2, { SwitchCase: 1 }],
        //  "jsx-quotes": [2, "prefer-single"],
        //  "key-spacing": [2, { beforeColon: false, afterColon: true }],
        'keyword-spacing': [2, { before: true, after: true }],
        //  "new-parens": 2,
        //  "no-cond-assign": 2,
        //  "no-dupe-args": 2,
        //  "no-dupe-class-members": 2,
        //  "no-duplicate-case": 2,
        //  "no-empty-pattern": 2,
        //  "no-eval": 2,
        //  "no-extra-parens": [2, "functions"],
        //  "no-func-assign": 2,
        //  "no-invalid-regexp": 2,
        //  "no-irregular-whitespace": 2,
        //  "no-mixed-spaces-and-tabs": 2,
        //  "no-multi-spaces": [2, { ignoreEOLComments: true }],
        'no-multiple-empty-lines': [2, { max: 1 }],
        //  "no-redeclare": 2,
        //  "no-regex-spaces": 2,
        //  "no-trailing-spaces": 2,
        //  "no-undef": 2,
        //  "no-whitespace-before-property": 2,
        //  "operator-linebreak": [2, "after", { overrides: { "?": "before", ":": "before" } }],
        //  "padded-blocks": [2, "never"],
        //  "semi-spacing": [2, { before: false, after: true }],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'always'],
        //  "space-in-parens": [2, "never"],
        'space-infix-ops': 2
    //  "space-unary-ops": [2, { words: true, nonwords: false }],
    //  "spaced-comment": [
    //      2,
    //      "always",
    //      { markers: ["global", "globals", "eslint", "eslint-disable", "*package", "!", ","] },
    //  ],
    //  "template-curly-spacing": [2, "never"],
    //  "wrap-iife": [2, "any"],
    //  "yield-star-spacing": [2, "both"],
    //  // "prefer-const": 2,
    //  "object-curly-spacing": [2, "always", { objectsInObjects: false }],
    }
}
