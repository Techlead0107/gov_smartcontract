const { expect } = require("chai");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers, upgrades} = require("hardhat");
const { VESTING_SCHEDULE } = require("./utilities/utilities");
const fs = require('fs');

/**
 * Make sure the contract start date for testing is set to 01/01/2022 00:00:00
 * You can do this in the getListingTime function
 */

chai.use(solidity);

describe("Vesting", function() {
    
    let tokenFactory;
    let token;
    let mc;
    let owner;
    let addr0;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let addr5;
    let addr6;
    let addr7;
    let addr8;
    let addr9;
    let addr10;

    let snapshot;
    let addrs;
    let tokenDecimals;
    let TOTAL_SUPPLY;
    let ONE_DAY_STAMP;
    let amounts= [];

    async function addAllocations(){
        //first day: Farming, CEX/DEX, BSC
        let  sum = 23500000+1000000+1500000;
        console.log('Vesting Schedule Length: ',  addrs.length)
       
        for(let i =  0; i < VESTING_SCHEDULE.length ;i++){
            let  thisAmount = (VESTING_SCHEDULE[i].percent * TOTAL_SUPPLY).toFixed(2);
            let totalMonths = VESTING_SCHEDULE[i].vesting/30;
            let monthlyRate = (((thisAmount/totalMonths)/thisAmount)*100)*10**18;
            console.log(`Allocations: ${VESTING_SCHEDULE[i].name} with ${thisAmount} percent tokens at ${monthlyRate} percent tokens per day:`);
            let  walletAmount = (thisAmount/addrs.length);
            amounts = [];
            for(let j =  0; j < addrs.length ;j++){
                amounts.push(ethers.utils.parseUnits(walletAmount.toString(),tokenDecimals));
            }            
            await mc.addAllocations(addrs,amounts, i);
            console.log('Total Allocations:',ethers.utils.formatUnits(await mc.totalAllocations(),tokenDecimals));

        }
    }

    async function checkBeforeVesting(){
        
        await network.provider.send("evm_setNextBlockTimestamp", [1640976600]);
        await network.provider.send("evm_mine");
        console.log('DATED: BEFORE LISTING TIME 2021/12/31 23:50:00');
        for(let i = 0 ; i < VESTING_SCHEDULE.length ; i++){
            console.log(`UNLOCKED for ${VESTING_SCHEDULE[i].name} = ${await mc.getUnlockedVestingAmount(addrs[i])} `)
            expect(await mc.getUnlockedVestingAmount(addrs[i])).to.equal(0);
        }
    }
    // This is called before each test to reset the contract
    beforeEach(async function () {
        tokenDecimals = 18;
        TOTAL_SUPPLY = 100000000;
        ONE_DAY_STAMP  = 86400;

        [
            owner, addr0, addr1, addr2, 
            addr3, addr4, addr5, addr6, 
            addr7, addr8, addr9

        ] = await ethers.getSigners();

        //snapshot = await network.provider.send("evm_snapshot");
        claimFactory = await ethers.getContractFactory("ClaimBoard");
        const govTokenFactory = await hre.ethers.getContractFactory("GOVToken");
        const govToken = await govTokenFactory.deploy("GovWorld Token TST","GOVTST");
        await govToken.deployed();
        mc = await claimFactory.deploy(govToken.address);
        await mc.deployed();
        let approval = await govToken.approve(mc.address,ethers.utils.parseUnits("74000000",tokenDecimals));
        approval.wait();
        let transfer = await govToken.transfer(mc.address,ethers.utils.parseUnits("74000000",tokenDecimals));
        transfer.wait();
        console.log('BALANCE OF CLAIM BOARD =>', ethers.utils.formatUnits(await govToken.balanceOf(mc.address),18));
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
    });

    it("Test all linear vesting schedules", async function() {
        let writeString = '';
        try{
            //add vesting schedule allocations to vesting wallets.
            await addAllocations(); 
            let listingTime = (await mc.getListingTime()).toNumber();
            for(let days = 0; days <= 1084; days +=2){
                let evm_stamp = listingTime+(ONE_DAY_STAMP*days);
                writeString+=`Vesting DAY\t\t: ',${days}\n Vesting Timestamp\t: ',${evm_stamp}\n`

                await network.provider.send("evm_setNextBlockTimestamp", [evm_stamp]);
                await network.provider.send("evm_mine");
                writeString+=`\n\n---------- Testing Linear Vesting For Day ${days} ---------------\n\n`;
                
                for(let i = 0; i < VESTING_SCHEDULE.length; i++){
                    let vested = 0;
                    let expectedAmount = 0;
        
                    if(
                        //ignoring non linear
                        // VESTING_SCHEDULE[i].name != '1: Seed'&&
                        // VESTING_SCHEDULE[i].name != '3: Private'&&
                        // VESTING_SCHEDULE[i].name != '2: Strategic'
                        true
                    )
                    {
                        let  monthsVested = Math.floor((days - VESTING_SCHEDULE[i].lock)/30)+1;
                        let currentOneMonthVesting = 0;
                        if(monthsVested  > VESTING_SCHEDULE[i].vesting/30){
                            writeString+=`\nVesting Type\t\t: ${VESTING_SCHEDULE[i].name} 🚀 🚀 🚀  TEST COMPLETE`;
                            continue;
                        }

                        if(monthsVested < 0)
                            monthsVested = 0;
                        if(VESTING_SCHEDULE[i].nonLinear==true)
                        {
                            
                        } 
                        else{
                            currentOneMonthVesting=((TOTAL_SUPPLY* VESTING_SCHEDULE[i].percent)/(VESTING_SCHEDULE[i].vesting/30)); 
                            expectedAmount += currentOneMonthVesting*(monthsVested);
                        }
                        //provides unlocked  amount for all vesting types
                        for(let u = 0 ; u < addrs.length ; u++){
                            vested+=parseFloat(ethers.utils.formatUnits(await mc.getUnlockedVestingAmountByType(addrs[u],i), tokenDecimals));
                        }
                        writeString+=`\nVesging Type\t\t:  ${VESTING_SCHEDULE[i].name}`;
                        writeString+=`\nMonrhs Vested\t\t:  ${monthsVested}`;
                        writeString+=`\nLock Period\t\t:  ${VESTING_SCHEDULE[i].lock}`;
                        writeString+=`\nTotal Months\t\t:  ${VESTING_SCHEDULE[i].vesting/30}`;
                        writeString+=`\nOne Month Amount\t:  ${currentOneMonthVesting}`;
                        writeString+=`\nexpectedAmount\t\t:  ${expectedAmount}\n`;
                        writeString+=`\nVsted\t\t\t:  ${vested}\n`
                        if(VESTING_SCHEDULE[i].nonLinear == false)
                            expect(vested.toFixed(0)).to.eq(expectedAmount.toFixed(0));
                    }    
                }
                //console.log(`days: ${days}`);
                writeString+=`\n\n---------- END Linear Vesting For Day  ${days} ---------------\n\n`;
            }
            console.log(writeString);
            fs.appendFile('output.txt', writeString, function (err) {
            if (err) throw err;
                console.log('Saved!');
            });
        }
        catch(e){
         
            console.log(e);
            console.log(writeString)
            
            expect(true).to.eq(false);
        }
        //provides unlocked  amount for all vesting types
        // for(let u = 0 ; u < addrs.length ; u++){
        //     vested+=parseFloat(ethers.utils.formatUnits(await mc.getUnlockedVestingAmount(addrs[u]), tokenDecimals));
        // }
    });
});


