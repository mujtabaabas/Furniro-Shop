import { SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import subcategory from './subcategory'
import banner from './banner'

export const schemaTypes = [product, category, subcategory, banner]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
