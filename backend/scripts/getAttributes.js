const { ethers } = require("hardhat");
const fetch = require('node-fetch');
require('dotenv').config();

async function getAttributes(contractAddress, tokenId) {
  const infuraApiKey = process.env.INFURA_API_KEY;
  console.log(infuraApiKey)
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const tokenURI = await contract.tokenURI(tokenId);
  const response = await fetch(tokenURI);
  const metadata = await response.json();

  const element = metadata.attributes.find(attr => attr.trait_type === "Element");
  const fournisseur = metadata.attributes.find(attr => attr.trait_type === "Fournisseur");

  return {
    element: element.value,
    fournisseur: fournisseur.value,
  };
}

// Remplacez "YOUR_CONTRACT_ADDRESS" par l'adresse réelle de votre contrat Actiplace
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const tokenId = 1; // Remplacez par l'ID du token que vous souhaitez récupérer les attributs

getAttributes(contractAddress, tokenId)
  .then(attributes => {
    console.log("Element:", attributes.element);
    console.log("Fournisseur:", attributes.fournisseur);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
