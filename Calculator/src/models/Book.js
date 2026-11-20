export default class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getGenre() {
        return this.genre;
    }

    setTitle(title) {
        this.title = title;
    }

    setAuthor(author) {
        this.author = author;
    }

    setGenre(genre) {
        this.genre = genre;
    }
}