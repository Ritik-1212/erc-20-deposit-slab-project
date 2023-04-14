// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleContract is ERC20{


    constructor(uint256 initialAmount) ERC20("SampleToken", "ST") {
        _mint(msg.sender, initialAmount);
    }
}