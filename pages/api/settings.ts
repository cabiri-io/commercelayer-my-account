// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CLayer, { Customer, Organization } from "@commercelayer/js-sdk"
import jwt_decode from "jwt-decode"
import type { NextApiRequest, NextApiResponse } from "next"

interface JWTProps {
  organization: {
    slug: string
    id: string
  },
  owner: {
    id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.query.accessToken as string

  if (!accessToken) {
    res.statusCode = 200
    return res.json({ validUserArea: false })
  }

  let endpoint: string
  try {
    const slug = (jwt_decode(accessToken) as JWTProps).organization.slug
    if (slug) {
      endpoint = `https://${slug}.${
        process.env.NEXT_PUBLIC_CLAYER_HOSTNAME as string
      }`
    } else {
      endpoint = process.env.NEXT_PUBLIC_CLAYER_DOMAIN as string
    }
  } catch (e) {
    console.log(`error decoding access token: ${e}`)
    res.statusCode = 200
    return res.json({ validUserArea: false })
  }

  CLayer.init({
    accessToken,
    endpoint,
  })

  let customer
  let customerId
  try {
    customerId = (jwt_decode(accessToken) as JWTProps).owner.id
    const customerFetched = await Customer.select(
      "id",
      "status", // needed?
      "email",
      "has_password"
      ).find(customerId)
    customer = await customerFetched?.update({ _refresh: true })
  } catch (e) {
    console.log("error on retrieving customer:")
    console.log(e)
    console.log("access token:")  
    console.log(accessToken)
    console.log("customerId")
    console.log(customerId)
    console.log("endpoint")
    console.log(endpoint)
  }

  let organization
  try {
    organization = await Organization.all()
  } catch (e) {
    console.log("error on retrieving organization:")
    console.log(e)
  }

  if (!customer?.id) {
    res.statusCode = 200
    return res.json({ validUserArea: false })
  }

  const appSettings: CustomerSettings = {
    accessToken,
    endpoint,
    customerId: customer.id,
    validUserArea: true,
    logoUrl:
      organization?.logoUrl ||
      "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
    companyName: organization?.name || "Test company",
    language: customer.languageCode,
    primaryColor: organization?.primaryColor || "#000000",
    contrastColor: organization?.contrastColor || "#ffffff",
    favicon: organization?.faviconUrl || "/favicon.png",
    gtmId: organization?.gtmId || "GTM-TGCQ5BM",
  }
  res.statusCode = 200

  return res.json(appSettings)
}
