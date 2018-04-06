const ExampleCrowdsale = artifacts.require("./ExampleCrowdsale.sol");
const ExampleToken = artifacts.require("./ExampleToken.sol");

module.exports = function(deployer, network, accounts) {

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

  return deployer
        .then(() => {
            return deployer.deploy(ExampleToken);
        })
        .then(() => {
            return deployer.deploy(
                ExampleCrowdsale,
                openingTime,
                preSaleTime,
                saleTime,
                closingTime,
                preSaleRate,
                saleRate,
                finalRate,
                minPurchase,
                cap,
                goal,
                wallet,
                ExampleToken.address
            );
        })
        .then (() => {
            return ExampleToken.deployed();
        }).then ((instance) => {
            return instance.addAddressesToWhitelist([wallet, ExampleCrowdsale.address]);
        });
};

//"1522947296","1522947396","1522947496","1522947596","1000","100","10","1000000000000000","100000000000000000000000","10000000000000000000","0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"