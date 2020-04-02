// to avoid compiling a .ts file every time
// enter a watch mode by typing into terminal:
// > tsc <file-name> --watch (or -w)

// to watch and compile entire project directory consisting of multiple files
// navigate to that folder in terminal
// > tsc --init
// note, it will create a tsconfig.json file in that directory
// then either compile on demand
// > tsc
// or enter watch mode
// > tsc -w

// to exclude files in a project, add following in tsconfig.json
// "exclude": [array of excluded file names]
// "exclude": ["node_modules"] // would be default in none specified

// to include files in a project, add following in tsconfig.json
// "include": [array of included file names]

// to pick individual files in a project, add following in tsconfig.json
// "files": [array of compiled file names]

// COMPILER OPTIONS

// to specify to what ES version to compile:
// "target": "es5" // default, supports older browsers
// to support only modern browsers (making the code more concise):
// "target": "es6"

// to include libraries for a specific runtime environment
// set a "lib" option (disabled by default applying default libraries)
// "lib": ["dom", "es6", "dom.iterable", "scripthost"] // these are defaults

// other options to pay attention to:
// "allowJs", "checkJs", "outDir", "rootDir", "removeComments", "noEmit"

// enable sourceMap to help with debugging
// "sourceMap": true

// note, "noEmit":true option does not produce output .js files. It's useful when working only with .js and want typescript to just check for errors in these files

// "noEmitOnError"
// default is false
// what it means is that even if there's an error, typescript will still compile the file to .js
// if you want to stop compilation of files in which there are errors, set it to true

// "strict" options
// enable more strict type checking rules
// can either enable individual options or set all of them by enabling only strict

// code quality options
// "noUnusedLocals", "noUnusedParameters", "noImplicitReturns"
