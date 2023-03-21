import * as Yup from 'yup';

const categoryInitialValues = {name: ''}
const categorySchema = Yup.object().shape({
    name: Yup.string().max(32).required("Informe o nome da catgegoria")
});

export {categoryInitialValues , categorySchema}