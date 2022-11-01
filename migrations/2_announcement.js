var Announcement = artifacts.require("./Announcement.sol");

module.exports = function(deployer) {
  deployer.deploy(Announcement);
};