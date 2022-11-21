// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Hotel {

    Breakfast           public contract_breakfast;
    Lunch               public contract_lunch;
    Dinner              public contract_dinner;
    Trips               public contract_trips;
    Parties             public contract_parties;
    AirportTransport    public contract_transport;
    Concierge           public contract_concierge;
    address payable public hotel_owner;

    constructor() payable {
        contract_breakfast  = new Breakfast();
        contract_dinner     = new Dinner();
        contract_lunch      = new Lunch();
        contract_trips      = new Trips();
        contract_parties    = new Parties();
        contract_transport  = new AirportTransport();
        contract_concierge  = new Concierge();

        hotel_owner = payable(msg.sender);
    }

    struct Room {
        uint room_number;
        uint single_beds;
        uint double_beds;
        uint price_for_night;
        uint class;
    }

    struct RoomReservation {
        uint start_date;
        uint stop_date;
        uint total_price;
        uint room_number;
        address payable guest;
    }

    Room[] rooms;
    mapping (uint => RoomReservation[]) reservations;

    function add_room (uint _room_number, uint _single_beds, uint _double_beds, uint _price, uint _class) public {
        // Only the hotel owner can add a room
        require(msg.sender == hotel_owner);
        rooms.push(Room(_room_number, _single_beds, _double_beds, _price, _class));
    }

    function reserve_room (uint _start, uint _stop, uint _room_number) public payable { 
        // check if room is not reserved during this time
        uint counter = reservations[_room_number].length;
        for (uint i=0; i<counter; i++){
            require(_stop <= reservations[_room_number][i].start_date || _stop > reservations[_room_number][i].stop_date);
            require(_start < reservations[_room_number][i].start_date || _start >= reservations[_room_number][i].stop_date);
        }

        uint days_total = (_stop - _start) / 60 / 60 / 24;
        uint price_total = days_total * rooms[_room_number].price_for_night;
        require (msg.value == price_total, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = hotel_owner.call{value: msg.value}("");
        require(success == true);

        reservations[_room_number].push(RoomReservation(_start, _stop, price_total, _room_number, payable(msg.sender)));
    }

    function list_rooms () public view returns(Room[] memory) {
        return rooms;
    }

    function list_room_reservations (uint _room_number) public view returns(RoomReservation[] memory) {
        return reservations[_room_number];
    }


}

contract Breakfast {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Lunch {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Dinner {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Trips {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Parties {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract AirportTransport {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}

contract Concierge {

    struct Registrations {
        address payable client;
    }

    Registrations[] public clients;

    function register_client (address payable _client) public {
        clients.push(Registrations(_client));
    }

}