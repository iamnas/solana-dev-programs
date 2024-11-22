# **Favorites Program**

The **Favorites Program** is a Solana smart contract built using the Anchor framework. It allows users to create and store their favorite number, color, and hobbies on the Solana blockchain. 

---

## **Features**
- **Set Favorites**: Users can set their favorite number, color, and hobbies.
- **Custom Program Derived Address (PDA)**: Ensures data is tied to a unique account for each user.
- **Dynamic Data Handling**: Supports variable-length strings and arrays with space constraints.

---

## **Program Structure**

### **Accounts**
1. **`Favorites`**:
   - Stores the user's favorite number, color, and hobbies.
   - Enforced space constraints for efficient on-chain storage.
   - PDA: Derived from a unique seed and the user's public key.

### **Instructions**
1. **`set_fevorites`**:
   - Initializes the `Favorites` account.
   - Accepts:
     - `number` (u64): The user's favorite number.
     - `color` (String): The user's favorite color.
     - `hobbies` (Vec<String>): The user's favorite hobbies.

---

## **How to Use**

### **Prerequisites**
1. Install [Anchor](https://www.anchor-lang.com/docs/installation) and Solana CLI.
2. Set up a local Solana cluster using:
   ```bash
   solana-test-validator
   ```

### **Deploy the Program**
1. Build and deploy the program:
   ```bash
   anchor build
   anchor deploy
   ```

2. Copy the program ID generated during deployment into the `declare_id!` macro in the `lib.rs` file.

---

## **Example Usage**
```typescript
import * as anchor from "@coral-xyz/anchor";
import { BN } from "bn.js";

const program = anchor.workspace.Favorites;

// Example data
const number = new BN(42);
const color = "Blue";
const hobbies = ["Coding", "Sleeping", "Gaming"];

const tx = await program.methods
  .setFevorites(number, color, hobbies)
  .rpc();

console.log("Transaction successful. Signature:", tx);
```

---

## **License**
This project is licensed under the MIT License.