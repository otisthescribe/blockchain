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

    function register_insurrance(address payable _client, string memory _location) private {
        contract_insurance.register_client(_client, _location);
    }

    function register_water(address payable _client, string memory _location) private {
        contract_water.register_client(_client, _location);
    }

    function register_gas(address payable _client, string memory _location) private {
        contract_gas.register_client(_client, _location);
    }

    function register_electricity(address payable _client, string memory _location) private {
        contract_electricity.register_client(_client, _location);
    }

    function register_garbage(address payable _client, string memory _location) private {
        contract_garbage.register_client(_client, _location);
    }


    function buy_apartment(uint _index) public payable {
        Apartments storage apart = apartments[_index];

        require (!apart.sold, "Item already sold.");
        require (msg.value == apart.price, "Incorrect value. Please send amount equal to announcement price.");
        (bool success,) = apart.seller.call{value: msg.value}("");
        require(success, "Failed to send money");
        apart.sold = true;
        apart.buyer = payable(msg.sender);

        register_insurrance(apart.buyer, apart.location);
        register_electricity(apart.buyer, apart.location);
        register_garbage(apart.buyer, apart.location);
        register_gas(apart.buyer, apart.location);
        register_water(apart.buyer, apart.location);

    }

}

contract Electricity {

    struct Registrations {
        address payable client;
        string location;
    }

    Registrations[] public clients;

    function register_client (address payable _client, string memory _location) public {
        clients.push(Registrations(_client, _location));
    }

    function list_clients() public view returns(Registrations[] memory){
        return clients;
    }

}

contract GarbageDisposal {

    struct Registrations {
        address payable client;
        string location;
    }

    Registrations[] public clients;

    function register_client (address payable _client, string memory _location) public {
        clients.push(Registrations(_client, _location));
    }

    function list_clients() public view returns(Registrations[] memory) {
        return clients;
    }

}

contract Gas {

    struct Registrations {
        address payable client;
        string location;
    }

    Registrations[] public clients;

    function register_client (address payable _client, string memory _location) public {
        clients.push(Registrations(_client, _location));
    }

    function list_clients() public view returns(Registrations[] memory) {
        return clients;
    }

}

contract Insurrance {

    struct Registrations {
        address payable client;
        string location;
    }

    Registrations[] public clients;

    function register_client (address payable _client, string memory _location) public {
        clients.push(Registrations(_client, _location));
    }

    function list_clients() public view returns(Registrations[] memory) {
        return clients;
    }

}

contract WaterConnection {

    struct Registrations {
        address payable client;
        string location;
    }

    Registrations[] public clients;

    function register_client (address payable _client, string memory _location) public {
        clients.push(Registrations(_client, _location));
    }

    function list_clients() public view returns(Registrations[] memory) {
        return clients;
    }

}