import type { OrderStatus } from "./OrderStatusChip"
import type { ReturnStatus } from "./ReturnStatusChip"
import type { ShipmentStatus } from "./ShipmentStatusChip"
import { StatusChipWrapper } from "./styled"

interface Props {
  status: OrderStatus | ReturnStatus | ShipmentStatus
  label: string
}

const StatusChip: React.FC<Props> = ({ status, label }) => {
  return <StatusChipWrapper status={status}>{label}</StatusChipWrapper>
}

export default StatusChip
