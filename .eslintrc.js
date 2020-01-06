module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        jsx: true,
        useJSXTextNode: true,
        ecmaFeatures: {
            jsx: true,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: "./"
    },
    plugins: [
        "import",
        "@typescript-eslint",
        "eslint-comments",
        "promise",
        "unicorn",
        "redux-saga",
        "prettier",
    ],
    settings: {
        "import/parser": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {},
            // node: {
            //     extensions: [".ts", ".tsx", ".js", ".jsx"],
            // },
        },
        "react": {
            version: "detect" // React version, default to the latest React stable release
        }
    },
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:redux-saga/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "plugin:prettier/recommended",
        "prettier/react",
        "prettier/@typescript-eslint",
    ],
    rules: {
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/no-unused-vars": "error",
        "unicorn/filename-case": ["error", {
            cases: {
                "pascalCase": true,
                "camelCase": true,
            }
        }],
        "react/prop-types": "off",
        "no-empty": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "no-plusplus": "off",
        "no-console": "error",
        "react/static-property-placement": "off",
    }
};
