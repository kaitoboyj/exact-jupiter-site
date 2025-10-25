import { Card } from "@/components/ui/card";
import { ChainType } from "@/types/chain";
import { SwapInterface } from "@/components/SwapInterface";
import { useState } from "react";

interface SwapCardProps {
  selectedChain: ChainType;
}

export const SwapCard = ({ selectedChain }: SwapCardProps) => {
  const [showCustomUI, setShowCustomUI] = useState(true);

  if (!selectedChain) {
    return (
      <Card className="w-full max-w-md mx-auto p-12 bg-card border-border shadow-xl">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-2xl font-bold text-foreground">Select a Network</h3>
          <p className="text-muted-foreground">
            Click "Connect Wallet" to choose a blockchain and start swapping
          </p>
        </div>
      </Card>
    );
  }

  // Get the appropriate Uniswap URL for all chains
  const getSwapUrl = () => {
    if (selectedChain === 'ethereum') {
      return 'https://app.uniswap.org/#/swap';
    }
    if (selectedChain === 'bsc') {
      return 'https://app.uniswap.org/#/swap?chain=bnb';
    }
    if (selectedChain === 'solana') {
      return 'https://app.uniswap.org/#/swap?chain=solana';
    }
    return 'https://app.uniswap.org/#/swap';
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6">
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowCustomUI(!showCustomUI)}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all border border-primary/30"
        >
          {showCustomUI ? "Show Uniswap UI" : "Show Custom UI"}
        </button>
      </div>

      {showCustomUI ? (
        /* Custom Swap Interface */
        <div className="flex justify-center py-12">
          <SwapInterface selectedChain={selectedChain} />
        </div>
      ) : (
        /* Uniswap iframe with editable overlay */
        <div className="p-6 bg-card rounded-xl border border-border">
          <div className="relative">
            {/* Editable Overlay - You can adjust height by editing the style below */}
            <div 
              className="absolute top-0 left-0 right-0 bg-background z-10 rounded-t-xl border-b border-border pointer-events-none flex items-center justify-center"
              style={{ height: '120px' }}
            >
              {/* You can edit this text or the entire overlay using Visual Edits */}
              <p className="text-muted-foreground text-sm opacity-0 hover:opacity-100 transition-opacity">
                Overlay Height: 120px
              </p>
            </div>

            {/* Editable iframe container - You can adjust height by editing the style below */}
            <div 
              className="w-full relative"
              style={{ height: '1320px' }}
            >
              {/* You can edit this text to show iframe height using Visual Edits */}
              <p className="absolute bottom-2 right-2 z-20 text-muted-foreground text-xs bg-background/80 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                iframe Height: 1320px
              </p>
              
              <iframe
                src={getSwapUrl()}
                height="100%"
                width="100%"
                style={{
                  border: 0,
                  margin: '0 auto',
                  display: 'block',
                  borderRadius: '10px',
                  minWidth: '300px',
                }}
                title={`${selectedChain} Swap Interface`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
