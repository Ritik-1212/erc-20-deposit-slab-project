const { ethers, deployments, network } = require("hardhat");
const { tokenAddress, AMOUNT } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");


describe("TokenDeposit", function(){

    let tokenDeposit, deployer, sampleContract, i_token, accounts;
    beforeEach(async function(){
     accounts = await ethers.getSigners();
     deployer = accounts[0];

     await deployments.fixture(["all"]);

     tokenDeposit = await ethers.getContract("TokenDeposit", deployer);
     sampleContract = await ethers.getContract("SampleContract", deployer);
     i_token = await tokenDeposit.i_token();
       });
 
describe("constructor", function(){
    it("checks the values of constructors", async function(){
        assert.equal(i_token, tokenAddress);
    });
});

describe("deposit", function(){
    it("reverts if not enough amount is deposited checks the highest empty slab and updates the amount", async function(){
        const tokenAmount = 100;
        // deposit tokens to the contract
        await expect (tokenDeposit.deposit(tokenAmount)).to.be.revertedWithCustomError(tokenDeposit, "TokenDeposit__Insufficient_Balance");
        const slabIndex = await tokenDeposit.getSlab();
        const slabBalance = await tokenDeposit.getSlabBalance(slabIndex);
        const slabBalanceAdded = slabBalance + tokenAmount;
        
        assert.equal(slabBalanceAdded.toString(), tokenAmount);
    });
  
});

});
