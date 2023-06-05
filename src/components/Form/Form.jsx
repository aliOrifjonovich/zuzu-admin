import React from 'react';
import BranchForm from '../BranchForm/BranchForm';
import { useParams } from 'react-router-dom';
import ProductForm from '../ProductForm/ProductForm';

const Form = () => {
    const {slug} = useParams()
    const form = {
        branches: <BranchForm/>,
        products: <ProductForm/>,
    }
    return form[slug]
}

export default Form;
