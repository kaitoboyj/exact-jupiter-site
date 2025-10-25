export type ChainType = 'solana' | 'ethereum' | 'bsc' | null;

export interface ChainConfig {
  id: ChainType;
  name: string;
  displayName: string;
  icon: string;
  color: string;
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    id: 'solana',
    name: 'Solana',
    displayName: 'Solana',
    icon: '◎',
    color: 'hsl(250, 100%, 60%)'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    displayName: 'Ethereum',
    icon: 'Ξ',
    color: 'hsl(225, 100%, 60%)'
  },
  {
    id: 'bsc',
    name: 'BSC',
    displayName: 'BNB Chain',
    icon: 'B',
    color: 'hsl(45, 100%, 50%)'
  }
];
