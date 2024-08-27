import 'source-map-support/register'

declare global {
  export type Uuid = string & { _uuidBrand: undefined }
}
