// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Apartment {

    Insurrance      public contract_insurance;
    Electricity     public contract_electricity;
    GarbageDisposal public contract_garbage;
    Gas             public contract_gas;
    WaterConnection public contract_water;

    constructor() payable {
        contract_insurance      = new Insurrance();
        contract_electricity    = new Electricity();
        contract_garbage        = new GarbageDisposal();
        contract_gas            = new Gas();
        contract_water          = new WaterConnection();
    }

    struct Apartments {
        string location;
        uint price;
        bool sold;
        address payable seller;
        address payable buyer;
    }

    Apartments[] public apartments;

    function list() public view returns(Apartments[] memory){
        return apartments;
    }


    function add_apartment(string calldata location, uint price) public {
        apartments.push(Apartments(location, price, false, payable(msg.sender), payable(0)));
    }

    function register_insurrance(address payable _client) private {
        contract_insurance.register_client(_client);
    }

    function register_water(address payable _client) private {
        contract_water.register_client(_client);
    }

    function register_gas(address payable _client) private {
        contract_gas.register_client(_client);
    }

    function register_electricity(address payable _client) private {
        contract_electricity.register_client(_client);
    }

    function register_garbage(address payable _client) private {
        contract_garbage.register_client(_client);
    }


    function buy_apartment(uint _index) public payable {
        Apartments storage apart = apartments[_index];

        require (!apart.sold, "Item already sold.");
        require (msg.value == apart.price, "Incorrect value. Please send amount equal to announcement price.");
        (bool success,) = apart.seller.call{value: msg.value}("");
        require(success, "Failed to send money");
        apart.sold = true;
        apart.buyer = payable(msg.sender);

        register_insurrance(apart.buyer);
        register_electricity(apart.buyer);
        register_garbage(apart.buyer);
        register_gas(apart.buyer);
        register_water(apart.buyer);

    }

}

contract Electricity {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract GarbageDisposal {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }
}

contract Gas {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Insurrance {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract WaterConnection {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}