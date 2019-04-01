import Awb from '../views/print/Awb'
import Manifest from '../views/print/Manifest'

export const PrintAwb = {
  path: '/print-awb/:number',
  name: 'print-awb',
  component: Awb
}

export const PrintManifest = {
  path: '/print-manifest/:number',
  name: 'print-manifest',
  component: Manifest
}
