pragma solidity ^0.8.17;

contract Announcement {
  string description;

  function readData() external view returns(string memory) {
    return description;
  }

  function updateData(string memory _description) external {
    description = _description;
  } 
}