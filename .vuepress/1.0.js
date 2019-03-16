module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: ['introduction'],
  }
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}
