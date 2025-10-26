import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  logoURI?: string;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  tokens: Token[];
}

export const TokenSelector = ({
  selectedToken,
  onSelectToken,
  tokens,
}: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    setOpen(false);
    setSearch('');
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 hover:bg-accent"
      >
        {selectedToken.logoURI && (
          <img
            src={selectedToken.logoURI}
            alt={selectedToken.symbol}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="font-semibold">{selectedToken.symbol}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Select Token</DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or symbol"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-1">
            {filteredTokens.map((token) => (
              <Button
                key={token.mint}
                variant="ghost"
                onClick={() => handleSelectToken(token)}
                className="w-full justify-start h-auto py-3 hover:bg-secondary"
              >
                <div className="flex items-center gap-3 w-full">
                  {token.logoURI && (
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">
                      {token.name}
                    </div>
                  </div>
                </div>
              </Button>
            ))}

            {filteredTokens.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tokens found
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
