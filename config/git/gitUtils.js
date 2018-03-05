import SimpleGit from 'simple-git';

export function isAdded(file) {
    return file.status === 'A';
};

export function isDeleted(file) {
    return file.status === 'D';
}

export function isUnmerged(file) {
    return file.status === 'U';
}

export function isStaged(file) {
    return !isDeleted(file) && !isUnmerged(file);
}

export function filesToCommit(path) {
    const git = new SimpleGit(path);

    return new Promise((resolve, reject) => {
        git.diff(['--name-status', '--cached'], function (err, output) {
            if (err) {
                reject(err);
                return;
            }
            resolve(output
                .split('\n')
                .map(line => line.trim().split('\t'))
                .filter(parts => parts.length === 2)
                .map(parts => {
                    const status = parts.shift();
                    const name = parts.join('\t').trim();
                    return { status, name };
                }));
        });
    });
};

export function getCurrentCommit(path) {
    const git = new SimpleGit(path);

    return new Promise((resolve, reject) => {
        git.log(['--pretty=format:%h', '-n 1'], (err, output) => {
            if (err) {
                return reject(err);
            }
            resolve(output);
        });
    });
};
