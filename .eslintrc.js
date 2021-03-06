module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "indent": ["error", 4],
        "@typescript-eslint/ban-types": "off",
        "linebreak-style": ["warn", "unix"]
    }
};
