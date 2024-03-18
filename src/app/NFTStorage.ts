import axios from "axios";



class NFTStorage {
    public static upload(file: Blob) {
        const baseUrl = "https://api.nft.storage";
        const response = axios.create({
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`
            }
        })
            .post(`${baseUrl}/upload`, file)
            .then(res => {
                const data = res.data.value;

                return {
                    cid: data.cid
                };
            })
            .catch(e => {
                throw "Unable to upload file"
            });

        return response;
    }
}

export default NFTStorage;