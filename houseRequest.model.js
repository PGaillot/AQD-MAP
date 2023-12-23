export default class HouseRequest{
    constructor(email, address, lat = null, long = null, city, district='', zipCode, imgList, msg =''  ){
        this.email = email,
        this.address = address,
        this.lat = lat,
        this.long = long,
        this.city =city,
        this.district = district,
        this.zipCode = zipCode
        this.imgList = imgList,
        this.msg = msg,
        this.coordinate = [lat, long]
    }
}