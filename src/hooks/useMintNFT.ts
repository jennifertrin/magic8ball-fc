import { useCallback, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MAGIC_8_BALL_NFT_ABI, MAGIC_8_BALL_NFT_ADDRESS } from '../contracts/magic8ball';

export function useMintNFT() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const { writeContract, isError: isWriteError, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = useCallback(async (
    question: string,
    answer: string,
    imageURI: string
  ) => {
    try {
      setIsPending(true);
      setError(null);
      const tx = await writeContract({
        address: MAGIC_8_BALL_NFT_ADDRESS,
        abi: MAGIC_8_BALL_NFT_ABI,
        functionName: 'mintPrediction',
        args: [question, answer, imageURI],
      });

      setHash(tx);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mint NFT'));
      throw err;
    } finally {
      setIsPending(false);
    }
  }, [writeContract]);

  return {
    mint,
    isPending: isPending || isConfirming,
    isSuccess: isConfirmed,
    error: error || writeError,
    hash
  };
} 