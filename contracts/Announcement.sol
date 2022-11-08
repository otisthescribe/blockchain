// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Announcement {

  struct Ann {
    string name;
    uint price;
    address payable creator;
    bool sold;
    address payable buyer;
    bool refunded;
  }

  Ann[] public anns;

  function list() public view returns(Ann[] memory){
    return anns;
  }

  function add(string calldata name, uint price) public {
    anns.push(
      Ann(name, price, payable(msg.sender), false, payable(0), false)
    );
  }

  function pay(uint _index) public payable {
    Ann storage ann = anns[_index];

    require (!ann.sold, "Item already sold.");
    require (msg.value == ann.price, "Incorrect value. Please send amount equal to announcement price.");

		(bool success,) = ann.creator.call{value: msg.value}("");
    require(success, "Failed to send money");

    ann.sold = true;
    ann.buyer = payable(msg.sender);
  }

  function refund(uint _index) public payable {
    Ann storage ann = anns[_index];

    require (ann.sold, "Item not sold.");
    require (!ann.refunded, "Item already refunded.");
    require (msg.sender == ann.creator, "Only announcement creator can refund money.");
    require (msg.value == ann.price, "Incorrect value. Please send amount equal to announcement price.");

		(bool success,) = ann.buyer.call{value: msg.value}("");
    require(success, "Failed to send money");

    ann.refunded = true;
  }
}
