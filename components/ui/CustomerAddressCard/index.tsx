import { AddressCollection } from "@commercelayer/js-sdk"
import { Address, AddressField } from "@commercelayer/react-components"

interface AddressCardProps {
  addressType: "shipping" | "billing"
  addresses?: [AddressCollection]
  deselect: boolean
  onSelect?: () => void
}

const CustomerAddressCard: React.FC<AddressCardProps> = ({
  addressType,
  addresses,
  deselect,
  onSelect,
}) => {
  const dataCy =
    addressType === "billing"
      ? "customer-billing-address"
      : "customer-shipping-address"
  return (
    <Address
      data-cy={dataCy}
      addresses={addresses}
      className={`${
        onSelect && "hover:border-primary cursor-pointer"
      } shadow-sm`}
      selectedClassName="border-primary"
      deselect={deselect}
      onSelect={onSelect}
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
}: AddressProps) => (
  <>
    <p className="font-bold text-md" data-cy={`fullname_${addressType}`}>
      {firstName} {lastName}
    </p>
    <p
      className="text-sm text-gray-600"
      data-cy={`full_address_${addressType}`}
    >
      {[line1, line2].join(", ")}
      <br />
      {zipCode} {city} - {stateCode} ({countryCode})
      <br />
      {phone}
    </p>
  </>
)
