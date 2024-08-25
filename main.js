/* CONNECT_AUTOMATICALLY
  true: automatically connect to Web3 Provider on page load.
  false: enable "click to connect" button
*/
const CONNECT_AUTOMATICALLY = true;

if (CONNECT_AUTOMATICALLY) {
  main();
} else {
  connectButton.onclick = main;
}
async function main() {

  // INITIALIZAING STEPS (SKIP TO THE BOTTOM TO WRITE YOUR OWN CODE)
  loadingIconConnect.style.display = "block";
  // Check website compatibility
  if (navigator.userAgent.indexOf("Safari") != -1
    && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Browser is Web3 compatible");

  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("MetaMask is installed");

  // (REQUIRED) Connect to a Web3 provider (MetaMask in most cases)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // If the network changes, refresh the page. (e.g. the user switches from mainnet to goerli)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });

  try {
    // (REQUIRED) Request to connect current wallet to the dApp
    await provider.send("eth_requestAccounts", []);
  } catch (error) {
    const errorMessage = "Cannot connect to wallet. There might be an issue with another browser extenstion. Try disabling some browser extensions (other than MetaMask), then attempt to reconnect."
    console.error(errorMessage, error);
    alert(errorMessage);
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Wallet connected");


  // Check if user is signed in to correct network
  const chainId = await provider.getNetwork();
  if (chainId.chainId != 11155111) {
    alert("Please switch to the Sepolia in MetaMask. The page will refresh automatically after switching.");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Connected to Sepolia");

  // AT THIS POINT, THE USER SHOULD BE SUCCESSFULLY CONNECTED TO THE DAPP

  // Update the page to show the user is connected
  // connectionStatus.textContent = "🟢 Connected";

  // connectButton.setAttribute("disabled", "true");
  //...............up is connection issues......................................//

  // MetaMask is our 'provider' in this case
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // You (whoever is signed into MetaMask) is the 'signer'
  const signer = provider.getSigner();

  // the 'contract' object allows us to call functions from our smart contract
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // the 'contractWithSigner' object allows us to call smart contract functions that
  // require us to send a transaction (like changing a number on the blockchain)
  const contractWithSigner = contract.connect(signer);

  //......................................connection issues.....................
  // Display the address of the signed-in wallet
  // const connectedWalletAddress = await signer.getAddress();
  // connectedWallet.textContent = connectedWalletAddress;
  // console.log(`Connected Wallet: ${connectedWalletAddress}`);


  // hide the loading icon
  loadingIconConnect.style.display = "none";

  
    // Automatically display the table with existing names and hashes
    await getNamesAndHashes();

 // Add event listener to the button
 $('#setArtistButton').click(async function () {
  await setInfo();
  await getNamesAndHashes();
});

// Function to add a name and hash it on the blockchain
async function setInfo() {
  try {
    // Get the name from the input field
    const nameToSet = $('#setArtistInput').val();

    // Ensure the name is not empty
    if (nameToSet.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }

    // Call the smart contract function to hash and store the name
    const tx = await contractWithSigner.nameInput(nameToSet);
    await tx.wait();

    console.log(`Name "${nameToSet}" added and hashed.`);
 // Clear the input field after the name is added
 $('#setArtistInput').val('');

// Trigger the firework animation
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});

// Show a simple popup message (optional)
alert("Congrats! You have successfully entered Artist's Circle!");

  } catch (error) {
    console.error("Error setting name:", error);
    alert("Failed to add the name. Please try again.");
  }
}

// Function to retrieve and display names and their hashes
async function getNamesAndHashes() {
  try {
    // Get the names and hashed names from the contract
    const names = await contract.getNames();
    const hashes = await contract.getHashedName();

    if (names.length === 0) {
      console.log("No names have been added yet.");
      return;
    }

    // Create the table dynamically
    const table = document.createElement("table");
    const headerRow = table.insertRow(0);
    const artistHeader = headerRow.insertCell(0);
    artistHeader.innerHTML = "Artist";
    artistHeader.className = "header-artist"; // Apply CSS class
    
    const hashHeader = headerRow.insertCell(1);
    hashHeader.innerHTML = "NameHash";
    hashHeader.className = "header-hash"; // Apply CSS class

    for (let i = 0; i < names.length; i++) {
      const row = table.insertRow(i + 1);
      row.insertCell(0).innerHTML = names[i];
      row.insertCell(1).innerHTML = hashes[i];
    }

    // Display the table in the HTML
    document.getElementById("currentArtist").innerHTML = "";
    document.getElementById("currentArtist").appendChild(table);

  } catch (error) {
    console.error("Error retrieving names and hashes:", error);
    alert("Failed to retrieve names and hashes. Please try again.");
  }
}
}




