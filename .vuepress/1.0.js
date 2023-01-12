module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: ['introduction'],
  },
  {
    title: 'Projects',
    collapsable: false,
    children: prefix('projects', [
      'the-basics',
      'environments',
      'deployments',
      'development',
      'domains',
      'troubleshooting',
    ]),
  },
  {
    title: 'Resources',
    collapsable: false,
    children: prefix('resources', [
      'queues',
      'storage',
      'networks',
      'databases',
      'caches',
      'logs',
    ]),
  }
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
