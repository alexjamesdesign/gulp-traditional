/**
 * IMPORT STATEMENTS
 * Import all our plugins into our gulp file
 */
import { src, dest, parallel, series, watch } from "gulp";
import rollup from "gulp-better-rollup";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import browserSync from "browser-sync";
import gulpif from "gulp-if";
import yargs from "yargs";
import postcss from "gulp-postcss";
import sass from "gulp-sass";
import nodeSass from "node-sass";
import gulprename from "gulp-rename";

/**
 * CONFIG
 * Define the paths in the object below
 */
const paths = {
	js: {
		src: './js/production.js',
		partials: './js/scripts/*.js',
		dest: './js'
	},
	scss: {
		src: './scss/*.scss',
		partials: './scss/**/*.scss',
		dest: './css'
	},
	php: {
		src: './**/*.php'
	}
}

const production = yargs.argv.production;
const server = browserSync.create();

sass.compiler = nodeSass;

/**
 * TASKS
 */
const spin_it_up = done => {
	server.init({
		proxy: "https://YOURDOMAIN.vm",
		https: true
	});
	done();
}

const reload_it = done => {
	server.reload();
	done();
}

const js_build = () => {
	return src(paths.js.src)
		.pipe(gulpif(production, 
			rollup({
				plugins: [
					babel({
						exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
						presets: [
							[
								"@babel/preset-env",
								{
									"useBuiltIns": "entry",
									'corejs': 3,
								}
							]
						],
						runtimeHelpers: true
					}),
					resolve(),
					commonjs(),
					terser()
				]
			}, 'umd' ),
			rollup({
			plugins: [
				babel({
					exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
					presets: [
						[
							"@babel/preset-env",
							{
								"useBuiltIns": "entry",
								'corejs': 3,
							}
						]
					],
					runtimeHelpers: true
				}),
				resolve(),
				commonjs()
			]
		}, 'umd' )))
		.pipe(gulprename("production-dist.js"))
		.pipe(dest(paths.js.dest))
}

const scss_build = () => {
	return src(paths.scss.src,{sourcemaps:true})
		.pipe(sass({
			includePaths: []
		}))
		.pipe(gulpif(production, 
			postcss([
				require('autoprefixer'),
				require('cssnano')
			])
		))
		
		.pipe(dest('./css',{sourcemaps:"."}))
		.pipe(server.stream())
}

const watcher = () => {
	watch([paths.js.partials, paths.js.src], series(js_build, reload_it));
	watch(paths.scss.partials, scss_build);
	watch(paths.php.src, reload_it);
}

/**
 * TASK EXPORTS
 */
export const js = js_build;
export const scss = scss_build;
export const build = parallel(js_build, scss_build);
export const dev = series(parallel(js_build, scss_build), spin_it_up, watcher);