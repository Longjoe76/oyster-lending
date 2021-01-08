import { AccountInfo, PublicKey } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import * as Layout from "./../../utils/layout";

export const LendingMarketLayout: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.u8("version"),
    Layout.publicKey("quoteMint"),
    Layout.publicKey("tokenProgramId")
  ],
);

export interface LendingMarket {
  isInitialized: boolean;
  quoteMint: PublicKey;
  tokenProgramId: PublicKey,
}

export const isLendingMarket = (info: AccountInfo<Buffer>) => {
  return info.data.length === LendingMarketLayout.span + 62;
};

export const LendingMarketParser = (
  pubKey: PublicKey,
  info: AccountInfo<Buffer>
) => {
  const buffer = Buffer.from(info.data);
  const data = LendingMarketLayout.decode(buffer);

  const details = {
    pubkey: pubKey,
    account: {
      ...info,
    },
    info: data,
  };

  return details;
};

// TODO:
// create instructions for init
