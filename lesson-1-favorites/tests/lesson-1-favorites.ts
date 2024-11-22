import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { BN } from "bn.js";
import { expect } from "chai";

describe("lesson-1-favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Favorites as Program<Favorites>;


  it("Sets valid favorites", async () => {
    const number = new BN(42);
    const color = "Blue";
    const hobbies = ["Reading", "Coding", "Music"];

    const tx = await program.methods.setFevorites(number, color, hobbies).rpc();
    console.log("Transaction successful:", tx);

    const [favPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorite"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const account = await program.account.favorites.fetch(favPda);

    expect(account.number.toString()).to.equal("42");
    expect(account.color).to.equal("Blue");
    expect(account.hobbies).to.deep.equal(hobbies);
  });

  
});
