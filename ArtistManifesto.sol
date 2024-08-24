// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.17;

// contract ToBeAnInCircleArtist {
//     address public user;
//     string public realname;
//     // string public addr;
//     string public autoname = "Anonymous artist"; 
//     mapping (address=>bool) public statusB;
//     string[] public nameList; 
//     address[] public addrList; 


//     function nameInput(address _address, string memory _realname)public {

//         require(statusB[msg.sender]==false,"You have already become an in-circle artist");
//         // require(_address != address(0), "Please enter your address");

        
//         if(bytes(_realname).length == 0) {
//             realname = autoname;
//         } else {
//             realname = _realname;
//         }
        
//         user = _address;
     
//         statusB[msg.sender] = true;
//         nameList.push(_realname);
//         addrList.push(_address);
//     }

//     function getName() public view returns(string[] memory){
//           return nameList;
//     }
//     function getAddress() public view returns(address[] memory){
//           return addrList;
//     }
    
// }


pragma solidity ^0.8.17;

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";
// we need the Strings utility contract to provide the Strings.toString() function used in the safeMint function
import "@openzeppelin/contracts@4.8.0/utils/Strings.sol";

contract ArtistManifesto is ERC721, ERC721URIStorage, Ownable {
    string public autoname = "Anonymous artist";
    mapping(address => bool) public addressToWasInCircle;
    string[] public nameList;
    address[] public addrList;
    // string public artist;
    // address public user;


 event getInSuccessfully(string artistName , address wallet);

    function nameInput(address _address, string memory _realname) internal {
        require(
            addressToWasInCircle[msg.sender] == false,
            "You have already been in the circle."
        );

        if (bytes(_realname).length == 0) {
            _realname = autoname;
        }

        addressToWasInCircle[msg.sender] = true;
        nameList.push(_realname);
        addrList.push(_address);
    }

    function getNames() public view returns (string[] memory) {
        return nameList;
    }

    function getAddresses() public view returns (address[] memory) {
        return addrList;
    }

    function getCurrentInCircleArtist()
        public
        view
        returns (string memory, address)
    {
        return (nameList[nameList.length - 1], addrList[addrList.length - 1]);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ArtistManifesto", "Artist") {}

    function _baseURI() internal pure override returns (string memory) {
        // set the baseURI, which will be used later when returning the complete tokenURI
        return
            "https://yvonne213.github.io/Projects/InCircleArtist/artist-manifesto/matadata/";
    }

    function safeMint(address _user, string memory _realname) public {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        nameInput(_user, _realname);

        _safeMint(_user, tokenId);
        // concatenate the tokenId of the current minted token to the baseURI.
        string memory uri = string.concat(Strings.toString(tokenId), ".json");
        _setTokenURI(tokenId, uri);

        emit getInSuccessfully(_realname,_user);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
