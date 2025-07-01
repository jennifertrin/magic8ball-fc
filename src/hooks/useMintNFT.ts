import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/nftContract';
import { generateResultImage } from '../utils/magic8Utils';
import { uploadImageToVercelBlob, uploadMetadataToVercelBlob } from '../utils/vercelBlob';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export const useMintNFT = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { address } = useAccount();
  
  const { writeContract, data: hash, isPending: isMinting } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isMinted } = useWaitForTransactionReceipt({
    hash,
  });

  // Read the minting fee from the contract (using public variable instead of function)
  const { data: mintingFee } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_CONTRACT_ABI,
    functionName: 'mintingFee',
  });

  const uploadToVercelBlob = async (imageBlob: Blob, metadata: NFTMetadata): Promise<string> => {
    try {
      // Upload the image to Vercel Blob
      const imageUrl = await uploadImageToVercelBlob(imageBlob, `magic8ball-${Date.now()}.png`);
      
      // Update metadata with the actual image URL
      metadata.image = imageUrl;
      
      // Upload metadata to Vercel Blob
      const metadataUrl = await uploadMetadataToVercelBlob(metadata, `metadata-${Date.now()}.json`);
      
      return metadataUrl;
    } catch (error) {
      console.error('Error uploading to Vercel Blob:', error);
      throw new Error('Failed to upload to Vercel Blob');
    }
  };

  const mint = async (question: string, answer: string, ballRef: React.RefObject<HTMLDivElement | null>) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    if (!ballRef.current) {
      throw new Error('Ball reference not available');
    }

    if (!mintingFee) {
      throw new Error('Unable to fetch minting fee');
    }

    try {
      setIsUploading(true);
      
      // Generate the result image
      const imageBlob = await generateResultImage(ballRef, answer, question);
      if (!imageBlob) {
        throw new Error('Failed to generate image');
      }

      // Create NFT metadata
      const metadata: NFTMetadata = {
        name: `Magic 8 Ball Result #${Date.now()}`,
        description: `A mystical consultation with the Magic 8 Ball. Question: "${question}" Answer: "${answer}"`,
        image: '', // Will be updated after upload
        attributes: [
          {
            trait_type: 'Question',
            value: question
          },
          {
            trait_type: 'Answer',
            value: answer
          },
          {
            trait_type: 'Consultation Date',
            value: new Date().toISOString()
          }
        ]
      };

      // Upload to Vercel Blob
      const metadataURI = await uploadToVercelBlob(imageBlob, metadata);
      
      // Mint the NFT with only the tokenURI parameter, as per contract specification
      writeContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mint',
        args: [metadataURI] as const, // Only tokenURI parameter needed
        value: mintingFee,
      });

    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const formatMintingFee = () => {
    if (!mintingFee) return '0.01 ETH';
    return `${Number(mintingFee) / 1e18} ETH`;
  };

  return {
    mint,
    isPending: isMinting || isUploading || isConfirming,
    isSuccess: isMinted,
    hash,
    mintingFee: formatMintingFee(),
    rawMintingFee: mintingFee,
  };
};