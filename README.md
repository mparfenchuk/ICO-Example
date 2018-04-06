# ICO Example
Initial Coin Offering with Truffle and Zeppelin Solidity contracts

## Getting Started
First of all you should install truffle.
```
npm truffle i -g
npm truffle init
```
Then init npm and install [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity).
```
npm init
npm i zeppelin-solidity
```
Also you need a test network. I am using [Ganache](http://truffleframework.com/ganache/). You can install and run it on your computer. In `truffle.js` file add this connection.
```js
host: "localhost",
port: 7545
```
In `./contracts` folder there are two custom files: `ExampleToken.sol` and `ExampleCrowdsale.sol`. `ExampleToken.sol` is a smart contract of a coin. As you see it is burnable, pausable, mintable token with reclaim function and whitelist owners. 
```solidity
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "zeppelin-solidity/contracts/ownership/CanReclaimToken.sol";
import "zeppelin-solidity/contracts/ownership/Whitelist.sol";

contract ExampleToken is Whitelist, CanReclaimToken, BurnableToken, PausableToken, MintableToken {

    string public name = "EXAMPLE COIN";
    string public symbol = "EEC";
    uint8 public decimals = 18;
    
    ...
}
```
`ExampleCrowdsale.sol` is a smart contract of a crowdsale. It is minted, refundable crowdsale with min and max cap, min purchase, pre-sale and sale time and rate.
```solidity
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract ExampleCrowdsale is CappedCrowdsale, RefundableCrowdsale, MintedCrowdsale {
    
    ...
    
     function ExampleCrowdsale
    (
        uint256 _openingTime,
        uint256 _preSaleTime,
        uint256 _saleTime,
        uint256 _closingTime,
        uint256 _preSaleRate,
        uint256 _saleRate,
        uint256 _finalRate,
        uint256 _minPurchase,
        uint256 _cap,
        uint256 _goal,
        address _wallet,
        MintableToken _token
    )
    
    ...
}
```
Also you should look into `2_deploy_contracts.js` file. There is defined all needed parameters for deploying.
```js
    const openingTime = web3.eth.getBlock('latest').timestamp + 5; // five seconds in the future
    const preSaleTime = openingTime + 86400 * 7; // 7 days  |
    const saleTime = preSaleTime + 86400 * 21; // 21 days   |  } 35 days
    const closingTime = saleTime + 86400 * 7; // 7 days     |
    const preSaleRate = new web3.BigNumber(1000); // 0.001 ETH per 1 token
    const saleRate = new web3.BigNumber(100); // 0.01 ETH per 1 token
    const finalRate = new web3.BigNumber(10); // 0.1 ETH per 1 token
    const minPurchase = web3.toWei('0.001', 'ether'); // min purchase is 0.001 ETH
    const cap = web3.toWei('100000', 'ether'); // cap is 100 thousand ETH
    const goal = web3.toWei('10000', 'ether'); // goal is 10 thousand ETH
    const wallet = accounts[0];
 ```
You just need to enter this truffle commands to deploy the contracts.
```
truffle compile
truffle migrate
```
