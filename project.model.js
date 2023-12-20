

export default class Project{

    constructor(lat, long, address, display, description, title, imgId){
        this.lat = lat,
        this.long = long,
        this.coordinate = [this.lat, this.long],
        this.address = address,
        this.display = display,
        this.descrption = description,
        this.title = title,
        this.imgId = imgId
    }




}