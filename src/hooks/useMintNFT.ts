import { useState, useEffect } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  
  const { writeContract, data: hash, isPending: isMinting, error: writeError } = useWriteContract({
    onSuccess: (data) => {
      console.log('Transaction submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
      console.error('Error details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack
      });
    }
  });
  
  const { isLoading: isConfirming, isSuccess: isMinted } = useWaitForTransactionReceipt({
    hash,
  });

  // Debug effect to track any write errors
  useEffect(() => {
    if (writeError) {
      console.error('Write error detected:', writeError);
      console.error('Write error details:', {
        message: writeError.message,
        cause: writeError.cause,
        name: writeError.name
      });
    }
  }, [writeError]);

  // Debug effect to track hash changes
  useEffect(() => {
    if (hash) {
      console.log('Transaction hash received:', hash);
    }
  }, [hash]);

  // Debug effect to track minting status
  useEffect(() => {
    console.log('Minting status - isPending:', isMinting, 'isConfirming:', isConfirming, 'isSuccess:', isMinted);
  }, [isMinting, isConfirming, isMinted]);

  // Read the minting fee from the contract (using public variable instead of function)
  const { data: mintingFee } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_CONTRACT_ABI,
    functionName: 'mintingFee',
  });

  // Test contract connection with nextTokenId read
  const { data: nextTokenId } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_CONTRACT_ABI,
    functionName: 'nextTokenId',
  });

  // Debug contract read values
  useEffect(() => {
    console.log('Contract read values:', {
      mintingFee: mintingFee?.toString(),
      nextTokenId: nextTokenId?.toString()
    });
  }, [mintingFee, nextTokenId]);

  const uploadToVercelBlob = async (imageBlob: Blob, metadata: NFTMetadata): Promise<string> => {
    try {
      console.log('Starting upload to Vercel Blob...');
      
      // Upload the image to Vercel Blob
      const imageUrl = await uploadImageToVercelBlob(imageBlob, `magic8ball-${Date.now()}.png`);
      console.log('Image uploaded:', imageUrl);
      
      // Update metadata with the actual image URL
      metadata.image = imageUrl;
      
      // Upload metadata to Vercel Blob
      const metadataUrl = await uploadMetadataToVercelBlob(metadata, `metadata-${Date.now()}.json`);
      console.log('Metadata uploaded:', metadataUrl);
      
      return metadataUrl;
    } catch (error) {
      console.error('Error uploading to Vercel Blob:', error);
      throw new Error('Failed to upload to Vercel Blob');
    }
  };

  const mint = async (question: string, answer: string, ballRef: React.RefObject<HTMLDivElement | null>) => {
    // Clear any previous errors
    setError(null);

    if (!address) {
      const errorMsg = 'Wallet not connected';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!ballRef.current) {
      const errorMsg = 'Ball reference not available';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!mintingFee) {
      const errorMsg = 'Minting fee not available. Please wait for contract to load.';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    console.log('Starting mint process...');
    console.log('Address:', address);
    console.log('Minting fee:', mintingFee);
    console.log('Contract address:', NFT_CONTRACT_ADDRESS);

    try {
      setIsUploading(true);
      
      // Generate the result image
      console.log('Generating result image...');
      const imageBlob = await generateResultImage(ballRef, answer, question);
      if (!imageBlob) {
        throw new Error('Failed to generate image');
      }
      console.log('Image generated successfully');

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
      console.log('Uploading to Vercel Blob...');
      const metadataURI = await uploadToVercelBlob(imageBlob, metadata);
      console.log('Upload complete. Metadata URI:', metadataURI);
      
      // Mint the NFT with only the tokenURI parameter, as per contract specification
      console.log('Calling writeContract...');
      console.log('Contract details:', {
        address: NFT_CONTRACT_ADDRESS,
        mintingFee: mintingFee?.toString(),
        metadataURI,
        userAddress: address
      });
      
      try {
        writeContract({
          address: NFT_CONTRACT_ADDRESS as `0x${string}`,
          abi: NFT_CONTRACT_ABI,
          functionName: 'mint',
          args: [metadataURI] as const,
          value: mintingFee,
        });
        
        console.log('writeContract called successfully');
      } catch (writeErr) {
        console.error('writeContract threw an error:', writeErr);
        throw writeErr;
      }
      
      // Note: The transaction hash will be available in the 'hash' state from useWriteContract

    } catch (error) {
      console.error('Error minting NFT:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMsg);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const formatMintingFee = () => {
    if (!mintingFee) return '0.01 ETH';
    return `${Number(mintingFee) / 1e18} ETH`;
  };

  const resetError = () => {
    setError(null);
  };

  return {
    mint,
    isPending: isMinting || isUploading || isConfirming,
    isSuccess: isMinted,
    hash,
    mintingFee: formatMintingFee(),
    rawMintingFee: mintingFee,
    error: error || writeError?.message,
    resetError,
    isUploading,
    isMinting,
    isConfirming,
  };
};