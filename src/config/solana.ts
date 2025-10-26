import { Connection, clusterApiUrl } from '@solana/web3.js';

// QuickNode RPC endpoints
export const SOLANA_RPC_HTTP = 'https://solitary-cosmopolitan-lambo.solana-mainnet.quiknode.pro/f9bf6bb930b87de47704663c615463c78a05d495/';
export const SOLANA_RPC_WSS = 'wss://solitary-cosmopolitan-lambo.solana-mainnet.quiknode.pro/f9bf6bb930b87de47704663c615463c78a05d495/';

// Create Solana connection using QuickNode
export const connection = new Connection(SOLANA_RPC_HTTP, {
  commitment: 'confirmed',
  wsEndpoint: SOLANA_RPC_WSS,
});

// Network configuration
export const NETWORK = 'mainnet-beta';
