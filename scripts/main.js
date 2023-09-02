// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const { VESTING_SCHEDULE } = require("../test/utilities/utilities");

const ethers = hre.ethers
async function main() {
  let tokenDecimals = 18;

    [
      admin1, addr0, addr1, addr2, 
      addr3, addr4, addr5, addr6, 
      addr7, addr8, addr9, addr10
    ] = await ethers.getSigners();
    addrs = [
      addr0.address,
      addr1.address, 
      addr2.address, 
      addr3.address, 
      addr4.address,
      addr5.address,
      addr6.address,
      addr7.address,
      addr8.address,
      addr9.address
    ];
    let govToken = await hre.ethers.getContractAt('GOVToken','0xd76183a6c17ef96938c23e85b8d1ac072e39c251')
    if(!govToken){
      const govTokenFactory = await hre.ethers.getContractFactory("GOVToken");
      govToken = await govTokenFactory.deploy("GovWorld Token TST","GOVTST");    
      await govToken.deployed();
      console.log('TOKEN ADDRESS: ', govToken.address);
    }
    let claimBoard = await hre.ethers.getContractAt('ClaimBoard','0x35a0601e75d69AB761f4D99b7a74a1ddf03C2a3D')
    if(!claimBoard){
      const claimFactory = await hre.ethers.getContractFactory("ClaimBoard");
      claimBoard = await claimFactory.deploy(govToken.address);
      await claimBoard.deployed();
      let approval = await govToken.approve(claimBoard.address,ethers.utils.parseUnits("74000000",tokenDecimals));
      approval.wait();
      let transfer = await govToken.transfer(claimBoard.address,ethers.utils.parseUnits("74000000",tokenDecimals));
      transfer.wait();
      
    }
    console.log('CLAIM BOARD ADDRESS: ', claimBoard.address);

    //transfer vesting token allocation to claim board contract
   await addAllocations(addrs,claimBoard);
}


async function addAllocations(addrs,claimBoard){
  let TOTAL_SUPPLY=100000000;
  let tokenDecimals = 18;
  console.log('Vesting Schedule Length: ',  addrs.length) 
  for(let i =  0; i < VESTING_SCHEDULE.length ;i++){
      let  thisAmount = (VESTING_SCHEDULE[i].percent * TOTAL_SUPPLY).toFixed(2);
      let totalMonths = VESTING_SCHEDULE[i].vesting/30;
      let monthlyRate = (((thisAmount/totalMonths)/thisAmount)*100)*10**18;
      console.log(`Allocations: ${VESTING_SCHEDULE[i].name} with ${thisAmount} percent tokens at ${monthlyRate} percent tokens per month:`);
      let amounts= [];
      let  walletAmount = (thisAmount/addrs.length);
      for(let j =  0; j < addrs.length ;j++){
          amounts.push(ethers.utils.parseUnits(walletAmount.toString(),tokenDecimals));
      }            
      let allocations = await claimBoard.addAllocations(addrs,amounts, i);
      console.log('Total Allocations:',ethers.utils.formatUnits(await claimBoard.totalAllocations(),tokenDecimals));

  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })