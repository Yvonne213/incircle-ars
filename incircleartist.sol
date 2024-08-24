// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract incircleartist{
   
    string[] public nameList;
    // address[] public addrList;
bytes32[] public hashedNames;

 event getInSuccessfully(string artistName , bytes32 hashedName);

    function nameInput(string memory _realname) public {
      require(bytes(_realname).length > 0 , "No names have been added yet");
        // Require that the name is shorter than 64 characters
        require(bytes(_realname).length < 64, "Name must be shorter than 64 characters");

        // Hash the name using keccak256
        bytes32 hashedName = keccak256(abi.encodePacked(_realname));

        // Push the hash and the cleartext name to their respective arrays
        hashedNames.push(hashedName);
        nameList.push(_realname);
      emit getInSuccessfully(_realname, hashedName);
    }

    function getNames() public view returns (string[] memory) {
        // Require that there is at least one name in the array
        require(nameList.length > 0, "No names have been added yet");
        return nameList;
    }

  function getHashedName() public view returns (bytes32[] memory) {
    require(hashedNames.length > 0, "No names have been added yet");
    return hashedNames;
}


    function getCurrentInCircleArtist()public view returns (string memory, bytes32)
    { 
        require(nameList.length > 0, "No names have been added yet");
        return (nameList[nameList.length - 1], hashedNames[hashedNames.length - 1]);
    }

}
