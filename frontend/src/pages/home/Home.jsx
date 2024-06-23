import React from 'react'

import MainLayout from '../../layouts/MainLayout'
import Hero from './hero/Hero'
import Articles from './Articles/Articles'
import EmailSubcription from './emailSubcription/EmailSubcription'

const Home = () => {
    return (
        <MainLayout>
            <Hero />
            <Articles />
            <EmailSubcription />
        </MainLayout>
    )
}

export default Home