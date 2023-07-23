"use client"
import Image from 'next/image'
import styles from './page.module.css'
import React from 'react'
import { Batchmint } from '@/components/Batchmint/Batchmint/'
import { Searchbar } from '@/components/Searchbar/Searchbar/'
import { Divider, Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex>
      <Searchbar />
    </Flex>
  )
}