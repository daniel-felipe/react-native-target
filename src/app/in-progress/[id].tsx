import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'

import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { Loading } from '@/components/Loading'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction, type TransactionProps } from '@/components/Transaction'
import { useTargetDatabase } from '@/database/use-target-database'
import { TransactionType } from '@/enums/transaction-type'
import { numberToCurrency } from '@/utils/numberToCurrency'

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 100,00',
    date: '2023-10-01',
    description: 'Compra de café',
    type: TransactionType.Output,
  },
  {
    id: '2',
    value: 'R$ 200,00',
    date: '2023-10-02',
    description: 'Venda de produto',
    type: TransactionType.Input,
  },
  {
    id: '3',
    value: 'R$ 50,00',
    date: '2023-10-03',
    description: 'Pagamento de serviço',
    type: TransactionType.Output,
  },
]

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  })

  const params = useLocalSearchParams<{ id: string }>()

  const targetDatabase = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id))

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      })
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta')
      console.error(error)
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails()

    await Promise.all([fetchDetailsPromise])

    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader title={details.name} rightButton={{ icon: 'edit', onPress: () => {} }} />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => {}} />}
        emptyMessage="Nenhuma transação. Toque em nova transação para adicionar."
      />

      <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
    </View>
  )
}
