pragma solidity ^0.4.4;


import "./token/StandardToken.sol";


import "./ownership/Ownable.sol";


/*
 * BigToken
 *
 * Very simple ERC20 Token example, where all tokens are pre-assigned
 * to the creator. Note they can later distribute these tokens
 * as they wish using `transfer` and other `StandardToken` functions.
 *
 *  simple standard
 */
contract TokenConstructor is StandardToken,Ownable {


  //Constants
  string public name;
  string public symbol;
  uint public decimals;
  uint public INITIAL_SUPPLY;


  //events
  event LogBurn(address indexed owner, uint indexed value);


//Constructor
  function TokenConstructor(
    uint256 initialSupply,
  string tokenName,
  uint8 decimalUnits,
  string tokenSymbol) {
    INITIAL_SUPPLY = initialSupply;
    totalSupply = INITIAL_SUPPLY * 1 ether;
    balances[msg.sender] = INITIAL_SUPPLY * 1 ether;
    name=tokenName;
    decimals=decimalUnits;
    symbol=tokenSymbol;
  }


  function mintToken(address target, uint256 mintedAmount) onlyOwner {
      balances[target] += mintedAmount;
      totalSupply += mintedAmount;
      Transfer(0, owner, mintedAmount);
      Transfer(owner, target, mintedAmount);
  }

  function burnTokens(uint value) public
      onlyOwner
  {


      if(value == 0) throw;
      if (balances[msg.sender]<value) throw;
      balances[msg.sender] -= value;
      totalSupply -= value;
      LogBurn(msg.sender, value);


  }

}
