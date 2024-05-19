import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "8sjm1syp",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
  })