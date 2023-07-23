const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

describe("Actiplace", function () {
    let actiplace;
    let owner;
    let seller1;
    let seller2;
    let buyer;
    let tokenId1;
    let tokenId2;
    let tokenId3;
    // ... (ajoutez d'autres ID de token si nécessaire)

  beforeEach(async function () {
    const merkleRoot = "0x1e39c1565334543144b7b069e3afd11656df2511d0e4e5632bdf401e41b75d5c";
    const uri = "ipfs://QmNzkdgFHzXvEhvyE3G8yXVN7s4DpRcbEsbBuM1RCSdUkW";
    const _team = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"];
    const _teamShares = ["334","333","333"];

    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    let contract = await ethers.getContractFactory("Actiplace");
    actiplace = await contract.deploy(merkleRoot, uri);
  });

  it('should deploy the smart contract', async function(){
    let theOwner = await actiplace.owner()
    expect(theOwner).to.equal(owner.address)
  });

  it("devrait définir correctement l'URI de base", async () => {
    const newURI = "ipfs://QmNzkdgFHzXvEhvyE3G8yXVN7s4DpRcbEsbBuM1RCSdUkW";
    console.log("Avant setURI");
    await actiplace.setURI(newURI);
    console.log("Après setURI");
  
    const uri = await actiplace.uri(tokenId1);
    console.log("URI récupérée : ", uri);
    expect(uri).to.equal(newURI);
  });
  

  it("devrait soumettre et enregistrer correctement un lot", async () => {
    const tokenIds = [tokenId1, tokenId2, tokenId3];
    const amounts = [1, 1, 1];

    const tx = await actiplace.submitBatch(tokenIds, amounts, freeNftTokenId, freeNftAmount, metadataCID);
    const batchId = (await tx.wait()).events[0].args.batchId;

    const batch = await actiplace.batches(batchId);
    expect(batch.seller).to.equal(seller1.address);
    expect(batch.tokenIds).to.deep.equal(tokenIds);
    expect(batch.amounts).to.deep.equal(amounts);
    expect(batch.freeNftTokenId).to.equal(freeNftTokenId);
    expect(batch.freeNftAmount).to.equal(freeNftAmount);
    expect(batch.soldOut).to.be.false;
    expect(batch.metadataCID).to.equal(metadataCID);

    expectEvent(tx, "BatchSubmitted", {
      batchId: batchId,
      seller: seller1.address,
      tokenIds: tokenIds,
      amounts: amounts,
      freeNftTokenId: freeNftTokenId,
      freeNftAmount: freeNftAmount,
      metadataCID: metadataCID,
    });
  });

  it("devrait mint un lot correctement", async () => {
    const tokenIds = [tokenId1, tokenId2, tokenId3];
    const amounts = [1, 1, 1];

    const tx = await actiplace.mintBatch(tokenIds, amounts, freeNftTokenId, freeNftAmount, "", metadataCID);
    const batchId = (await tx.wait()).events[0].args.batchId;

    const batch = await actiplace.batches(batchId);
    expect(batch.seller).to.equal(owner.address);
    expect(batch.tokenIds).to.deep.equal(tokenIds);
    expect(batch.amounts).to.deep.equal(amounts);
    expect(batch.freeNftTokenId).to.equal(freeNftTokenId);
    expect(batch.freeNftAmount).to.equal(freeNftAmount);
    expect(batch.soldOut).to.be.false;
    expect(batch.metadataCID).to.equal(metadataCID);

    const balance1 = await actiplace.balanceOf(owner.address, tokenId1);
    expect(balance1).to.equal(1);
    // ... (vérifications similaires pour les autres tokenIds)

    const freeNftBalance = await actiplace.balanceOf(owner.address, freeNftTokenId);
    expect(freeNftBalance).to.equal(freeNftAmount);

    expectEvent(tx, "BatchMinted", {
      batchId: batchId,
      seller: owner.address,
      tokenIds: tokenIds,
      amounts: amounts,
      freeNftTokenId: freeNftTokenId,
      freeNftAmount: freeNftAmount,
    });
  });

  it("ne devrait pas mint un lot avec le nombre incorrect de NFTs", async () => {
    const tokenIds = [tokenId1, tokenId2, tokenId3];
    const amounts = [1, 1];

    await expectRevert(
      actiplace.mintBatch(tokenIds, amounts, freeNftTokenId, freeNftAmount, "", metadataCID),
      "Must mint exactly 11 NFTs"
    );
  });

  it("ne devrait pas mint un lot avec un montant incorrect de NFTs gratuits", async () => {
    const tokenIds = [tokenId1, tokenId2, tokenId3];
    const amounts = [1, 1, 1];

    await expectRevert(
      actiplace.mintBatch(tokenIds, amounts, freeNftTokenId, 2, "", metadataCID),
      "Must mint exactly 1 free NFT"
    );
  });

  it("ne devrait pas mint un lot avec des NFTs déjà mintés individuellement", async () => {
    const tokenIds = [tokenId1, tokenId2, tokenId3];
    const amounts = [1, 1, 1];

    await actiplace.mintIndividualNFT(tokenId1, 1, "");
    
    await expectRevert(
      actiplace.mintBatch(tokenIds, amounts, freeNftTokenId, freeNftAmount, "", metadataCID),
      "NFT has already been minted individually"
    );
  });

  it("devrait acheter un NFT individuel correctement", async () => {
    const tokenId = tokenId1;
    const amount = 1;
    const price = ethers.utils.parseEther("0.1");

    await actiplace.mintIndividualNFT(tokenId, amount, "", { from: owner.address });

    const balanceBefore = await owner.getBalance();
    const tx = await actiplace.connect(buyer).buyNFT(tokenId, amount, { value: price });
    const balanceAfter = await owner.getBalance();
    const buyerBalance = await actiplace.balanceOf(buyer.address, tokenId);
    const expectedBalanceAfter = balanceBefore.add(price);

    expect(buyerBalance).to.equal(amount);
    expect(balanceAfter).to.equal(expectedBalanceAfter);

    expectEvent(tx, "TransferSingle", {
      operator: buyer.address,
      from: ethers.constants.AddressZero,
      to: buyer.address,
      id: tokenId,
      value: amount,
    });
  });

  it("ne devrait pas acheter un NFT individuel avec le montant incorrect", async () => {
    const tokenId = tokenId1;
    const amount = 2;
    const price = ethers.utils.parseEther("0.1");

    await actiplace.mintIndividualNFT(tokenId, 1, "");

    await expectRevert(
      actiplace.connect(buyer).buyNFT(tokenId, amount, { value: price }),
      "You can only buy one NFT at a time"
    );
  });

  it("ne devrait pas acheter un NFT individuel qui n'est pas disponible à l'achat", async () => {
    const tokenId = tokenId1;
    const amount = 1;
    const price = ethers.utils.parseEther("0.1");

    await expectRevert(
      actiplace.connect(buyer).buyNFT(tokenId, amount, { value: price }),
      "NFT with the given tokenId is not available for purchase"
    );
  });

  it("ne devrait pas acheter un NFT individuel avec un paiement insuffisant", async () => {
    const tokenId = tokenId1;
    const amount = 1;
    const price = ethers.utils.parseEther("0.05");

    await actiplace.mintIndividualNFT(tokenId, 1, "");

    await expectRevert(
      actiplace.connect(buyer).buyNFT(tokenId, amount, { value: price }),
      "Insufficient payment"
    );
  });

  it("devrait mint un NFT individuel correctement", async () => {
    const tokenId = tokenId1;
    const amount = 1;

    await actiplace.mintIndividualNFT(tokenId, amount, "", { from: owner.address });

    const balance = await actiplace.balanceOf(owner.address, tokenId);
    expect(balance).to.equal(amount);
  });

  it("ne devrait pas mint un NFT individuel avec un tokenId qui n'est pas disponible pour un mint individuel", async () => {
    const tokenId = tokenId1;
    const amount = 1;

    await expectRevert(
      actiplace.mintIndividualNFT(tokenId, amount, "", { from: owner.address }),
      "NFT with the given tokenId is not available for individual minting"
    );
  });

  it("devrait libérer correctement les gains", async () => {
    const tokenId = tokenId1;
    const amount = 1;

    await actiplace.mintIndividualNFT(tokenId, amount, "", { from: owner.address });

    const balanceBefore = await owner.getBalance();
    const releaseTx = await actiplace.releaseAll();
    await releaseTx.wait();
    const balanceAfter = await owner.getBalance();
    const expectedBalanceAfter = balanceBefore.add(amount);

    expect(balanceAfter).to.equal(expectedBalanceAfter);
  });
});
