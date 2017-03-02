pragma solidity ^0.4.4;


import "./StandardToken.sol";


/*
 * BigToken
 *
 * Very simple ERC20 Token example, where all tokens are pre-assigned
 * to the creator. Note they can later distribute these tokens
 * as they wish using `transfer` and other `StandardToken` functions.
 *
 *  simple standard
 */
contract BigToken is StandardToken {

  string public name = "BigToken";
  string public symbol = "BIG";
  uint public decimals = 18;
  uint public INITIAL_SUPPLY = 100000 * 1 ether ;

  function BigToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  


}
