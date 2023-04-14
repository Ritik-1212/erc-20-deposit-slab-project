const { network, ethers } = require("hardhat");

module.exports = async function({getNamedAccounts, deployments}){
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const chainId = network.config.chainId;
    const sampleContract = await ethers.getContract("SampleContract");
    const tokenAddress = sampleContract.address;

    if(chainId == 31337){

    await deploy("TokenDeposit", {
            from : deployer,
            log: true,
            args: [tokenAddress]
        });
    }
}

module.exports.tags = ["all"];