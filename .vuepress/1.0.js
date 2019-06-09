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
    ]),
  },
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
