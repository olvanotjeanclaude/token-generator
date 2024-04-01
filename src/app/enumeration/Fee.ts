enum Fee {
    TokenCreator = 0.1,
    MintToken = 0.06,
    MultiSender = 0.002,
    RevokeFreezeAuthority = 0.06,
    RevokeMintAuthority = 0.06,
    RevokeFreezeAndMintAuthority = Fee.RevokeFreezeAuthority + Fee.RevokeMintAuthority,
}

export default Fee;