const { ethers } = require('hardhat');
const { expect, assert } = require('chai');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe("Actiplace", function() {

  let actiplace, owner, addr1, addr2, addr3;
  let merkleTree;
  let root;

  beforeEach(async function() {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    let contract = await ethers.getContractFactory("Actiplace");
    const leaves = [addr1.address, addr2.address];
    const leaf1 = keccak256(addr1.address);
    const leaf2 = keccak256(addr2.address);
    const leaf3 = keccak256(addr3.address);
    merkleTree = new MerkleTree([leaf1, leaf2], keccak256, { sortPairs: true });
    root = merkleTree.getHexRoot();    

    actiplace = await contract.deploy(root);
  });

  describe("Initialization", function() {
    it('should deploy the smart contract with the correct merkle root', async function() {
        let theMerkleRoot = "0x343750465941b29921f50a28e0e43050e5e1c2611a3ea8d7fe1001090d5e1436"
        expect(theMerkleRoot).to.equal(root);
    });
  });

  describe("Set URI", function() {
    it('should NOT set URI if the caller is not whitelisted', async function() {
      const newURI = "ipfs://QmNewUri/";
      const proof = merkleTree.getProof(keccak256(addr3.address));
      let etherQuantity = ethers.parseEther('0.01');

      await actiplace.mint(0, 1, { value: etherQuantity });

      await expect(actiplace.connect(addr3).setURI(newURI, proof)).to.be.revertedWith('Not whitelisted, please contact us');

      const currentURI = await actiplace.uri(0);
      expect(currentURI).to.not.equal(newURI);
    });

    it('should set URI if the caller is whitelisted', async function() {
      const newURI = "ipfs://QmNewUri/";
      const proof = merkleTree.getProof(keccak256(addr1.address));

      await actiplace.connect(addr1).setURI(newURI, proof);

      const currentURI = await actiplace.uri(0);
      expect(currentURI).to.equal(newURI);
    });
  });

  // describe("Mint", function() {
  //   it('should NOT mint if amount is not 1', async function() {
  //       await expect(actiplace.mint(0, 2)).to.be.revertedWith('You can mint only 1 SFT');
  //   });

  //   it('should NOT mint if the ID is not valid', async function() {
  //       await expect(actiplace.mint(10, 1)).to.be.revertedWith('Not valid ID');
  //   });

  //   it('should NOT mint if there are no more available SFTs for the activity', async function() {
  //       await expect(actiplace.mint(0, 11)).to.be.revertedWith('Sorry we have no more this activity');
  //   });

  //   it('should NOT mint if the value sent is not correct', async function() {
  //       await expect(actiplace.mint(0, 1, { value: ethers.parseEther('0.009') })).to.be.revertedWith('Not enough money sent');
  //   });

  //   it('should mint and update SFT balances', async function() {
  //       await actiplace.mint(0, 1, { value: ethers.parseEther('0.01') });

  //       const balance = await actiplace.balanceOf(addr1.address, 0);
  //       expect(balance).to.equal(1);

  //       const purchases = await actiplace.purchasesPerWallet(addr1.address);
  //       expect(purchases).to.equal(1);

  //       const onMarket = await actiplace.SFTsOnMarketPlace(addr1.address);
  //       expect(onMarket).to.equal(0);
  //   });
  // });

  describe("MintBatch", function() {
    it('should NOT mintBatch if the arrays lengths do not match', async function() {
        await expect(actiplace.mintBatch([0, 1, 2], [1, 2])).to.be.revertedWith('Arrays length mismatch');
    });

    it('should NOT mintBatch if the value sent is not correct', async function() {
        await expect(actiplace.mintBatch([0], [11], { value: ethers.parseEther('0.098') })).to.be.revertedWith('Not enough money sent');
    });

    it('should NOT mintBatch if any of the amounts is not a multiple of 11', async function() {
        await expect(actiplace.mintBatch([0, 1], [11, 12], { value: ethers.parseEther('0.11') })).to.be.revertedWith('Amount must be a multiple of 11');
    });

    it('should NOT mintBatch if any of the IDs is not valid', async function() {
        await expect(actiplace.mintBatch([0, 10], [11, 11], { value: ethers.parseEther('0.1') })).to.be.revertedWith('Not valid ID');
    });

    it('should mintBatch and update SFT balances', async function() {
        await actiplace.mintBatch([0, 1], [11, 11], { value: ethers.parseEther('0.1') });

        const balance0 = await actiplace.balanceOf(addr1.address, 0);
        expect(balance0).to.equal(11);

        const balance1 = await actiplace.balanceOf(addr1.address, 1);
        expect(balance1).to.equal(11);

        const purchases = await actiplace.purchasesPerWallet(addr1.address);
        expect(purchases).to.equal(0);

        const onMarket = await actiplace.SFTsOnMarketPlace(addr1.address);
        expect(onMarket).to.equal(22);
    });
  });

  describe("Pause and Unpause", function() {
    it('should pause and unpause the contract', async function() {
        await actiplace.pause();
        expect(await actiplace.paused()).to.equal(true);

        await actiplace.unpause();
        expect(await actiplace.paused()).to.equal(false);
    });
  });

  describe("Merkle Root", function() {
    it('should change the merkle root', async function() {
      const leaf1 = keccak256(addr1.address);
      const leaf3 = keccak256(addr3.address);
      const newMerkleTree = new MerkleTree([leaf1, leaf3], keccak256, { sortPairs: true });
      newMerkleRoot = newMerkleTree.getHexRoot();
      await actiplace.setMerkleRoot(newMerkleRoot);
      expect(await actiplace.merkleRoot()).to.equal(newMerkleRoot);
    });
  });
});
