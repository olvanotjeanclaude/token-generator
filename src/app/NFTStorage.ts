import axios from "axios";
import { IMetadata } from "./MintManger";



class NFTStorage {
    public async upload(file: Blob): Promise<string> {
        const baseUrl = "https://api.nft.storage";
        return axios.post(`${baseUrl}/upload`, file, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`
            }
        }).then(response => {
            const data = response.data.value;
            const imageUrl = `https://nftstorage.link/ipfs/${data.cid}`;
            return imageUrl;
        }).catch(error => {
            throw new Error('Unable to upload file');
        });
    }


    public async createAndUploadMetadata(imageFile: Blob, formMetadata: IMetadata): Promise<string> {
        return await this.upload(imageFile)
            .then(image => {
                const metadata = { ...formMetadata, image };

                // console.log('Image uploaded to NFT.Storage:', image);

                return this.upload(new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            })
            .then(metadataUrl => {
                // console.log('Metadata uploaded to NFT.Storage:', metadataUrl);

                return metadataUrl;
            })
            .catch(error => {
                throw "Error uploading to NFT.Storage";
            });
    }
}

export default NFTStorage;
