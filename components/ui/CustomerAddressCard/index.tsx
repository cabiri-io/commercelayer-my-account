import { Address, AddressField } from "@commercelayer/react-components"
import { useTranslation } from "react-i18next"
import tw from "twin.macro"

import TrashIcon from "../icons/TrashIcon"

interface AddressCardProps {
  addressType: "shipping" | "billing"
}

const CustomerAddressCard: React.FC<AddressCardProps> = ({ addressType }) => {
  const { t } = useTranslation()
  const dataCy =
    addressType === "billing"
      ? "customer-billing-address"
      : "customer-shipping-address"

  return (
    <Address
      data-cy={dataCy}
      className="group"
      disabledClassName="opacity-50 cursor-not-allowed"
    >
      {
        <AddressField>
          {({ address }) => (
            <CustomAddress
              firstName={address.firstName}
              lastName={address.lastName}
              city={address.city}
              line1={address.line1}
              line2={address.line2}
              zipCode={address.zipCode}
              stateCode={address.stateCode}
              countryCode={address.countryCode}
              phone={address.phone}
              addressType={addressType}
              editButton={t("addresses.edit")}
              deleteButton={t("addresses.delete")}
            />
          )}
        </AddressField>
      }
    </Address>
  )
}

export default CustomerAddressCard

interface AddressProps {
  firstName: string
  lastName: string
  city: string
  line1: string
  line2: string
  zipCode: string
  stateCode: string
  countryCode: string
  phone: string
  addressType: string
  editButton: string
  deleteButton: string
}

const CustomAddress = ({
  firstName,
  lastName,
  city,
  line1,
  line2,
  zipCode,
  stateCode,
  countryCode,
  phone,
  addressType,
  editButton,
  deleteButton,
}: AddressProps) => (
  <div tw="px-5 py-4 border rounded shadow-sm group-hover:(border-primary)">
    <p tw="font-semibold text-md" data-cy={`fullname_${addressType}`}>
      {firstName} {lastName}
    </p>
    <p
      tw="text-sm font-thin text-gray-500 mb-3"
      data-cy={`full_address_${addressType}`}
    >
      {[line1, line2].join(", ")}
      <br />
      {zipCode} {city} - {stateCode} ({countryCode})
      <br />
      {phone}
      <br />
    </p>
    <div tw="flex justify-between tracking-wide text-gray-600">
      <button tw="text-sm font-semibold h-5 cursor-pointer underline group-hover:(text-primary border-primary-light)">
        {editButton}
      </button>
      <button tw="flex items-center group-hover:(text-red-400)">
        <TrashIcon />
        <span tw="text-sm ml-1 font-semibold cursor-pointer underline">
          {deleteButton}
        </span>
      </button>
    </div>
  </div>
)
