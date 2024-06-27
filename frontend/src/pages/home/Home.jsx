import React from 'react'

import MainLayout from '../../layouts/MainLayout'
import Hero from './components/Hero'
import BlogList from './components/BlogList'
import Subcription from './components/Subcription'

const Home = () => {
    return (
        <MainLayout>
            <Hero />
            <BlogList />
            <Subcription />
        </MainLayout>
    )
}

export default Home