/**
 * Base webpack config used across other specific configs
 */

import webpack from "webpack";
import webpackPaths from "./webpack.paths";
import { dependencies as externals } from "../../release/app/package.json";

function createExternals(): string[] {
    const webpackExternals: string[] = [...Object.keys(externals || {})];
    const excludedExternals: string[] = [];

    if (process.platform === "linux") {
        // Linux only uses regedit-rs types
        excludedExternals.push("regedit-rs");
    }

    return webpackExternals.filter(external => !excludedExternals.includes(external));
}

const configuration: webpack.Configuration = {
    externals: createExternals(),

    stats: "errors-only",

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        // Remove this line to enable type checking in webpack builds
                        transpileOnly: true,
                    },
                },
            },
        ],
    },

    output: {
        path: webpackPaths.srcPath,
        // https://github.com/webpack/webpack/issues/1114
        library: {
            type: "commonjs2",
        },
    },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        modules: [webpackPaths.srcPath, "node_modules"],
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production",
        }),
    ],
};

export default configuration;
