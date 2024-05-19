export const movies = {
    title: "Filmer",
    name: "movies",
    type: "document",
    fields: [
        {
            title: "Filmtittel",
            name: "movietitle",
            type: "string"
        },
        {
            title: "Sjanger",
            name: "genre",
            type: "reference",
            to: [{type: "genres"}]
        },
        {
            title: "Filmplakat",
            name: "movieposter",
            type: "image"
        },
        {
            title: "IMDB ID",
            name: "imdbid",
            type: "url"
        }
    ]
}