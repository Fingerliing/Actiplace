const hre = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelist = require('../whitelist.json');

async function main() {
  // Génération de la Merkle Root
  let tab = [];
  whitelist.map((account) => {
    tab.push(account.address);
  })
  const leaves = tab.map((address) => {
    return keccak256(address)
  })

  let tree = new MerkleTree(leaves, keccak256, { sort: true });
  let merkleTreeRoot = tree.getHexRoot();

  console.log(merkleTreeRoot)

  // CID IPFS
  let baseURI = 'ipfs://QmeTUCk9YKxG29qGcUokr5v7CfMr53HG2Ft7gpKLBfpWHm/';

  const ACTIPLACE = await hre.ethers.deployContract("Actiplace", [merkleTreeRoot]);

  await ACTIPLACE.waitForDeployment();

  console.log(
    `Actiplace deployed to ${ACTIPLACE.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});