import * as Yup from 'yup';

const loginInitialValues = { email: '', password: '' };
const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email Invalido').min(8, 'Email Invalido').max(124, 'Email Invalido'),
    password: Yup.string().min(4, 'Senha Invalida').max(32, 'Senha Invalida')
});
export { loginInitialValues, loginSchema };