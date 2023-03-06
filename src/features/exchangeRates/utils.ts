import { ExchangeRateTrend } from '@take-home-task/constants';
import styles from '@take-home-task/styles/Home.module.css';

export function getClassNameFromExchangeRateTrend(trend: ExchangeRateTrend) {
  if (trend === ExchangeRateTrend.NO_CHANGE) return styles.priceNoChangeTrend;
  return trend === ExchangeRateTrend.INCREASE ? styles.priceIncreaseTrend : styles.priceDecreaseTrend;
}