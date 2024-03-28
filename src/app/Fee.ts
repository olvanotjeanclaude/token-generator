enum Fee {
    TokenCreator = 0,
    MintToken = 0,
    MultiSender = 0,
    RevokeFreezeAuthority = 0,
    RevokeMintAuthority = 0,
    RevokeFreezeAndMintAuthority = Fee.RevokeFreezeAuthority + Fee.RevokeMintAuthority,
}

export default Fee;