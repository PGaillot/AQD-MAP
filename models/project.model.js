

export default class Project {

    constructor(lat = null, long = null, address, imageUrl, display) {
        this.lat = lat,
            this.long = long,
            this.coordinate = [this.lat, this.long],
            this.address = address,
            this.display = display,
        this.imageUrl = imageUrl
        // description,
        // reseaux
    }

}