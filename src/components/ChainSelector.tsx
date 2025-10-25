import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SUPPORTED_CHAINS, ChainType } from "@/types/chain";

interface ChainSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectChain: (chain: ChainType) => void;
}

export const ChainSelector = ({ open, onOpenChange, onSelectChain }: ChainSelectorProps) => {
  const handleSelectChain = (chainId: ChainType) => {
    onSelectChain(chainId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground text-2xl text-center">Select Network</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-6">
          {SUPPORTED_CHAINS.map((chain) => (
            <Button
              key={chain.id}
              onClick={() => handleSelectChain(chain.id)}
              className="w-full h-16 bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all hover:border-primary group"
              variant="ghost"
            >
              <div className="flex items-center gap-4 w-full">
                <div
                  className="text-3xl font-bold w-12 h-12 rounded-full flex items-center justify-center bg-background"
                  style={{ color: chain.color }}
                >
                  {chain.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {chain.displayName}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
