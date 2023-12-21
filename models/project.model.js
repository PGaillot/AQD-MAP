import ImageApi from "../api/image.api.js";

export default class Project {

    constructor(title, lat = null, long = null, address, city, district = '', zipCode, imgId, display = true, description = '') {
        this.lat = lat,
        this.long = long,
        this.coordinate = [this.lat, this.long],
        this.address = address,
        this.city = city,
        this.district = district,
        this.zipCode = zipCode,
        this.display = display,
        this.imgId = imgId,
        this.title = title,
        this.description = description
        this.getImgUrl;
    }

    getImgUrl(){
        const imgApi = new ImageApi;
        imgApi.getProjectImageUrl(this.imgId)
        .then(url => {
            this.imgUrl = url;
            console.log(this.imgUrl);
        })
        .catch(e => console.error(e))
    }


}