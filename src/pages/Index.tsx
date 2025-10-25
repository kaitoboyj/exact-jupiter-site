import { useState } from "react";
import { Header } from "@/components/Header";
import { SwapCard } from "@/components/SwapCard";
import { ChainType } from "@/types/chain";

const Index = () => {
  const [selectedChain, setSelectedChain] = useState<ChainType>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header selectedChain={selectedChain} onChainSelect={setSelectedChain} />
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {!selectedChain ? (
            <>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                  Everyone's<br />Favorite DEX
                </h1>
                <p className="text-muted-foreground text-xl">
                  Trade Crypto Instantly Across 3+ Chains
                </p>
              </div>
              <SwapCard selectedChain={selectedChain} />
            </>
          ) : (
            <div className="md:col-span-2 mx-auto">
              <SwapCard selectedChain={selectedChain} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
