import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowDownUp, Settings } from "lucide-react";
import { ChainType } from "@/types/chain";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SwapInterfaceProps {
  selectedChain: ChainType;
  onSwapUpdate?: (fromToken: string, toToken: string) => void;
}

export const SwapInterface = ({ selectedChain, onSwapUpdate }: SwapInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<"swap" | "limit" | "buy">("swap");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [fromToken, setFromToken] = useState<string>(
    selectedChain === "solana" ? "SOL" : selectedChain === "ethereum" ? "ETH" : "BNB"
  );
  const [toToken, setToToken] = useState<string>("");

  const tokens = {
    solana: ["SOL", "USDC", "USDT", "RAY", "SRM"],
    ethereum: ["ETH", "USDC", "USDT", "DAI", "WBTC"],
    bsc: ["BNB", "BUSD", "USDT", "CAKE", "BTCB"],
  };

  const availableTokens = selectedChain ? tokens[selectedChain] : [];

  const handleSwapDirection = () => {
    const tempToken = fromToken;
    const tempAmount = sellAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-card/50 backdrop-blur-sm p-1 rounded-xl border border-border/50">
        <button
          onClick={() => setActiveTab("swap")}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "swap"
              ? "bg-card text-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Swap
        </button>
        <button
          onClick={() => setActiveTab("limit")}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "limit"
              ? "bg-card text-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "buy"
              ? "bg-card text-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Buy
        </button>
        <button className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Swap Interface */}
      <div className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-2xl p-4 space-y-2">
        {/* Sell Section */}
        <div className="bg-background/50 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground font-medium">Sell</label>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="0"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="flex-1 bg-transparent border-0 text-3xl font-semibold placeholder:text-muted-foreground/50 focus-visible:ring-0 px-0"
            />
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[140px] bg-secondary/80 border-border/50 hover:bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token} value={token}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                        {token[0]}
                      </div>
                      {token}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-muted-foreground">$0</div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-1 relative z-10">
          <button
            onClick={handleSwapDirection}
            className="bg-background border-2 border-border rounded-xl p-2 hover:bg-secondary transition-all hover:scale-110"
          >
            <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Buy Section */}
        <div className="bg-background/50 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground font-medium">Buy</label>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="0"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="flex-1 bg-transparent border-0 text-3xl font-semibold placeholder:text-muted-foreground/50 focus-visible:ring-0 px-0"
            />
            {toToken ? (
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[140px] bg-secondary/80 border-border/50 hover:bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map((token) => (
                    <SelectItem key={token} value={token}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                          {token[0]}
                        </div>
                        {token}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Button
                onClick={() => setToToken(availableTokens[1] || availableTokens[0])}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6"
              >
                Select token
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground">$0</div>
        </div>

        {/* Connect Wallet Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl text-lg shadow-lg shadow-primary/20">
          Connect wallet
        </Button>
      </div>
    </div>
  );
};
