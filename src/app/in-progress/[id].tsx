import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, type TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/use-target-database";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTransactionsDatabase } from "@/database/use-transactions-database";
import { TransactionType } from "@/enums/transaction-type";
import dayjs from "dayjs";

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.error(error);
    }
  }

  async function fetchTransitions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id),
      );

      setTransactions(
        response.map(
          (item): TransactionProps => ({
            id: String(item.id),
            value: numberToCurrency(item.amount),
            date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
            description: item.observation,
            type:
              item.amount < 0 ? TransactionType.Output : TransactionType.Input,
          }),
        ),
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações.");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromise = fetchTargetDetails();
    const fetchTransitionsPromise = fetchTransitions();

    await Promise.all([fetchTargetDetailsPromise, fetchTransitionsPromise]);

    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para adicionar."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
