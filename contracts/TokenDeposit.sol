//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//errors
error TokenDeposit__Insufficient_Balance();
error TokenDeposit__Transfer_Failed();

contract TokenDeposit {

    // slabs and their capacities
    uint256[] public slabCapacities = [100, 200, 300, 400, 500];

    // mapping slabs and their balance 
    mapping (uint256 => uint256) public slabBalances;

    //the ERC token this contract accepts
    IERC20 public i_token;
    
    constructor(address _token) {
       i_token = IERC20(_token); 
    }

    function deposit(uint256 amount) external {

    //checks if contract has enough allowance for token transfer
    if(i_token.balanceOf(msg.sender) < amount){
        revert TokenDeposit__Insufficient_Balance();

    }
    if(i_token.transferFrom(msg.sender, address(this), amount)){
        revert TokenDeposit__Transfer_Failed();
    }
    //highest slab that is not full
    uint256 slabIndex = slabCapacities.length - 1;
    while (slabIndex > 0 && slabBalances[slabIndex] + amount >= slabCapacities[slabIndex]) {
        slabIndex--;
    }

    //add the amount to the selected slab
    slabBalances[slabIndex] += amount;

    }

    function getSlab() external view returns (uint256){
    //find the slab with highest capacity that is not full
    uint slabIndex = slabCapacities.length - 1;
    while (slabIndex > 0 && slabBalances[slabIndex] >= slabCapacities[slabIndex]){
        slabIndex--;
    }

    return slabIndex;
    }

    function getSlabBalance(uint256 index) public view returns(uint256){
        return slabBalances[index];
    }
}