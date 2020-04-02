import { config, env } from '../config'

function showBadges(project) {
  if (!project) {
    return false
  } else if (env !== 'production') {
    return true
  } else if (project.links.organization === config.organizationId) {
    return true
  } else {
    return false
  }
}

export default showBadges
