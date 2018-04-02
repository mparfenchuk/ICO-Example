pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract ExampleToken is MintableToken, PausableToken, BurnableToken {
    string public name = "EXAMPLE COIN";
    string public symbol = "EEC";
    uint8 public decimals = 18;

    /*event ClaimedTokens(address indexed _token, address indexed _controller, uint _amount);
    
    /// @notice This method can be used by the controller to extract mistakenly
    ///  sent tokens to this contract.
    /// @param _token The address of the token contract that you want to recover
    ///  set to 0 in case you want to extract ether.
    function claimTokens(address _token) public onlyOwner {
        if (_token == 0x0) {
            owner.transfer(this.balance);
            return;
        }

        Token token = Token(_token);
        uint balance = token.balanceOf(this);
        token.transfer(owner, balance);
        ClaimedTokens(_token, owner, balance);
    }*/
}