import axios from 'axios';

const API_URL = 'http://127.0.0.1:9090/api'; // Base URL for your backend API

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong.');
    }
};
export const addProduct = async (productData) => {
    try {
        console.log('Sending request to add product...', productData);

        const formData = new FormData();
        formData.append('SellerId', productData.sellerId);
        formData.append('ProductName', productData.productName);
        formData.append('Description', productData.description);
        formData.append('Price', productData.price);
        formData.append('Type', productData.type);

        const response = await axios.post(`${API_URL}/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Product added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error.message);
        throw new Error(error.response.data.message || 'Something went wrong.');
    }
};