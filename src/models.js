class Source {
    constructor(object) {
        this.id = object.getId();
        this.name = object.getName();
        this.origin = object.getOrigin();
        this.kind = object.getKind();
        this.image = object.getImage();
        this.lastScrapeTome = object.getLastScrapeTime();
        this.externalLink = object.getExternalLink();
    }
}


class SourceWithMeta extends Source {
    constructor(object) {
        super(object.getSource())
        this.folderId = object.getFolderId();
        this.tags = object.getTagsList()
    }
}

class Record {
    constructor(id, title, sourceRecordId, sourceId, content, date, image) {
        this.id = id;
        this.title = title;
        this.sourceRecordId = sourceRecordId;
        this.sourceId = sourceId;
        this.content = content;
        this.date = date;
        this.image = image;
    }

    static fromPb(object) {
        return new Record(object.getId(), object.getTitle(), object.getSourceRecordId(), object.getSourceId(), object.getContent(), object.getDate(), object.getImage())
    }
}

class RecordWithMeta extends Record {
    constructor(id, title, sourceRecordId, sourceId, content, date, image, starred, tags) {
        super(id, title, sourceRecordId, sourceId, content, date, image);
        this.starred = starred;
        this.tags = tags;
    }

    static fromPb(object) {
        let rec = object.getRecord();
        return new RecordWithMeta(rec.getId(), rec.getTitle(), rec.getSourceRecordId(), rec.getSourceId(), rec.getContent(), rec.getDate(), rec.getImage(),
            object.getStarred(),
            object.getTagsList()
        )
    }
}

class Folder {
    constructor(id, name, parentFolderId) {
        this.id = id;
        this.name = name;
        this.parentFolderId = parentFolderId;
    }

    static fromPb(object) {
        return new Folder(object.getId(), object.getName(), object.getParentFolderId())
    }
}


export {
    Source,
    SourceWithMeta,
    Record,
    RecordWithMeta,
    Folder,
}