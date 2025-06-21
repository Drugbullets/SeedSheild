// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SeedShield {
    mapping(address => string[]) private userFragments;
    
    event FragmentStored(address indexed user, uint256 index);
    
    function storeFragment(string memory fragment) public {
        userFragments[msg.sender].push(fragment);
        emit FragmentStored(msg.sender, userFragments[msg.sender].length - 1);
    }
    
    function getFragmentCount() public view returns (uint256) {
        return userFragments[msg.sender].length;
    }
    
    function getFragment(uint256 index) public view returns (string memory) {
        require(index < userFragments[msg.sender].length, "Invalid index");
        return userFragments[msg.sender][index];
    }
}