import { View } from 'react-native'
import { TransactionType as TransactionTypeEnum } from '@/enums/transaction-type'
import { colors } from '@/theme'
import { Option } from './option'
import { styles } from './styles'

type Props = {
  selected: TransactionTypeEnum
  onChange: (type: TransactionTypeEnum) => void
}

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypeEnum.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypeEnum.Input)}
      />

      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypeEnum.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypeEnum.Output)}
      />
    </View>
  )
}
