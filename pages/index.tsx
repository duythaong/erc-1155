import { ThirdwebNftMedia, useEditionDrop, useNFTs } from "@thirdweb-dev/react";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";

import { BigNumberish } from "ethers";
import type { NextPage } from "next";
import React, { useState } from 'react';
import contractAddresses from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const editionDropContract = useEditionDrop(contractAddresses[2].address);
  const { data: nfts, isLoading } = useNFTs(editionDropContract);
  const [loadingIndex, setLoadingIndex] = useState(-1);
  const address = useAddress();

  const onClick = async (nft: { metadata: { id: BigNumberish; }; }, index: React.SetStateAction<number>) => {
    setLoadingIndex(index);
    try {
      await editionDropContract?.claim(nft.metadata.id, 1); 
    } catch (error) {
      console.log(error);
    }
    setLoadingIndex(-1);
  };

  return (
    <div className={styles.container}>
      {
        address ? (
          <>
            <div className={styles.collectionContainer}>
            {!isLoading ? (
              <div className={styles.nftBoxGrid}>
                {nfts?.map((nft, index) => (
                  <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                      <ThirdwebNftMedia
                        metadata={nft.metadata}
                        className={styles.nftMedia}
                      />
                    <h3>{nft.metadata.name}</h3>
                    <button
                      disabled={loadingIndex === index}
                      className={`${styles.mainButton} ${styles.spacerBottom}`}
                      onClick={() => onClick(nft, index)}
                    >
                      {loadingIndex === index ? 'Claiming...': 'Claim'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          </>
        ) : 
        <p>Please connect wallet to continue</p>
      }
    </div>
  );
};

export default Home;
