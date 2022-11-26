// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Hotel {

    Food                public contract_food;
    Trips               public contract_trips;
    Parties             public contract_parties;
    AirportTransport    public contract_transport;
    address payable public hotel_owner;

    constructor() payable {
        hotel_owner         = payable(msg.sender);
        contract_food       = new Food(hotel_owner);
        contract_trips      = new Trips(hotel_owner);
        contract_parties    = new Parties(hotel_owner);
        contract_transport  = new AirportTransport(hotel_owner);
    }

    struct Room {
        uint room_number;
        uint single_beds;
        uint double_beds;
        uint price_for_night;
    }

    struct RoomReservation {
        uint start_date;
        uint stop_date;
        uint total_price;
        uint room_number;
        address payable guest;
    }

    mapping (uint => Room) public rooms;
    mapping (uint => RoomReservation[]) public reservations;
    uint[] rooms_numbers;

    function check_if_room_exists(uint _room_number) private view returns(bool) {
        uint num;
        for (uint i = 0; i < rooms_numbers.length; i++) {
            num = rooms_numbers[i];
            if (num == _room_number) {
                return true;
            }
        }
        return false;
    }

    function add_room (uint _room_number, uint _single_beds, uint _double_beds, uint _price) public {
        // Only the hotel owner can add a room
        require(msg.sender == hotel_owner, "You must be the hotel's owner");
        bool room_exists = check_if_room_exists(_room_number);
        require(room_exists == false, "Room already exists");
        rooms[_room_number] = Room(_room_number, _single_beds, _double_beds, _price);
        rooms_numbers.push(_room_number);
    }

    function reserve_room (uint _start, uint _stop, uint _room_number) payable public { 
        bool room_exists = check_if_room_exists(_room_number);
        require(room_exists == true, "Room does not exists");
        // check if room is not reserved during this time
        uint counter = reservations[_room_number].length;
        for (uint i=0; i<counter; i++){
            require(_stop <= reservations[_room_number][i].start_date || _stop > reservations[_room_number][i].stop_date, "Room is already reserved that day");
            require(_start < reservations[_room_number][i].start_date || _start >= reservations[_room_number][i].stop_date, "Room is already reserved that day");
        }

        uint days_total = uint((((_stop - _start) / 60) / 60) / 24);
        uint price_total = days_total * rooms[_room_number].price_for_night;
        require (msg.value == price_total, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = hotel_owner.call{value: msg.value}("");
        require(success == true);

        reservations[_room_number].push(RoomReservation(_start, _stop, price_total, _room_number, payable(msg.sender)));
    }

    function list_rooms () public view returns(Room[] memory) {
        uint len = rooms_numbers.length;
        Room[] memory rooms_export = new Room[](len);
        uint num;
        uint ind = 0;
        for (uint i = 0; i < rooms_numbers.length; i++) {
            num = rooms_numbers[i];
            rooms_export[ind] = (rooms[num]);
            ind = ind + 1;
        }
        return rooms_export;
    }

    function list_room_reservations (uint _room_number) public view returns(RoomReservation[] memory) {
        return reservations[_room_number];
    }


}

contract Food {

    address payable public admin;
    uint price = 0;

    constructor(address _recepient) payable {
        admin = payable(_recepient);
    }

    function change_price (uint _price) public {
        require(msg.sender == admin, "You must be a hotel's owner to change the price");
        price = _price;
    }


    struct Registrations {
        address payable client;
        uint room_number;
        uint reservation_id;
    }

    Registrations[] public clients;

    function register_client (uint _room_number, uint _reservation_id) payable public {
        require (msg.value == price, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = admin.call{value: msg.value}("");
        require(success == true);
        clients.push(Registrations(payable(msg.sender), _room_number, _reservation_id));
    }

    function list_clients () public view returns(Registrations[] memory) {
        return clients;
    }

}

contract Trips {

    address payable public admin;
    uint price = 0;

    constructor(address _recepient) payable {
        admin = payable(_recepient);
    }

    function change_price (uint _price) public {
        require(msg.sender == admin, "You must be a hotel's owner to change the price");
        price = _price;
    }


    struct Registrations {
        address payable client;
        uint room_number;
        uint reservation_id;
    }

    Registrations[] public clients;

    function register_client (uint _room_number, uint _reservation_id) payable public {
        require (msg.value == price, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = admin.call{value: msg.value}("");
        require(success == true);
        clients.push(Registrations(payable(msg.sender), _room_number, _reservation_id));
    }

    function list_clients () public view returns(Registrations[] memory) {
        return clients;
    }

}

contract Parties {

    address payable public admin;
    uint price = 0;

    constructor(address _recepient) payable {
        admin = payable(_recepient);
    }

    function change_price (uint _price) public {
        require(msg.sender == admin, "You must be a hotel's owner to change the price");
        price = _price;
    }


    struct Registrations {
        address payable client;
        uint room_number;
        uint reservation_id;
    }

    Registrations[] public clients;

    function register_client (uint _room_number, uint _reservation_id) payable public {
        require (msg.value == price, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = admin.call{value: msg.value}("");
        require(success == true);
        clients.push(Registrations(payable(msg.sender), _room_number, _reservation_id));
    }

    function list_clients () public view returns(Registrations[] memory) {
        return clients;
    }

}

contract AirportTransport {

    address payable public admin;
    uint price = 0;

    constructor(address _recepient) payable {
        admin = payable(_recepient);
    }

    function change_price (uint _price) public {
        require(msg.sender == admin, "You must be a hotel's owner to change the price");
        price = _price;
    }


    struct Registrations {
        address payable client;
        uint room_number;
        uint reservation_id;
    }

    Registrations[] public clients;

    function register_client (uint _room_number, uint _reservation_id) payable public {
        require (msg.value == price, "Incorrect value. Please send amount equal to the total price.");
        (bool success,) = admin.call{value: msg.value}("");
        require(success == true);
        clients.push(Registrations(payable(msg.sender), _room_number, _reservation_id));
    }

    function list_clients () public view returns(Registrations[] memory) {
        return clients;
    }

}