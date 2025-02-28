import { CustomerField } from "@commercelayer/react-components/customers/CustomerField"
import type { Settings } from "HostedApp"
import {
  Package,
  CreditCard,
  Lifebuoy,
  MapPin,
  ShoppingCart,
} from "phosphor-react"
import { useTranslation } from "react-i18next"

import {
  Wrapper,
  Sidebar,
  MenuWrapper,
  LogoWrapper,
  FooterWrapper,
  Nav,
  EmailWrapper,
  Email,
} from "./styled"

import NavLink from "#components/composite/NavLink"
// import ShoppingCartIcon from "#components/ui/icons/ShoppingCartIcon"
import Footer from "#components/ui/Footer"
import Logo from "#components/ui/Logo"

interface Props {
  settings: Settings
  onClick?: () => void
}

function Navbar({ settings, onClick }: Props): JSX.Element {
  const { t } = useTranslation()
  const { accessToken, logoUrl, companyName, continueShoppingUrl } = settings

  const menu = {
    orders: {
      title: t("menu.orders"),
      href: "/orders",
      // icon: <ShoppingCartIcon />,
      icon: <ShoppingCart className="w-4" />,
      comingSoon: false,
      accessToken,
      continueShoppingUrl,
      onClick,
    },
    addresses: {
      title: t("menu.addresses"),
      href: "/addresses",
      icon: <MapPin className="w-4" />,
      comingSoon: false,
      accessToken,
      continueShoppingUrl,
      onClick,
    },
    wallet: {
      title: t("menu.wallet"),
      href: "/wallet",
      icon: <CreditCard className="w-4" />,
      comingSoon: false,
      accessToken,
      continueShoppingUrl,
      onClick,
    },
    returns: {
      title: t("menu.returns"),
      href: "/returns",
      icon: <Package className="w-4" />,
      comingSoon: true,
      accessToken,
      continueShoppingUrl,
      onClick,
    },
    customerService: {
      title: t("menu.customerService"),
      href: "/customer_service",
      icon: <Lifebuoy className="w-4" />,
      accessToken,
      continueShoppingUrl,
      onClick,
    },
    continue: {
      href: continueShoppingUrl,
    },
  }

  return (
    <Sidebar data-cy="navbar">
      <Wrapper>
        <LogoWrapper>
          <Logo
            logoUrl={logoUrl}
            companyName={companyName}
            className="hidden lg:block"
          />
        </LogoWrapper>
        <MenuWrapper>
          <Nav>
            <ul className="flex flex-col gap-[18px]">
              <NavLink id="orders" {...menu.orders} />
              <NavLink id="addresses" {...menu.addresses} />
              <NavLink id="wallet" {...menu.wallet} />
              <NavLink id="returns" {...menu.returns} />
            </ul>
          </Nav>
          {/* <NavLink id="customerService" {...menu.customerService} /> */}
          <EmailWrapper>
            {t("menu.loggedInAs")}
            <Email>
              <CustomerField name="email" attribute="email" tagElement="p" />
            </Email>
          </EmailWrapper>
          <ul>
            <li>
              <a
                data-testid="continue-shopping"
                href={menu.continue.href ?? ""}
                rel="noreferrer"
              >
                {t("general.continue_shopping")}
              </a>
            </li>
            <li>
              <a
                data-testid="sign-out"
                href={menu.continue.href ? `${menu.continue.href}/api/auth/signout` : ""}
                rel="noreferrer"
              >
                {t("general.sign_out")}
              </a>
            </li>
          </ul>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </MenuWrapper>
      </Wrapper>
    </Sidebar>
  )
}

export default Navbar
