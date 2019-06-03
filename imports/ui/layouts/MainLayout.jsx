import React from 'react';



import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';


export const MainLayout = ({content}) => (
    <div>
        <Header />
        {content}
        <Footer />
    </div>
);