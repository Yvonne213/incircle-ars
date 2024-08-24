// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NameRegistry {
    // Array to store hashed names
    bytes32[] public hashedNames;
    // Array to store cleartext names
    string[] public cleartextNames;

    // Function to add a name to the registry
    function addName(string memory name) public {
        // Require that the name is shorter than 64 characters
        require(bytes(name).length < 64, "Name must be shorter than 64 characters");

        // Hash the name using keccak256
        bytes32 hashedName = keccak256(abi.encodePacked(name));

        // Push the hash and the cleartext name to their respective arrays
        hashedNames.push(hashedName);
        cleartextNames.push(name);
    }

    // Function to get the most recent hashed name
    function getMostRecentHashedName() public view returns (bytes32) {
        // Require that there is at least one name in the array
        require(hashedNames.length > 0, "No names have been added yet");

        // Return the most recent hashed name
        return hashedNames[hashedNames.length - 1];
    }

    // Function to get the most recent cleartext name
    function getMostRecentCleartextName() public view returns (string memory) {
        // Require that there is at least one name in the array
        require(cleartextNames.length > 0, "No names have been added yet");

        // Return the most recent cleartext name
        return cleartextNames[cleartextNames.length - 1];
    }
}
