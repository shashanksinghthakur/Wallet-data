/**I have used Moralis WEBB3 Platform for backend server */
/** Connect to server (Backend) */
const serverUrl = "https://w875wjkc2sdd.usemoralis.com:2053/server";
const appId = "jSWQ79613H0FKMpZfECEAVJ8yBrzH8cUcN4UPFl6";
Moralis.start({ serverUrl, appId });

/** login in Metamask  */
async function login() {
    try {
        let user = Moralis.User.current();
        if (!user) {
            user = await Moralis.authenticate({ signingMessage: "I AM PASSIONATE" })

            console.log(user)
            console.log(user.get('ethAddress'))
        }
        /** All ERC20 Token balance will be displayed in Console in detail  */
        const balances = await Moralis.Web3.getAllERC20({ address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B" });
        console.log(balances);
        /** All NFTs Token ID and Contract address will be displayed in Console too  */
        const userEthNFTs = await Moralis.Web3.getNFTs();
        console.log(userEthNFTs)
    } catch (error) {
        console.log(error)
    }
}
/** Logout of Metamask  */
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

async function getAllERC20() {
    const balances = await Moralis.Web3.getAllERC20({ address: "0x2096ad73b1526e6c45bf1a9735f4527dba549371" });
    console.log(balances);
}

async function getNFTs() {
    const userEthNFTs = await Moralis.Web3.getNFTs({ address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B" });
    console.log(userEthNFTs);
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-balance").onclick = getAllERC20;
document.getElementById("btn-nft").onclick = getNFTs;