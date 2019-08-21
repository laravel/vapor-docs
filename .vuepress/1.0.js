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
    ]),
  },
  {
    title: 'Domains',
    collapsable: false,
    children: prefix('domains', [
      'registrar',
      'dns',
      'certificates',
    ]),
  },
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
