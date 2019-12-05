const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const io = require('@actions/io');
const pkg = require('../package.json');

const ACTION_UA = `${pkg.name}/${pkg.version}`;

(async () => {
  try {
    let flags = core.getInput('flags');
    let isDebug = core.getInput('verbose') === 'true';
    let isSilenced = core.getInput('silence') === 'true';
    let workingDir = core.getInput('working-directory');
    let outputDir = core.getInput('build-directory');

    let npxPath = await io.which('npx', true);
    let execOptions = { cwd: workingDir };

    // Set the CI builds user agent
    core.exportVariable('PERCY_GITHUB_ACTION', ACTION_UA);

    if (isSilenced) {
      core.exportVariable('LOG_LEVEL', 'silence');
    }

    if (isDebug) {
      core.exportVariable('LOG_LEVEL', 'debug');
    }

    // Set the PR # (if available) and branch name
    if (github.context.payload.number) {
      core.exportVariable('PERCY_PULL_REQUEST', github.context.payload.number);
      core.exportVariable('PERCY_BRANCH', github.context.payload.pull_request.head.ref);
    }

    // Run the passed options with `percy snapshot` to create a Percy build
    await exec.exec(`"${npxPath}" percy snapshot ${outputDir} ${flags}`, [], execOptions);

    return;
  } catch (error) {
    core.setFailed(error.message);
  }
})();
