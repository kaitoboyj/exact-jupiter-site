import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { SOLANA_RPC_HTTP } from '@/config/solana';
import { SolanaSwapInterface } from '@/components/solana/SolanaSwapInterface';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const SolanaSwap = () => {
  const navigate = useNavigate();
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => SOLANA_RPC_HTTP, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-background">
            <header className="w-full border-b border-border bg-background/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                  <div className="flex items-center gap-3">
                    <img src="/src/assets/pegasus-logo.jpg" alt="Pegasus Swap Logo" className="w-10 h-10 rounded-lg" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Pegasus Swap - Solana
                    </div>
                  </div>
                  <div className="w-32" />
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-12">
              <SolanaSwapInterface />
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaSwap;
