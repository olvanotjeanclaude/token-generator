enum Fee {
    TokenCreator = 0.05,
    MintToken = 0.03,
    MultiSender = 0.03,
    RevokeFreezeAuthority = 0.05,
    RevokeMintAuthority = 0.05,
    RevokeFreezeAndMintAuthority = Fee.RevokeFreezeAuthority + Fee.RevokeMintAuthority,
}

export default Fee;