
/**
var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
**/

var BigToken=artifacts.require("./BigToken.sol");

var TokenConstructor=artifacts.require("./TokenConstructor.sol");

module.exports = function(deployer) {

  /**
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  **/

  deployer.deploy(BigToken);

  deployer.deploy(TokenConstructor,10000,'Factory',18,'FCT');

};
