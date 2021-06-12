// next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = 'kotc_ranking'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
}