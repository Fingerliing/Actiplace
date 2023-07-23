"use client"
import { Flex, Text, Input, Button } from "@chakra-ui/react"
import { useAccount } from 'wagmi'
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { abi, contractAddress } from "@/constants"

const AddSFT = () => {

  const { isConnected } = useAccount()

  const [ids, setIds] = useState("");
  const [amounts, setAmounts] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [getNumber, setGetNumber] = useState(null);

  const mintBatch = async () => {
  try {
      // Convert the comma-separated string of IDs and amounts into arrays
      const idsArray = ids.split(",").map(Number);
      const amountsArray = amounts.split(",").map(Number);

      // Prepare the write contract request
      const { request } = await prepareWriteContract({
          address: contractAddress,
          abi: Contract.abi,
          functionName: "mintBatch",
          args: [idsArray, amountsArray],
      });

      // Send the transaction to the contract
      const { hash } = await writeContract(request);

      // Update the transaction hash state
      setTransactionHash(hash);

      // Update the favorite number after minting
      await getDatas();
  } catch (err) {
      console.log(err.message);
  }
}

  const getDatas = async() => {
      try {
          const data = await readContract({
              address: contractAddress,
              abi: abi,
              functionName: "getNumber",
          });
          setGetNumber(data.toString())
      } catch (err) {
          console.log(err.message)
      }
  }

  useEffect(() => {
      if(isConnected) {
          getDatas()
      }
  }, [isConnected])

  return (
    <Flex p="2rem" width="100%" height="85vh" justifyContent="center" alignItems="center">
        {isConnected ? (
            <Flex direction="column" width="100%">
                <Flex>
                    <Input onChange={e => setIds(e.target.value)} placeholder="Comma-separated IDs" />
                    <Input onChange={e => setAmounts(e.target.value)} placeholder="Comma-separated amounts" />
                    <Button onClick={() => mintBatch()} colorScheme="purple">Mint Batch</Button>
                </Flex>
                <Flex alignItems="center" justifyContent="center" mt="2rem">
                    <Text>Transaction Hash: {transactionHash}</Text>
                </Flex>
            </Flex>
        ) : (
            <Flex p="2rem" justifyContent="center" alignItems="center">
                <Text>Please connect your Wallet.</Text>
            </Flex>
        )}
    </Flex>
  )
}

export default AddSFT;