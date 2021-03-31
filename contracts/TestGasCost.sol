// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

/**
 * @title TestGasCost
 * @dev A super simple contract to test tx input data cost on L2!
 */
contract TestGasCost {

    function publish(bytes calldata data)
        external
        returns (
            bytes calldata
        )
    {
        return data[:4];
    }
}
