import { Wrapper } from "./styled"

interface Props {
  className?: string
}

export const Base: React.FC<Props> = ({ className, children }) => (
  <Wrapper className={className}>{children}</Wrapper>
)
