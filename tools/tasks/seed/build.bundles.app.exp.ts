import { join } from 'path';

const nodeResolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup').rollup;

import {
  BOOTSTRAP_MODULE,
  JS_PROD_APP_BUNDLE,
  TMP_DIR
} from '../../config';

class RollupNG2 {
  options: any;
  constructor(options?: any) {
    this.options = options;
  }
  resolveId(id: string, from: string) {
    if (id.startsWith('rxjs/')) {
      console.log(id);
      return `${__dirname}/../../../node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
    }
    return undefined;
  }
}

const rollupNG2 = (config?: any) => new RollupNG2(config);

const rollupConfig = {
  entry: join(TMP_DIR, BOOTSTRAP_MODULE),
  plugins: [
    rollupNG2(),
    nodeResolve({
      jsnext: true, main: true
    })
  ],
  external: [
    "rxjs/Subject",
    "rxjs/observable/PromiseObservable",
    "rxjs/operator/toPromise",
    "rxjs/Observable",
    "rxjs/add/operator/map",
    "rxjs/add/operator/mergeMap",
    "rxjs/add/operator/mergeAll",
    "rxjs/add/operator/reduce",
    "rxjs/add/operator/every",
    "rxjs/add/observable/from",
    "rxjs/add/observable/forkJoin",
    "rxjs/observable/of",
    "rxjs/BehaviorSubject",
    "rxjs/add/operator/toPromise",
    "rxjs/observable/forkJoin",
    "rxjs/observable/fromPromise",
    "rxjs/add/operator/catch"
  ]
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  return rollup(rollupConfig)
    .then((bundle: any) => {
      return bundle.write({
        format: 'iife',
        dest: join(TMP_DIR, JS_PROD_APP_BUNDLE)
      });
    });
};
