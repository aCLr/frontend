class Source {
    constructor(id, name, origin, kind, image, last_scrape_time, external_link, folder_id) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.kind = kind;
        this.image = image;
        this.lastScrapeTome = last_scrape_time;
        this.externalLink = external_link;
        this.folderId = folder_id;
    }

    static fromPb(object) {

        return new Source(object.getId(), object.getName(), object.getOrigin(), object.getKind(), object.getImage(), object.getLastScrapeTime(), object.getExternalLink(), object.getFolderId())
    }
}
export {
    Source
}