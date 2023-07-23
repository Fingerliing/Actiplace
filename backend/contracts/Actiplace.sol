// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Actiplace is ERC1155, Ownable, Pausable, ERC1155Supply, PaymentSplitter {

    using Strings for uint256;

    uint256 public publicPrice = 0.01 ether;
    uint256 public maxSupply = 10;

    bytes32 public merkleRoot;

    address[] private _team = [
        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8,
        0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
    ];

    uint[] private _teamShares = [
        334,
        333,
        333
    ];

    /**
    * @notice Store the number of SFT that an address have
    **/
    mapping(address => uint) public purchasesPerWallet;

    /**
    * @notice Store the number of SFT that the owner have
    **/
    mapping(address => uint) public SFTsOnMarketPlace;

    constructor(
        bytes32 _merkleRoot
    ) 
        ERC1155("ipfs://QmeTUCk9YKxG29qGcUokr5v7CfMr53HG2Ft7gpKLBfpWHm/")
        PaymentSplitter(_team, _teamShares) 
    {}

    /**
    * @notice Change the base URI of the NFTs by providers include in the merkleTree
    *
    * @param newuri the new base URI of the NFTs
    *
    **/
    function setURI(string memory newuri, bytes32[] calldata _proof) public {
        require(isWhitelisted(msg.sender, _proof), "Not whitelisted, please contact us");
        _setURI(newuri);
    }

    /**
    * @notice Return the json of a SFT
    *
    * @param _id the id the SFT which we want get the json
    *
    **/
    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id), "URI : nonexistent token");
        return string(abi.encodePacked(
            super.uri(_id),
            Strings.toString(_id),
            ".json"));
    }

    /**
    * @notice The user of the marketplace can mint available SFTs
    *
    * @param _id the id the SFT which we want mint
    * @param _amount the amount of SFTs we want to mint (restricted to 1 here)
    *
    **/
    function mint(uint256 _id, uint256 _amount)
        public
        payable
    {
        require(_amount == 1, "You can mint only 1 SFT");
        require(_id >= 0 && _id < 4, "Not valid ID");
        require(totalSupply(_id) + _amount <= maxSupply, "Sorry we have no more this activity");
        require(msg.value == _amount * publicPrice, "Not enough money sent");
        purchasesPerWallet[msg.sender] += _amount;
        SFTsOnMarketPlace[msg.sender] -= _amount;
        _mint(msg.sender, _id, _amount, "");
    }

    /**
    * @notice The owner mint the SFTs that the providers added
    *
    * @param ids the ids the SFTs which we want mint
    * @param amounts the amount of SFTs we want to mint by id
    *
    **/
    function mintBatch(uint256[] memory ids, uint256[] memory amounts) public payable onlyOwner {
        uint256 numberSFT;
        require(ids.length == amounts.length, "Arrays length mismatch");
        require(msg.value == numberSFT * publicPrice * 10/11, "Not enough money sent");
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];
            numberSFT += amount;
            SFTsOnMarketPlace[msg.sender] += amount;
            require(amount % 11 == 0, "Amount must be a multiple of 11");
            require(id >= 0 && id < 4, "Not valid ID");
            _mint(msg.sender, id, amount, "");
        }
    }

    /**
    * @notice The owner set the pause on
    **/
    function pause() public onlyOwner {
        _pause();
    }

    /**
    * @notice The owner set the pause off
    **/
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
    * @notice Change the merkle root
    *
    * @param _merkleRoot the new merkle root
    **/
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /**
    * @notice Check if it's an address of a provider we had in the merkleTree
    * 
    * @param _account The account checked
    * @param _proof The merkle proof
    *
    * @return bool return true if the address is whitelisted, false otherwise
    **/
    function isWhitelisted(address _account, bytes32[] calldata _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked((_account))));
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}