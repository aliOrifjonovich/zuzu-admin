import React from 'react';
import BranchForm from '../BranchForm/BranchForm';
import { useParams } from 'react-router-dom';
import ProductForm from '../ProductForm/ProductForm';
import ContactForm from '../ContactForm/ContactForm';

const Form = () => {
    const {slug} = useParams()
    const form = {
        branches: <BranchForm/>,
        products: <ProductForm/>,
        contact: <ContactForm/>
    }
    return form[slug]
}

export default Form;
