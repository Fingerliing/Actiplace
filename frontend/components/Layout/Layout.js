"use client"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Searchbar } from "../Searchbar/Searchbar";
import { Flex } from '@chakra-ui/react'
import { MarketPlace } from "../Marketplace/Marketplace";

export const Layout = ({ children }) => {
    return (
        <Flex direction="column" minHeight="100vh">
            <Header />
            <Flex>
                {children}
            </Flex>
            <MarketPlace />
            <Footer />
        </Flex>
    )
}