const ExampleCrowdsale = artifacts.require("./ExampleCrowdsale.sol");
const ExampleToken = artifacts.require("./ExampleToken.sol");

module.exports = function(deployer, network, accounts) {

  const openingTime = web3.eth.getBlock('latest').timestamp + 5; // five seconds in the future
  const closingTime = openingTime + 86400 * 30; // 30 days
  const initialRate = new web3.BigNumber(100);
  const finalRate = new web3.BigNumber(10);
  const goal = new web3.BigNumber(1000000);
  const wallet = accounts[0];

  return deployer
        .then(() => {
            return deployer.deploy(ExampleToken);
        })
        .then(() => {
            return deployer.deploy(
                ExampleCrowdsale,
                openingTime,
                closingTime,
                initialRate,
                finalRate,
                goal,
                wallet,
                ExampleToken.address
            );
        });
};
