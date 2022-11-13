var Apartments = artifacts.require("./Apartment.sol");

module.exports = function(deployer) {
  deployer.deploy(Apartments);
};