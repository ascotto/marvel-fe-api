import { CURRENT_ENV, ENVIRONMENTS } from '../config/environments'

const API_VERSION = 1
const API_BASE = `v${API_VERSION}`

const Endpoints = {}

const Server = {
  [ENVIRONMENTS.local]: `https://gateway.marvel.com/`,
  [ENVIRONMENTS.development]: `https://gateway.marvel.com/`,
  [ENVIRONMENTS.production]: `https://gateway.marvel.com/`,
}

const ApiStages = {
  [ENVIRONMENTS.local]: `${Server[ENVIRONMENTS.local]}${API_BASE}`,
  [ENVIRONMENTS.development]: `${Server[ENVIRONMENTS.development]}${API_BASE}`,
  [ENVIRONMENTS.production]: `${Server[ENVIRONMENTS.production]}${API_BASE}`,
}

Endpoints.Comics = {}
Endpoints.Comics.Url = {}
Endpoints.Comics.Url.Host = ApiStages[CURRENT_ENV] + '/public'
Endpoints.Comics.Url.Base = `${Endpoints.Comics.Url.Host}/comics`

export default Endpoints
