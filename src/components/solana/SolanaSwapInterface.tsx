import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, Settings } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import { toast } from 'sonner';
import { connection } from '@/config/solana';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface Token {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  logoURI?: string;
}

const DEFAULT_TOKENS: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png'
  },
];

export const SolanaSwapInterface = () => {
  const { publicKey, connected } = useWallet();
  const [fromToken, setFromToken] = useState<Token>(DEFAULT_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(DEFAULT_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    }
  }, [connected, publicKey, fromToken]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    
    try {
      if (fromToken.symbol === 'SOL') {
        const balance = await connection.getBalance(publicKey);
        setBalance((balance / LAMPORTS_PER_SOL).toFixed(4));
      } else {
        setBalance('0.00');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      toast.info('Fetching best swap route from Jupiter...');
      
      // Jupiter API integration would go here
      // For now, we'll show a placeholder message
      setTimeout(() => {
        toast.success('Swap functionality coming soon! Jupiter integration in progress.');
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Swap failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Swap Tokens</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
            {connected ? (
              <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
            ) : (
              <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
            )}
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">From</span>
            {connected && (
              <span className="text-muted-foreground">
                Balance: {balance} {fromToken.symbol}
              </span>
            )}
          </div>
          <div className="bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TokenSelector
                selectedToken={fromToken}
                onSelectToken={setFromToken}
                tokens={DEFAULT_TOKENS}
              />
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="text-right text-2xl font-semibold bg-transparent border-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapTokens}
            className="rounded-full border-2 border-border bg-background hover:bg-accent"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">To</span>
          </div>
          <div className="bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TokenSelector
                selectedToken={toToken}
                onSelectToken={setToToken}
                tokens={DEFAULT_TOKENS}
              />
              <Input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="text-right text-2xl font-semibold bg-transparent border-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Swap Action Button */}
        <Button
          onClick={handleSwap}
          disabled={!connected || loading || !fromAmount}
          className="w-full mt-6 h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          {!connected ? 'Connect Wallet' : loading ? 'Swapping...' : 'Swap'}
        </Button>

        {/* Swap Info */}
        {fromAmount && toAmount && (
          <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Rate</span>
              <span>1 {fromToken.symbol} ≈ {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Network Fee</span>
              <span>~0.000005 SOL</span>
            </div>
          </div>
        )}
      </Card>

      {/* Powered by Jupiter */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Powered by Jupiter Aggregator & QuickNode
      </div>
    </div>
  );
};
