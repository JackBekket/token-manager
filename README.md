# Token Manager

This is project for Big-Fund Token manager system.


BigFund tokens represent itself 'shares' of some pie.



This project include contracts:
1. BigFundToken (https://github.com/JackBekket/token-manager/blob/master/contracts/BigToken.sol) -which is example of BigFund standard token.
2. TokenConstructor (https://github.com/JackBekket/token-manager/blob/master/contracts/TokenConstructor.sol) - which allow to construct your own token automaticaly throught Token Manager application.

Token Manager application is written as node.js/react app and implement all neccesary functions, such as
1. Construcing new tokens and deploy it in current network.
2. Provide all standard ERC20 functions such as balance check, transfer, approval, etc..
3. Creator of pie can issue more tokens throught emission function.
