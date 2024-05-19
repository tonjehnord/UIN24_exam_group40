export const users = {
    title: "Brukere",
    name: "users",
    type: "document",
    fields: [
        {
            title: "Brukernavn",
            name: "username",
            type: "string"
        },
        {
            title: "Favorittfilmer",
            name: "favoritemovies",
            type: "array",
            of: [{type: "reference", to: [{type: "movies"}]}]
        },
        {
            title: "Ønskeliste",
            name: "wishlist",
            type: "array",
            of: [{type: "reference", to: [{type: "movies"}]}]
        },
        {
            title: "Favorittsjangere",
            name: "favoritegenres",
            type: "array",
            of: [{type: "reference", to: [{type: "genres"}]}]
        }
    ]
}