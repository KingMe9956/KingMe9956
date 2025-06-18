// scripts/deploy.js
async function main() {
  const Contract = await ethers.getContractFactory("YourContract");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("Deployed to:", contract.address);
}