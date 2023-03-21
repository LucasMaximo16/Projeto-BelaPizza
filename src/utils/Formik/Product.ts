import category from '@/src/services/http/category';
import * as Yup from 'yup';

const productInitialValues = {image: '' , category_id: 0, name:'', price:'', description: ''}
const productSchema = Yup.object().shape({
    image: Yup.string().required(),
    category_id: Yup.number().required(),
    name: Yup.string().max(30).required(),
    price: Yup.string().max(5).min(1).required(),
    description: Yup.string().required()
})

export {productInitialValues, productSchema}