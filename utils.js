const { assert } = require("chai");

const finishAndCheckDeploy = async (tx, provider) => {
  const txHash = tx.deployTransaction.hash;
  console.log("Deployed in transaction:", txHash);
  console.log("Will live at address:", tx.address);

  const contract = await tx.deployed();
  console.log("Contract now live at: ", contract.address);

  const txReceipt = await provider.getTransactionReceipt(txHash);
  console.log("Receipt: ", txReceipt);

  // Check if code is stored
  console.log("\nTESTING: code\n--------");
  const code = await provider.getCode(contract.address);
  console.log("Code: ", code);
  assert(code.length > 2, "Contract NOT deployed (no code)");

  return contract;
};

const deploy = async (factory, payload) => {
  console.log("Deploying with: ", payload);
  const tx = await factory.deploy(...payload);
  return await finishAndCheckDeploy(
    tx,
    factory.provider || factory.signer.provider
  );
};

const networks = {
  local: { url: "http://localhost:8545/", id: 420 },
  local_evm: { url: "http://localhost:8545/", id: 1337 },
  goerli: { url: "https://goerli.optimism.io/", id: 420 },
  kovan: { url: "https://kovan.optimism.io", id: 69 },
  mainnet: { url: "https://mainnet.optimism.io", id: 10 },
};

module.exports = { networks, deploy };
