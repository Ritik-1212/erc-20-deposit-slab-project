const { network, ethers } = require("hardhat");

module.exports = async function({getNamedAccounts, deployments}){
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const chainId = network.config.chainId;
   
    if(chainId == 31337){

   log("deploying .................................");
   let initialAmount = 50;

   const sampleContract = await deploy("SampleContract", {
            from : deployer,
            log: true,
            args: [initialAmount]
        });
        console.log(sampleContract.address);
    }


}

module.exports.tags = ["all"];