/**I have used Moralis WEBB3 Platform for backend server */
/** Connect to server (Backend) */
const serverUrl = "https://7yickcrlxhqb.usemoralis.com:2053/server";
const appId = "Q01lYD7aOQvnoqjUwHkzPyJx1ZyXy2puSNmyXW3e";
Moralis.start({ serverUrl, appId });

/** login in Metamask  */
async function login() {
    try {
        let user = Moralis.User.current();
        if (!user) {
            user = await Moralis.authenticate({ signingMessage: "welcome to Rariko" })

            console.log(user)
            document.getElementById('btn-login').innerHTML = user.get('ethAddress')

        }
        /** All ERC20 Token balance will be displayed in Console in detail  */
        const balances = await Moralis.Web3.getAllERC20('0xC685CD8c09A970D0fD1097B115fD8d9E104f656f');
        console.log(balances);
        const optionsp = { chain: 'polygon', address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'}
        const balancesp = await Moralis.Web3API.account.getTokenBalances(optionsp);
        console.log(balancesp)
        const optionsb = { chain: 'bsc', address: '0xC685CD8c09A970D0fD1097B115fD8d9E104f656f'}
        const balbsc = await Moralis.Web3API.account.getTokenBalances(optionsb);
        console.log(balbsc)

        /** All NFTs Token ID and Contract address will be displayed in Console too  */
        const userEthNFTs = await Moralis.Web3.getNFTs(0xC685CD8c09A970D0fD1097B115fD8d9E104f656f);
        console.log(userEthNFTs)

        getTransactioneth = async () => {
             fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${addresseth}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=Z9QDZV3JH4Y9CFHBARJT1CH634QS5HSDX5`)
            .then(response => response.json())
            .then(data => console.log(data)); 
        }
    } catch (error) {
        console.log(error)
    }
}

async function checkAddress() {
    var str4 = document.getElementById("sol-trx").value
             fetch(`https://public-api.solscan.io/account/solTransfers?account=${str4}&offset=0&limit=50`)
            .then(response => response.json())
            .then(data => console.log(data)); 
            

}

async function logIn2() {
const user = await Moralis.authenticate({ provider: "walletconnect" })
console.log("user")
document.getElementById('btn-login2').innerHTML = user.get('address')
}

async function logIn3() {
const user = await Moralis.authenticate({type:'sol'}).then(function(user) {
    console.log(user.get('solAddress'))
    document.getElementById('btn-login3').innerHTML = user.get('solAddress')
})
}

/** Logout of Metamask  */
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

async function getAllERC20() {
    const balances = await Moralis.Web3.getAllERC20();
    console.log(balances);
}

async function getNFTs() {
    const userEthNFTs = await Moralis.Web3.getNFTs();
    console.log(userEthNFTs);
}





getBalancespoly = async () => {
    const query = new Moralis.Query("PolygonTokenTransfers");
    const polytrnz = await query.find();
    console.log(polytrnz);
}


getCombine = async () => {
// get BSC native balance for a given address
const options1 = { chain: "bsc", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"};
const balance1 = await Moralis.Web3API.account.getNativeBalance(options1);

const options2 = { chain: "matic", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"};
const balance2 = await Moralis.Web3API.account.getNativeBalance(options2);

const options3 = { chain: "eth", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"};
const balance3 = await Moralis.Web3API.account.getNativeBalance(options3);

console.log(balance1);
}




document.getElementById("btn-login").onclick = login;
document.getElementById("btn-login2").onclick = logIn2;
document.getElementById("btn-login3").onclick = logIn3;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-balance").onclick = getAllERC20;
document.getElementById("btn-nft").onclick = getNFTs;
document.getElementById("btn-ptz").onclick = getBalancespoly;
document.getElementById("btn-eth").onclick = getTransactioneth;
document.getElementById("btn-bsctz").onclick = getBalancesbsc;
document.getElementById("unstopable").onclick = getBalancesbsc;
document.getElementById("ens").onclick = getBalancesbsc;
document.getElementById("combine").onclick = getCombine;
