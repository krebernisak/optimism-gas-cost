const { networks, deploy } = require("./utils.js");
const { ethers, ContractFactory, BigNumber } = require("ethers");
const TestGasCost = require("./artifacts/contracts/TestGasCost.sol/TestGasCost.ovm.json");

const main = async () => {
  const key =
    "0xa35617f4fe630bf50024fcbe2c051d2dffe5ea19695b2d660ce4db7a5acdcc30";
  const networkArg = process.argv.slice(2)[0] || "local";

  const { url, id, gasPrice } = networks[networkArg];
  console.log("Deploying to: ", networks[networkArg]);
  const provider = new ethers.providers.JsonRpcProvider(url, id);
  const wallet = new ethers.Wallet(key, provider);

  const options = { gasPrice: gasPrice || 0, gasLimit: 8999999 };

  const factory = new ContractFactory(
    TestGasCost.abi,
    TestGasCost.bytecode,
    wallet
  );
  const contract = await deploy(factory, []);

  const _publish = async (data) => {
    console.log();
    console.log(`Publishing data length: ${data.length}`);
    const tx = await contract.publish(data);
    const receipt = await tx.wait();
    const { gasUsed } = receipt;
    console.log(`  - gasUsed: ${gasUsed.toString()}`);
    return receipt;
  };

  const n = 28;

  //https://etherscan.io/tx/0x96f6bd81e21d704f54fe3597e983b09daf27953e15a52ac5c632e6635f3be022
  const faData = Buffer.from(
    "0x202ee0ed" +
      "0000000000000000000000000000000000000000000000000000000000006427" +
      "0000000000000000000000000000000000000000000000000000002b3b0ddcaa"
  );

  // https://etherscan.io/tx/0x63c45058f5792bef2ade56bd504339ff5478e7b1217997126a6c3bb78b4a5b33
  const ocrData = Buffer.from(
    "0xc9807539" +
      "0000000000000000000000000000000000000000000000000000000000000080" +
      "00000000000000000000000000000000000000000000000000000000000004a0" +
      "0000000000000000000000000000000000000000000000000000000000000620" +
      "0001010000010101010101000000000000000000000000000000000000000000" +
      "0000000000000000000000000000000000000000000000000000000000000400" +
      "0000000000000000000000088b642346c385f846df34779475baff0000249401" +
      "02050608001e0a071b09180e0f151410011217041c0b191a0d1d0c1100000000" +
      "0000000000000000000000000000000000000000000000000000000000000060" +
      "000000000000000000000000000000000000000000000000000000000000001c" +
      "00000000000000000000000000000000000000000000000000000000a1b881d6" +
      "00000000000000000000000000000000000000000000000000000000a1b881d6" +
      "00000000000000000000000000000000000000000000000000000000a27b7580" +
      "00000000000000000000000000000000000000000000000000000000a2918735" +
      "00000000000000000000000000000000000000000000000000000000a299fa00" +
      "00000000000000000000000000000000000000000000000000000000a29c9675" +
      "00000000000000000000000000000000000000000000000000000000a2e0b3f7" +
      "00000000000000000000000000000000000000000000000000000000a2e0b3f7" +
      "00000000000000000000000000000000000000000000000000000000a34f8e60" +
      "00000000000000000000000000000000000000000000000000000000a34f8e60" +
      "00000000000000000000000000000000000000000000000000000000a34f8e60" +
      "00000000000000000000000000000000000000000000000000000000a3770e34" +
      "00000000000000000000000000000000000000000000000000000000a3770e34" +
      "00000000000000000000000000000000000000000000000000000000a37b7988" +
      "00000000000000000000000000000000000000000000000000000000a38e1e00" +
      "00000000000000000000000000000000000000000000000000000000a38e1e00" +
      "00000000000000000000000000000000000000000000000000000000a3c2a402" +
      "00000000000000000000000000000000000000000000000000000000a3e2f858" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a3f8edc0" +
      "00000000000000000000000000000000000000000000000000000000a415ace6" +
      "00000000000000000000000000000000000000000000000000000000a44ee27d" +
      "00000000000000000000000000000000000000000000000000000000a44ee27d" +
      "000000000000000000000000000000000000000000000000000000000000000b" +
      "6153736d5bbbf42a714a4cd8b9eabd76c69aa26ad149e0f5a87e6e60c986076f" +
      "48c05d429bd39410ed901ab6acea9618df5886badfe74865ec27969f0e93f00c" +
      "1c459c9aee9ced26fbe7cc335df972c932c0595259ac74fc9e5f7f4313d57a0b" +
      "9b30e20148e207a6b5db81c55441b9e9ff4cb196e896ab8f5da0a097e842d4c5" +
      "df967598f1003eed5ea370f6cac79c88b71332cdf6d6cbc50efdd553103ae00b" +
      "f25ac61f8954d8ed84a3330de938e8c0380ba568a900fb9aa3fb4cb0159a085a" +
      "fb572589167aef2919ff9b58f918c2ea44194d8b3586c23c064043559a77ea74" +
      "81851c844c65d99b6dcd795fba25e693e085b80a93da3ccbd4b3c9a553544510" +
      "2a91b62220c01f5db3f1c1ea5fdee8efbcdf512d6156fc9279b376f7e1df9e71" +
      "8940c4dd3f21b851b2b233addadd3ec07663f68e1ae00551c1e26e9c063d41e7" +
      "9f7ca2c7070b3d54446830ae82ac6e571b7485452e790272c14995a9bccd3707" +
      "000000000000000000000000000000000000000000000000000000000000000b" +
      "398e3497588f85a1265e3c0ca1001bd2e2387b3ee068afa671a7b47b30ff2713" +
      "0160c9f61aa1f0a5a314c65f66e93aa6d54dc496fc9c119328007fee7e0bd428" +
      "4960865dd0f471ffee0380861d68d815d32afc3cb64a384b438edbade49840dd" +
      "0af1bdcfcc6e6daf31ccd6fa8c46df83c8740abb23d668c6583f6dcc4293ced4" +
      "442a54927e33391da4f4934e6224faefedb1e78d23a938dc8895e4161a0fb84e" +
      "278905a2d635136a47f1c6b1b2f428a1112cb034d1ce259ce10230448e166ec7" +
      "0a57bcf210605c433e4ac84aa4da49069a729509ecf9d8e2a5df9b5dcf64d184" +
      "4154f60c2c1e29706887123e8e57b1812400915594ed48949110a3a0375184aa" +
      "57acdd52fe78b06c4f5c13e00a8e50e94083af32806dc19ec2063c61ac5b672a" +
      "09b964be08d8d47c3795cf296152ae226c5793e8da94991dc61ae3ab455b0657" +
      "4314d1a0e731667ebd65de6c35e0b74e16b5dfda394138ce87852c43a406dbdb"
  );

  let faTotalGasUsed = BigNumber.from(0);
  for (let i = 0; i < n; i++) {
    const { gasUsed } = await _publish(faData);
    faTotalGasUsed = faTotalGasUsed.add(gasUsed);
  }

  const ocrReceipt = await _publish(ocrData);
  const ocrTotalGasUsed = ocrReceipt.gasUsed;

  console.log("FA: ", faTotalGasUsed.toString());
  console.log("OCR: ", ocrTotalGasUsed.toString());
  console.log("FA/OCR: ", faTotalGasUsed.div(ocrTotalGasUsed).toString());
};

main().catch((e) => console.error(e));
