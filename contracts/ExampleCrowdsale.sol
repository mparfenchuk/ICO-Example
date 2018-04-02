pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/crowdsale/price/IncreasingPriceCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract ExampleCrowdsale is IncreasingPriceCrowdsale, MintedCrowdsale, RefundableCrowdsale {
    function ExampleCrowdsale
    (
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _initialRate,
        uint256 _finalRate,
        uint256 _goal,
        address _wallet,
        MintableToken _token
    )
    public
    Crowdsale(_initialRate, _wallet, _token)
    TimedCrowdsale(_openingTime, _closingTime)
    IncreasingPriceCrowdsale(_initialRate, _finalRate)
    RefundableCrowdsale(_goal)
    {

    }

    /*
    function getCurrentRate() public view returns (uint256) {

        uint256 elapsedTime = now.sub(openingTime);
        uint256 timeRange = closingTime.sub(openingTime);
        uint256 rateRange = initialRate.sub(finalRate);
        return initialRate.sub(elapsedTime.mul(rateRange).div(timeRange));

        uint256 firstSale = openingTime + 86400 * 7;

        if (block.timestamp >= firstSale){
            initialRate = finalRate;
        }

        return initialRate;
    }

    function finalization() internal {
        require(msg.sender == owner); // Only the owner of the crowdsale contract should be able to call this function.

        // I assume the crowdsale contract holds a reference to the token contract.
        token.transferOwnership(_newOwner);
    }
    */
}