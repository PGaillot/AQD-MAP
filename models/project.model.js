

export default class Project {

    constructor(title, lat = null, long = null, address, imageUrl, display = true, description = '') {
        this.lat = lat,
            this.long = long,
            this.coordinate = [this.lat, this.long],
            this.address = address,
            this.display = display,
        this.imageUrl = imageUrl
        this.title = title;
        this.description = description
        // description,
        // reseaux
    }

}