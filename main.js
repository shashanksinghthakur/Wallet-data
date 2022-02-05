/**I have used Moralis WEBB3 Platform for backend server */
/** Connect to server (Backend) */


/** login in Metamask  */
async function login() {
    const serverUrl = "https://7yickcrlxhqb.usemoralis.com:2053/server";
const appId = "Q01lYD7aOQvnoqjUwHkzPyJx1ZyXy2puSNmyXW3e";
Moralis.start({ serverUrl, appId });
    try {
        let user = Moralis.User.current();
        if (!user) {
            user = await Moralis.authenticate({ signingMessage: "welcome to Rariko" })

            console.log(user)
            const addresseth = user.get('ethAddress')
            fetch(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${addresseth}&tag=latest&apikey=Z9QDZV3JH4Y9CFHBARJT1CH634QS5HSDX5`)
            .then(response => response.json())
            .then(data => console.log(data));
            document.getElementById('btn-login').innerHTML = user.get('ethAddress')
        }
        /** All ERC20 Token balance will be displayed in Console in detail  */
        const balances = await Moralis.Web3.getAllERC20();
        console.log(balances);
        const optionsp = { chain: 'polygon', address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'}
        const balancesp = await Moralis.Web3API.account.getTokenBalances(optionsp);
        console.log(balancesp)
        const optionsb = { chain: 'bsc'}
        const balbsc = await Moralis.Web3API.account.getTokenBalances(optionsb);
        console.log(balbsc)

        /** All NFTs Token ID and Contract address will be displayed in Console too  */
        const userEthNFTs = await Moralis.Web3.getNFTs();
        console.log(userEthNFTs)
    } catch (error) {
        console.log(error)
    }
}

async function logIn2() {
const user = await Moralis.authenticate({ provider: "walletconnect" })
document.getElementById('btn-login2').innerHTML = user.get('Address')
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



getTransactioneth = async () => {
    const transactions = await Moralis.Web3API.account.getTransactions();
    console.log(transactions);
}

getBalancespoly = async () => {
    const query = new Moralis.Query("PolygonTokenTransfers");
    const polytrnz = await query.find();
    console.log(polytrnz);
}





document.getElementById("btn-login").onclick = login;
document.getElementById("btn-login2").onclick = logIn2;
document.getElementById("btn-login3").onclick = logIn3;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-balance").onclick = getAllERC20;
document.getElementById("btn-nft").onclick = getNFTs;
document.getElementById("btn-ptz").onclick = getBalancespoly;
document.getElementById("btn-bsctz").onclick = getBalancesbsc;
