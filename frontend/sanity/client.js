import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "8sjm1syp",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
})

export const updateClient = createClient({
    projectId: "8sjm1syp",
    dataset: "production",
    useCdn: false,
    apiVersion: "2022-03-07",
    token: "skkjZkgHiIzJEyQ0TryKlLmvgICJXThLzzrPJC5z3Ya6pJyYyQjDr2A2doFYmlASSFux0h0OwbOP3SPCYUFa1HDbofxNZl4iBrFOQbWqHFEn3oYkFapc06qC1XLPXOruRMQvLAcZdfyucjA6IRKbg2tofNUL9cvc011oVJPnSbJ5D3XNFr5y"
})