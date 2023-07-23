import React from 'react';
import Link from 'next/link';

const AddNFTsButton = ({ onClick }) => {
  return (
    <Link href="/AddNFT">
        <button onClick={onClick}>
        Ajouter des NFTs
        </button>
    </Link>
    
  );
};

export default AddNFTsButton;