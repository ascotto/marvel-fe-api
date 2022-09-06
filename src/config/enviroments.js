export const ENVIRONMENTS = Object.freeze({
  local: 'local',
  development: 'development',
  production: 'production',
})

export const CURRENT_ENV = `${process.env.REACT_APP_ENV}` || 'local'
