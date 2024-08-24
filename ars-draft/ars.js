const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
console.log(signer)

// Replace with your contract's ABI and address
const contractABI = [
    // Only include the functions we are using
    "function addName(string memory name) public",
    "function getMostRecentHashedName() public view returns (bytes32)"
];
const contractAddress = "0x05375EEcD147C838C9742a5F75497Bf6D08be1F6";

const nameRegistryContract = new ethers.Contract(contractAddress, contractABI, signer);

async function submitName() {
const nameInput = document.getElementById("nameInput").value;
const loadingCircle = document.getElementById("loadingCircle");
const status = document.getElementById("status");

// Check if the input is less than 64 characters (this is also enforced by the smart contract)
if (nameInput.length > 64) {
status.innerText = "Name must be shorter than 64 characters!";
return;
}

try {
// Prompt user to connect their wallet if not already connected
await provider.send("eth_requestAccounts", []);

// Show loading circle and clear status
loadingCircle.style.display = 'block';
status.innerText = '';

// Get the signer (connected account)
const signer = provider.getSigner();

// Create a new contract instance with the signer
const nameRegistryContract = new ethers.Contract(contractAddress, contractABI, signer);

// Send transaction
const tx = await nameRegistryContract.addName(nameInput);
status.innerText = "Transaction sent. Waiting for confirmation...";

// Wait for transaction to be confirmed
await tx.wait();
status.innerText = "Name added successfully!";

// Hide loading circle
loadingCircle.style.display = 'none';

// Update the most recent hash
getMostRecentHashedName();
} catch (error) {
console.error(error);
status.innerText = "An error occurred: " + error.message;
loadingCircle.style.display = 'none';
}
}


async function getMostRecentHashedName() {
    try {
        const recentHash = await nameRegistryContract.getMostRecentHashedName();
        document.getElementById("recentHash").innerText = recentHash;
    } catch (error) {
        console.error(error);
        document.getElementById("recentHash").innerText = "An error occurred while fetching the most recent hashed name.";
    }
}

async function getMostRecentCleartextName() {
try {
const recentCleartextName = await nameRegistryContract.getMostRecentCleartextName();
console.log("Recent Cleartext Name:", recentCleartextName);
document.getElementById("recentCleartextName").innerText = recentCleartextName;
} catch (error) {
console.error(error);
document.getElementById("recentCleartextName").innerText = "An error occurred while fetching the most recent cleartext name.";
}
}

getMostRecentHashedName();
getMostRecentCleartextName();