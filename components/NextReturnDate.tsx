'use client'

import { getNextReturnDate } from '../constants/dates';

export default function NextReturnDate() {
  const NEXT_RETURN_DATE = getNextReturnDate();

  return <span>{NEXT_RETURN_DATE}</span>;
}