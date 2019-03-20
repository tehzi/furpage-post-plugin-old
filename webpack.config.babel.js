import CopyWebpackPlugin from "copy-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
import HappyPack from "happypack";
import { compact } from "lodash/array";
import FileManager from "filemanager-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import packageJson from "./package.json";

const isDev = mode => mode === "development";

const config = {
    path: `${__dirname}/dist`,
    clean: {
        root: __dirname,
        verbose: true,
        dry: false,
    },
    html: {
        filename: "background.html",
        inject: false,
        template: `${__dirname}/src/html/background.html`,
    },
    popup: {
        filename: "popup.html",
        inject: false,
        template: `${__dirname}/src/html/popup.html`,
    },
};

export default (env, { mode }) => ({
    devtool: isDev(mode) && "inline-source-map",
    optimization: {
        namedModules: true, // NamedModulesPlugin()
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    },
    entry: {
        "furpage-bundle": "./src/js/pages/bundle.jsx",
        background: "./src/js/pages/background.jsx",
        popup: "./src/js/pages/popup.jsx",
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "happypack/loader?id=js",
            },
            {
                test: /.*\.(ttf|eot|svg|css|woff|woff2|png|ico|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./",
                            useRelativePath: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: compact([
        new CleanPlugin(config.path, config.clean),
        new CopyWebpackPlugin([
            {
                from: "./src/json/**/*",
                to: "./",
                flatten: true,
                transform(content, path) {
                    if (path.match(/manifest\.json$/)) {
                        return content.toString().replace("%%VERSION%%", packageJson.version);
                    }
                    return content;
                },
            },
        ]),
        new HappyPack({
            id: "js",
            threads: 4,
            loaders: compact([
                {
                    path: "babel-loader",
                    exclude: [/node_modules/],
                },
                !isDev(mode) && "eslint-loader",
            ]),
        }),
        new HtmlPlugin(config.html),
        new HtmlPlugin(config.popup),
        !isDev(mode) && new FileManager({
            onEnd: [
                {
                    mkdir: ["./release"],
                },
                {
                    archive: [{
                        source: config.path,
                        destination: `${__dirname}/release/${packageJson.name}-${packageJson.version}.zip`,
                    }],
                },
            ],
        }),
    ]),
});
