import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChainSelector } from "./ChainSelector";
import { ChainType } from "@/types/chain";

interface HeaderProps {
  selectedChain: ChainType;
  onChainSelect: (chain: ChainType) => void;
}

export const Header = ({ selectedChain, onChainSelect }: HeaderProps) => {
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState(false);

  const handleConnect = () => {
    setIsChainSelectorOpen(true);
  };

  return (
    <>
      <header className="w-full border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/src/assets/pegasus-logo.jpg" alt="Pegasus Swap Logo" className="w-10 h-10 rounded-lg" />
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pegasus Swap
              </div>
            </div>
            <Button
              onClick={handleConnect}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {selectedChain ? `Switch Chain` : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </header>

      <ChainSelector
        open={isChainSelectorOpen}
        onOpenChange={setIsChainSelectorOpen}
        onSelectChain={onChainSelect}
      />
    </>
  );
};
