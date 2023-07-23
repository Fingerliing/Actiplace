"use client"
import { Flex, Text, Image, Container,Menu, Button, ChevronDownIcon,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider, Grid, GridItem, Box, Input } from '@chakra-ui/react'
import Link from 'next/link'
export const Searchbar = () => {
    return (
        <Grid width="100%" templateColumns="2fr 1fr" gap={4} backgroundColor="#022E69" textColor="white" maxH="sm">
            <GridItem>
                <Flex direction="column" alignItems="center">
                    <Box>
                        <Flex direction="row" fontSize="3xl" >
                            <Text>MarketPlace d'</Text>
                            <Text textColor="orange">NF'</Text>
                            <Text>Activi</Text>
                            <Text textColor="orange">T</Text>
                        </Flex>
                    </Box>
                    
                    <Box backgroundColor="#D9D9D9" width="90%" >
                        <Flex direction="raw" justifyContent="space-around" marginBottom="5px">
                            <Flex direction="column"  >
                                <Text fontSize="3L" textColor="black" fontWeight="bold" >
                                    Destination
                                </Text>
                                <Input
                                placeholder="Rechercher un endroit ou une activité"
                                size="md"
                                type="text"
                                textColor="#E4A051"
                                />
                            </Flex>
                            <Flex direction="column"  >
                                <Text fontSize="3L" textColor="black" fontWeight="bold" >
                                    Dates
                                </Text>
                                <Input
                                placeholder="Choisir vos dates"
                                size="md"
                                type="date"
                                textColor="#E4A051"
                                />
                            </Flex>
                        </Flex>
                    </Box>
                    <Box marginTop="15px" backgroundColor="#D9D9D9" width="60%">
                        <Text textColor="black">
                            Filtres
                        </Text>
                    </Box>
                    
                </Flex>
                
            </GridItem>
            <GridItem>
                <Box height="100vh">
                    <Image
                        width=" 15rem" 
                        height="20rem"
                        src='https://alpsudmontgolfiere.com/wp-content/uploads/2022/05/montgolfiere-bon-cadeau-multi-destination.jpg'
                        alt='Mongolfière'
                        borderRadius='lg'
                        />
                </Box>
            </GridItem>
        </Grid>
    )
}