"use client"
import { Flex, Image, Stack, Heading, Divider, Text, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'

export const MarketPlace = () => {
    return (
        <Flex direction="column" >
            <Flex justifyContent="space-around" fontSize="3xl" fontWeight="bold">
                <Text>
                    Activités du moment
                </Text>
                <Text>
                    EXPLORE MORE
                </Text>
            </Flex>
            <Flex justifyContent="space-between">
                <Card maxW='sm' maxH='sm'>
                    <CardBody>
                        <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        />
                        <Flex justifyContent="space-between">

                            <Flex justifyContent="left" alignItems="center">
                                <Image
                                src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="2rem"
                                height="2rem"
                                />
                                <Stack mt='2' spacing='2'>
                                    <Text color="orange">
                                        Fournisseur
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        UrbanX
                                    </Text>
                                </Stack>
                            </Flex>
                            
                            <Stack mt='2' spacing='2'>
                                <Text color="orange">
                                    Price
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    $450
                                </Text>
                            </Stack>
                        </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button variant='solid' colorScheme='blue' width="100%">
                            Buy now
                        </Button>
                    </CardFooter>
                </Card>
                <Card maxW='sm' maxH='sm'>
                    <CardBody>
                        <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        />
                        <Flex justifyContent="space-between">

                            <Flex justifyContent="left" alignItems="center">
                                <Image
                                src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="2rem"
                                height="2rem"
                                />
                                <Stack mt='2' spacing='2'>
                                    <Text color="orange">
                                        Fournisseur
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        Fly
                                    </Text>
                                </Stack>
                            </Flex>
                            
                            <Stack mt='2' spacing='2'>
                                <Text color="orange">
                                    Price
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    $450
                                </Text>
                            </Stack>
                        </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button variant='solid' colorScheme='blue' width="100%">
                            Buy now
                        </Button>
                    </CardFooter>
                </Card>
                <Card maxW='sm' maxH='sm'>
                    <CardBody>
                        <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        />
                        <Flex justifyContent="space-between">

                            <Flex justifyContent="left" alignItems="center">
                                <Image
                                src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="2rem"
                                height="2rem"
                                />
                                <Stack mt='2' spacing='2'>
                                    <Text color="orange">
                                        Fournisseur
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        Jump
                                    </Text>
                                </Stack>
                            </Flex>
                            
                            <Stack mt='2' spacing='2'>
                                <Text color="orange">
                                    Price
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    $450
                                </Text>
                            </Stack>
                        </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button variant='solid' colorScheme='blue' width="100%">
                            Buy now
                        </Button>
                    </CardFooter>
                </Card>
                <Card maxW='sm' maxH='sm'>
                    <CardBody>
                        <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        />
                        <Flex justifyContent="space-between">

                            <Flex justifyContent="left" alignItems="center">
                                <Image
                                src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="2rem"
                                height="2rem"
                                />
                                <Stack mt='2' spacing='2'>
                                    <Text color="orange">
                                        Fournisseur
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        Jump
                                    </Text>
                                </Stack>
                            </Flex>
                            
                            <Stack mt='2' spacing='2'>
                                <Text color="orange">
                                    Price
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    $450
                                </Text>
                            </Stack>
                        </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button variant='solid' colorScheme='blue' width="100%">
                            Buy now
                        </Button>
                    </CardFooter>
                </Card>
            </Flex>
        </Flex>
    )
}