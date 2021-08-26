import styled from "styled-components"
import tw from "twin.macro"

interface Props {
  className?: string
  rounded?: boolean
  fullHeight?: boolean
}

export const Card: React.FC<Props> = ({
  children,
  className,
  rounded,
  fullHeight,
}) => (
  <Wrapper className={className} rounded={rounded} fullHeight={fullHeight}>
    {children}
  </Wrapper>
)

interface WrapperProps {
  rounded?: boolean
  fullHeight?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  ${tw`flex-grow bg-gray-100 shadow-sm overflow-x-hidden md:bg-contrast xl:p-16 xl:pr-20`}
  ${({ rounded }) => (rounded ? tw`rounded-md` : null)}
  ${({ fullHeight }) => (fullHeight ? tw`min-h-full ` : null)}
`
