module.exports = (robot) => {
  console.log('Yay, the app was loaded!')

  robot.on('pull_request.opened', async context => {
    console.log('A pull request was just opened.')

    const title = context.payload.pull_request.title

    console.log(`Updating PR "${title}" (${context.payload.pull_request.html_url}):`)

    console.log(`Head branch: "${context.payload.pull_request.head.ref}"`)
    console.log(`Base branch: "${context.payload.pull_request.base.ref}"`)

    context.github.repos.createStatus(context.repo({
      sha: context.payload.pull_request.head.sha,
      state: 'failure',
      target_url: 'https://github.com/apps/wip',
      description: 'your branch name sucks, pick a better one!',
      context: 'JIRA'
    }))
  });
}
