

export default class Project{

    constructor(lat, long, address, city, district = '', zipCode, display, description = '', title, imgId = []){
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
}