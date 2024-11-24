import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Votingdapp } from "../target/types/votingdapp";

const IDL = require("../target/idl/votingdapp.json");

const votingAddress = new PublicKey(
  "AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ"
);

import { BankrunProvider, startAnchor } from "anchor-bankrun";
describe("Votingdapp", () => {
  let context;
  let provider;
  let votingProgram: anchor.Program<Votingdapp>;

  beforeAll(async () => {
    context = await startAnchor(
      "",
      [{ name: "votingdapp", programId: votingAddress }],
      []
    );

    provider = new BankrunProvider(context);

    votingProgram = new Program<Votingdapp>(IDL, provider);
  });

  it("Initialize Poll", async () => {
    await votingProgram.methods
      .initializePoll(
        new anchor.BN(1),
        "What is your favorite ",
        new anchor.BN(0),
        new anchor.BN(1932375134)
      )
      .rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
      votingAddress
    );

    // console.log(pollAddress);
    const poll = await votingProgram.account.poll.fetch(pollAddress);

    // console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.pollStart.toNumber()).toEqual(0);
  });

  it("Initialize Candidate", async () => {
    await votingProgram.methods
      .initializeCandidate("Smooth", new anchor.BN(1))
      .rpc();

    await votingProgram.methods
      .initializeCandidate("BOOL", new anchor.BN(1))
      .rpc();

    const [boolAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("BOOL"), new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
      votingAddress
    );

    const candidate = await votingProgram.account.candidate.fetch(boolAddress);

    expect(candidate.candidateVote.toNumber()).toEqual(0);
    expect(candidate.candidateName.toString()).toEqual("BOOL");
  });

  it("should vote a candidate", async () => {
    await votingProgram.methods.vote("BOOL", new anchor.BN(1)).rpc();


    const [boolAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("BOOL"), new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
      votingAddress
    );

    const candidate = await votingProgram.account.candidate.fetch(boolAddress);

    console.log(candidate);
    

    expect(candidate.candidateVote.toNumber()).toEqual(1);
    expect(candidate.candidateName.toString()).toEqual("BOOL");


  });
});
