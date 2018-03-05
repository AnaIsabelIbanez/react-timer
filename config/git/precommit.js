import * as gitUtils from './gitUtils';
import { resolve, join } from 'path';
import { CLIEngine } from 'eslint';
import { readFileSync } from 'fs';

const eslintconfig = readFileSync('.eslintrc.json');

const rootPath = resolve(join(__dirname, '../../'));

gitUtils.filesToCommit(rootPath).then(data => {
    const lintReport = lintStagedFiles(data);
    if (lintReport.errorCount > 0) {
        console.log('\x1b[31m\x1b[1m','[eslint] ERROR: SOME FILES HAVE LINT ERRORS', '\x1b[0m');
        console.log(parseErrorsToConsole(lintReport).join('\n'));
        process.exit(1);
    } else {
        console.log('\x1b[32m\x1b[1m','[eslint] SUCCESS: FILES WITHOUT LINT ERROR', '\x1b[0m');
    }
});

function lintStagedFiles(files) {
    const cli = new CLIEngine(eslintconfig);
    return cli.executeOnFiles(files
        .filter(file => /\.js$/.test(file.name))
        .map(file => file.name));
}

function parseErrorsToConsole(lintReport) {
    let results = [];
    results.push(` [eslint] TotalErrors: ${lintReport.errorCount}`);
    lintReport.results
        .forEach(file => {
            if (file.errorCount > 0) {
                results.push(` [eslint] [${file.errorCount}] ${file.filePath}`);
                let messages = file.messages.map(message => {
                    const color = message.severity === 2 ? '\x1b[31m\x1b[1m' : '\x1b[33m\x1b[1m';
                    return `${color} [eslint]        [${message.line},${message.column}] ${message.message} \x1b[0m`;
                });
                messages.forEach(message => results.push(message));
            }
        });
    return results;
}
